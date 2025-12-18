import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2023-10-16" });

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user) return new NextResponse("Unauthorized", { status: 401 });

    const { cinemaId, slot, weekStart } = await req.json();

    const cinema = await prisma.cinema.findUnique({ where: { id: cinemaId } });
    if (!cinema) return new NextResponse("Cinema not found", { status: 404 });

    // Create pending booking
    const booking = await prisma.booking.create({
        data: {
            userId: session.user.id,
            cinemaId,
            slot,
            weekStart: new Date(weekStart),
            status: "PENDING",
        },
    });

    // Create Stripe Session
    const stripeSession = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
            {
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: `${cinema.name} - ${cinema.screenName}`,
                        description: `Slot: ${slot}, Week of ${new Date(weekStart).toLocaleDateString()}`,
                    },
                    unit_amount: cinema.pricePerWeekRupee * 100,
                },
                quantity: 1,
            },
        ],
        mode: "payment",
        success_url: `${process.env.NEXTAUTH_URL}/success?bookingId=${booking.id}`,
        cancel_url: `${process.env.NEXTAUTH_URL}/cinemas/${cinemaId}`,
        metadata: { bookingId: booking.id },
    });

    return NextResponse.json({ url: stripeSession.url });
}

"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function confirmBooking(bookingId: string, email: string) {
    await prisma.booking.update({
        where: { id: bookingId },
        data: { status: "CONFIRMED" },
    });

    // Nodemailer Stub
    console.log(`[EMAIL STUB] To: ${email} | Subject: Booking Confirmed | Body: Your booking ${bookingId} is confirmed.`);

    revalidatePath("/admin");
}

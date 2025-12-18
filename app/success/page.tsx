import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";
import { format } from "date-fns";

export default async function SuccessPage({ searchParams }: { searchParams: { bookingId: string } }) {
    if (!searchParams.bookingId) redirect("/");

    const booking = await prisma.booking.findUnique({
        where: { id: searchParams.bookingId },
        include: { cinema: true, user: true },
    });

    if (!booking) return <div className="p-10 text-center">Booking not found</div>;

    return (
        <div className="container mx-auto py-20 px-6 text-center max-w-2xl">
            <div className="bg-green-100 text-green-800 p-8 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 text-4xl">
                ✓
            </div>
            <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>
            <p className="text-gray-600 mb-8">Your ad slot at {booking.cinema.name} is confirmed.</p>

            <div className="bg-white p-8 rounded-xl shadow-lg border text-left mb-8">
                <h2 className="text-xl font-bold border-b pb-4 mb-4">Receipt #{booking.id.slice(-6).toUpperCase()}</h2>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                    <div><span className="font-semibold">Cinema:</span> {booking.cinema.name}</div>
                    <div><span className="font-semibold">City:</span> {booking.cinema.city}</div>
                    <div><span className="font-semibold">Slot:</span> {booking.slot}</div>
                    <div><span className="font-semibold">Date:</span> {format(booking.weekStart, "MMM d, yyyy")}</div>
                    <div className="col-span-2 border-t pt-4 mt-2 flex justify-between text-lg font-bold text-black">
                        <span>Total Paid</span>
                        <span>₹{booking.cinema.pricePerWeekRupee.toLocaleString()}</span>
                    </div>
                </div>
            </div>

            <a
                href={`data:text/plain;charset=utf-8,RECIEPT FOR BOOKING ${booking.id}\nCinema: ${booking.cinema.name}\nAmount: ${booking.cinema.pricePerWeekRupee}`}
                download="receipt.txt"
                className="bg-gray-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-black"
            >
                Download Receipt (PDF Stub)
            </a>
        </div>
    );
}

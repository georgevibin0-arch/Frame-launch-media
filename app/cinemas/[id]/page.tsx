import { prisma } from "@/lib/prisma";
import BookingClient from "./BookingClient";
import { notFound } from "next/navigation";

export default async function CinemaDetailsPage({ params }: { params: { id: string } }) {
    const cinema = await prisma.cinema.findUnique({ where: { id: params.id } });

    if (!cinema) notFound();

    return (
        <div className="container mx-auto py-10 px-6">
            <div className="grid md:grid-cols-2 gap-12">
                <div>
                    <h1 className="text-4xl font-extrabold mb-2">{cinema.name}</h1>
                    <p className="text-xl text-gray-500 mb-6">{cinema.city} • {cinema.screenName}</p>

                    <div className="bg-blue-50 p-6 rounded-xl mb-6">
                        <h3 className="font-bold mb-2">Screen Specifications</h3>
                        <ul className="space-y-2 text-gray-700">
                            <li>Seat Count: {cinema.seatCount}</li>
                            <li>Audio: Dolby 7.1 Surround (Standard)</li>
                            <li>Projection: 4K Laser</li>
                        </ul>
                    </div>
                </div>
                <div>
                    <BookingClient cinema={cinema} />
                </div>
            </div>
        </div>
    );
}

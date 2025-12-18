"use client";
import { useState } from "react";
import Link from "next/link";

interface Cinema {
    id: string;
    name: string;
    city: string;
    screenName: string;
    seatCount: number;
    pricePerWeekRupee: number;
    availableSlots: string;
}

export default function CinemaFilter({ cinemas, cities }: { cinemas: Cinema[]; cities: string[] }) {
    const [filterCity, setFilterCity] = useState("All");

    const filtered = filterCity === "All"
        ? cinemas
        : cinemas.filter((c) => c.city === filterCity);

    return (
        <div>
            <div className="mb-8 flex gap-4 items-center">
                <span className="font-semibold">Filter by City:</span>
                <select
                    className="p-2 border rounded bg-white"
                    value={filterCity}
                    onChange={(e) => setFilterCity(e.target.value)}
                >
                    <option value="All">All Cities</option>
                    {cities.map((city) => (
                        <option key={city} value={city}>{city}</option>
                    ))}
                </select>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {filtered.map((c) => (
                    <div key={c.id} className="bg-white border text-gray-900 rounded-lg shadow-sm hover:shadow-md transition p-6">
                        <h2 className="text-xl font-bold mb-1">{c.name}</h2>
                        <p className="text-gray-500 text-sm mb-4">{c.city} • {c.screenName}</p>
                        <div className="flex justify-between items-center bg-gray-50 p-3 rounded mb-4">
                            <span className="text-sm font-medium">Seats: {c.seatCount}</span>
                            <span className="text-lg font-bold text-green-700">₹{c.pricePerWeekRupee.toLocaleString()}</span>
                        </div>
                        <Link
                            href={`/cinemas/${c.id}`}
                            className="block w-full text-center bg-gray-900 text-white py-2 rounded hover:bg-black font-medium"
                        >
                            Book this screen
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

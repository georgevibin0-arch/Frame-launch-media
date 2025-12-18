"use client";
import { useState } from "react";
import { addWeeks, startOfWeek, format } from "date-fns";
import toast from "react-hot-toast";

interface Cinema {
    id: string;
    name: string;
    city: string;
    screenName: string;
    seatCount: number;
    pricePerWeekRupee: number;
    availableSlots: string;
}

export default function BookingClient({ cinema }: { cinema: Cinema }) {
    const [selectedSlot, setSelectedSlot] = useState("");
    const [weekOffset, setWeekOffset] = useState(0);
    const [loading, setLoading] = useState(false);

    const slots = JSON.parse(cinema.availableSlots) as string[];
    const startDate = startOfWeek(addWeeks(new Date(), weekOffset), { weekStartsOn: 1 });
    const dateStr = format(startDate, "MMM d, yyyy");

    const handleBook = async () => {
        if (!selectedSlot) return toast.error("Please select a slot");
        setLoading(true);
        try {
            const res = await fetch("/api/checkout", {
                method: "POST",
                body: JSON.stringify({
                    cinemaId: cinema.id,
                    slot: selectedSlot,
                    weekStart: startDate,
                }),
            });
            if (!res.ok) throw new Error("Booking failed");
            const { url } = await res.json();
            window.location.href = url;
        } catch (e) {
            toast.error("Something went wrong");
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow border">
            <h3 className="text-lg font-bold mb-4">Select Schedule</h3>

            {/* Week Picker */}
            <div className="flex items-center justify-between mb-6 bg-gray-50 p-2 rounded">
                <button onClick={() => setWeekOffset(w => Math.max(0, w - 1))} className="px-3 py-1 bg-white rounded shadow-sm hover:bg-gray-100">&larr;</button>
                <div className="font-semibold">Week of {dateStr}</div>
                <button onClick={() => setWeekOffset(w => w + 1)} className="px-3 py-1 bg-white rounded shadow-sm hover:bg-gray-100">&rarr;</button>
            </div>

            {/* Slot Picker */}
            <div className="mb-6">
                <p className="text-sm font-semibold mb-2 text-gray-500">AVAILABLE SLOTS</p>
                <div className="grid grid-cols-2 gap-3">
                    {slots.map((s) => (
                        <button
                            key={s}
                            onClick={() => setSelectedSlot(s)}
                            className={`p-3 rounded border text-center transition ${selectedSlot === s ? "bg-black text-white border-black" : "hover:border-gray-400"
                                }`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            <div className="border-t pt-4">
                <div className="flex justify-between items-end mb-4">
                    <span className="text-gray-500">Total Price</span>
                    <span className="text-2xl font-bold">₹{cinema.pricePerWeekRupee.toLocaleString()}</span>
                </div>
                <button
                    onClick={handleBook}
                    disabled={loading}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded disabled:opacity-50"
                >
                    {loading ? "Processing..." : `Pay ₹${cinema.pricePerWeekRupee.toLocaleString()}`}
                </button>
            </div>
        </div>
    );
}

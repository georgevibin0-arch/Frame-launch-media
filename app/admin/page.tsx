import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { confirmBooking } from "./actions";

export default async function AdminPage() {
    const session = await getServerSession(authOptions);

    if (session?.user?.role !== "ADMIN") {
        redirect("/");
    }

    const bookings = await prisma.booking.findMany({
        include: { user: true, cinema: true },
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="container mx-auto py-10 px-6">
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="p-4">ID</th>
                            <th className="p-4">User</th>
                            <th className="p-4">Cinema</th>
                            <th className="p-4">Slot</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((b) => (
                            <tr key={b.id} className="border-b hover:bg-gray-50">
                                <td className="p-4 font-mono text-xs">{b.id.slice(-6)}</td>
                                <td className="p-4">{b.user.email}</td>
                                <td className="p-4">{b.cinema.name}</td>
                                <td className="p-4">{b.slot}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${b.status === "PAID" ? "bg-green-100 text-green-800" :
                                            b.status === "CONFIRMED" ? "bg-blue-100 text-blue-800" : "bg-yellow-100 text-yellow-800"
                                        }`}>
                                        {b.status}
                                    </span>
                                </td>
                                <td className="p-4">
                                    {b.status === "PAID" && (
                                        <form action={confirmBooking.bind(null, b.id, b.user.email!)}>
                                            <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                                                Confirm
                                            </button>
                                        </form>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

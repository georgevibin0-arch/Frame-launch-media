import { prisma } from "@/lib/prisma";
import Link from "next/link";
import CinemaFilter from "./filter"; // Separate client component for interactivity

export const dynamic = "force-dynamic";

export default async function CinemasPage() {
    const cinemas = await prisma.cinema.findMany();

    // Extract unique cities
    const cities = Array.from(new Set(cinemas.map((c) => c.city)));

    return (
        <div className="container mx-auto py-10 px-6">
            <h1 className="text-3xl font-bold mb-8">Available Cinemas</h1>
            <CinemaFilter cinemas={cinemas} cities={cities} />
        </div>
    );
}

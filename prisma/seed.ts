import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const cinemas = [
        { name: "PVR", city: "Ahmedabad", screenName: "screen-1", seatCount: 150, price: 30000 },
        { name: "INOX", city: "Baroda", screenName: "screen-3", seatCount: 180, price: 28000 },
        { name: "Cinepolis", city: "Surat", screenName: "screen-2", seatCount: 200, price: 32000 },
        { name: "Rajhans", city: "Bhopal", screenName: "screen-A", seatCount: 120, price: 18000 },
        { name: "PictureTime", city: "Indore", screenName: "MP-1", seatCount: 100, price: 20000 },
    ];

    const commonSlots = JSON.stringify(["10:00", "14:00", "18:00", "21:30"]);

    for (const c of cinemas) {
        await prisma.cinema.create({
            data: {
                name: c.name,
                city: c.city,
                screenName: c.screenName,
                seatCount: c.seatCount,
                pricePerWeekRupee: c.price,
                availableSlots: commonSlots,
            },
        });
    }
    console.log("Seeding complete!");
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });

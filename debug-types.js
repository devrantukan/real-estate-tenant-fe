const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const types = await prisma.propertyType.findMany();
        console.log('Property Types:', JSON.stringify(types, null, 2));

        const contracts = await prisma.propertyContract.findMany();
        console.log('Property Contracts:', JSON.stringify(contracts, null, 2));

        const propertyCount = await prisma.property.count();
        console.log('Total Properties:', propertyCount);

        // Check a sample property to see its type structure
        const sampleProperty = await prisma.property.findFirst({
            include: { type: true, contract: true }
        });
        console.log('Sample Property:', JSON.stringify(sampleProperty, null, 2));

    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();

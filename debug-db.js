
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    console.log('Checking database content...');

    const publishedProperties = await prisma.property.findMany({
        where: { publishingStatus: 'PUBLISHED' },
        select: { id: true, name: true, publishingStatus: true }
    });
    console.log(`Found ${publishedProperties.length} published properties.`);

    const allCountries = await prisma.country.findMany();
    console.log('All Countries table:', allCountries);

    const allCities = await prisma.city.findMany({ take: 5 });
    console.log('Sample Cities:', allCities);

    const cityCount = await prisma.city.count();
    console.log('Total Cities:', cityCount);
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

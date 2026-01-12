
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const orgId = process.env.TenantOrganisationID;
        console.log("TenantOrganisationID from env:", orgId);
        console.log("Parsed as number:", Number(orgId));

        const totalProperties = await prisma.property.count();
        console.log("Total properties in DB:", totalProperties);

        const publishedProperties = await prisma.property.count({
            where: { publishingStatus: 'PUBLISHED' }
        });
        console.log("Total PUBLISHED properties:", publishedProperties);

        if (orgId) {
            const orgProperties = await prisma.property.count({
                where: { organizationId: Number(orgId) }
            });
            console.log(`Properties for Org ${orgId}:`, orgProperties);

            const orgPublishedProperties = await prisma.property.count({
                where: {
                    organizationId: Number(orgId),
                    publishingStatus: 'PUBLISHED'
                }
            });
            console.log(`PUBLISHED Properties for Org ${orgId}:`, orgPublishedProperties);
        }

        // Check Offices too
        const totalOffices = await prisma.office.count();
        console.log("Total Offices:", totalOffices);

    } catch (e) {
        console.error("Error:", e);
    } finally {
        await prisma.$disconnect();
    }
}

main();

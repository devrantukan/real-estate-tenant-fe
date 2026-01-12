
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const orgId = process.env.TenantOrganisationID;
        const props = await prisma.property.findMany({
            where: { organizationId: Number(orgId) },
            select: { publishingStatus: true, id: true },
            take: 5
        });
        console.log("Sample property statuses:", props);
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}
main();

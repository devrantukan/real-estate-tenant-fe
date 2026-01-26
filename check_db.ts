import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const contract = await prisma.propertyContract.findFirst({ where: { slug: 'satilik' } })
    const type = await prisma.propertyType.findFirst({ where: { slug: 'konut' } })
    console.log('Contract:', contract)
    console.log('Type:', type)
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect())

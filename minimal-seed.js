const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting minimal seed...');

    const organization = await prisma.organization.upsert({
        where: { slug: 'retroia' },
        update: {},
        create: {
            name: 'Retroia Gayrimenkul',
            slug: 'retroia',
            description: 'Retroia Gayrimenkul Organization',
            updatedAt: new Date(),
        },
    });

    const country = await prisma.country.upsert({
        where: { country_id: 1 },
        update: {},
        create: {
            country_id: 1,
            country_name: 'Türkiye',
            slug: 'turkiye',
        },
    });

    const city = await prisma.city.upsert({
        where: { city_id: 34 },
        update: {},
        create: {
            city_id: 34,
            city_name: 'İstanbul',
            slug: 'istanbul',
            country_id: country.country_id,
            country_name: country.country_name,
        },
    });

    const district = await prisma.district.upsert({
        where: { district_id: 1 },
        update: {},
        create: {
            district_id: 1,
            district_name: 'Beşiktaş',
            city_id: city.city_id,
            city_name: city.city_name,
            slug: 'besiktas',
        },
    });

    const neighborhood = await prisma.neighborhood.upsert({
        where: { neighborhood_id: 1 },
        update: {},
        create: {
            neighborhood_id: 1,
            neighborhood_name: 'Levent',
            city_id: city.city_id,
            city_name: city.city_name,
            district_id: district.district_id,
            district_name: district.district_name,
            slug: 'levent',
        },
    });

    const office = await prisma.office.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            name: 'Beşiktaş Ofisi',
            description: 'İstanbul Beşiktaş Merkez Ofisimiz',
            email: 'besiktas@retroia.com',
            phone: '0212 222 22 22',
            fax: '0212 222 22 23',
            streetAddress: 'Nispetiye Cad. No:1',
            zip: '34330',
            latitude: 41.0766,
            longitude: 29.0142,
            cityId: city.city_id,
            countryId: country.country_id,
            districtId: district.district_id,
            neighborhoodId: neighborhood.neighborhood_id,
            organizationId: organization.id,
            slug: 'besiktas-ofisi',
            webUrl: 'https://retroia.com',
            xAccountId: '',
            facebookAccountId: '',
            linkedInAccountId: '',
            instagramAccountId: '',
            youtubeAccountId: '',
        },
    });

    const role = await prisma.role.upsert({
        where: { id: 7 },
        update: {},
        create: {
            id: 7,
            title: 'Broker/Manager',
            slug: 'broker-manager',
            organizationId: organization.id,
        },
    });

    const worker = await prisma.officeWorker.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            name: 'Test',
            surname: 'Danışman',
            roleId: role.id,
            about: 'Retroia Gayrimenkul Test Danışmanı',
            email: 'test@retroia.com',
            phone: '0555 555 55 55',
            xAccountId: '',
            facebookAccountId: '',
            linkedInAccountId: '',
            instagramAccountId: '',
            youtubeAccountId: '',
            webUrl: '',
            commercialDocumentId: '12345',
            companyLegalName: 'Retroia Gayrimenkul A.Ş.',
            officeId: office.id,
            slug: 'test-danisman',
            title: 'Gayrimenkul Danışmanı',
        },
    });

    const type = await prisma.propertyType.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            value: 'konut',
            slug: 'konut',
            organizationId: organization.id,
        },
    });

    const subType = await prisma.propertySubType.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            value: 'daire',
            slug: 'daire',
            typeId: type.id,
            organizationId: organization.id,
        },
    });

    const status = await prisma.propertyStatus.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            value: 'aktif',
            slug: 'aktif',
            organizationId: organization.id,
        },
    });

    const contract = await prisma.propertyContract.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            value: 'satılık',
            slug: 'satilik',
            organizationId: organization.id,
        },
    });

    const deedStatus = await prisma.propertyDeedStatus.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            value: 'kat-mülkiyeti',
            slug: 'kat-mulkiyeti',
            organizationId: organization.id,
        },
    });

    const user = await prisma.user.upsert({
        where: { id: 'test-user-id' },
        update: {},
        create: {
            id: 'test-user-id',
            firstName: 'Test',
            lastName: 'User',
            email: 'user@test.com',
            organizationId: organization.id,
        },
    });

    await prisma.property.create({
        data: {
            name: 'Deneme Satılık Daire',
            description: 'Bu bir test mülküdür.',
            price: 5000000,
            discountedPrice: 4800000,
            userId: user.id,
            organizationId: organization.id,
            typeId: type.id,
            subTypeId: subType.id,
            statusId: status.id,
            agentId: worker.id,
            contractId: contract.id,
            videoSource: '',
            threeDSource: '',
            deedStatusId: deedStatus.id,
            publishingStatus: 'PUBLISHED',
            location: {
                create: {
                    streetAddress: 'Test Sokak No:1',
                    city: 'İstanbul',
                    state: 'İstanbul',
                    zip: '34330',
                    country: 'Türkiye',
                    landmark: 'Test',
                    district: 'Beşiktaş',
                    neighborhood: 'Levent',
                    region: 'Marmara',
                    latitude: 41.0766,
                    longitude: 29.0142,
                }
            },
            feature: {
                create: {
                    bedrooms: '3+1',
                    bathrooms: 2,
                    floor: 2,
                    totalFloor: 5,
                    area: 120,
                    grossArea: 140,
                    zoningStatus: true,
                    parcelNumber: 1,
                    blockNumber: 1,
                    hasSwimmingPool: false,
                    hasGardenYard: false,
                    hasBalcony: true,
                }
            }
        },
    });

    console.log('✨ Minimal seed completed successfully!');
}

main()
    .catch((e) => {
        console.error('❌ Seed failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

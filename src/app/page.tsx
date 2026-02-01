import prisma from "@/lib/prisma";
import HomepageHero from "./components/HomepageHero";
import HomepageCustomerBanner from "./components/HomepageCustomerBanner";
import HomepageAgentBanner from "./components/HomepageAgentBanner";
import HomepageAgentSlider from "./components/HomepageAgentSlider";
import HomepageRentalList from "./components/HomepageRentalList";
import HomepageForSaleList from "./components/HomepageForSaleList";
import Link from "next/link"; // Assuming Link is needed potentially or just for consistency

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array: any[]): void {
  for (var i = array.length - 1; i >= 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

export default async function Home({ searchParams }: Props) {
  let agents = await prisma.officeWorker.findMany({
    where: {
      roleId: { in: [7, 6, 14] },
    },
    include: {
      role: true,
      office: true,
    },
  });

  shuffleArray(agents);

  const properties = await prisma.property.findMany({
    where: {
      publishingStatus: "PUBLISHED",
    },
    select: {
      id: true,
      name: true,
      price: true,
      discountedPrice: true,
      images: {
        select: {
          url: true,
          order: true,
        },
        orderBy: {
          order: "asc",
        },
      },
      location: {
        select: {
          city: true,
          state: true,
          country: true,
          district: true,
          neighborhood: true,
        },
      },
      type: true,
      contract: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Get at least 5 satılık konut properties
  const satilikKonut = properties
    .filter((p) => p.type.value === "konut" && p.contract.value === "satılık")
    .slice(0, 5);

  // Get other properties
  const otherProperties = properties.filter(
    (p) => !(p.type.value === "konut" && p.contract.value === "satılık")
  );

  // Combine the results
  const selectedProperties = [...satilikKonut, ...otherProperties];

  return (
    <div className="bg-white min-h-screen">
      <HomepageHero />
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 xl:px-12 mt-24 pb-24 space-y-24">
        
        {/* Kiralık Bölümü */}
        <section>
             <div className="flex flex-col md:flex-row items-baseline justify-between mb-10 border-b border-gray-200 pb-6">
                <h2 className="text-3xl font-light tracking-tight text-gray-900">Kiralık Portföy</h2>
                <span className="text-sm uppercase tracking-widest text-gray-400 mt-2 md:mt-0">Sizin İçin Seçtiklerimiz</span>
             </div>
             <HomepageRentalList properties={selectedProperties} />
        </section>

        {/* Satılık Bölümü */}
        <section>
             <div className="flex flex-col md:flex-row items-baseline justify-between mb-10 border-b border-gray-200 pb-6">
                <h2 className="text-3xl font-light tracking-tight text-gray-900">Satılık Portföy</h2>
                <span className="text-sm uppercase tracking-widest text-gray-400 mt-2 md:mt-0">Yatırımlık Fırsatlar</span>
             </div>
             <HomepageForSaleList properties={selectedProperties} />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <HomepageCustomerBanner />
            <HomepageAgentBanner />
        </div>

        <section>
            <div className="flex flex-col md:flex-row items-baseline justify-between mb-10 border-b border-gray-200 pb-6">
                <h2 className="text-3xl font-light tracking-tight text-gray-900">Danışmanlarımız</h2>
                <span className="text-sm uppercase tracking-widest text-gray-400 mt-2 md:mt-0">Uzman Kadromuz</span>
             </div>
             <div className="-mx-6 md:-mx-12 px-6 md:px-12"> {/* Allow slider to overflow visually if needed but easier to just contain it */}
                 <HomepageAgentSlider agents={agents} />
             </div>
        </section>

      </div>
    </div>
  );
}

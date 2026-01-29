import dynamic from "next/dynamic";
import { Metadata } from "next";
import prisma from "@/lib/prisma";
import Hero from "./Hero";

export const metadata: Metadata = {
  title:
    "Investrong CRM Gayrimenkul, Real Estate - Gayrimenkul Danışmanı Başvuru Formu",
  description:
    "Investrong CRM Gayrimenkul, Real Estate - Gayrimenkul Danışmanı Başvuru Formu",
};

const ProspectAgentForm = dynamic(
  () => import("../components/forms/ProspectAgentForm"),
  {
    loading: () => <div>Loading...</div>,
    ssr: false,
  }
);

const GoogleReCaptchaWrapper = dynamic(
  () => import("../components/GoogleReCaptchaWrapper"),
  {
    loading: () => <div>Loading...</div>,
    ssr: false,
  }
);

const ProspectAgentPage = async () => {
  let countries = [];
  let cities: Record<string, string[]> = {};

  try {
    countries = await prisma.country.findMany();
    for (const country of countries) {
      const citiesData = await prisma.city.findMany({
        where: {
          country_id: country.country_id,
        },
      });
      const cityNames = citiesData.map((city) => city.city_name);
      cities[country.country_id] = cityNames;
    }
  } catch (error) {
    console.error("Prisma error during build/render:", error);
  }

  return (
    <div className="bg-white min-h-screen pb-24">
      <Hero />
      
      <div className="max-w-[1000px] mx-auto px-6 md:px-12 mt-24">
         <section>
             <div className="flex flex-col md:flex-row items-baseline justify-between mb-12 border-b border-gray-200 pb-6">
                <h2 className="text-3xl font-light tracking-tight text-gray-900">Başvuru Formu</h2>
                <span className="text-sm uppercase tracking-widest text-gray-400 mt-2 md:mt-0">Bize Katılın</span>
             </div>
             
             <div className="bg-white">
                <GoogleReCaptchaWrapper>
                    <ProspectAgentForm cities={cities} />
                </GoogleReCaptchaWrapper>
             </div>
         </section>
      </div>
    </div>
  );
};

export default ProspectAgentPage;

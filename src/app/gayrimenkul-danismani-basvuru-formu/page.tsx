import dynamic from "next/dynamic";
import { Metadata } from "next";
import prisma from "@/lib/prisma";

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

  //console.log(districts);

  return (
    <div>
      <GoogleReCaptchaWrapper>
        <ProspectAgentForm cities={cities} />
      </GoogleReCaptchaWrapper>
    </div>
  );
};

export default ProspectAgentPage;

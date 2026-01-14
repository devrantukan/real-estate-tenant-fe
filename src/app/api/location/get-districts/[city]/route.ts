import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/lib/prisma";
import slugify from "slugify";

export async function GET(
  request: NextRequest,
  { params }: { params: { city: string } }
) {
  // console.log("params", params.city);

  // Fetch all districts for the city regardless of property status
  const districts = await prisma.district.findMany({
    where: {
      city: {
        slug: params.city,
      },
    },
    include: {
      city: true,
    },
  });

  function capitalize(s: string): string {
    return String(s[0]).toLocaleUpperCase("tr") + String(s).slice(1);
  }

  const data = districts.map((districtData) => ({
    district_id: districtData.district_id,
    label: capitalize(districtData.district_name.toLocaleLowerCase("tr")),
    value: slugify(districtData.district_name, {
      lower: true,
    }),
    city_name: capitalize(districtData.city_name.toLocaleLowerCase("tr")),
    city_slug: slugify(districtData.city_name, {
      lower: true,
    }),
  }));

  // console.log(data);

  return NextResponse.json(data);
}

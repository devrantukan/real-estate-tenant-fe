import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/lib/prisma";
import slugify from "slugify";

export async function GET(request: NextRequest, response: NextResponse) {
  // Fetch all cities regardless of property status
  const cities = await prisma.city.findMany({
    include: {
      country: true,
    },
  });

  function capitalize(s: string): string {
    return String(s[0]).toLocaleUpperCase("tr") + String(s).slice(1);
  }

  const data = cities.map((cityData) => ({
    city_id: cityData.city_id,
    label: capitalize(cityData.city_name.toLocaleLowerCase("tr-TR")),
    value: slugify(cityData.city_name, {
      lower: true,
    }),
    country_name: capitalize(cityData.country_name.toLocaleLowerCase("tr-TR")),
    country_slug: slugify(cityData.country_name, {
      lower: true,
    }),
  }));

  return NextResponse.json(data);
}

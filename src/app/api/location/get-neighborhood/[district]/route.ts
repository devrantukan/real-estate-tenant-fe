import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/lib/prisma";
import slugify from "slugify";

export async function GET(
  request: NextRequest,
  { params }: { params: { district: string } },
  response: NextResponse
) {
  // Fetch all neighborhoods for the district regardless of property status
  const neighborhoods = await prisma.neighborhood.findMany({
    where: {
      district: {
        slug: params.district,
      },
    },
    include: {
      district: true,
    },
  });

  function capitalize(s: string): string {
    return String(s[0]).toLocaleUpperCase("tr") + String(s).slice(1);
  }

  const data = neighborhoods.map((neighborhoodData) => ({
    neighborhood_id: neighborhoodData.neighborhood_id,
    label: capitalize(
      neighborhoodData.neighborhood_name.toLocaleLowerCase("tr")
    ),
    value: slugify(neighborhoodData.neighborhood_name, {
      lower: true,
    }),
    district_name: capitalize(
      neighborhoodData.district_name.toLocaleLowerCase("tr")
    ),
    district_slug: slugify(neighborhoodData.district_name, {
      lower: true,
    }),
  }));

  return NextResponse.json(data);
}

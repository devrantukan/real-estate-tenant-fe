import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest, response: NextResponse) {
  // Fetch all countries regardless of property status to ensure the dropdown is populated
  const countries = await prisma.country.findMany({
    select: {
      country_id: true,
      country_name: true,
      slug: true,
    },
  });

  const data = countries.map((c) => ({
    country_id: c.country_id,
    country_name: c.country_name,
    country_slug: c.slug,
  }));

  return NextResponse.json(data);
}

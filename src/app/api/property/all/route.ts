import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const properties = await prisma.property.findMany({
      select: {
        id: true,
        images: {
          select: {
            id: true,
            url: true,
            propertyId: true,
            order: true,
          },
          orderBy: {
            order: "asc",
          },
        },
      },
      where: {
        publishingStatus: { in: ["PUBLISHED", "PENDING"] },
        organizationId: Number(process.env.TenantOrganisationID),
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ data: properties });
  } catch (error) {
    console.error("Error fetching all properties:", error);
    return NextResponse.json({ data: [] }, { status: 500 });
  }
}

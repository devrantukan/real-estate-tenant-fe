import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const offices = await prisma.office.findMany({
      select: {
        id: true,
      },
      where: {
        organizationId: Number(process.env.TenantOrganisationID),
      },
    });

    return NextResponse.json({ data: offices });
  } catch (error) {
    console.error("Error fetching all offices:", error);
    return NextResponse.json({ data: [] }, { status: 500 });
  }
}

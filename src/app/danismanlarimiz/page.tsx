import { ImagesSlider } from "@/app/components/ImageSlider";
import PageTitle from "@/app/components/pageTitle";
import prisma from "@/lib/prisma";
import { Card } from "@nextui-org/react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import OfficeWorkerCard from "../components/OfficeWorkerCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investrong CRM Gayrimenkul, Real Estate - Danışmanlarımız",
  description: "Investrong CRM Gayrimenkul, Real Estate - Danışmanlarımız",
};

const OfficeWorkersPage = async () => {
  let officeWorkers = [];
  try {
    officeWorkers = await prisma.officeWorker.findMany({
      where: {
        roleId: { in: [7, 6, 3, 2] },
      },
      include: {
        properties: true,
        office: true,
        role: true,
      },
      orderBy: {
        name: "asc",
      },
    });
  } catch (error) {
    console.error("Prisma error during build/render:", error);
    // Return empty list instead of failing build
    return <div>Danışmanlar şu anda yüklenemiyor.</div>;
  }

  if (!officeWorkers || officeWorkers.length === 0) return <div>Danışman bulunamadı.</div>;
  return (
    <div>
      <div className="h-[480px] bg-slate-300 lg:m-6 p-4 lg:rounded-xl mb-12 relative">
        <Image
          alt="Investrong CRM Gayrimenkul "
          src="https://inegzzkuttzsznxfbsmp.supabase.co/storage/v1/object/public/siteImages/ofisimiz.jpg?t=2024-12-26T00%3A15%3A38.890Z"
          className="object-cover opacity-100 rounded-xl"
          layout="fill"
        />
        <div className="absolute z-30">
          <h1 className="mt-24 ml-12 text-3xl font-extralight">
            {officeWorkers.length} DANIŞMAN İÇİNDEN <br />
            <span className="font-bold text-xl">SİZE EN UYGUNU BULUN</span>
          </h1>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-x-6 mx-6 gap-y-6 mb-6  place-items-center">
        {officeWorkers
          .filter(
            (worker: { slug: string; role: { slug: string } }) =>
              worker.role.slug === "broker-manager"
          )
          .map((worker, index: number) => (
            <OfficeWorkerCard officeWorker={worker} key={index} index={index} />
          ))}
        {officeWorkers
          .filter(
            (worker: { slug: string; role: { slug: string } }) =>
              worker.role.slug === "ofisler-muduru"
          )
          .map((worker, index: number) => (
            <OfficeWorkerCard officeWorker={worker} key={index} index={index} />
          ))}
      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-x-6 mx-6 gap-y-6 mb-6  place-items-center">
        {officeWorkers
          .filter(
            (worker: { slug: string; role: { slug: string } }) =>
              worker.role.slug === "takim-lideri-gayrimenkul-danismani"
          )
          .map((worker, index: number) => (
            <OfficeWorkerCard officeWorker={worker} key={index} index={index} />
          ))}
      </div>

      <div className="grid lg:grid-cols-4  md:grid-cols-2  grid-cols-1 gap-x-6 mx-6 gap-y-6 mb-6 place-items-center">
        {officeWorkers
          .filter(
            (worker: { slug: string; role: { slug: string } }) =>
              worker.role.slug === "gayrimenkul-danismani"
          )
          .map((worker, index: number) => (
            <OfficeWorkerCard officeWorker={worker} key={index} index={index} />
          ))}
      </div>
    </div>
  );
};
export default OfficeWorkersPage;

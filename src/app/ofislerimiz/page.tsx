import prisma from "@/lib/prisma";
import { Card } from "@nextui-org/react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import OfficeCard from "../components/OfficeCard";
import { Metadata } from "next";
import Hero from "./Hero";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Investrong CRM Gayrimenkul, Real Estate - Ofislerimiz",
  description: "Investrong CRM Gayrimenkul, Real Estate - Ofislerimiz",
};

const OfficesPage = async () => {
  const offices = await prisma.office.findMany({
    include: {
      workers: true,
    },
  });
  if (!offices) return notFound();
  
  return (
    <div className="bg-white min-h-screen pb-24">
      <Hero />
      
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mt-24">
         <section>
             <div className="flex flex-col md:flex-row items-baseline justify-between mb-16 border-b border-gray-200 pb-6">
                <h2 className="text-3xl font-light tracking-tight text-gray-900">Ofislerimiz</h2>
                <span className="text-sm uppercase tracking-widest text-gray-400 mt-2 md:mt-0">Bizi Ziyaret Edin</span>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                {offices.map((office, index) => (
                  <OfficeCard key={index} office={office} officeId={office.id} />
                ))}
             </div>
         </section>
      </div>
    </div>
  );
};
export default OfficesPage;

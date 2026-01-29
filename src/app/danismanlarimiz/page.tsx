import Hero from "./Hero";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import OfficeWorkerCard from "../components/OfficeWorkerCard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Investrong CRM Gayrimenkul, Real Estate - Danışmanlarımız",
  description: "Investrong CRM Gayrimenkul, Real Estate - Danışmanlarımız",
};

const OfficeWorkersPage = async () => {
  let officeWorkers = [];
  try {
    officeWorkers = await prisma.officeWorker.findMany({
      where: {
        roleId: { in: [14, 7, 6, 3, 2] },
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
    return <div className="p-12 text-center text-gray-500">Danışmanlar şu anda yüklenemiyor.</div>;
  }

  if (!officeWorkers || officeWorkers.length === 0) return <div className="p-12 text-center text-gray-500">Danışman bulunamadı.</div>;
  
  // Categorize workers
  const management = officeWorkers.filter(w => ["broker-manager", "ofisler-muduru"].includes(w.role?.slug));
  const leaders = officeWorkers.filter(w => w.role?.slug === "takim-lideri-gayrimenkul-danismani");
  const agents = officeWorkers.filter(w => ["gayrimenkul-danismani", "agent"].includes(w.role?.slug));

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Hero Section */}
      <Hero />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mt-24 space-y-32">
        {/* Management Section */}
        {management.length > 0 && (
          <section>
              <div className="flex flex-col md:flex-row items-baseline justify-between mb-16 border-b border-gray-200 pb-6">
                <h2 className="text-3xl font-light tracking-tight text-gray-900">Yönetim Kurulu</h2>
                <span className="text-sm uppercase tracking-widest text-gray-400 mt-2 md:mt-0">Liderlik</span>
              </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 transition-all">
                {management.map((worker, index) => (
                  <OfficeWorkerCard officeWorker={worker} key={worker.id} index={index} />
                ))}
             </div>
          </section>
        )}

        {/* Team Leaders Section */}
        {leaders.length > 0 && (
          <section>
              <div className="flex flex-col md:flex-row items-baseline justify-between mb-16 border-b border-gray-200 pb-6">
                <h2 className="text-3xl font-light tracking-tight text-gray-900">Takım Liderleri</h2>
                <span className="text-sm uppercase tracking-widest text-gray-400 mt-2 md:mt-0">Kıdemli Danışmanlar</span>
              </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                {leaders.map((worker, index) => (
                  <OfficeWorkerCard officeWorker={worker} key={worker.id} index={index} />
                ))}
             </div>
          </section>
        )}

        {/* Agents Section */}
        {agents.length > 0 && (
          <section>
              <div className="flex flex-col md:flex-row items-baseline justify-between mb-16 border-b border-gray-200 pb-6">
                <h2 className="text-3xl font-light tracking-tight text-gray-900">Gayrimenkul Danışmanları</h2>
                <span className="text-sm uppercase tracking-widest text-gray-400 mt-2 md:mt-0">Ekibimiz</span>
              </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                {agents.map((worker, index) => (
                  <OfficeWorkerCard officeWorker={worker} key={worker.id} index={index} />
                ))}
             </div>
          </section>
        )}
      </div>
    </div>
  );
};
export default OfficeWorkersPage;

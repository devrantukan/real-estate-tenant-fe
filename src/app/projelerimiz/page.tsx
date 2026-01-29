import prisma from "@/lib/prisma";
import ProjectCard from "@/app/components/ProjectCard";
import { Metadata } from "next";
import Hero from "./Hero";

export const metadata: Metadata = {
    title: "Projelerimiz | Investrong CRM",
    description: "En yeni ve prestijli gayrimenkul projelerimizi keşfedin. Yatırımlık ve oturumluk daireler, villalar ve ticari alanlar.",
    keywords: "gayrimenkul projeleri, yeni konut projeleri, satılık daire projeleri, investrong crm",
    openGraph: {
        title: "Projelerimiz | Investrong CRM",
        description: "En yeni ve prestijli gayrimenkul projelerimizi keşfedin.",
        siteName: "Investrong CRM",
        type: "website",
        url: "/projelerimiz",
    },
};

export default async function ProjectsPage() {
    const projects = await prisma.project.findMany({
        where: {
            publishingStatus: "PUBLISHED",
        },
        include: {
            images: true,
            location: true,
            unitSizes: true,
            socialFeatures: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <div className="bg-white min-h-screen pb-24">
            <Hero />
            
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 mt-24">
                <section>
                    <div className="flex flex-col md:flex-row items-baseline justify-between mb-16 border-b border-gray-200 pb-6">
                        <h2 className="text-3xl font-light tracking-tight text-gray-900">Prestijli Projeler</h2>
                        <span className="text-sm uppercase tracking-widest text-gray-400 mt-2 md:mt-0">Ayrıcalıklı Yaşam</span>
                    </div>

                    {projects.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16">
                            {projects.map((project) => (
                                <ProjectCard key={project.id} project={project as any} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-gray-50 rounded-lg">
                            <p className="text-xl text-gray-500 font-light">
                                Şu anda yayınlanmış proje bulunmamaktadır.
                            </p>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}

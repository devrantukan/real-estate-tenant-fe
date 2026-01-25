import prisma from "@/lib/prisma";
import ProjectCard from "@/app/components/ProjectCard";
import { Metadata } from "next";

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
        <div className="container mx-auto px-4 py-8 min-h-screen">
            <h1 className="text-3xl font-bold text-blue-950 mb-8 border-b pb-4">
                Projelerimiz
            </h1>

            {projects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project as any} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-gray-50 rounded-lg">
                    <p className="text-xl text-gray-500">
                        Şu anda yayınlanmış proje bulunmamaktadır.
                    </p>
                </div>
            )}
        </div>
    );
}

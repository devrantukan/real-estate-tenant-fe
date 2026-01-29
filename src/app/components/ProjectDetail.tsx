"use client";

import { Project, OfficeWorker } from "@prisma/client";
import {
  MapPin,
  Building2,
  Users,
  Image as ImageIcon,
  X,
} from "lucide-react";
import ProjectGallery from "./ProjectGallery";
import ProjectMap from "./ProjectMap";
import { User, EnvelopeSimple, Phone } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ProjectDetailProps {
  project: Project & {
    images: { url: string }[];
    location: {
      country: string;
      city: string;
      district: string;
      neighborhood: string;
      latitude: number | null;
      longitude: number | null;
    } | null;
    unitSizes: {
      value: string;
    }[];
    socialFeatures: {
      value: string;
    }[];
    deedInfo: string;
    landArea: string;
    nOfUnits: string;
    catalogUrl: string | null;
  };
  agent?: OfficeWorker & {
    office: {
      id: number;
      name: string;
      slug: string;
    };
    role?: {
      id: number;
      slug: string;
    };
  };
}

import Hero from "@/app/projelerimiz/[slug]/Hero";

export default function ProjectDetail({ project, agent }: ProjectDetailProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const locationString = [
    project.location?.neighborhood,
    project.location?.district,
    project.location?.city,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="bg-white pb-24">
      {/* Image Overlay */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-8 right-8 text-white hover:text-gray-300 transition-colors z-[101]"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
          >
            <X className="w-8 h-8 font-light" />
          </button>
          <div className="relative w-full h-full max-w-6xl max-h-[85vh]">
            <Image
              src={selectedImage}
              alt={`${project.name} - Görsel`}
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}

      {/* New Immersive Hero */}
      <Hero 
        name={project.name} 
        image={project.images[0]?.url || "/placeholder-project.jpg"} 
        location={locationString}
        catalogUrl={project.catalogUrl}
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-16">
            <section>
              <h2 className="text-sm uppercase tracking-[0.3em] text-gray-400 mb-6 font-light">
                Proje Hakkında
              </h2>
              <div
                className="text-lg text-gray-600 leading-relaxed font-light"
                dangerouslySetInnerHTML={{ __html: project.description }}
              />
            </section>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 gap-12">
              {/* Unit Sizes */}
              {project.unitSizes && project.unitSizes.length > 0 && (
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <Building2 className="w-5 h-5 text-gray-400 font-light" />
                    <h3 className="text-sm uppercase tracking-[0.2em] text-gray-900 font-medium">
                      Daire Tipleri
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.unitSizes.map((size, index) => (
                      <span
                        key={index}
                        className="bg-gray-50 border border-gray-100 text-gray-600 px-4 py-2 rounded-full text-xs tracking-wider"
                      >
                        {size.value}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {/* Social Features */}
              {project.socialFeatures && project.socialFeatures.length > 0 && (
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <Users className="w-5 h-5 text-gray-400 font-light" />
                    <h3 className="text-sm uppercase tracking-[0.2em] text-gray-900 font-medium">
                      Sosyal Alanlar
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.socialFeatures.map((feature, index) => (
                      <span
                        key={index}
                        className="bg-gray-50 border border-gray-100 text-gray-600 px-4 py-2 rounded-full text-xs tracking-wider"
                      >
                        {feature.value}
                      </span>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Detailed Image Grid */}
            {project.images.length > 1 && (
              <section className="pt-8">
                <div className="flex items-center gap-3 mb-8">
                  <ImageIcon className="w-5 h-5 text-gray-400 font-light" />
                  <h3 className="text-sm uppercase tracking-[0.2em] text-gray-900 font-medium">
                    Galeri
                  </h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {project.images.slice(1).map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-square overflow-hidden cursor-pointer group rounded-sm"
                      onClick={() => setSelectedImage(image.url)}
                    >
                      <Image
                        src={image.url}
                        alt={`${project.name} - Galeri ${index + 2}`}
                        fill
                        className="object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Map Section */}
            {project.location &&
              project.location.latitude &&
              project.location.longitude && (
                <section className="pt-8">
                  <div className="flex items-center gap-3 mb-8">
                    <MapPin className="w-5 h-5 text-gray-400 font-light" />
                    <h3 className="text-sm uppercase tracking-[0.2em] text-gray-900 font-medium">
                      Konum
                    </h3>
                  </div>
                  <div className="h-[500px] w-full filter grayscale-[30%] hover:grayscale-0 transition-all duration-700 rounded-sm overflow-hidden border border-gray-100">
                    <ProjectMap
                      lat={project.location.latitude}
                      lng={project.location.longitude}
                    />
                  </div>
                </section>
              )}
          </div>

          {/* Sidebar - Agent Info & Sticky Meta */}
          <div className="lg:col-span-4 space-y-8">
            <div className="sticky top-32 space-y-8">
              {agent && (
                <div className="p-8 border border-gray-100 rounded-sm bg-gray-50/50 backdrop-blur-sm">
                  <h3 className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-8 font-light">
                    Sorumlu Danışman
                  </h3>
                  <div className="flex items-center gap-6 mb-8">
                    <div className="relative w-20 h-20 overflow-hidden rounded-full border border-gray-200 shadow-sm">
                      {agent.avatarUrl ? (
                        <Image
                          src={agent.avatarUrl}
                          alt={agent.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          <User size={32} weight="light" className="text-gray-300" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="text-xl font-light text-gray-900">
                        <Link
                          href={`/ofis/${agent.officeId}/${agent.office.slug}/${agent.role?.slug}/${agent.id}/${agent.slug}`}
                          className="hover:text-primary transition-colors"
                        >
                          {agent.name} {agent.surname}
                        </Link>
                      </h4>
                      <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">
                        Gayrimenkul Danışmanı
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <a
                      href={`tel:${agent.phone}`}
                      className="flex items-center gap-4 text-gray-600 hover:text-primary transition-colors py-3 border-b border-gray-100 group"
                    >
                      <Phone size={20} weight="light" className="group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-light">{agent.phone}</span>
                    </a>
                    <a
                      href={`mailto:${agent.email}`}
                      className="flex items-center gap-4 text-gray-600 hover:text-primary transition-colors py-3 group"
                    >
                      <EnvelopeSimple size={20} weight="light" className="group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-light truncate">{agent.email}</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Quick Info Box */}
              <div className="p-8 border border-gray-100 rounded-sm space-y-6">
                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span className="text-xs uppercase tracking-widest text-gray-400">Durum</span>
                  <span className="text-sm font-medium text-primary">Satışta</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span className="text-xs uppercase tracking-widest text-gray-400">Arazi Alanı</span>
                  <span className="text-sm font-medium">{project.landArea || "-"}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span className="text-xs uppercase tracking-widest text-gray-400">Ünite Sayısı</span>
                  <span className="text-sm font-medium">{project.nOfUnits || "-"}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-xs uppercase tracking-widest text-gray-400">Tapu Durumu</span>
                  <span className="text-sm font-medium">{project.deedInfo || "-"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

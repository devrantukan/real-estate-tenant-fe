"use client";

import { Project } from "@prisma/client";
import {
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

interface ProjectCardProps {
  project: Project & {
    images: { url: string }[];
    location: {
      country: string;
      city: string;
      district: string;
      neighborhood: string;
    };
    unitSizes: {
      value: string;
    }[];
    socialFeatures: {
      value: string;
    }[];
    startDate: Date;
    endDate: Date;
    catalogUrl?: string;
  };
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextImage = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentImageIndex((prev) =>
      prev === project.images.length - 1 ? 0 : prev + 1
    );
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning, project.images.length]);

  const prevImage = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentImageIndex((prev) =>
      prev === 0 ? project.images.length - 1 : prev - 1
    );
    setTimeout(() => setIsTransitioning(false), 500);
  };

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    if (project.images.length <= 1) return;

    const timer = setInterval(() => {
      nextImage();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentImageIndex, project.images.length, nextImage]);

  return (
    <div className="group relative w-full mb-12">
      <Link href={`/projelerimiz/${project.slug}/`} className="block">
        {/* Image Section */}
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-100 mb-6 group-hover:shadow-xl transition-all duration-500">
           {project.images.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentImageIndex
                  ? "opacity-100 z-10"
                  : "opacity-0 z-0"
                  }`}
              >
                <Image
                  src={image.url}
                  alt={`${project.name} - Image ${index + 1}`}
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-[2000ms]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index === 0}
                />
              </div>
            ))}
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500 z-20" />

            {/* Navigation Arrows (Show on Hover) */}
            {project.images.length > 1 && (
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white text-white hover:text-black p-2 rounded-full transition-all duration-300 z-30 border border-white/20"
                  disabled={isTransitioning}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white text-white hover:text-black p-2 rounded-full transition-all duration-300 z-30 border border-white/20"
                  disabled={isTransitioning}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
            
            {/* Status Badge */}
             <div className="absolute top-6 left-6 z-30">
                <span className="px-3 py-1 bg-white/90 backdrop-blur text-xs font-medium tracking-widest uppercase text-gray-900">
                  {new Date() > new Date(project.endDate) ? 'Completed' : 'Under Construction'}
                </span>
             </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
           <div className="space-y-2">
              <h2 className="text-2xl font-light text-gray-900 group-hover:text-gray-600 transition-colors duration-300">
                {project.name}
              </h2>
              <div className="flex items-center gap-2 text-gray-500 font-light text-sm">
                <MapPin className="w-4 h-4" />
                <span>
                   {project.location?.city}, {project.location?.district}
                </span>
              </div>
           </div>

           <div className="flex flex-wrap gap-2 md:justify-end max-w-md">
              {project.unitSizes && project.unitSizes.slice(0, 3).map((size, index) => (
                 <span key={index} className="text-xs border border-gray-200 px-2 py-1 text-gray-400">
                   {size.value}
                 </span>
              ))}
              {project.unitSizes.length > 3 && (
                 <span className="text-xs border border-gray-200 px-2 py-1 text-gray-400">+More</span>
              )}
           </div>
        </div>
      </Link>
    </div>
  );
};

export default ProjectCard;

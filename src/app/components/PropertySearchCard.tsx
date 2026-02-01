"use client";

import { Card } from "@nextui-org/react";
import Image from "next/image";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { Avatar } from "@nextui-org/react";
import { useEffect, useState, useRef } from "react";
import PriceDisplay from "./PriceDisplay";

const PropertySearchCard = ({ property, showAvatar, index }: any) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (cardRef.current) {
        const width = cardRef.current.getBoundingClientRect().width;
        setCardWidth(width);
      }
    };

    // Initial measurement
    updateWidth();

    // Setup resize observer
    const observer = new ResizeObserver(updateWidth);
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    // Cleanup
    return () => observer.disconnect();
  }, []);

  // Premium card styling
  const cardClassName = "group w-full flex flex-col lg:flex-row bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-slate-100 ease-in-out h-auto lg:h-[200px]";
  
  const imgContainerStyle = "relative w-full lg:w-[320px] h-[220px] lg:h-full shrink-0 overflow-hidden";
  const imgStyle = "object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500";

  const displayImage = property.images?.[0]?.url || "/images/placeholder.png";
  console.log("PropertySearchCard rendering:", { id: property.id, displayImage });

  return (
    <Card
      ref={cardRef}
      className={cardClassName}
      shadow="none"
    >
      <Link
        className="flex lg:flex-row flex-col w-full h-full relative"
        href={`/portfoy/${property.id}`}
      >
        {/* Image Section */}
        <div className={imgContainerStyle}>
          <Image
            src={displayImage}
            priority={index !== undefined && index < 2}
            className={imgStyle}
            alt={property.title || "Property Image"}
            width={400}
            height={300}
            unoptimized={displayImage === "/images/placeholder.png"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60"></div>
          
          {property.discountedPrice > 0 && (
            <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
              İndirimli
            </span>
          )}
          
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
            {property.contract === 'satilik' ? 'Satılık' : 'Kiralık'}
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col justify-between p-5 w-full bg-white">
          <div>
            <div className="flex justify-between items-start mb-2">
              <span className="text-primary-600 text-xs font-bold tracking-widest uppercase">
                {property.type}
              </span>
              <span className="text-slate-400 text-xs font-medium flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Bugün
              </span>
            </div>

            <h3 className="text-slate-800 text-lg lg:text-xl font-serif font-bold leading-tight mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
              {property.title}
            </h3>

            <p className="text-slate-500 text-sm font-medium mb-4 flex items-center gap-1">
              <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {property.city}, {property.district} &bull; {property.neighborhood}
            </p>

            {/* Features Info */}
            <div className="flex items-center gap-4 text-slate-600 text-sm border-t border-slate-100 pt-3 mt-auto">
              {property.bedrooms !== undefined && (
                <div className="flex items-center gap-1">
                  <span className="font-bold text-slate-800">{property.bedrooms}</span>
                  <span className="text-slate-400 text-xs uppercase">Oda</span>
                </div>
              )}
              {property.bathrooms !== undefined && (
                <div className="flex items-center gap-1 pl-4 border-l border-slate-100">
                  <span className="font-bold text-slate-800">{property.bathrooms}</span>
                  <span className="text-slate-400 text-xs uppercase">Banyo</span>
                </div>
              )}
               {property.size !== undefined && (
                <div className="flex items-center gap-1 pl-4 border-l border-slate-100">
                  <span className="font-bold text-slate-800">{property.size}</span>
                  <span className="text-slate-400 text-xs uppercase">m²</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-end justify-between mt-4 lg:mt-0">
             {/* Agent Mini Profile */}
            {showAvatar && (
               <div className="flex items-center gap-2 group/agent">
                  <Avatar
                    src={property.agentAvatarUrl}
                    name={`${property.agentName} ${property.agentSurname}`}
                    className="w-8 h-8 text-xs transition-opacity opacity-90 group-hover/agent:opacity-100"
                  />
                  <div className="flex flex-col">
                     <span className="text-xs font-bold text-slate-700 leading-none">{property.agentName}</span>
                     <span className="text-[10px] text-slate-400 leading-none mt-0.5">{property.agentOffice?.name}</span>
                  </div>
               </div>
            )}

            <div className="text-right">
              {property.discountedPrice > 0 ? (
                <div className="flex flex-col items-end">
                  <span className="text-sm line-through text-slate-400">
                    <PriceDisplay price={property.price} />
                  </span>
                  <span className="text-2xl font-bold text-primary-600">
                    <PriceDisplay price={property.discountedPrice} />
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-bold text-primary-600">
                  <PriceDisplay price={property.price} />
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
};

export default PropertySearchCard;

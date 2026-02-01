import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Envelope, PhoneCall } from "@phosphor-icons/react/dist/ssr";

interface Props {
  officeWorker: any;
  index: number;
}

const OfficeWorkerCard = ({ officeWorker, index }: Props) => {
  return (
    <div className="group relative w-full max-w-sm mx-auto">
      <Link
        href={`/ofis/${officeWorker.office.id}/${officeWorker.office.slug}/${officeWorker.role.slug}/${officeWorker.id}/${officeWorker.slug}`}
        className="block"
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
          <Image
            src={officeWorker.avatarUrl ? officeWorker.avatarUrl : "/profile.png"}
            alt={`${officeWorker.name} ${officeWorker.surname}`}
            fill
            className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized={!officeWorker.avatarUrl}
          />
          {/* Subtle overlay on hover */}
          <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
        </div>
        
        <div className="text-center">
          <h2 className="text-xl font-medium text-gray-900 mb-1 tracking-tight">
            {officeWorker.name} {officeWorker.surname}
          </h2>
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-3 font-medium">
            {officeWorker.role?.title}
          </p>
          
          <div className="flex justify-center gap-4 text-gray-400 opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            <div className="flex items-center gap-1 hover:text-gray-900 transition-colors">
              <Envelope size={18} />
            </div>
            <div className="flex items-center gap-1 hover:text-gray-900 transition-colors">
              <PhoneCall size={18} />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default OfficeWorkerCard;

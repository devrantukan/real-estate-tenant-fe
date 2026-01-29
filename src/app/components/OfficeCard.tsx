import Link from "next/link";
import React from "react";
import Image from "next/image";
import { ArrowRight, Envelope, PhoneCall } from "@phosphor-icons/react/dist/ssr";
import OfficeWorkerAvatars from "./OfficeWorkerAvatars";

interface Props {
  office: any;
  officeId: number;
}

const OfficeCard = ({ office, officeId }: Props) => {
  return (
    <div className="group relative w-full mx-auto">
      <Link href={`/ofis/${office.id}/${office.slug}`} className="block h-full">
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 mb-6">
          <Image
            src={office.avatarUrl || "https://inegzzkuttzsznxfbsmp.supabase.co/storage/v1/object/public/siteImages/ofisimiz.jpg"}
            alt={office.name || "Investrong CRM Ofis"}
            fill
            className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
          
          {/* Action Overlay */}
          <div className="absolute bottom-6 right-6 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
             <div className="bg-white p-3 rounded-full shadow-lg text-gray-900">
                <ArrowRight size={20} />
             </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-start">
             <h2 className="text-xl font-medium text-gray-900 tracking-tight group-hover:text-gray-600 transition-colors">
               {office.name}
             </h2>
          </div>

          <div className="flex flex-col gap-1 text-sm text-gray-500 font-light">
             <span className="flex items-center gap-2">
               <Envelope size={16} />
               {office.email}
             </span>
             <span className="flex items-center gap-2">
               <PhoneCall size={16} />
               {office.phone}
             </span>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
             <span className="text-xs uppercase tracking-widest text-gray-400">Team</span>
             <OfficeWorkerAvatars members={office.workers} />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default OfficeCard;

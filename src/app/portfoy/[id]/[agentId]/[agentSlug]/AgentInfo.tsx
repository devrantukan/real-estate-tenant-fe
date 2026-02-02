import React from "react";
import Image from "next/image";
import Link from "next/link";
import { User, EnvelopeSimple, Phone, ArrowRight, Briefcase } from "@phosphor-icons/react";

interface AgentInfoProps {
  agent: {
    id: number;
    name: string;
    surname: string;
    email: string;
    phone: string;
    avatarUrl?: string;
    office: {
      id: number;
      slug: string;
    };
    role: {
      slug: string;
      name?: string;
    };
    slug: string;
  };
}

const AgentInfo = ({ agent }: AgentInfoProps) => {
  const roleName = agent.role.name || agent.role.slug.charAt(0).toUpperCase() + agent.role.slug.slice(1);
  
  return (
    <div className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-2xl p-6 shadow-lg border border-primary-100 hover:shadow-xl transition-shadow duration-300">
      <div className="flex flex-col items-center text-center">
        {/* Avatar */}
        <div className="mb-4">
          {agent.avatarUrl ? (
            <Image
              src={agent.avatarUrl}
              alt={`${agent.name} ${agent.surname}`}
              width={96}
              height={96}
              className="rounded-full object-cover border-4 border-white shadow-md"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-200 to-primary-300 flex items-center justify-center border-4 border-white shadow-md">
              <User size={48} weight="duotone" className="text-primary-700" />
            </div>
          )}
        </div>

        {/* Name and Role */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            {agent.name} {agent.surname}
          </h3>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-100 rounded-full">
            <Briefcase size={16} weight="duotone" className="text-primary-700" />
            <span className="text-sm font-medium text-primary-700">{roleName}</span>
          </div>
        </div>

        {/* Contact Buttons */}
        <div className="w-full space-y-2 mb-4">
          <a
            href={`mailto:${agent.email}`}
            className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-white rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all group"
          >
            <EnvelopeSimple size={20} weight="duotone" className="text-primary-600 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-gray-700 group-hover:text-primary-700 truncate">
              {agent.email}
            </span>
          </a>

          <a
            href={`tel:${agent.phone}`}
            className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-white rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all group"
          >
            <Phone size={20} weight="duotone" className="text-primary-600 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-gray-700 group-hover:text-primary-700">
              {agent.phone}
            </span>
          </a>
        </div>

        {/* View Profile Link */}
        <Link
          href={`/ofis/${agent.office.id}/${agent.office.slug}/${agent.role.slug}/${agent.id}/${agent.slug}`}
          className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-semibold hover:from-primary-700 hover:to-primary-800 shadow-md hover:shadow-lg transition-all group"
        >
          <span>Profili Görüntüle</span>
          <ArrowRight size={20} weight="bold" className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default AgentInfo;

"use client";

import Link from "next/link";
import React, { useMemo } from "react";

import Image from "next/image";
import { Button } from "@nextui-org/react";
import {
  EnvelopeSimple,
  Phone,
  MapPin,
  XLogo,
  FacebookLogo,
  LinkedinLogo,
  InstagramLogo,
  Globe,
  YoutubeLogo,
  Star,
  Buildings,
  ChatCircleDots,
  NavigationArrow,
} from "@phosphor-icons/react/dist/ssr";
import ReviewModalSidebar from "./ReviewModalSidebar";

interface Props {
  officeWorker: any;
}

const OfficeWorkerSidebar = ({ officeWorker }: Props) => {
  const imageAlt = useMemo(() => {
    return `${officeWorker.name} ${officeWorker.surname} - ${officeWorker.title || "Gayrimenkul Danışmanı"}`;
  }, [officeWorker.name, officeWorker.surname, officeWorker.title]);

  const handleMapsClick = () => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${officeWorker.office.latitude},${officeWorker.office.longitude}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const propertiesCount = officeWorker.properties?.length || 0;
  const reviewsCount = officeWorker.reviews?.length || 0;
  const avgRating = reviewsCount > 0 
    ? (officeWorker.reviews.reduce((sum: number, review: any) => sum + review.rating, 0) / reviewsCount).toFixed(1)
    : 0;

  const socialLinks = [
    { id: "x", icon: XLogo, url: officeWorker.xAccountId ? `https://x.com/${officeWorker.xAccountId}` : null, bg: "bg-black", name: "X" },
    { id: "facebook", icon: FacebookLogo, url: officeWorker.facebookAccountId ? `https://facebook.com/${officeWorker.facebookAccountId}` : null, bg: "bg-[#1877F2]", name: "Facebook" },
    { id: "instagram", icon: InstagramLogo, url: officeWorker.instagramAccountId ? `https://instagram.com/${officeWorker.instagramAccountId}` : null, bg: "bg-gradient-to-tr from-[#833AB4] via-[#FD1D1D] to-[#F77737]", name: "Instagram" },
    { id: "linkedin", icon: LinkedinLogo, url: officeWorker.linkedInAccountId ? `https://linkedin.com/in/${officeWorker.linkedInAccountId}` : null, bg: "bg-[#0A66C2]", name: "LinkedIn" },
    { id: "youtube", icon: YoutubeLogo, url: officeWorker.youtubeAccountId ? `https://youtube.com/${officeWorker.youtubeAccountId}` : null, bg: "bg-[#FF0000]", name: "YouTube" },
    { id: "web", icon: Globe, url: officeWorker.webUrl, bg: "bg-primary-600", name: "Website" },
  ].filter(link => link.url);

  return (
    <div className="p-4 flex flex-col gap-6 w-full lg:w-1/4 lg:sticky lg:top-24 lg:self-start">
      {/* Hero Card */}
      <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
        {/* Avatar */}
        <div className="relative mb-4">
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={officeWorker.avatarUrl}
              alt={imageAlt}
              width={640}
              height={800}
              priority
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Name & Title */}
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            {officeWorker.name} {officeWorker.surname}
          </h1>
          <p className="text-primary-600 font-semibold mb-3">{officeWorker.title}</p>
          <Link
            href={`/ofis/${officeWorker.office.id}/${officeWorker.office.slug}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-50 hover:bg-primary-50 border border-gray-200 hover:border-primary-200 rounded-full transition-colors"
          >
            <Buildings size={16} weight="duotone" className="text-primary-600" />
            <span className="text-sm font-medium text-gray-700">{officeWorker.office.name}</span>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-gray-50 rounded-xl p-3 text-center border border-gray-200">
            <div className="text-2xl font-bold text-primary-600">{propertiesCount}</div>
            <div className="text-xs text-gray-600">Portföy</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 text-center border border-gray-200">
            <div className="flex items-center justify-center gap-1">
              <span className="text-2xl font-bold text-amber-500">{avgRating}</span>
              <Star size={18} weight="fill" className="text-amber-500" />
            </div>
            <div className="text-xs text-gray-600">{reviewsCount} Yorum</div>
          </div>
        </div>

        {/* Social Links */}
        {socialLinks.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center pt-4 border-t border-gray-200">
            {socialLinks.map(({ id, icon: Icon, url, bg, name }) => (
              <Link
                key={id}
                href={url!}
                target="_blank"
                className={`${bg} text-white p-2.5 rounded-lg hover:scale-110 transition-transform shadow-sm hover:shadow-md`}
                title={name}
              >
                <Icon size={20} weight="fill" />
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Contact Card */}
      <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-900">
          <ChatCircleDots size={24} weight="duotone" className="text-primary-600" />
          İletişim Bilgileri
        </h3>
        <div className="space-y-3">
          <a
            href={`mailto:${officeWorker.email}`}
            className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-primary-50 border border-gray-200 hover:border-primary-200 transition-all group"
          >
            <div className="p-2 bg-primary-100 rounded-lg group-hover:scale-110 transition-transform">
              <EnvelopeSimple size={20} weight="duotone" className="text-primary-600" />
            </div>
            <span className="text-sm font-medium text-gray-700 truncate">{officeWorker.email}</span>
          </a>
          <a
            href={`tel:${officeWorker.phone}`}
            className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-primary-50 border border-gray-200 hover:border-primary-200 transition-all group"
          >
            <div className="p-2 bg-primary-100 rounded-lg group-hover:scale-110 transition-transform">
              <Phone size={20} weight="duotone" className="text-primary-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">{officeWorker.phone}</span>
          </a>
          {officeWorker.fax && (
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
              <div className="p-2 bg-gray-200 rounded-lg">
                <Phone size={20} weight="duotone" className="text-gray-600" />
              </div>
              <div>
                <div className="text-xs text-gray-500">Faks</div>
                <span className="text-sm font-medium text-gray-700">{officeWorker.fax}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Office Location Card */}
      <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-900">
          <MapPin size={24} weight="duotone" className="text-primary-600" />
          Ofis Konumu
        </h3>
        <div className="mb-4">
          <p className="font-semibold text-gray-800 mb-2 capitalize">
            {officeWorker.office.streetAddress}
          </p>
          <p className="text-sm text-gray-600 capitalize">
            {officeWorker.office.neighborhood.neighborhood_name.toLocaleLowerCase("tr")} / {officeWorker.office.district.district_name.toLocaleLowerCase("tr")} / {officeWorker.office.city.city_name.toLocaleLowerCase("tr")} / {officeWorker.office.country.country_name}
          </p>
        </div>
        <Button
          className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold shadow-sm transition-all group"
          onClick={handleMapsClick}
        >
          <NavigationArrow size={20} weight="duotone" className="group-hover:rotate-45 transition-transform" />
          Yol Tarifi Al
        </Button>
      </div>

      {/* Licensing Info Card */}
      <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
        <div className="space-y-3">
          <div>
            <p className="text-xs font-semibold text-gray-900 mb-1 uppercase tracking-wide">Taşınmaz Ticareti Yetki Belgesi</p>
            <p className="text-sm text-gray-700 font-medium">{officeWorker.commercialDocumentId}</p>
          </div>
          <div className="pt-2 border-t border-gray-200">
            <p className="text-xs font-semibold text-gray-900 mb-1 uppercase tracking-wide">İşletme Ünvanı</p>
            <p className="text-sm text-gray-700 font-medium">{officeWorker.companyLegalName}</p>
          </div>
        </div>
      </div>

      {/* Review CTA Card */}
      <div className="bg-primary-600 rounded-2xl p-6 shadow-md text-white">
        <div className="flex items-center gap-2 mb-3">
          <Star size={24} weight="duotone" />
          <h3 className="text-lg font-bold">Değerlendirin</h3>
        </div>
        <p className="text-sm mb-4 opacity-90">
          Danışmanın verdiği hizmeti değerlendirin ve deneyiminizi paylaşın.
        </p>
        <ReviewModalSidebar officeWorkerId={officeWorker.id} />
      </div>
    </div>
  );
};

export default OfficeWorkerSidebar;

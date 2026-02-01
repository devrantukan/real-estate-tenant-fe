"use client";
import React from "react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import Link from "next/link";
import slugify from "slugify";
import { House } from "@phosphor-icons/react/dist/ssr";

export default function BreadCrumb({
  location,
  contract,
  propertyType,
}: {
  location: {
    country: string;
    city: string;
    district: string;
    neighborhood: string;
    subType: string;
  };
  contract: { slug: string; value: string };
  propertyType: { slug: string };
}) {
  const [currentPage, setCurrentPage] =
    React.useState<React.Key>("neighborhood");

  return (
    <>
      <style jsx global>{`
        .breadcrumb-custom ol li span,
        .breadcrumb-custom ol li a,
        .breadcrumb-custom ol li {
          color: #374151 !important;
        }
        .breadcrumb-custom [data-slot="separator"] {
          color: #6b7280 !important;
        }
      `}</style>
      <Breadcrumbs 
        underline="active" 
        onAction={(key) => setCurrentPage(key)}
        separator="›"
        className="breadcrumb-custom"
        classNames={{
          list: "text-gray-700",
          separator: "text-gray-500 mx-1"
        }}
      >
        <BreadcrumbItem
          href="/"
          key="home"
          isCurrent={currentPage === "home"}
          classNames={{
            item: "text-gray-700"
          }}
        >
          <House size={16} className="text-gray-700" />
        </BreadcrumbItem>
        <BreadcrumbItem key="contract" isCurrent={currentPage === "contract"}
          classNames={{
            item: "text-gray-700"
          }}
        >
          <Link href={`/${propertyType.slug}/${contract.slug}`} className="text-gray-700">
            {contract.value}
          </Link>
        </BreadcrumbItem>
        <BreadcrumbItem key="country" isCurrent={currentPage === "country"}
          classNames={{
            item: "text-gray-700"
          }}
        >
          <Link
            href={`/${propertyType.slug}/${contract.slug}/${slugify(
              location.country,
              { lower: true }
            )}`}
            className="text-gray-700"
          >
            {location.country} {contract.value}
          </Link>
        </BreadcrumbItem>
        <BreadcrumbItem key="city" isCurrent={currentPage === "city"}
          classNames={{
            item: "text-gray-700"
          }}
        >
          <Link
            href={`/${propertyType.slug}/${contract.slug}/${slugify(
              location.country,
              { lower: true }
            )}/${slugify(location.city, { lower: true })}`}
            className="text-gray-700"
          >
            {location.city} {contract.value}
          </Link>
        </BreadcrumbItem>
        <BreadcrumbItem key="district" isCurrent={currentPage === "district"}
          classNames={{
            item: "text-gray-700"
          }}
        >
          <Link
            href={`/${propertyType.slug}/${contract.slug}/${slugify(
              location.country,
              { lower: true }
            )}/${slugify(location.city, { lower: true })}/${slugify(
              location.district,
              { lower: true }
            )}`}
            className="text-gray-700"
          >
            {location.district} {contract.value}
          </Link>
        </BreadcrumbItem>
        <BreadcrumbItem
          key="neighborhood"
          isCurrent={currentPage === "neighborhood"}
          classNames={{
            item: "text-gray-700"
          }}
        >
          <Link
            href={`/${propertyType.slug}/${contract.slug}/${slugify(
              location.country,
              { lower: true }
            )}/${slugify(location.city, { lower: true })}/${slugify(
              location.district,
              { lower: true }
            )}/${slugify(location.neighborhood, { lower: true })}`}
            className="text-gray-700"
          >
            {location.neighborhood}
          </Link>
        </BreadcrumbItem>
        <BreadcrumbItem key="subType" isCurrent={currentPage === "subType"}
          classNames={{
            item: "text-gray-700"
          }}
        >
          <Link href={"#"} className="text-gray-700">{location.subType}</Link>
        </BreadcrumbItem>
      </Breadcrumbs>
    </>
  );
}

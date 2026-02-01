"use client";

import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

import { ArrowCircleRight } from "@phosphor-icons/react/dist/ssr";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import PropertyCard from "./PropertyCard";

export default function HomepageForSaleList({
  properties,
}: {
  properties: any[];
}) {
  // Force refresh
  const [selected, setSelected] = React.useState("konut");
  return (
    <div className="w-full">
      <div className="flex flex-col w-full">
        <Tabs
          aria-label="Options"
          selectedKey={selected}
          onSelectionChange={(key) => setSelected(key.toString())}
          variant="light"
          color="primary"
          className="mb-4"
        >
          <Tab key="konut" title="Konut">
             <div className="grid grid-cols-1 gap-y-4">
                {properties
                  .filter((property) => property.contract.slug === "satilik")
                  .filter((property) => property.type.slug == "konut")
                  .slice(0, 5)
                  .map((property, index) => (
                    <PropertyCard property={property} key={index} />
                  ))}
               <div className="mt-4">
                 <Link href={`/konut/satilik/`} className="w-full block">
                   <Button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900" variant="flat">
                     <span className="font-medium flex flex-row items-center justify-center">
                       <span className="mr-2">Tüm Satılık Konut İlanlarını Gör</span>
                       <ArrowCircleRight size={20} />
                     </span>
                   </Button>
                 </Link>
               </div>
            </div>
          </Tab>
          <Tab key="ticari" title="Ticari">
            <div className="grid grid-cols-1 gap-y-4">
                {properties
                  .filter((property) => property.contract.slug === "satilik")
                  .filter((property) => property.type.slug == "ticari")
                  .slice(0, 5)
                  .map((property, index) => (
                    <PropertyCard property={property} key={index} />
                  ))}
               <div className="mt-4">
                 <Link href={`/ticari/satilik/`} className="w-full block">
                   <Button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900" variant="flat">
                     <span className="font-medium flex flex-row items-center justify-center">
                       <span className="mr-2">Tüm Satılık Ticari İlanlarını Gör</span>
                       <ArrowCircleRight size={20} />
                     </span>
                   </Button>
                 </Link>
               </div>
            </div>
          </Tab>
          <Tab key="arsa-arazi" title="Arsa Arazi">
             <div className="grid grid-cols-1 gap-y-4">
                {properties
                  .filter((property) => property.contract.slug === "satilik")
                  .filter((property) => property.type.slug == "arsa-arazi")
                  .slice(0, 5)
                  .map((property, index) => (
                    <PropertyCard property={property} key={index} />
                  ))}
               <div className="mt-4">
                 <Link href={`/arsa-arazi/satilik/`} className="w-full block">
                   <Button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900" variant="flat">
                     <span className="font-medium flex flex-row items-center justify-center">
                       <span className="mr-2">Tüm Satılık Arsa/Arazi İlanlarını Gör</span>
                       <ArrowCircleRight size={20} />
                     </span>
                   </Button>
                 </Link>
               </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

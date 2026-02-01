"use client";

import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { ArrowCircleRight } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

export default function HomepageCustomerBanner() {
  return (
    <>
      <div className="flex w-full flex-row items-center justify-between p-8 md:p-12 h-80 rounded-2xl relative overflow-hidden group bg-gradient-to-r from-gray-200 via-gray-100 to-blue-50 shadow-lg">
        <div className="relative z-30 w-full md:w-1/2 flex flex-col items-start justify-center h-full">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
            Gayrimenkulünüzü <br className="hidden md:block"/> Satalım Kiralayalım
          </h2>
          <p className="text-base text-gray-600 mb-8 max-w-sm">
            Deneyimli danışmanlarımızla tanışın, mülkünüzü en doğru değerle buluşturun.
          </p>
          <Button 
             as={Link}
             href="/gayrimenkullerinizi-satalim-kiralayalim"
             className="bg-white text-blue-950 font-bold border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-row items-center gap-2 px-4"
          >
            <span>Hemen Başvur</span>
            <ArrowCircleRight size={20} weight="fill" />
          </Button>
        </div>
        
        <div className="absolute right-0 top-0 bottom-0 w-full md:w-2/3 h-full z-10">
           <Image
            alt="Investrong CRM Gayrimenkul"
            src="/images/banner_left_house_new.png"
            className="object-cover object-center md:object-right"
            fill
            unoptimized
          />
           <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-transparent to-transparent md:w-1/2" />
        </div>
      </div>
    </>
  );
}

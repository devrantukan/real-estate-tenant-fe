"use client";

import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { ArrowCircleRight } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

export default function HomepageAgentBanner() {
  return (
    <>
      <div className="flex w-full flex-row items-center justify-between p-8 md:p-12 h-80 rounded-2xl relative overflow-hidden group bg-gradient-to-r from-[#1e3a8a] via-[#1e40af] to-[#60a5fa] shadow-lg">
        <div className="relative z-30 w-full md:w-1/2 flex flex-col items-start justify-center h-full">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
            Gayrimenkul Danışmanı <br className="hidden md:block"/> Olmak İstiyorum
          </h2>
          <p className="text-base text-blue-100 mb-8 max-w-sm">
            Bir numara olmak ister misiniz? Kariyerinizi profesyonel bir ekiple zirveye taşıyın.
          </p>
          <Button 
            as={Link}
            href="/gayrimenkul-danismani-basvuru-formu"
            className="bg-white text-blue-900 font-bold shadow-sm hover:shadow-md transition-all flex flex-row items-center gap-2 px-4"
          >
            <span>Danışman Ol</span>
            <ArrowCircleRight size={20} weight="fill" />
          </Button>
        </div>

        <div className="absolute right-0 top-0 bottom-0 w-full md:w-2/3 h-full z-10">
          <Image
            alt="Investrong CRM Gayrimenkul"
            src="/images/banner_right_consultant_new.png"
            className="object-cover object-center md:object-right-top"
            fill
            unoptimized
          />
           <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a8a] via-transparent to-transparent md:w-1/2" />
        </div>
      </div>
    </>
  );
}

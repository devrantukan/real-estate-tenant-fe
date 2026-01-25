"use client";

import React from "react";
import HomepageRefineTabs from "./HomepageRefineTabs";
import Image from "next/image";

export default function HomepageHero() {
  return (
    <>
      <div className="flex justify-left  p-6 items-center lg:h-screen w-full  relative">
        <Image
          alt="Investrong CRM Gayrimenkul "
          src="/images/1.jpg"
          className="max-h-screen  h-full object-cover object-center z-0  lg:pb-[65px] lg:ml-[60px] opacity-90 "
          layout="fill"
          objectFit="cover"
          sizes="100vw"
        />
        <HomepageRefineTabs />
      </div>
    </>
  );
}

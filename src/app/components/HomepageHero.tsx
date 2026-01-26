"use client";

import React from "react";
import HomepageRefineTabs from "./HomepageRefineTabs";
import Image from "next/image";

export default function HomepageHero() {
  return (
    <>
      <div className="flex justify-center p-6 items-center lg:h-screen w-full relative z-0">
        <Image
          src="/images/home-hero-bg.png"
          alt="Luxury Real Estate Background"
          fill
          priority
          className="object-cover -z-10"
          quality={100}
        />
        <div className="absolute inset-0 bg-black/40 -z-10" />
        <HomepageRefineTabs />
      </div>
    </>
  );
}

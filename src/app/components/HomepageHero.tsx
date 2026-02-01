"use client";

import React, { useRef } from "react";
import HomepageRefineTabs from "./HomepageRefineTabs";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "@phosphor-icons/react/dist/ssr";

export default function HomepageHero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <div ref={containerRef} className="lg:h-screen min-h-[800px] relative overflow-hidden flex items-center">
      <motion.div style={{ y, scale }} className="absolute inset-0 z-0">
        <Image
          src="/images/home-hero-bg.png"
          alt="Luxury Real Estate Background"
          fill
          priority
          className="object-cover"
          quality={100}
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      </motion.div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full flex flex-col lg:flex-row items-center lg:items-end justify-between gap-12 pt-24 pb-32">
        <motion.div
           className="flex-1 w-full"
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-sm md:text-base uppercase tracking-[0.4em] mb-6 font-light text-gray-300">
            Investrong CRM
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight leading-[1.1] text-white first-letter:capitalize mb-6 lg:mb-8">
            Doğru gayrimenkulün <br />
            <span className="font-semibold text-white">olduğu yerdesiniz.</span>
          </h1>
          <p className="text-base md:text-lg text-gray-200 font-light max-w-xl leading-relaxed">
             Hayallerinizdeki gayrimenkulü bulmanıza yardımcı olurken, en karlı yatırımı da yapmanızı sağlamak için doğru mülk nerede ise biz oradayız.
          </p>
        </motion.div>

        <div className="w-full lg:w-auto flex justify-end">
            <HomepageRefineTabs />
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 z-10 hidden lg:block"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowDown size={32} weight="light" />
      </motion.div>
    </div>
  );
}

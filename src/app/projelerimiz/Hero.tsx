"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowDown } from "@phosphor-icons/react/dist/ssr";
import { useRef } from "react";

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <div ref={containerRef} className="h-[70vh] relative overflow-hidden flex items-center">
      <motion.div style={{ y, scale }} className="absolute inset-0 z-0">
        <Image
          alt="Our Projects"
          src="/project-hero.png"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      </motion.div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-sm md:text-base uppercase tracking-[0.4em] mb-6 font-light text-gray-300">
            Projelerimiz
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[1.1]">
            Yaşamın geleceğini <br />
            <span className="font-semibold text-white">keşfedin.</span>
          </h1>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/50 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowDown size={32} weight="light" />
      </motion.div>
    </div>
  );
};

export default Hero;

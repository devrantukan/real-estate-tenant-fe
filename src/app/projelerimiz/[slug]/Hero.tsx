"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowDown, MapPin, FilePdf } from "@phosphor-icons/react";
import { useRef } from "react";

interface HeroProps {
  name: string;
  image: string;
  location: string;
  catalogUrl?: string | null;
}

const Hero = ({ name, image, location, catalogUrl }: HeroProps) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <div ref={containerRef} className="h-[80vh] relative overflow-hidden flex items-center">
      <motion.div style={{ y, scale }} className="absolute inset-0 z-0">
        <Image
          alt={name}
          src={image}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </motion.div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full text-white">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center gap-2 mb-6 text-gray-300">
              <MapPin size={24} weight="light" />
              <span className="text-sm md:text-base uppercase tracking-[0.4em] font-light">
                {location}
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[1.1] mb-8">
              {name}
            </h1>

            {catalogUrl && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <a
                  href={catalogUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full transition-all duration-300 group"
                >
                  <FilePdf size={24} weight="light" className="group-hover:scale-110 transition-transform" />
                  <span className="font-light tracking-wider uppercase text-sm">Kataloğu İncele</span>
                </a>
              </motion.div>
            )}
          </motion.div>
        </div>
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

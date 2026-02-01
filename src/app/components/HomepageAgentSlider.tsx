"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardBody } from "@nextui-org/react";

import OfficeWorkerCard from "./OfficeWorkerCard";

export default function HomepageAgentSlider({ agents }: { agents: any[] }) {
  if (!agents || agents.length === 0) {
    return <div className="text-center p-4">Henüz danışman eklenmemiş.</div>;
  }
  return (
    <>
      <div className="flex justify-center items-center w-full">
        <Carousel
          opts={{
            loop: true,
            align: "start",
          }}
          autoplay={true}
          autoplayInterval={5000}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {agents.map((agent, index) => (
              <CarouselItem
                key={index}
                className="pl-4 md:basis-1/2 lg:basis-1/4 xl:basis-1/5"
              >
                <OfficeWorkerCard officeWorker={agent} index={index} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </>
  );
}

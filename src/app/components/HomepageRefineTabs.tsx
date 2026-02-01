"use client";
import React from "react";

import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import Link from "next/link";
import { HomepageRefineForm } from "./forms/HomepageRefineForm";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

// Create schema
const propertySearchSchema = z.object({
  propertyId: z
    .string()
    .min(1, "İlan numarası gereklidir")
    .regex(/^\d+$/, "Sadece sayı giriniz")
    .transform(Number),
});

type PropertySearchForm = z.infer<typeof propertySearchSchema>;

const HomepageRefineTabs = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<PropertySearchForm>({
    resolver: zodResolver(propertySearchSchema),
  });

  return (
      <div className="w-full h-auto">
        <div className="flex flex-col">
          <Tabs
            aria-label="Options"
            variant="solid"
            color="primary"
            classNames={{
              tabList: "bg-[#172554] text-white",
              cursor: "bg-[#BFAA8B]",
              tab: "text-white"
            }}
          >
            <Tab key="properties" title="Konut">
              <Card className="bg-[#172554]">
                <CardBody>
                  <HomepageRefineForm propertyType={"konut"} />
                </CardBody>
              </Card>
            </Tab>
            <Tab key="about-us" title="Ticari">
              <Card className="bg-[#172554]">
                <CardBody>
                  <HomepageRefineForm propertyType={"ticari"} />
                </CardBody>
              </Card>
            </Tab>
            <Tab key="our-office" title="Arsa/Arazi">
              <Card className="bg-[#172554]">
                <CardBody>
                  <HomepageRefineForm propertyType={"arsa-arazi"} />
                </CardBody>
              </Card>
            </Tab>
            <Tab key="propertyId" title="İlan No">
              <Card className="bg-[#172554]">
                <CardBody>
                  <form
                    onSubmit={handleSubmit(async (data) => {
                      try {
                        const API_URL =
                          process.env.NEXT_PUBLIC_API_URL || "/api";
                        const response = await fetch(
                          `${API_URL}/properties/check/${data.propertyId}/`
                        );
                        const result = await response.json();

                        if (result.exists) {
                          router.push(`/portfoy/${data.propertyId}`);
                        } else {
                          setError("propertyId", {
                            type: "manual",
                            message: "Bu ilan numarası mevcut değil",
                          });
                        }
                      } catch (error) {
                        setError("propertyId", {
                          type: "manual",
                          message: "Bir hata oluştu, lütfen tekrar deneyin",
                        });
                      }
                    })}
                    className="flex flex-col gap-4"
                  >
                    <div className="flex flex-col gap-2">
                      <input
                        type="text"
                        placeholder="İlan numarasını giriniz"
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 !bg-[#111827] !text-white"
                        {...register("propertyId")}
                      />
                      {errors.propertyId && (
                        <span className="text-red-500 text-sm mt-1">
                          {errors.propertyId.message}
                        </span>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-[#BFAA8B] hover:bg-[#eb5626] text-white py-2 px-4 rounded-lg transition-colors duration-200 font-medium"
                    >
                      İlan Ara
                    </button>
                  </form>
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
    </div>
  );
};

export default HomepageRefineTabs;

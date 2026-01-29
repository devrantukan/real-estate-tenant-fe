"use client";
import { HomeModernIcon } from "@heroicons/react/16/solid";
import {
  Navbar,
  NavbarContent,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  Button,
  NavbarMenu,
  NavbarMenuItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import Link from "next/link";
import React, { ReactNode } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { getRoute } from "@/utils/routes";

const Appbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useReducer(
    (current) => !current,
    false
  );

  const pathname = usePathname();

  return (
    <Navbar
      className="shadow-sm bg-white/80 backdrop-blur-md border-b border-gray-100 w-full flex justify-between fixed top-0"
      maxWidth={"full"}
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent justify="center" className="w-full">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden text-blue-950"
        />
        <NavbarBrand className="w-full flex lg:justify-start justify-center mr-12">
          <Link
            href={"/"}
            className="flex items-center text-primary-400 hover:text-primary-600 transition-colors"
          >
            <Image
              src="/investrong.png"
              width={125}
              height={80}
              alt="Investrong CRM Logo"
              className="h-[40px] w-auto object-contain"
              priority
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-8 text-blue-950 font-medium" justify="end">
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                className="bg-transparent text-md text-blue-950 p-0 data-[hover=true]:bg-transparent font-medium"
                variant="light"
              >
                Portföylerimiz
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="Portföy seçenekleri"
            className="text-primary"
          >
            <DropdownItem
              key="satilik-konut"
              href="/konut/satilik/"
            >
              Satılık Konutlar
            </DropdownItem>
            <DropdownItem
              key="satilik-ticari"
              href="/ticari/satilik/"
            >
              Satılık Ticari Gayrimenkuller
            </DropdownItem>
            <DropdownItem
              key="satilik-arsa"
              href="/arsa-arazi/satilik/"
            >
              Satılık Arsalar
            </DropdownItem>
            <DropdownItem
              key="kiralik-konut"
              href="/konut/kiralik/"
            >
              Kiralık Konutlar
            </DropdownItem>
            <DropdownItem
              key="kiralik-ticari"
              href="/ticari/kiralik/"
            >
              Kiralık Ticari Gayrimenkuller
            </DropdownItem>
            <DropdownItem
              key="kiralik-arsa"
              href="/arsa-arazi/kiralik/"
            >
              Kiralık Arsalar
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <NavbarItem isActive={pathname === getRoute("/projelerimiz")} className="hover:text-primary transition-colors">
          <Link href="/projelerimiz">Projelerimiz</Link>
        </NavbarItem>

        <NavbarItem isActive={pathname === getRoute("/ofislerimiz")} className="hover:text-primary transition-colors">
          <Link href={getRoute("/ofislerimiz/")}>Ofislerimiz</Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === getRoute("/danismanlarimiz")} className="hover:text-primary transition-colors">
          <Link
            href={getRoute("/danismanlarimiz/")}
            {...(pathname === getRoute("/danismanlarimiz")
              ? { "aria-current": "page" }
              : { color: "foreground" })}
          >
            Danışmanlarımız
          </Link>
        </NavbarItem>
        <NavbarItem
          isActive={
            pathname === getRoute("/gayrimenkul-danismani-basvuru-formu")
          }
          className="hover:text-primary transition-colors"
        >
          <Link
            {...(pathname === getRoute("/gayrimenkul-danismani-basvuru-formu")
              ? { "aria-current": "page" }
              : { color: "foreground" })}
            href={getRoute("/gayrimenkul-danismani-basvuru-formu/")}
          >
            Danışman ol
          </Link>
        </NavbarItem>
        <NavbarItem
          isActive={
            pathname === getRoute("/gayrimenkullerinizi-satalim-kiralayalim")
          }
          className="hover:text-primary transition-colors"
        >
          <Link
            {...(pathname ===
              getRoute("/gayrimenkullerinizi-satalim-kiralayalim")
              ? { "aria-current": "page" }
              : { color: "foreground" })}
            href={getRoute("/gayrimenkullerinizi-satalim-kiralayalim/")}
          >
            Investrong CRM ile Sat Kirala
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="text-center py-24">
        <NavbarMenuItem className="h-1/4">
          <Dropdown>
            <DropdownTrigger>
              <Button
                className="text-3xl text-blue-950 bg-transparent w-full"
                variant="light"
              >
                Portföylerimiz
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Portföy seçenekleri">
              <DropdownItem
                key="satilik-konut"
                href="/konut/satilik/"
              >
                Satılık Konutlar
              </DropdownItem>
              <DropdownItem
                key="satilik-ticari"
                href="/ticari/satilik/"
              >
                Satılık Ticari Gayrimenkuller
              </DropdownItem>
              <DropdownItem
                key="satilik-arsa"
                href="/arsa-arazi/satilik/"
              >
                Satılık Arsalar
              </DropdownItem>
              <DropdownItem
                key="kiralik-konut"
                href="/konut/kiralik/"
              >
                Kiralık Konutlar
              </DropdownItem>
              <DropdownItem
                key="kiralik-ticari"
                href="/ticari/kiralik/"
              >
                Kiralık Ticari Gayrimenkuller
              </DropdownItem>
              <DropdownItem
                key="kiralik-arsa"
                href="/arsa-arazi/kiralik/"
              >
                Kiralık Arsalar
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarMenuItem>
        <NavbarItem
          isActive={pathname === getRoute("/ofislerimiz/")}
          className="h-1/4"
        >
          <Link
            href="/projelerimiz"
            className="text-3xl text-blue-950"
            onClick={() => setIsMenuOpen()}
          >
            Projelerimiz
          </Link>
        </NavbarItem>
        <NavbarItem
          isActive={pathname === getRoute("/ofislerimiz/")}
          className="h-1/4"
        >
          <Link
            href={getRoute("/ofislerimiz")}
            {...(pathname === getRoute("/ofislerimiz")
              ? { "aria-current": "page" }
              : { color: "foreground" })}
            className="text-3xl text-blue-950"
            onClick={() => setIsMenuOpen()}
          >
            Ofislerimiz
          </Link>
        </NavbarItem>
        <NavbarItem
          isActive={pathname === getRoute("/danismanlarimiz")}
          className="h-1/4"
        >
          <Link
            href={getRoute("/danismanlarimiz")}
            {...(pathname === getRoute("/danismanlarimiz")
              ? { "aria-current": "page" }
              : { color: "foreground" })}
            className="text-3xl text-blue-950"
            onClick={() => setIsMenuOpen()}
          >
            Danışmanlarımız
          </Link>
        </NavbarItem>
        <NavbarItem
          isActive={
            pathname === getRoute("/gayrimenkul-danismani-basvuru-formu")
          }
          className="h-1/4"
        >
          <Link
            {...(pathname === getRoute("/gayrimenkul-danismani-basvuru-formu")
              ? { "aria-current": "page" }
              : { color: "foreground" })}
            href={getRoute("/gayrimenkul-danismani-basvuru-formu/")}
            className="text-3xl text-blue-950"
            onClick={() => setIsMenuOpen()}
          >
            Danışman ol
          </Link>
        </NavbarItem>
        <NavbarItem
          isActive={
            pathname === getRoute("/gayrimenkullerinizi-satalim-kiralayalim")
          }
          className="h-1/4"
        >
          <Link
            {...(pathname ===
              getRoute("/gayrimenkullerinizi-satalim-kiralayalim")
              ? { "aria-current": "page" }
              : { color: "foreground" })}
            href={getRoute("/gayrimenkullerinizi-satalim-kiralayalim/")}
            className="text-3xl text-blue-950"
            onClick={() => setIsMenuOpen()}
          >
            Investrong CRM ile Sat Kirala
          </Link>
        </NavbarItem>
      </NavbarMenu>
    </Navbar>
  );
};
export default Appbar;

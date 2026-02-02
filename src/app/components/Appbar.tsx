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
import { 
  House, 
  Buildings, 
  TreeEvergreen, 
  Briefcase, 
  Users, 
  FolderOpen,
  CaretDown,
  CaretUp,
  Storefront,
  UserPlus,
  Handshake
} from "@phosphor-icons/react";

const Appbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useReducer(
    (current) => !current,
    false
  );
  const [isPortfolioExpanded, setIsPortfolioExpanded] = React.useState(false);

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
              src="/investrong-dark.svg"
              width={200}
              height={40}
              alt="Investrong CRM Logo"
              className="h-[40px] w-auto object-contain"
              priority
              unoptimized
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

      <NavbarMenu className="pt-6 px-4 bg-gray-50">
        {/* Portfolio Accordion Section */}
        <div className="mb-4">
          <button
            onClick={() => setIsPortfolioExpanded(!isPortfolioExpanded)}
            className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-primary-200 transition-all"
          >
            <div className="flex items-center gap-3">
              <FolderOpen size={24} weight="duotone" className="text-primary" />
              <span className="text-lg font-semibold text-gray-800">Portföylerimiz</span>
            </div>
            {isPortfolioExpanded ? (
              <CaretUp size={20} className="text-gray-500" />
            ) : (
              <CaretDown size={20} className="text-gray-500" />
            )}
          </button>
          
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isPortfolioExpanded ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="mt-2 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              {/* Satılık Section */}
              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">Satılık</p>
                <div className="space-y-1">
                  <Link
                    href="/konut/satilik/"
                    onClick={() => setIsMenuOpen()}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary-50 transition-colors group"
                  >
                    <House size={20} className="text-primary-600 group-hover:scale-110 transition-transform" />
                    <span className="text-gray-700 group-hover:text-primary-700 font-medium">Konutlar</span>
                  </Link>
                  <Link
                    href="/ticari/satilik/"
                    onClick={() => setIsMenuOpen()}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary-50 transition-colors group"
                  >
                    <Buildings size={20} className="text-primary-600 group-hover:scale-110 transition-transform" />
                    <span className="text-gray-700 group-hover:text-primary-700 font-medium">Ticari</span>
                  </Link>
                  <Link
                    href="/arsa-arazi/satilik/"
                    onClick={() => setIsMenuOpen()}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary-50 transition-colors group"
                  >
                    <TreeEvergreen size={20} className="text-primary-600 group-hover:scale-110 transition-transform" />
                    <span className="text-gray-700 group-hover:text-primary-700 font-medium">Arsalar</span>
                  </Link>
                </div>
              </div>
              
              {/* Kiralık Section */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">Kiralık</p>
                <div className="space-y-1">
                  <Link
                    href="/konut/kiralik/"
                    onClick={() => setIsMenuOpen()}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary-50 transition-colors group"
                  >
                    <House size={20} className="text-primary-600 group-hover:scale-110 transition-transform" />
                    <span className="text-gray-700 group-hover:text-primary-700 font-medium">Konutlar</span>
                  </Link>
                  <Link
                    href="/ticari/kiralik/"
                    onClick={() => setIsMenuOpen()}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary-50 transition-colors group"
                  >
                    <Buildings size={20} className="text-primary-600 group-hover:scale-110 transition-transform" />
                    <span className="text-gray-700 group-hover:text-primary-700 font-medium">Ticari</span>
                  </Link>
                  <Link
                    href="/arsa-arazi/kiralik/"
                    onClick={() => setIsMenuOpen()}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary-50 transition-colors group"
                  >
                    <TreeEvergreen size={20} className="text-primary-600 group-hover:scale-110 transition-transform" />
                    <span className="text-gray-700 group-hover:text-primary-700 font-medium">Arsalar</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation Links */}
        <div className="space-y-2 mb-4">
          <Link
            href="/projelerimiz"
            onClick={() => setIsMenuOpen()}
            className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-primary-200 transition-all group"
          >
            <Briefcase size={24} weight="duotone" className="text-primary group-hover:scale-110 transition-transform" />
            <span className="text-lg font-semibold text-gray-800 group-hover:text-primary">Projelerimiz</span>
          </Link>
          
          <Link
            href={getRoute("/ofislerimiz")}
            onClick={() => setIsMenuOpen()}
            className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-primary-200 transition-all group"
          >
            <Storefront size={24} weight="duotone" className="text-primary group-hover:scale-110 transition-transform" />
            <span className="text-lg font-semibold text-gray-800 group-hover:text-primary">Ofislerimiz</span>
          </Link>
          
          <Link
            href={getRoute("/danismanlarimiz")}
            onClick={() => setIsMenuOpen()}
            className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-primary-200 transition-all group"
          >
            <Users size={24} weight="duotone" className="text-primary group-hover:scale-110 transition-transform" />
            <span className="text-lg font-semibold text-gray-800 group-hover:text-primary">Danışmanlarımız</span>
          </Link>
        </div>

        {/* CTA Section */}
        <div className="pt-4 border-t border-gray-200">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">Başvuru</p>
          <div className="space-y-2">
            <Link
              href={getRoute("/gayrimenkul-danismani-basvuru-formu/")}
              onClick={() => setIsMenuOpen()}
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl shadow-md hover:shadow-lg transition-all group"
            >
              <UserPlus size={24} weight="bold" className="text-white group-hover:scale-110 transition-transform" />
              <span className="text-lg font-bold text-white">Danışman Ol</span>
            </Link>
            
            <Link
              href={getRoute("/gayrimenkullerinizi-satalim-kiralayalim/")}
              onClick={() => setIsMenuOpen()}
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-md hover:shadow-lg transition-all group"
            >
              <Handshake size={24} weight="bold" className="text-white group-hover:scale-110 transition-transform" />
              <span className="text-lg font-bold text-white">Sat Kirala</span>
            </Link>
          </div>
        </div>
      </NavbarMenu>
    </Navbar>
  );
};
export default Appbar;

import { Metadata, Viewport } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import { Providers } from "./components/providers";
import Appbar from "./components/Appbar";
import SignInPanel from "./components/signInPanel";
import { ToastContainer } from "react-toastify";
import GoogleAnalytics from "./components/GoogleAnalytics";
import Footer from "./components/Footer";
import "react-toastify/dist/ReactToastify.css";
import { CurrencyProvider } from "./context/CurrencyContext";
import MetaPixel from "./components/MetaPixel";

const raleway = Raleway({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-raleway",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.investrong.com/"
  ),
  title: {
    default: "Investrong CRM - Emlak ve Gayrimenkul",
    template: "%s | Investrong CRM",
  },
  description:
    "Türkiye genelinde satılık ve kiralık emlak ilanları, gayrimenkul yatırım fırsatları.",
  keywords: [
    "emlak",
    "gayrimenkul",
    "satılık",
    "kiralık",
    "ev",
    "daire",
    "villa",
    "arsa",
    "investrong",
    "crm"
  ],
  authors: [{ name: "Investrong CRM" }],
  creator: "Investrong CRM",
  publisher: "Investrong CRM",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "Investrong CRM",
    locale: "tr_TR",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: "/favicon/favicon.ico",
    // Add more icon sizes if needed
    // apple: '/apple-icon.png',
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html
      lang="tr"
      className={`${raleway.variable} notranslate`}
      translate="no"
    >
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#172B4D" />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content="#ffffff" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta name="google" content="notranslate" />
        <meta property="og:locale" content="tr_TR" />
        <link
          rel="alternate"
          href="https://www.investrong.com/"
          hrefLang="tr-TR"
        />
        {GA_MEASUREMENT_ID && (
          <GoogleAnalytics GA_MEASUREMENT_ID={GA_MEASUREMENT_ID} />
        )}
      </head>
      <body className={`${raleway.className} font-sans`}>
        <CurrencyProvider>
          <MetaPixel />
          <Providers>
            <Appbar>{/* <SignInPanel /> */}</Appbar>
            {children}
            <ToastContainer />
            <Footer />
          </Providers>
        </CurrencyProvider>
      </body>
    </html>
  );
}

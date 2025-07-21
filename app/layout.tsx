import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Arges Makina | İş Makinaları Yedek Parça",
  description:
    "Arges Makine - İş makineleri için en kaliteli yedek parçalar, hidrolik pompa, filtreler, caterpillar, volvo, JCB yedek parçaları ve tüm iş makinesi parçaları için güvenilir tedarikçiniz.",
  keywords:
    "iş makinesi yedek parça, hidrolik pompa, caterpillar yedek parça, volvo yedek parça, JCB yedek parça, iş makinesi filtreleri, komatsu yedek parça, liebherr yedek parça, doosan yedek parça, case yedek parça, new holland yedek parça, arges makina, türkiye yedek parça, orijinal yedek parça, kaliteli yedek parça, iş makinesi parça",
  authors: [
    {
      name: "Arges Makine",
      url: "https://argesismakinalari.com",
    },
  ],
  creator: "Arges Makine",
  publisher: "Arges Makine",
  category: "Industrial Equipment",
  classification: "Business",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://argesismakinalari.com"),
  alternates: {
    canonical: "/",
    languages: {
      "tr-TR": "/",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "google-site-verification-placeholder", // Site owner should add their verification code
  },
  openGraph: {
    title: "Arges Makine | İş Makineleri Yedek Parça",
    description:
      "En kaliteli iş makinaları yedek parçaları için Arges Makina. Hidrolik pompa, filtreler ve tüm markalar için parçalar.",
    url: "https://argesismakinalari.com",
    siteName: "Arges Makine",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Arges Makine - İş Makineleri Yedek Parça",
        type: "image/jpeg",
      },
      {
        url: "/logo.svg",
        width: 800,
        height: 600,
        alt: "Arges Makine Logo",
        type: "image/svg+xml",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arges Makine | İş Makineleri Yedek Parça",
    description:
      "En kaliteli iş makinaları yedek parçaları için Arges Makina. Hidrolik pompalar, filtreler ve daha fazlası.",
    images: ["/og-image.jpg"],
    creator: "@argesmakina",
    site: "@argesmakina",
  },
  other: {
    "msapplication-TileColor": "#febd00",
    "theme-color": "#febd00",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://argesismakinalari.com/#organization",
              name: "Arges Makine",
              alternateName: "Arges Makina",
              url: "https://argesismakinalari.com",
              logo: {
                "@type": "ImageObject",
                url: "https://argesismakinalari.com/logo.svg",
                width: 800,
                height: 600,
              },
              image: "https://argesismakinalari.com/og-image.jpg",
              description:
                "İş makineleri için en kaliteli yedek parçalar, hidrolik pompa, filtreler ve tüm makineler için parçalar. Caterpillar, Volvo, JCB, Komatsu ve diğer tüm markalar için güvenilir tedarikçiniz.",
              address: {
                "@type": "PostalAddress",
                addressCountry: "TR",
                addressLocality: "Türkiye",
              },
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+905394437905",
                  contactType: "customer service",
                  availableLanguage: ["Turkish", "tr"],
                  areaServed: "TR",
                },
                {
                  "@type": "ContactPoint",
                  contactType: "sales",
                  availableLanguage: ["Turkish", "tr"],
                  areaServed: "TR",
                },
              ],
              founder: {
                "@type": "Person",
                name: "Arges Makine Kurucusu",
              },
              foundingDate: "2020",
              industry: "Industrial Equipment Supply",
              keywords:
                "iş makinesi yedek parça, hidrolik pompa, caterpillar yedek parça, volvo yedek parça, jcb yedek parça, komatsu yedek parça",
              serviceArea: {
                "@type": "Country",
                name: "Turkey",
              },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "İş Makinesi Yedek Parçaları",
                itemListElement: [
                  {
                    "@type": "OfferCatalog",
                    name: "Hidrolik Sistemler",
                  },
                  {
                    "@type": "OfferCatalog",
                    name: "Motor Parçaları",
                  },
                  {
                    "@type": "OfferCatalog",
                    name: "Filtreler",
                  },
                ],
              },
              sameAs: [
                "https://www.instagram.com/argesmakine/",
                "https://www.facebook.com/argesmakine/",
              ],
            }),
          }}
        />

        {/* Enhanced Website structured data */}
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://argesismakinalari.com/#website",
              url: "https://argesismakinalari.com",
              name: "Arges Makine",
              description: "İş makineleri için en kaliteli yedek parçalar",
              publisher: {
                "@id": "https://argesismakinalari.com/#organization",
              },
              potentialAction: [
                {
                  "@type": "SearchAction",
                  target: {
                    "@type": "EntryPoint",
                    urlTemplate:
                      "https://argesismakinalari.com/products?search={search_term_string}",
                  },
                  "query-input": "required name=search_term_string",
                },
              ],
              inLanguage: "tr-TR",
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">
          <div className="max-w-screen-2xl mx-auto px-4 md:px-6">
            {children}
          </div>
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}

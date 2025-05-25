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
    "iş makinesi yedek parça, hidrolik pompa, caterpillar yedek parça, volvo yedek parça, JCB yedek parça, iş makinesi filtreleri",
  authors: [
    {
      name: "Arges Makine",
      url: "https://argesmakine.com",
    },
  ],
  creator: "Arges Makine",
  publisher: "Arges Makine",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://argesmakine.com"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Arges Makine | İş Makineleri Yedek Parça",
    description:
      "En kaliteli iş makinaları yedek parçaları için Arges Makina. Hidrolik pompa, filtreler ve tüm markalar için parçalar.",
    url: "https://argesmakine.com",
    siteName: "Arges Makine",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: "/logo.svg",
        width: 800,
        height: 600,
        alt: "Arges Makine Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arges Makine | İş Makineleri Yedek Parça",
    description:
      "En kaliteli iş makinaları yedek parçaları için Arges Makina. Hidrolik pompalar, filtreler ve daha fazlası.",
    images: ["/logo.svg"],
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
              name: "Arges Makine",
              url: "https://argesmakine.com",
              logo: "https://argesmakine.com/logo.svg",
              description:
                "İş makineleri için en kaliteli yedek parçalar, hidrolik pompa, filtreler ve tüm makineler için parçalar.",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+905394437905",
                contactType: "customer service",
                availableLanguage: "Turkish",
              },
              sameAs: [
                "https://www.instagram.com/argesmakine/",
                "https://www.facebook.com/argesmakine/",
              ],
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

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "İş Makinesi Yedek Parça Ürünlerimiz | Arges Makina",
  description:
    "Caterpillar, Volvo, JCB, Komatsu ve diğer tüm marka iş makinaları için kaliteli yedek parçalar. Hidrolik sistemler, pompa, motor parçaları, filtreler ve geniş ürün yelpazemizle hizmetinizdeyiz. Aradığınız tüm yedek parçalar uygun fiyatlarla Arges Makina'da.",
  keywords:
    "iş makinesi yedek parça, caterpillar yedek parça, volvo yedek parça, jcb yedek parça, komatsu yedek parça, liebherr yedek parça, doosan yedek parça, case yedek parça, new holland yedek parça, hidrolik pompa, filtre, motor parçaları, orijinal yedek parça, iş makinesi değişen no, arges makina, türkiye yedek parça, kaliteli yedek parça, iş makinesi parça, ekskavatör yedek parça, buldozer yedek parça, yükleyici yedek parça",
  authors: [
    {
      name: "Arges Makina",
      url: "https://argesismakinalari.com",
    },
  ],
  creator: "Arges Makina",
  publisher: "Arges Makina",
  category: "Industrial Equipment",
  alternates: {
    canonical: "/products",
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
    title: "İş Makinesi Yedek Parça Ürünlerimiz | Arges Makina",
    description:
      "En kaliteli iş makinesi yedek parçaları Arges Makina'da. Caterpillar, Volvo, JCB, Komatsu ve diğer tüm markalar için orijinal kalitede parçaları keşfedin. Hidrolik pompalar, filtreler, motor parçaları ve daha fazlası.",
    url: "https://argesismakinalari.com/products",
    type: "website",
    siteName: "Arges Makina",
    locale: "tr_TR",
    images: [
      {
        url: "https://argesismakinalari.com/og-products.jpg",
        width: 1200,
        height: 630,
        alt: "Arges Makina - İş Makinesi Yedek Parça Ürünleri",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "İş Makinesi Yedek Parça Ürünlerimiz | Arges Makina",
    description:
      "En kaliteli iş makinesi yedek parçaları Arges Makina'da. Caterpillar, Volvo, JCB, Komatsu ve diğer markalar için orijinal parçalar.",
    images: ["https://argesismakinalari.com/og-products.jpg"],
    creator: "@argesmakina",
    site: "@argesmakina",
  },
  other: {
    "msapplication-TileColor": "#febd00",
    "theme-color": "#febd00",
  },
};

import { Hero } from "@/components/Hero";
import { FeaturedCategories } from "@/components/FeaturedCategories";
import { BrandShowcase } from "@/components/BrandShowcase";
import { AboutSection } from "@/components/AboutSection";
import { CompanyStats } from "@/components/CompanyStats";
import { CTA } from "@/components/CTA";
import Script from "next/script";

export default function Home() {
  // Create JSON-LD structured data for the homepage
  const homeJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Arges Makine - İş Makineleri Yedek Parça",
    description:
      "İş makineleri için en kaliteli yedek parçalar, hidrolik pompa, filtreler ve tüm parçalar uygun fiyatlarla.",
    url: "https://argesmakine.com",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2", ".about-section"],
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "İş Makinesi Yedek Parçaları",
          url: "https://argesmakine.com/products",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Hidrolik Pompalar ve Sistemler",
          url: "https://argesmakine.com/categories/hidrolik",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Filtreler ve Bakım Ürünleri",
          url: "https://argesmakine.com/categories/filtreler",
        },
      ],
    },
  };

  return (
    <>
      <Script
        id="home-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      <Hero />
      <FeaturedCategories />
      <BrandShowcase />
      <AboutSection />
      <CompanyStats />
      <CTA />
    </>
  );
}

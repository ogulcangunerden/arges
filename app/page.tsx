import { Hero } from "@/components/Hero";
import { FeaturedCategories } from "@/components/FeaturedCategories";
import { BrandShowcase } from "@/components/BrandShowcase";
import { AboutSection } from "@/components/AboutSection";
import { CompanyStats } from "@/components/CompanyStats";
import { CTA } from "@/components/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedCategories />
      <BrandShowcase />
      <AboutSection />
      <CompanyStats />
      <CTA />
    </>
  );
}

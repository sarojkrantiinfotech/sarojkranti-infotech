import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { ServicesSection } from "@/components/services-section";
import { WhyChooseUs } from "@/components/why-choose-us";
import { StatsSection, TechnologiesSection } from "@/components/stats-tech";
import { FeaturedProjects } from "@/components/featured-projects";
import { CTABanner } from "@/components/cta-banner";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />

      <section className="py-24 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-12">Trusted by Industry Leaders</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="text-3xl font-bold tracking-tighter">ACCENTURE</div>
            <div className="text-3xl font-bold tracking-tighter">VERCEL</div>
            <div className="text-3xl font-bold tracking-tighter">STRIPE</div>
            <div className="text-3xl font-bold tracking-tighter">OPENAI</div>
            <div className="text-3xl font-bold tracking-tighter">TURING</div>
          </div>
        </div>
      </section>

      <ServicesSection />
      <WhyChooseUs />
      <StatsSection />
      <TechnologiesSection />
      <FeaturedProjects />
      <CTABanner />

      <Footer />
    </main>
  );
}

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { ValuePropositionGrid } from "@/components/sections/value-proposition-grid";
import { FlowNarrative } from "@/components/sections/flow-narrative";
import { ModuleShowcase } from "@/components/sections/module-showcase";
import { AgentRoster } from "@/components/sections/agent-roster";
import { SolutionsOverview } from "@/components/sections/solutions-overview";
import { CaseStudies } from "@/components/sections/case-studies";
import { ResourceCenter } from "@/components/sections/resource-center";
import { FAQSection } from "@/components/sections/faq-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function Home() {
  return (
    <div className="relative">
      <BackgroundAura />
      <Navbar />
      <main>
        <HeroSection />
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-24 px-4 sm:px-8">
          <ValuePropositionGrid />
          <FlowNarrative />
          <ModuleShowcase />
          <AgentRoster />
          <SolutionsOverview />
          <CaseStudies />
          <ResourceCenter />
          <FAQSection />
          <ContactSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}

function BackgroundAura() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 select-none">
      <div className="absolute inset-x-0 top-20 mx-auto h-[34rem] w-[75%] max-w-5xl rounded-full bg-blue-50 blur-[180px]" />
      <div className="absolute left-10 top-80 h-72 w-72 rounded-full bg-[rgba(71,182,212,0.2)] blur-[160px]" />
      <div className="absolute right-10 top-32 h-64 w-64 rounded-full bg-[rgba(59,130,246,0.1)] blur-[150px]" />
    </div>
  );
}

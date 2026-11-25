import { useCallback, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { SignatureLoader } from './components/SignatureLoader';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { VelocityMarquee } from './components/VelocityMarquee';
import { ScrollManifesto } from './components/ScrollManifesto';
import { ScrubbedPathJourney } from './components/ScrubbedPathJourney';
import { PlatformShowcase } from './components/PlatformShowcase';
import { SecurityAndLegal } from './components/SecurityAndLegal';
import { DeploymentAndProof } from './components/DeploymentAndProof';
import { FluidFaqAccordion } from './components/FluidFaqAccordion';
import { DemoRequestSection } from './components/DemoRequestSection';

export default function App() {
  const [loaderDone, setLoaderDone] = useState(false);

  const handleLoaderComplete = useCallback(() => {
    setLoaderDone(true);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#F8FAFC] text-[#0B162C]">
        <SignatureLoader onComplete={handleLoaderComplete} />
        <Navbar onRequestDemo={() => scrollToSection('demo-request')} />
        <main>
          <HeroSection
            loaderDone={loaderDone}
            onRequestDemo={() => scrollToSection('demo-request')}
            onTrySimulator={() => scrollToSection('experience')}
          />
          <VelocityMarquee />
          <ScrollManifesto />
          <ScrubbedPathJourney />
          <PlatformShowcase />
          <SecurityAndLegal />
          <DeploymentAndProof onRequestDemo={() => scrollToSection('demo-request')} />
          <FluidFaqAccordion />
          <DemoRequestSection />
        </main>
      </div>
    </MotionConfig>
  );
}

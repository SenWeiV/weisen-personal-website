import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Methodology from '@/components/Methodology';
import Resume from '@/components/Resume';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Projects />
      <Methodology />
      <Resume />
      <Footer />
    </main>
  );
}

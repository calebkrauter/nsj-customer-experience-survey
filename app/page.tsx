import { Footer } from './frontend/components/Footer';
import { Hero } from './frontend/components/Hero';
import { LinkToForms } from './frontend/LinkToForms';

export default function Home() {
  return (
    <main className='main col'>
      <div className='centerX col'>
        <Hero />
        <LinkToForms></LinkToForms>
      </div>
      <Footer />
    </main>
  );
}

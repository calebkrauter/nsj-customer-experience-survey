import Markdown from 'react-markdown';
import { Footer } from '../frontend/components/Footer';
import { Hero } from '../frontend/components/Hero';

export default function PrivacyPolicy() {
  return (
    <main className='subject col centerX'>
      <Hero />
      <div className='privacyPolicy'>
        <Markdown>**Privacy Policy**</Markdown>
        <div className='mTop'></div>
        <Markdown>**Effective Date:** 02/06/2026</Markdown>
        <Markdown>
          This web app may collect survey responses and optional personal info
          (e.g., name, email, job title) to improve this app, our services or
          company culture. *We do not sell your information.* We may store,
          review, and use your data internally. Aggregated or anonymized data
          may be used for research or analytics. You can access, correct, or
          delete your data and opt out of communications where applicable.
        </Markdown>
        <div className='mTop'>
          For questions, contact:
          <a href='mailto:info@NorthStarMso.com' className='link'>
            info@NorthStarMso.com
          </a>
        </div>
      </div>
      <Footer />
    </main>
  );
}

import { Footer } from '@/app/frontend/components/Footer';
import { Form } from '@/app/frontend/form/Form';
import React from 'react';

// TODO 1. Store cookie and load cookie for "logged_in" and don't show modal based on cookie.
// TODO 2. Authenticate password.
// TODO 3. Include multiple potential password logins for different users.

interface Props {
  params: {
    surveyKey: string;
  };
}
export default function Home({ params }: Props) {
  async function getSurveyKey() {
    const { surveyKey } = await params;
    return surveyKey;
  }
  const surveyKey = React.use(getSurveyKey());
  return (
    <main className='main col'>
      <Form surveyKey={surveyKey} />
      <Footer />
    </main>
  );
}

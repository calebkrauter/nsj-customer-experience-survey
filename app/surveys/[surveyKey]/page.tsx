import { Form } from '@/app/frontend/form/Form';

interface Props {
  params: {
    surveyKey: string;
  };
}
export default async function Home({ params }: Props) {
  const { surveyKey } = await params;
  return (
    <main className='main'>
      <Form surveyKey={surveyKey} />
    </main>
  );
}

import { Prompt } from './Prompt';

export function Prompts() {
  return (
    <div>
      <Prompt
        title={'What brought you to North Star Jet?'}
        values={[
          'CAA',
          'World Fuel',
          'Prices',
          'Customer Service',
          'Word of Mouth',
          'Other',
        ]}
      />
      <Prompt
        title='What is your favorite amenity?'
        values={['Pop Corn', 'Merch', 'Coffee']}
      />
      <Prompt title='Would you return?' values={['Yes', 'No']} />
      <Prompt title='Would you return?' values={['Yes', 'No']} />
      <Prompt title='Would you return?' values={['Yes', 'No']} />
    </div>
  );
}

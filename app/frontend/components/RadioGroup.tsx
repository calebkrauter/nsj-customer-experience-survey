import { UseFormRegisterReturn } from 'react-hook-form';
import { KeyValue, SurveyQuestion } from '../types';
import { RadioCircle } from './RadioCircle';
import Markdown from 'react-markdown';

interface Props {
  question: SurveyQuestion;
  id: string;
  options: string[];
  error: string;
  register: UseFormRegisterReturn;
}
export function RadioGroup({ question, id, options, error, register }: Props) {
  return (
    <div
      className={`col ratingGroup radioGroup ${error ? 'error errorBorder' : ''}`}
      key={question.id}
    >
      <div className='subject multiSelectText'>
        <Markdown
          components={{
            p: ({ children }) => <label>{children}</label>,
          }}
        >
          {question.label}
        </Markdown>
      </div>
      {options.map((option, i) => {
        return (
          <div key={i}>
            <RadioCircle id={id} option={option} register={register} />
          </div>
        );
      })}
    </div>
  );
}

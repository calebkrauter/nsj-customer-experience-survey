import {
  Control,
  FieldValues,
  GetValuesConfig,
  UseFormGetValues,
  UseFormRegisterReturn,
  useController,
} from 'react-hook-form';
import { KeyValue, SurveyQuestion } from '../types';
import { CheckBox } from './CheckBox';
import { Dispatch, SetStateAction } from 'react';
import Markdown from 'react-markdown';

interface Props {
  question: SurveyQuestion;
  options: string[];
  error: string;
  register: UseFormRegisterReturn;
  submitAction: {
    submitted: boolean;
    setSubmitted: Dispatch<SetStateAction<boolean>>;
  };
}
export function CheckBoxes({
  question,
  options,
  error,
  register,
  submitAction,
}: Props) {
  return (
    <div
      className={`col ratingGroup radioGroup ${error ? 'error errorBorder' : ''}`}
      key={question.id}
    >
      <div className='subject'>
        <Markdown
          components={{
            p: ({ children }) => <label>{children}</label>,
          }}
        >
          {question.label}
        </Markdown>
      </div>{' '}
      {options.map((option, i) => {
        return (
          <div key={i}>
            <CheckBox
              option={option}
              register={register}
              submitAction={submitAction}
            ></CheckBox>
          </div>
        );
      })}
    </div>
  );
}

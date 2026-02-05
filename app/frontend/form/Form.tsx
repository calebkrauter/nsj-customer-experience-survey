'use client';

import { Stars } from '../components/Stars';
import { Dropdown } from '../components/Dropdown';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { InputField } from '../components/InputField';
import { TextBox } from '../components/TextBox';
import z from 'zod';
import { postSubmission } from '../requests/postSubmission';
import Markdown from 'react-markdown';
import { v4 as uuidv4 } from 'uuid';
import { FieldTypes, SurveyQuestion } from '../types';
import { Hero } from '../components/Hero';
import { surveys } from '../form-templates/registry';
import { RadioGroup } from '../components/RadioGroup';
import { CheckBoxes } from '../components/CheckBoxes';
import {
  placeholder,
  optionsDropdownSelect,
  optionsRatingRadio,
  optionsCheckBox,
} from './FormUtil';

interface Props {
  surveyKey: string;
}

export function Form({ surveyKey }: Props) {
  const questions: SurveyQuestion[] = surveys[surveyKey].questions;
  const [submitted, setSubmitted] = useState(false);
  const schema = z.object(
    questions.reduce(
      (result, field) => {
        if (field.type === FieldTypes.TEXT_INPUT) {
          result[field.id] = z.string().min(1);
        } else if (field.type === FieldTypes.TEXT_BOX && field.required) {
          result[field.id] = z.string().min(1);
        } else if (field.type === FieldTypes.STARS) {
          result[field.id] = z.coerce.number().min(1, 'Make selection');
        } else if (field.type === FieldTypes.DROPDOWN_SELECT) {
          result[field.id] = z.string().nonempty();
        } else if (field.type === FieldTypes.CHECK_BOX) {
          result[field.id] = z.array(z.string().nonempty()).nonempty();
        } else if (field.type === FieldTypes.RATING) {
          result[field.id] = z.preprocess(
            (val) => val ?? '',
            z.string().nonempty('Select a box'),
          );
        }
        return result;
      },
      {} as Record<string, z.ZodTypeAny>,
    ),
  );

  type FormValues = z.infer<typeof schema>;
  const [starRating, setStarRating] = useState(0);
  const SUBMITTER_KEY = 'submitterId';
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
    getValues,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onChange', // validate as soon as values change
  });

  const handleRatingChange = (value: number, i: number) => {
    setStarRating(0);
    setValue(questions[i].id, value, { shouldValidate: true });
  };

  const onSubmit: SubmitHandler<FormValues> = async () => {
    toast.success("We've received your feedback!");
    const submissionData = getValues();
    setSubmitted(true);
    reset();
    setStarRating(-1);
    postSubmission({
      responseId: uuidv4(),
      rowVersion: 0,
      surveyKey: surveys[surveyKey].surveyKey,
      submitterId: getSubmitterId(),
      submittedAt: new Date(),
      submissionData,
    });
  };
  const onInvalid: SubmitErrorHandler<FormValues> = () => {};

  function getSubmitterId() {
    let id = localStorage.getItem(SUBMITTER_KEY);
    if (!id) {
      id = uuidv4();
      localStorage.setItem(SUBMITTER_KEY, id);
    }
    return id;
  }
  return (
    <form
      className='surveryContainer'
      onSubmit={handleSubmit(onSubmit, onInvalid)}
    >
      <Toaster position='top-center' reverseOrder={false} />
      <Hero />
      <div className='surveyStructure' id='surveyStructure'>
        {questions.map((question, i) => {
          switch (question.type) {
            case FieldTypes.TEXT_INPUT:
              return (
                <InputField
                  key={questions[i].id}
                  id={questions[i].id}
                  title={questions[i].label}
                  placeholder={placeholder(i, surveyKey)}
                  error={errors[questions[i].id]?.message as string}
                  showLabel
                  register={register(questions[i].id)}
                  type={questions[i].type}
                />
              );

            case FieldTypes.DROPDOWN_SELECT:
              return (
                <Dropdown
                  key={questions[i].id}
                  id={questions[i].id}
                  title={questions[i].label}
                  options={optionsDropdownSelect(i, surveyKey)}
                  error={errors[questions[i].id]?.message as string}
                  showLabel
                  register={register(questions[i].id)}
                />
              );
            case FieldTypes.TEXT_BOX:
              return (
                <TextBox
                  key={questions[i].id}
                  id={questions[i].id}
                  title={questions[i].label}
                  placeholder={placeholder(i, surveyKey)}
                  error={errors[questions[i].id]?.message as string}
                  showLabel
                  register={register(questions[i].id)}
                />
              );
            case FieldTypes.STARS:
              return (
                <Stars
                  key={questions[i].id}
                  itr={i}
                  title={questions[i].label}
                  error={errors[questions[i].id]?.message as string}
                  updateRating={handleRatingChange}
                  showLabel={false}
                  reset={{ getRating: starRating, setRating: setStarRating }}
                />
              );
            case FieldTypes.QUESTION_BASE:
              return (
                // DESCRIPTION
                <Markdown
                  key={questions[i].id}
                  components={{
                    p: ({ children }) => (
                      <p className='subject description'>{children}</p>
                    ),
                  }}
                >
                  {questions[i].label}
                </Markdown>
              );
            case FieldTypes.RATING:
              return (
                <RadioGroup
                  key={questions[i].id}
                  id={questions[i].id}
                  question={questions[i]}
                  options={optionsRatingRadio(i, surveyKey)}
                  error={errors[questions[i].id]?.message as string}
                  register={register(questions[i].id)}
                />
              );
            case FieldTypes.CHECK_BOX:
              return (
                <CheckBoxes
                  key={questions[i].id}
                  question={questions[i]}
                  options={optionsCheckBox(i, surveyKey)}
                  error={errors[questions[i].id]?.message as string}
                  register={register(questions[i].id)}
                  submitAction={{ submitted, setSubmitted }}
                />
              );
          }

          return null;
        })}
      </div>
      <button type='submit' className='submitButton'>
        Submit
      </button>
    </form>
  );
}

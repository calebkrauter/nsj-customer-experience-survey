'use client';

import { Stars } from '../components/Stars';
import { Dropdown } from '../components/Dropdown';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { InputField } from '../components/InputField';
import { TextBox } from '../components/TextBox';
import z, { ZodNumber, ZodString } from 'zod';
// import { schema } from '../validation/schema';
import { postSubmission } from '../requests/postSubmission';

import { v4 as uuidv4 } from 'uuid';

import {
  FieldTypes,
  hasOptions,
  hasPlaceholder,
  SurveyDefinition,
  SurveyQuestion,
} from '../types';
import { Hero } from '../components/Hero';
import { surveys } from '../form-templates/registry';

// Create a dynamic Zod schema

interface Props {
  surveyKey: string;
}
export function Form({ surveyKey }: Props) {
  const questions: SurveyQuestion[] = surveys[surveyKey].questions;
  const schema = z.object(
    questions.reduce(
      (result, field) => {
        if (field.type === FieldTypes.TEXT_INPUT) {
          result[field.id] = z.string().min(1);
        } else if (field.type === FieldTypes.TEXT_BOX) {
          result[field.id] = z.string().min(1);
        } else if (field.type === FieldTypes.STARS) {
          result[field.id] = z.coerce.number().min(1, 'Select rating');
        } else if (field.type === FieldTypes.DROPDOWN_SELECT_ONE) {
          result[field.id] = z.string().refine((val) => val !== '');
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
    console.log(submissionData);
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
  function placeholder(i: number) {
    return hasPlaceholder(questions[i]) ? questions[i].placeholder : '';
  }

  function options(i: number) {
    return hasOptions(questions[i]) ? questions[i].options : [];
  }

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
                  placeholder={placeholder(i)}
                  error={errors[questions[i].id]?.message as string}
                  showLabel
                  register={register(questions[i].id)}
                  type={questions[i].type}
                />
              );

            case FieldTypes.DROPDOWN_SELECT_ONE:
              return (
                <Dropdown
                  key={questions[i].id}
                  id={questions[i].id}
                  title={questions[i].label}
                  options={options(i)}
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
                  placeholder={placeholder(i)}
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

'use client';
import Image from 'next/image';

import * as z from 'zod';
import { Stars } from '../components/Stars';
import { Dropdown } from '../components/Dropdown';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const schema = z.object({
  tail_number: z
    .string()
    .nonempty('Tail Number Required')
    .regex(/^[A-Za-z0-9-]{1,7}$/, {
      message: 'Enter a valid Tail Number e.g. N1234',
    }),
  select1: z
    .string()
    .refine((val) => val !== '', { message: 'Select an option' }),
  select2: z
    .string()
    .refine((val) => val !== '', { message: 'Select an option' }),
  select3: z
    .string()
    .refine((val) => val !== '', { message: 'Select an option' }),
  rating1: z.number().gt(0, 'Select rating'),
  rating2: z.number().gt(0, 'Select rating'),
  rating3: z.number().gt(0, 'Select rating'),
  rating1Textbox: z.string().min(1, { message: 'Required response' }),
  rating2Textbox: z.string().min(1, { message: 'Required response' }),
  rating3Textbox: z.string().min(1, { message: 'Required response' }),
});

export function Form() {
  type FormValues = z.infer<typeof schema>;
  const [starRating, setStarRating] = useState(0);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      tail_number: '',
      rating1: 0,
      rating2: 0,
      rating3: 0,
      rating1Textbox: '',
      rating2Textbox: '',
      rating3Textbox: '',
    },
    mode: 'onChange', // validate as soon as values change
  });
  const handleRating1Change = (value: number) => {
    setStarRating(0);
    setValue('rating1', value, { shouldValidate: true });
  };
  const handleRating2Change = (value: number) => {
    setStarRating(0);
    setValue('rating2', value, { shouldValidate: true });
  };
  const handleRating3Change = (value: number) => {
    setStarRating(0);
    setValue('rating3', value, { shouldValidate: true });
  };
  const onSubmit: SubmitHandler<FormValues> = () => {
    toast.success("We've received your feedback!");
    reset();
    setStarRating(-1);
  };
  const onInvalid: SubmitErrorHandler<FormValues> = () => {};
  return (
    <form
      className='surveryContainer'
      onSubmit={handleSubmit(onSubmit, onInvalid)}
    >
      <Toaster position='top-center' reverseOrder={false} />
      <Image
        src='/nsj-logo.jpg'
        width={125}
        height={125}
        alt='North Star Jet Logo'
        className='logo'
      ></Image>

      <div className='surveyStructure' id='surveyStructure'>
        <div className='tailInputContainer col input2'>
          <label
            className={`subject ${errors.tail_number?.message ? 'error' : ''}`}
            htmlFor='tail_number'
          >
            Tail Number
          </label>
          <input
            placeholder='N1234'
            className={`fields ${errors.tail_number?.message ? 'errorOutline' : ' outline'}`}
            id='tail_number'
            {...register('tail_number')}
          ></input>
          {/* <div className={`${errors.tail_number?.message ? 'error' : ''}`}>
            {errors.tail_number?.message}
          </div> */}
        </div>
        <Dropdown
          title={'What brought you to North Star Jet?'}
          values={[
            'CAA',
            'World Fuel',
            'Prices',
            'Customer Service',
            'Word of Mouth',
            'Other',
          ]}
          error={errors.select1?.message as string}
          register={{ ...register('select1') }}
        />
        <Dropdown
          title='What is your favorite amenity?'
          values={['Pop Corn', 'Merch', 'Coffee']}
          error={errors.select2?.message as string}
          register={{ ...register('select2') }}
        />
        <Dropdown
          title='Would you return?'
          values={['Yes', 'No']}
          error={errors.select3?.message as string}
          register={{ ...register('select3') }}
        />

        <div
          className={`subject ratingHeader ${errors.rating1Textbox ? 'error' : ''}`}
        >
          <div>How was our Customer Service?</div>
          <Stars
            errorRating={errors.rating1?.message as string}
            updateRating={handleRating1Change}
            reset={{ getRating: starRating, setRating: setStarRating }}
          />
        </div>
        <textarea
          className={`fields textarea ${(errors.rating1Textbox?.message as string) ? 'errorOutline' : 'outline'}`}
          placeholder='What about us stood out to you?'
          {...register('rating1Textbox')}
        ></textarea>
        {/* <div
          className={`${(errors.rating1Textbox?.message as string) ? 'error' : ''}`}
        >
          {errors.rating1Textbox?.message as string}
        </div> */}

        <div
          className={`subject ratingHeader ${errors.rating2Textbox ? 'error' : ''}`}
        >
          <div>How did you like our amenities?</div>
          <Stars
            errorRating={errors.rating2?.message as string}
            updateRating={handleRating2Change}
            reset={{ getRating: starRating, setRating: setStarRating }}
          />
        </div>
        <textarea
          className={`fields textarea ${(errors.rating2Textbox?.message as string) ? 'errorOutline' : 'outline'}`}
          placeholder='Did any amenities stand out to you?'
          {...register('rating2Textbox')}
        ></textarea>
        {/* <div
          className={`${(errors.rating2Textbox?.message as string) ? 'error' : ''}`}
        >
          {errors.rating2Textbox?.message as string}
        </div> */}

        <div
          className={`subject ratingHeader ${errors.rating3Textbox ? 'error' : ''}`}
        >
          <div> How did you like our pricing?</div>
          <Stars
            errorRating={errors.rating3?.message as string}
            updateRating={handleRating3Change}
            reset={{ getRating: starRating, setRating: setStarRating }}
          />
        </div>
        <textarea
          className={`fields textarea ${(errors.rating3Textbox?.message as string) ? 'errorOutline' : 'outline'}`}
          placeholder='How do we compare?'
          {...register('rating3Textbox')}
        ></textarea>
        {/* <div
          className={`${(errors.rating3Textbox?.message as string) ? 'error' : ''}`}
        >
          {errors.rating3Textbox?.message as string}
        </div> */}
      </div>
      <button type='submit' className='submitButton'>
        Submit
      </button>
    </form>
  );
}

'use client';
import { UseFormRegisterReturn } from 'react-hook-form';
interface Props {
  title?: string;
  placeholder: string;
  error: string;
  register: UseFormRegisterReturn;
}

export function InputField({ title, placeholder, error, register }: Props) {
  return (
    <div className='tailInputContainer col input2'>
      {title && (
        <label
          className={`subject ${error ? 'error' : ''}`}
          htmlFor='tail_number'
        >
          {title}
        </label>
      )}
      <input
        placeholder='N1234'
        className={`fields ${error ? 'errorOutline' : ' outline'}`}
        id='tail_number'
        {...register}
      ></input>
    </div>
  );
}

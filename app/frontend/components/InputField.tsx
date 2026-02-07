'use client';
import { InputHTMLAttributes, HTMLInputTypeAttribute } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
interface Props {
  id: string;
  title?: string;
  placeholder: string;
  error: string;
  register: UseFormRegisterReturn;
  type: HTMLInputTypeAttribute;
  showLabel?: boolean;
}

export function InputField({
  id,
  title,
  placeholder,
  error,
  register,
  type,
  showLabel,
}: Props) {
  return (
    <div className='tailInputContainer col input2'>
      {title && showLabel && (
        <label className={`subject ${error ? 'error' : ''}`} htmlFor={id}>
          {title}
        </label>
      )}
      <input
        placeholder={placeholder}
        className={`fields inputText ${error ? 'errorOutline' : ' outline'}`}
        id={id}
        {...register}
        type={type}
      ></input>
    </div>
  );
}

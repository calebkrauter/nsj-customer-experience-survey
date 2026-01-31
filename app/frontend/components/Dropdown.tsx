'use client';

import { useId } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
interface Props {
  title?: string;
  options: string[];
  register: UseFormRegisterReturn;
  error: string;
  id: string;
  showLabel?: boolean;
}
export function Dropdown({
  title,
  options,
  register,
  error,
  id,
  showLabel,
}: Props) {
  const defaultVal: string = 'Select an option';

  return (
    <div className='prompt errorMarginBottom'>
      {title && showLabel && (
        <label className={`subject ${error ? 'errorColor' : ''}`} htmlFor={id}>
          {title}
        </label>
      )}
      <select
        defaultValue={''}
        className={`dropdown fields ${error ? 'error errorOutline' : 'outline'}`}
        id={id}
        {...register}
      >
        <option
          value=''
          id='defaultOption'
          className='defaultOption'
          disabled
          hidden
        >
          &nbsp;&nbsp;{defaultVal}
        </option>

        {options.map((option, i) => {
          return (
            <option value={option} key={i}>
              &nbsp;&nbsp;{option}
            </option>
          );
        })}
      </select>
    </div>
  );
}

'use client';

import { useId } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
interface Props {
  title?: string;
  options: string[];
  register: UseFormRegisterReturn;
  error: string;
}
export function Dropdown({ title, options, register, error }: Props) {
  const suervey_options_id = useId();
  const defaultVal: string = 'Select an option';

  return (
    <div className='prompt errorMarginBottom'>
      {title && (
        <label
          className={`subject ${error ? 'errorColor' : ''}`}
          htmlFor={suervey_options_id}
        >
          {title}
        </label>
      )}
      <select
        defaultValue={''}
        className={`dropdown fields ${error ? 'error errorOutline' : 'outline'}`}
        id={suervey_options_id}
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

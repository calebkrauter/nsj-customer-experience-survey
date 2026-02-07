'use client';

import { UseFormRegisterReturn } from 'react-hook-form';
import { KeyValue } from '../types';
interface Props {
  title?: string;
  options: object[];
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
        <option value='' id='defaultOption' disabled hidden>
          &nbsp;&nbsp;{defaultVal}
        </option>

        {options.map((option, i) => {
          return (
            <option
              value={Object.entries(option)[KeyValue.KEY][KeyValue.VALUE]}
              key={i}
            >
              &nbsp;&nbsp;{Object.entries(option)[KeyValue.KEY][KeyValue.VALUE]}
            </option>
          );
        })}
      </select>
    </div>
  );
}

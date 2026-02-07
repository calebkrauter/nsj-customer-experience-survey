import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck, faSquare } from '@fortawesome/free-regular-svg-icons';
import { UseFormRegisterReturn } from 'react-hook-form';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { KeyValue } from '../types';

interface Props {
  option: string;
  register: UseFormRegisterReturn;
  submitAction: {
    submitted: boolean;
    setSubmitted: Dispatch<SetStateAction<boolean>>;
  };
}

export function CheckBox({ option, register, submitAction }: Props) {
  const [checked, setChecked] = useState<boolean>(false);
  useEffect(() => {
    if (submitAction.submitted === true) {
      (() => {
        setChecked(!submitAction.submitted);
        submitAction.setSubmitted(!submitAction.submitted);
      })();
    }
  }, [submitAction, submitAction.submitted]);
  return (
    <label className='row spaceAbove interactiveLabel'>
      <input
        value={Object.entries(option)[KeyValue.KEY][KeyValue.KEY]}
        type='checkbox'
        id={option}
        {...register}
        onChange={(e) => {
          setChecked(e.target.checked);
          register.onChange(e);
        }}
      />
      {checked && (
        <FontAwesomeIcon icon={faSquareCheck} className='checkmark' />
      )}
      {!checked && <FontAwesomeIcon icon={faSquare} className='square' />}

      <div className='subject selectionText'>
        {Object.entries(option)[KeyValue.KEY][KeyValue.VALUE]}
      </div>
    </label>
  );
}

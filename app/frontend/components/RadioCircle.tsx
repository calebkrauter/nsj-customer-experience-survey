import { UseFormRegisterReturn } from 'react-hook-form';
import { KeyValue, SurveyQuestion } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDot } from '@fortawesome/free-solid-svg-icons';

interface Props {
  id: string;
  option: string;
  register: UseFormRegisterReturn;
}

export function RadioCircle({ id, option, register }: Props) {
  return (
    <label className='subject row spaceAbove interactiveLabel'>
      <input
        type='radio'
        id={id}
        value={Object.entries(option)[KeyValue.KEY][KeyValue.KEY]}
        {...register}
        defaultChecked={false}
      />
      <FontAwesomeIcon icon={faCircleDot} className='circle' />

      <div className='selectionText'>
        {Object.entries(option)[KeyValue.KEY][KeyValue.VALUE]}
      </div>
    </label>
  );
}

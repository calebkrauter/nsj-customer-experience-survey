import { UseFormRegisterReturn } from 'react-hook-form';

interface Props {
  id: string;
  title?: string;
  placeholder: string;
  error: string;
  register: UseFormRegisterReturn;
  showLabel?: boolean;
}

export function TextBox({
  id,
  title,
  placeholder,
  error,
  register,
  showLabel,
}: Props) {
  return (
    <div>
      {title && showLabel && (
        <div
          className={`subject ratingHeader textBoxTitle ${error ? 'error' : ''}`}
        >
          {title}
        </div>
      )}
      <textarea
        id={id}
        className={`fields textarea ${error ? 'errorOutline' : 'outline'}`}
        placeholder={placeholder}
        {...register}
      ></textarea>
    </div>
  );
}

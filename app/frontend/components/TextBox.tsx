import { UseFormRegisterReturn } from 'react-hook-form';

interface Props {
  title?: string;
  placeholder: string;
  error: string;
  register: UseFormRegisterReturn;
}

export function TextBox({ title, placeholder, error, register }: Props) {
  return (
    <div>
      <div
        className={`subject ratingHeader textBoxTitle ${error ? 'error' : ''}`}
      >
        {title}
      </div>
      <textarea
        className={`fields textarea ${error ? 'errorOutline' : 'outline'}`}
        placeholder={placeholder}
        {...register}
      ></textarea>
    </div>
  );
}

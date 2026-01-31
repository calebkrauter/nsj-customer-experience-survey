import * as z from 'zod';

export const schema = z.object({
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
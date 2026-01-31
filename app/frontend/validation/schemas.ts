import * as z from 'zod';

const regex = {
  tail_number: /^[A-Za-z0-9-]{1,7}$/,
};

const tailNumberSchema = z.object({
  inputTailNumber: z.string().nonempty().regex(regex.tail_number),
});

const textNonEmptySchema = z.object({
  inputTailNumber: z.string().nonempty(),
});

const selectOneOptionSchema = z.object({
  selectOneOption: z.string().refine((val) => val !== ''),
});

const starRatingSchema = z.object({
  starRating: z.number().gt(0),
});

export const schemas = {
  tailNumber: tailNumberSchema,
  textNonEmpty: textNonEmptySchema,
  selectOneOption: selectOneOptionSchema,
  starRating: starRatingSchema,
};
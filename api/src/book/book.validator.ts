import { z } from "zod";
import { IResult } from './book';

const CreateBookInputValidation = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  isbn: z.string().min(10).max(13, "ISBN must be between 10 and 13 characters"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  categoryId: z.number().int().positive("Category ID must be a positive integer"),
  modifiedBy: z.number().int(),
});

const UpdateBookInputValidation = z.object({
  title: z.string().optional(),
  author: z.string().optional(),
  isbn: z.string().min(10).max(13).optional(),
  quantity: z.number().min(1).optional(),
  categoryId: z.number().int().positive().optional(),
  modifiedBy: z.number().int(),
});

export const createBookInputValidate = (input: any): IResult => {
  const result = CreateBookInputValidation.safeParse(input);

  return {
    isSuccess: result.success,
    msg: !result.success ? result.error.errors.map((e) => e.message).join(", ") : null,
    data: !result.success ? null : result.data,
    errorDetail: !result.success ? result.error.errors : null,
  }
}

export const updateBookInputValidate = (input: any): IResult => {
  const result = UpdateBookInputValidation.safeParse(input);

  return {
    isSuccess: result.success,
    msg: !result.success ? result.error.errors.map((e) => e.message).join(", ") : null,
    data: !result.success ? null : result.data,
    errorDetail: !result.success ? result.error.errors : null,
  }
}

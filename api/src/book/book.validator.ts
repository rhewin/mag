import { z } from "zod";
import { IBookResult } from './book';
import { fmtArrayErrMessage } from '../utils/util.formatter';
import validator from "validator";

const QueryListInputValidation = z.object({
  pageNum: z.number().int().positive().optional(),
  perPage: z.number().int().positive().optional()
});

const CreateBookInputValidation = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  isbn: z.string().refine((value) => validator.isISBN(value), {
    message: "Invalid ISBN format (i.e. 978-3-16-148410-0)",
  }),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  categoryId: z.number().int().positive("Category ID must be a positive integer"),
  modifiedBy: z.number().int(),
});

const UpdateBookInputValidation = z.object({
  title: z.string().optional(),
  author: z.string().optional(),
  isbn: z.string().refine((value) => validator.isISBN(value), {
    message: "Invalid ISBN format (i.e. 978-3-16-148410-0)",
  }).optional(),
  quantity: z.number().min(1).optional(),
  categoryId: z.number().int().positive().optional(),
  modifiedBy: z.number().int(),
});

const IdInputValidation = z.object({
  id: z.number().int().positive().min(1),
});

const validateInput = (validationSchema: z.ZodSchema, input: unknown): IBookResult => {
  const result = validationSchema.safeParse(input);

  if (!result.success) {
    const arrErrors: z.ZodIssue[] = result.error.errors
    return {
      isSuccess: result.success,
      message: fmtArrayErrMessage(arrErrors),
      data: null,
      errorDetail: arrErrors,
    }
  }

  return {
    isSuccess: result.success,
    message: null,
    data: result.data,
    errorDetail: null,
  }
}

export const queryListInputValidate = (input: z.infer<typeof QueryListInputValidation>): IBookResult => {
  return validateInput(QueryListInputValidation, input);
}

export const idInputValidate = (input: z.infer<typeof IdInputValidation>): IBookResult => {
  return validateInput(IdInputValidation, input);
}

export const createBookInputValidate = (input: z.infer<typeof CreateBookInputValidation>): IBookResult => {
  return validateInput(CreateBookInputValidation, input);
}

export const updateBookInputValidate = (input: z.infer<typeof UpdateBookInputValidation>): IBookResult => {
  return validateInput(UpdateBookInputValidation, input);
}

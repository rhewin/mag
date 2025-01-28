import { z } from "zod";
import { ILendResult } from './lend';
import { fmtArrayErrMessage } from '../utils/util.formatter';


const dateValidationRule = z.date().refine((date) => !isNaN(date.getTime()), {
  message: "Invalid date format",
});

const QueryListInputValidation = z.object({
  pageNum: z.number().int().positive().optional(),
  perPage: z.number().int().positive().optional()
});

const CreateLendInputValidation = z.object({
  memberId: z.number().min(1, "Member ID is required"),
  bookId: z.number().min(1, "Book ID is required"),
  borrowedDate: dateValidationRule,
  dueDate: dateValidationRule,
  returnDate: dateValidationRule.optional(),
  status: z.enum(["borrowed", "returned", "returned-late"]).optional(),
  modifiedBy: z.number().int()
});

const UpdateLendInputValidation = z.object({
  memberId: z.number().min(1, "Member ID is required").optional(),
  bookId: z.number().min(1, "Book ID is required").optional(),
  borrowedDate: dateValidationRule.optional(),
  dueDate: dateValidationRule.optional(),
  returnDate: dateValidationRule.optional(),
  status: z.enum(["borrowed", "returned", "returned-late"]).optional(),
  modifiedBy: z.number().int()
});

const IdInputValidation = z.object({
  id: z.number().int().positive().min(1),
});

const validateInput = (validationSchema: z.ZodSchema, input: unknown): ILendResult => {
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

export const queryListInputValidate = (input: z.infer<typeof QueryListInputValidation>): ILendResult => {
  return validateInput(QueryListInputValidation, input);
}

export const idInputValidate = (input: z.infer<typeof IdInputValidation>): ILendResult => {
  return validateInput(IdInputValidation, input);
}

export const createLendInputValidate = (input: z.infer<typeof CreateLendInputValidation>): ILendResult => {
  return validateInput(CreateLendInputValidation, input);
}

export const updateLendInputValidate = (input: z.infer<typeof UpdateLendInputValidation>): ILendResult => {
  return validateInput(UpdateLendInputValidation, input);
}

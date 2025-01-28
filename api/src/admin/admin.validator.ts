import { z } from "zod";
import { IAdminResult } from './admin';
import { fmtArrayErrMessage } from '../utils/util.formatter';


const QueryListInputValidation = z.object({
  pageNum: z.number().int().positive().optional(),
  perPage: z.number().int().positive().optional()
});

const CreateAdminInputValidation = z.object({
  uuid: z.string().min(1, "UUID is required"),
  adminId: z.string().min(1, "Admin ID is required"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(8, "Password is required"),
  firstname: z.string().min(1, "Firstname is required"),
  lastname: z.string().optional(),
});

const UpdateAdminInputValidation = z.object({
  uuid: z.string().optional().superRefine((val, ctx) => {
    if (val) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "UUID cannot be updated",
      });
    }
  }),
  adminId: z.string().optional().superRefine((val, ctx) => {
    if (val) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Admin ID cannot be updated",
      });
    }
  }),
  email: z.string().email("Invalid email format").optional(),
  passwod: z.string().optional(),
  firstname: z.string().optional(),
  lastname: z.string().optional(),
});

const IdInputValidation = z.object({
  id: z.number().int().positive().min(1),
});

const LoginInputValidation = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(1, "Password is required")
});

const validateInput = (validationSchema: z.ZodSchema, input: unknown): IAdminResult => {
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

export const queryListInputValidate = (input: z.infer<typeof QueryListInputValidation>): IAdminResult => {
  return validateInput(QueryListInputValidation, input);
}

export const idInputValidate = (input: z.infer<typeof IdInputValidation>): IAdminResult => {
  return validateInput(IdInputValidation, input);
}

export const createAdminInputValidate = (input: z.infer<typeof CreateAdminInputValidation>): IAdminResult => {
  return validateInput(CreateAdminInputValidation, input);
}

export const updateAdminInputValidate = (input: z.infer<typeof UpdateAdminInputValidation>): IAdminResult => {
  return validateInput(UpdateAdminInputValidation, input);
}

export const LoginInputValidate = (input: z.infer<typeof LoginInputValidation>): IAdminResult => {
  return validateInput(LoginInputValidation, input);
}

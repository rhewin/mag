import { z } from "zod";
import { IMemberResult } from './member';
import { fmtArrayErrMessage } from '../utils/util.formatter';
import validator from "validator";


const QueryListInputValidation = z.object({
  pageNum: z.number().int().positive().optional(),
  perPage: z.number().int().positive().optional()
});

const CreateMemberInputValidation = z.object({
  memberId: z.string().min(1, "Member ID is required"),
  firstname: z.string().min(1, "Firstname is required"),
  lastname: z.string().optional(),
  email: z.string().email("Invalid email format").min(1, "Email is required"),
  phone: z.string().refine((value) => validator.isMobilePhone(value), {
    message: "Invalid phone format",
  }),
  status: z.enum(["active", "inactive"]).optional(),
  modifiedBy: z.number().int(),
});

const UpdateMemberInputValidation = z.object({
  memberId: z.string().optional().superRefine((val, ctx) => {
    if (val) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Member ID cannot be updated",
      });
    }
  }),
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  email: z.string().email("Invalid email format").optional(),
  phone: z.string().refine((value) => validator.isMobilePhone(value), {
    message: "Invalid phone format",
  }).optional(),
  status: z.enum(["active", "inactive"]).optional(),
  modifiedBy: z.number().int(),
});

const IdInputValidation = z.object({
  id: z.number().int().positive().min(1),
});

const validateInput = (validationSchema: z.ZodSchema, input: unknown): IMemberResult => {
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

export const queryListInputValidate = (input: z.infer<typeof QueryListInputValidation>): IMemberResult => {
  return validateInput(QueryListInputValidation, input);
}

export const idInputValidate = (input: z.infer<typeof IdInputValidation>): IMemberResult => {
  return validateInput(IdInputValidation, input);
}

export const createMemberInputValidate = (input: z.infer<typeof CreateMemberInputValidation>): IMemberResult => {
  return validateInput(CreateMemberInputValidation, input);
}

export const updateMemberInputValidate = (input: z.infer<typeof UpdateMemberInputValidation>): IMemberResult => {
  return validateInput(UpdateMemberInputValidation, input);
}

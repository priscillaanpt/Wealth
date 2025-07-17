import { z } from "zod";

export const signinSchema = z.object({
  email: z
    .string()
    .nonempty({
      message: "Email is required",
    })
    .email({
      message: "Invalid email format",
    }),
  password: z.string().nonempty({
    message: "Password is required",
  }),
});

export const infoFormSchema = z.object({
  name: z.string().nonempty(),
  job: z.string().nonempty({ message: "Job is required!" }),
  company: z.string().nonempty({ message: "Company Name is required!" }),
  country: z.string().nonempty({ message: "Country is required!" }),
  zipCode: z.string().regex(/^\d{5}$/, {
    message: "Must be exactly 5 digits",
  }),
  city: z.string().nonempty({ message: "City is required!" }),
});

export const forgetFormSchema = z.object({
  email: z
    .string()
    .nonempty({
      message: "Email is required",
    })
    .email({
      message: "Invalid email format",
    }),
});

export const changePasswordFormSchema = z.object({
  password: z.string().nonempty({
    message: "Password is required",
  }),
  confirmPassword: z.string().nonempty({
    message: "Password is required",
  }),
});

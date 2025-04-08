import yup from "yup";

export const userValidateSchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(3, "UserName must be atleast 3 characters")
    .optional(),
  email: yup.string().email("The email is not valid one").required(),
  password: yup
    .string()
    .min(4, "Password must be atleast 4 characters")
    .required(),
});

import * as yup from "yup";

const registerSchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(3, "userName must be at least 3 characters")
    .max(20, "userName must be at most 20 characters"),
  email: yup.string().email("The email is not a valid one").required(),
  password: yup.string().min(8, "Password must be at least 8 characters"),
});

export default registerSchema;

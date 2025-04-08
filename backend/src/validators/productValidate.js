import yup from "yup";

export const productValidateSchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(3, "name must be atleast 3 characters")
    .required(),
  category: yup
    .string()
    .trim()
    .min(3, "category must be atleast 3 characters")
    .required(),
  description: yup
    .string()
    .trim()
    .min(5, "description must be atleast 5 characters")
    .required(),
  price: yup.number().positive("price must be positive").required(),
});

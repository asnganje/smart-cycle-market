import { isValidObjectId } from "mongoose";
import * as yup from "yup";
import categories from "./categories";
import { parseISO } from "date-fns";

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
yup.addMethod(yup.string, "email", function validateEmail(message) {
  return this.matches(emailRegex, {
    message,
    name: "email",
    excludeEmptyString: true,
  });
});

const tokenAndId = {
  id: yup.string().test({
    name: "valid-id",
    message: "Invalid user-id",
    test: (value) => {
      return isValidObjectId(value);
    },
  }),
  token: yup.string().required("Token is required"),
};

const password = {
  password: yup
    .string()
    .min(8, "Password should be at least eight characters long!")
    .required("Password is required"),
};
export const NewUserSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  ...password,
});

export const VerifyTokenSchema = yup.object({
  ...tokenAndId,
});

export const ResetPasswordSchema = yup.object({
  ...tokenAndId,
  ...password,
});

export const newProductSchema = yup.object({
  name: yup.string().required("Name is required!"),
  description: yup.string().required("Description is required!"),
  category: yup
    .string()
    .oneOf(categories, "Invalid category!")
    .required("Category is required!"),
  price: yup
    .string()
    .transform((value) => {
      if (isNaN(+value)) return "";
      return +value;
    })
    .required("Price is required!"),
  purchaseDate: yup
    .string()
    .transform((value) => {
      try {
        return parseISO(value);
      } catch (error) {
        return "";
      }
    })
    .required("Purchase date is required!"),
});

export const updateProductSchema = yup.object({
  name: yup.string(),
  description: yup.string(),
  category: yup
    .string()
    .oneOf(categories, "Invalid category!"),
  price: yup
    .string()
    .transform((value) => (isNaN(+value) ? undefined : +value)),
  purchaseDate: yup
    .string()
    .transform((value) => {
      try {
        return parseISO(value);
      } catch (error) {
        return undefined;
      }
    }),
});

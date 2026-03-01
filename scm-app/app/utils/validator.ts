import * as yup from "yup";

type ValidationResult<T> = { error?: string; values?: T } 

export const yupValidator = async <T extends object>(
  schema: yup.Schema,
  values: T,
): Promise<ValidationResult<T>>=> {
  try {
    const data = await schema.validate(values);
    return {values: data}
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return {error: error.message}
    } else {
      return {error: (error as any).message}
    }
  }
};

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
yup.addMethod(yup.string, "email", function validateEmail(message) {
  return this.matches(emailRegex, {
    message,
    name: "email",
    excludeEmptyString: true,
  });
});

export const NewUserSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be at least eight characters long!")
    .required("Password is required"),
});

export const signInSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be at least eight characters long!")
    .required("Password is required"),
});

export const forgotPassSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required")
});

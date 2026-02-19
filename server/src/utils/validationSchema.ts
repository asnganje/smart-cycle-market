import * as yup from "yup"

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
yup.addMethod(yup.string, 'email', function validateEmail(message) {
  return this.matches(emailRegex, {
    message,
    name: 'email',
    excludeEmptyString: true,
  });
});

export const NewUserSchema = yup.object({
  name: yup.string().required("Name is required"),
  email:yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(8, "Password should be at least eight characters long!").required("Password is required")
}) 
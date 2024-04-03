import * as Yup from "yup";
export const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Email Required"),
  password: Yup.string()
    .max(10, "Must be 10 characters only")
    .min(8, "Minimum of 8 characters only")
    .required("password required"),
});

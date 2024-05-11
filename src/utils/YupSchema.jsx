import * as Yup from "yup";
export const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Email Required"),
  password: Yup.string()
    .max(10, "Must be 10 characters only")
    .min(8, "Minimum of 8 characters only")
    .required("password required"),
});

export const RegisterSchema = Yup.object().shape({
  first_name: Yup.string().required("First Name Required"),
  last_name: Yup.string().required("Last Name Required"),
  company_name: Yup.string().required("Company Required"),
  phone: Yup.string()
    .required("No Number Provided")
    .max(11, "Number is too long! - Should be 11 characters long."),
  email: Yup.string().email("Invalid email address").required("Email Required"),
  password: Yup.string()
    .max(10, "Must be 10 characters only")
    .min(6, "Minimum of 8 characters only")
    .required("password required"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password")], "Password must match")
    .required("Confirm Password is required"),
});

export const ItemSchema = Yup.object().shape({
  image: Yup.string().nullable(), // image is optional
  name: Yup.string().required("Item name is required"),
  description: Yup.string().required("Item description is required"),
  quantity: Yup.number()
    .required("Item quantity is required")
    .min(1)
    .typeError("Quantity must be a number"),
});

export const CompanySchema = Yup.object().shape({
  company_name: Yup.string().required("Company name is required"),
  company_description: Yup.string().nullable("Company description is required"),
  address: Yup.string().required("Company address is required"),
});

export const TransferItemSchema = Yup.object().shape({
  image: Yup.string().nullable(), // image is optional
  name: Yup.string().required("Item name is required"),
  message: Yup.string().nullable("Item message is optional"),
  receiver_name: Yup.string().required("Receiver name is required"),
  address_to: Yup.string().optional("Address is optional"),
  number: Yup.string().nullable("Receiver number is required").min(11).max(11),
  // quantity: Yup.number()
  //   .required("Item quantity is required")
  //   .min(1)
  //   .typeError("Quantity must be a number"),
});

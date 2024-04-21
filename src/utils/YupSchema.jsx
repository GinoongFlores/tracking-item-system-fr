import * as Yup from "yup";
export const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Email Required"),
  password: Yup.string()
    .max(10, "Must be 10 characters only")
    .min(8, "Minimum of 8 characters only")
    .required("password required"),
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

export const TransferItemSchema = Yup.object().shape({
  image: Yup.string().nullable(), // image is optional
  name: Yup.string().required("Item name is required"),
  description: Yup.string().required("Item description is required"),
  receiver_name: Yup.string().required("Receiver name is required"),
  number: Yup.string().required("Receiver number is required").min(11).max(11),
  quantity: Yup.number()
    .required("Item quantity is required")
    .min(1)
    .typeError("Quantity must be a number"),
});

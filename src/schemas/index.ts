import * as yup from "yup";

//must contain a number, special character, Uppercase and lowercase characters and minimum length is five
const passwordrules =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5,}$/;
export const basicSchema = yup.object().shape({
  email: yup
    .string()
    .email("Enter a Valid Email")
    .required("Email is required"),
  firstname: yup
    .string()
    .min(3, "Too short")
    .matches(/^\S*$/, "No whitespaces")
    .required("Firstname is required"),
  lastname: yup
    .string()
    .min(3, "Too short")
    .matches(/^\S*$/, "No whitespaces")
    .required("lastname is required"),
  password: yup
    .string()
    .min(5, "Password is too short")
    .matches(passwordrules, {
      message:
        "Password must contain a number, uppercase, lowercase and special character ",
    })
    .required("Required"),
});

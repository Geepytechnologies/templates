import React from "react";
import { useFormik } from "formik";
import { basicSchema } from "../schemas";

type Props = {};

const Form = (props: Props) => {
  const { values, handleBlur, touched, errors, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        firstname: "",
        lastname: "",
        password: "",
      },
      validationSchema: basicSchema,
      onSubmit: () => myfunction(),
    });
  const myfunction = () => {};
  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      className="flex gap-4 p-3 flex-col w-full "
    >
      <label className="text-white">Firstname</label>
      <input
        type="text"
        onBlur={handleBlur}
        name="firstname"
        id="firstname"
        value={values.firstname}
        onChange={handleChange}
        placeholder="Matt"
        className={
          errors.firstname && touched.firstname
            ? "p-3 outline-[red] outline-2"
            : "outline-none p-3"
        }
      />
      {errors.firstname && touched.firstname && (
        <span className="text-[#ef1e41] font-[600] font-pop text-[14px]">
          {errors.firstname}
        </span>
      )}

      <div className="flex flex-col">
        <label className="text-white">Lastname</label>
        <input
          type="text"
          onBlur={handleBlur}
          id="lastname"
          value={values.lastname}
          onChange={handleChange}
          placeholder="Turner"
          className={
            errors.lastname && touched.lastname
              ? "p-3 outline-[red] outline-2"
              : "outline-none p-3"
          }
        />
        {errors.lastname && touched.lastname && (
          <span className="text-[#ef1e41] font-[600] font-pop text-[14px]">
            {errors.lastname}
          </span>
        )}
      </div>
      <div className="flex flex-col">
        <label className="text-white">Email</label>
        <input
          id="email"
          onBlur={handleBlur}
          value={values.email}
          onChange={handleChange}
          placeholder="MattTurner@gem.com"
          className={
            errors.email && touched.email
              ? "p-3 outline-[red] outline-2"
              : "outline-none p-3"
          }
        />
        {errors.email && touched.email && (
          <span className="text-[#ef1e41] font-[600] font-pop text-[14px]">
            {errors.email}
          </span>
        )}
      </div>
      <div className="flex flex-col">
        <label className="text-white">Password</label>
        <input
          type="password"
          onBlur={handleBlur}
          value={values.password}
          onChange={handleChange}
          placeholder="Password"
          id="password"
          className={
            errors.password && touched.password
              ? "p-3 outline-[red] outline-2"
              : "outline-none p-3"
          }
        />
        {errors.password && touched.password && (
          <span className="text-[#ef1e41] font-[600] font-pop text-[14px]">
            {errors.password}
          </span>
        )}
      </div>
      <button>submit</button>
    </form>
  );
};

export default Form;

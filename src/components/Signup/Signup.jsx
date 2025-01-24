import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
export default function Signup() {
  let navg = useNavigate();
  let [errMessage, setErr] = useState(null);
  let validYup = Yup.object({
    name: Yup.string()
      .required("name required")
      .min(3, "min char 2")
      .max(20, "max char 20 "),
    email: Yup.string().required("email required").email("enter valid email"),
    password: Yup.string()
      .required("password required")
      .matches(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
        "enter valid password"
      ),
    rePassword: Yup.string()
      .required("rePassword required")
      .oneOf([Yup.ref("password")], "incorrect password"),
    phone: Yup.string()
      .required("phone number required")
      .matches(/^(20)?01[1250][0-9]{8}$/, "enter valid number"),
  });
  let registerForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: registerApi,
    validationSchema: validYup,
  });
 function registerApi(data) {
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", data)
      .then((req) => {
        if (req.data.message == "success") {
          navg("/login");
        }
      })
      .catch((err) => {
        setErr(err.response.data.message);
        console.log(err.response.data.message);
      });
  }
  return (
    <div>
      <h1 className="w-7/12 mx-auto mb-3 mt-3">Register Now:</h1>
      {errMessage ? (
        <div
          className="p-4 mb-4 w-7/12 mx-auto text-sm text-red-700 rounded-lg bg-red-50"
          role="alert"
        >
          {errMessage}
        </div>
      ) : (
        ""
      )}
      <form onSubmit={registerForm.handleSubmit} className="w-7/12 mx-auto">
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Your name:
          </label>
          <input
            value={registerForm.values.name}
            onChange={registerForm.handleChange}
            onBlur={registerForm.handleBlur}
            type="text"
            id="name"
            name="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5"
          />
          {registerForm.touched.name && registerForm.errors.name  ? <p className="text-red-700">{registerForm.errors.name}</p>:""}
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Your email:
          </label>
          <input
            value={registerForm.values.email}
            onChange={registerForm.handleChange}
            onBlur={registerForm.handleBlur}
            type="email"
            id="email"
            name="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5"
          />
                {registerForm.touched.email && registerForm.errors.email  ? <p className="text-red-700">{registerForm.errors.email}</p>:""}
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Your password:
          </label>
          <input
            value={registerForm.values.password}
            onChange={registerForm.handleChange}
            onBlur={registerForm.handleBlur}
            type="password"
            id="password"
            name="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5 "
          />
            {registerForm.touched.password && registerForm.errors.password  ? <p className="text-red-700">{registerForm.errors.password}</p>:""}
        </div>
        <div className="mb-5">
          <label
            htmlFor="rePassword"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            rePassword:
          </label>
          <input
            value={registerForm.values.rePassword}
            onChange={registerForm.handleChange}
            onBlur={registerForm.handleBlur}
            type="password"
            id="rePassword"
            name="rePassword"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5 "
          />
            {registerForm.touched.rePassword && registerForm.errors.rePassword  ? <p className="text-red-700">{registerForm.errors.rePassword}</p>:""}
        </div>
        <div className="mb-5">
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Your Phone Number:
          </label>
          <input
            value={registerForm.values.phone}
            onChange={registerForm.handleChange}
            onBlur={registerForm.handleBlur}
            type="tel"
            id="phone"
            name="phone"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5 "
          />
            {registerForm.touched.phone && registerForm.errors.phone  ? <p className="text-red-700">{registerForm.errors.phone}</p>:""}
        </div>
        <button
          disabled={!(registerForm.isValid && registerForm.dirty)}
          type="submit"
          className="text-white bg-active hover:bg-active focus:outline-none focus:ring-active font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:bg-active disabled:bg-opacity-25"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

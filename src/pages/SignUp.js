import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import MOT from "../apis/MOT";

function SignUp() {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    },
    validationSchema: validate,
    onSubmit: values => {
      MOT.post("/users", values)
        .then(function(response) {
          if (response.status === 201) {
            const token = response.data.data.attributes.token;
            localStorage.setItem("token", token);
          }
        })
        .catch(function(error) {
          alert(JSON.stringify(error.response.data.errors));
        })
        .finally(function() {
          console.log("finally");
        });
    }
  });

  return (
    <div className="ui two column centered grid">
      <div className="column">
        <h1 style={{ textAlign: "center" }}>Sign Up</h1>

        <form className="ui form" onSubmit={formik.handleSubmit}>
          <div
            className={`field ${
              formik.touched.firstName && formik.errors.firstName
                ? "error"
                : null
            }`}
          >
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="First Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <label>{formik.errors.firstName}</label>
            ) : null}
          </div>

          <div
            className={`field ${
              formik.touched.lastName && formik.errors.lastName ? "error" : null
            }`}
          >
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Last Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <label>{formik.errors.lastName}</label>
            ) : null}
          </div>

          <div
            className={`field ${
              formik.touched.email && formik.errors.email ? "error" : null
            }`}
          >
            <label>Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <label>{formik.errors.email}</label>
            ) : null}
          </div>

          <div
            className={`field ${
              formik.touched.password && formik.errors.password ? "error" : null
            }`}
          >
            <label>Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <label>{formik.errors.password}</label>
            ) : null}
          </div>

          <button className="ui teal button" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

const validate = Yup.object({
  //   firstName: Yup.string().required("Required"),
  //   lastName: Yup.string().required("Required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Required"),
  password: Yup.string().required("Required")
});

export default SignUp;

import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Redirect } from "react-router-dom";
import BlogAPI from "../apis/BlogAPI";
import { AuthContext } from "../contexts/AuthContext";

function SignUp() {
  const context = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validate,
    onSubmit: (values) => {
      BlogAPI.post("/users", values)
        .then(function (response) {
          if (response.status === 201) {
            const token = response.data.data.attributes.token;
            context.setAuthToken(token);
          } else {
            console.log(response);
          }
        })
        .catch(function (error) {
          alert(JSON.stringify(error.response.data.errors));
        });
    },
  });

  if (context.authToken) {
    return <Redirect to="/" />;
  }

  return (
    <div className="ui two column centered grid">
      <div className="column">
        <h1 style={{ textAlign: "center" }}>Sign Up</h1>

        <form className="ui form" onSubmit={formik.handleSubmit}>
          <div
            className={`field ${
              formik.touched.username && formik.errors.username ? "error" : null
            }`}
          >
            <label>Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username ? (
              <label>{formik.errors.username}</label>
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
  username: Yup.string()
    .matches(/^[a-z]+$/, "Must only be lower letters")
    .required("Required"),
  password: Yup.string().required("Required"),
});

export default SignUp;

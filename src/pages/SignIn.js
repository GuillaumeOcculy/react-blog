import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Redirect } from "react-router-dom";
import MOT from "../apis/MOT";
import AuthContext from "../contexts/AuthContext";

function SignIn() {
  const context = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: validate,
    onSubmit: values => {
      MOT.post("/auth", values)
        .then(function(response) {
          if (response.status === 200) {
            const token = response.data.data.attributes.token;
            console.log(response);
            context.setAuthToken(token);
          } else {
            console.log(response);
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

  if (context.authToken) {
    return <Redirect to="/" />;
  }

  return (
    <div className="ui two column centered grid">
      <div className="column">
        <h1 style={{ textAlign: "center" }}>Sign In</h1>

        <form className="ui form" onSubmit={formik.handleSubmit}>
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
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

const validate = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Required"),
  password: Yup.string().required("Required")
});

export default SignIn;

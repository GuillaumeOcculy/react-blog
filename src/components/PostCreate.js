import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import MOT from "../apis/MOT";

function PostCreate(props) {
  const formik = useFormik({
    initialValues: {
      body: ""
    },
    validationSchema: validate,
    onSubmit: values => {
      MOT.post("/posts", values)
        .then(function(response) {
          if (response.status === 201) {
            props.addToPosts(response.data.data);
          } else {
            console.log(response);
          }
        })
        .catch(function(error) {
          console.log(JSON.stringify(error.response));
        });
    }
  });

  return (
    <div className="ui two column centered grid">
      <div className="column">
        <form className="ui form" onSubmit={formik.handleSubmit}>
          <div
            className={`field ${
              formik.touched.body && formik.errors.body ? "error" : null
            }`}
          >
            <div className="field">
              <label>Create post</label>
              <textarea
                name="body"
                id="body"
                placeholder="What's on your mind ?"
                rows="4"
                spellCheck="false"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.body}
              ></textarea>
            </div>
            {formik.touched.body && formik.errors.body ? (
              <label>{formik.errors.body}</label>
            ) : null}
          </div>

          <button className="ui teal button" type="submit">
            Submit post
          </button>
        </form>
      </div>
    </div>
  );
}

const validate = Yup.object({
  body: Yup.string().required("Required")
});

export default PostCreate;
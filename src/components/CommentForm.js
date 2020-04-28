import React from "react";
import { useFormik } from "formik";
import { Form, Label } from "semantic-ui-react";

import * as Yup from "yup";
import BlogAPI from "./../apis/BlogAPI";

function CommentForm({ post, handleCommentSubmitSuccess }) {
  const validate = Yup.object({
    body: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      body: "",
    },
    validationSchema: validate,
    onSubmit: (values) => {
      BlogAPI.post(`/posts/${post.id}/comments`, values)
        .then(function (response) {
          if (response.status === 201) {
            const post = response.data.data;

            formik.resetForm();
            handleCommentSubmitSuccess(post);
          } else {
            console.log(response);
          }
        })
        .catch(function (error) {
          console.log(JSON.stringify(error.response));
        });
    },
  });

  return (
    <Form className="ui form" onSubmit={formik.handleSubmit}>
      <div className={`field ${formik.errors.body ? "error" : null}`}>
        <Form.Field>
          <Form.Input
            id={`comment_${post.id}`}
            name="body"
            placeholder="Add Comment..."
            onChange={formik.handleChange}
            value={formik.values.body}
          />

          {formik.touched.body && formik.errors.body ? (
            <Label pointing prompt>
              {formik.errors.body}
            </Label>
          ) : null}
        </Form.Field>
      </div>
    </Form>
  );
}

export default CommentForm;

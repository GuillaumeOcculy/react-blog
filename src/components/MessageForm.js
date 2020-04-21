import React, { useContext } from "react";
import { useFormik } from "formik";
import { Form, Label } from "semantic-ui-react";
import * as Yup from "yup";

import BlogAPI from "./../apis/BlogAPI";
import { MessagesContext } from "./../contexts/MessagesContext";

function MessageForm() {
  const messageContext = useContext(MessagesContext);
  const validate = Yup.object({
    body: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      body: "",
    },
    validationSchema: validate,
    onSubmit: (values) => {
      messageContext.createMessage(values);
      formik.resetForm();
    },
  });

  return (
    <Form className="ui form" onSubmit={formik.handleSubmit}>
      <div className={`field ${formik.errors.body ? "error" : null}`}>
        <Form.Field>
          <Form.Input
            id="body"
            name="body"
            placeholder="Send Message..."
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

export default MessageForm;

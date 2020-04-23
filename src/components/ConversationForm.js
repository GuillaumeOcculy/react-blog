import React, { useState } from "react";
import { useFormik } from "formik";
import { Button, Form, Label } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import * as Yup from "yup";
import BlogAPI from "./../apis/BlogAPI";

function ConversationForm({ username }) {
  const [conversationId, setConversationId] = useState();

  const validate = Yup.object({
    body: Yup.string().required("Required"),
    friendUsernames: Yup.string().required("Required"),
  });

  const RedirectToMessages = () => {
    if (!conversationId) {
      return null;
    }

    return (
      <Redirect
        to={{
          pathname: `/@${username}/messages`,
          state: { conversationId: conversationId },
        }}
      />
    );
  };

  const formik = useFormik({
    initialValues: {
      body: "",
      friendUsernames: "",
    },
    validationSchema: validate,
    onSubmit: (values) => {
      values.friendUsernames = values.friendUsernames.split(",");

      BlogAPI.post("/messages", values)
        .then(function (response) {
          if (response.status === 201) {
            setConversationId(
              response.data.data.relationships.conversation.data.id
            );
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
    <React.Fragment>
      <Form className="ui form" onSubmit={formik.handleSubmit}>
        <Form.Field>
          <Form.Input
            id="friendUsernames"
            name="friendUsernames"
            placeholder="Type your friend's username..."
            autoComplete="false"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.friendUsernames}
          />

          {formik.touched.friendUsernames && formik.errors.friendUsernames ? (
            <Label pointing prompt>
              {formik.errors.friendUsernames}
            </Label>
          ) : null}
        </Form.Field>

        <Form.Field>
          <Form.Input
            id="body"
            name="body"
            autoComplete="false"
            placeholder="Type your message..."
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.body}
          />

          {formik.touched.body && formik.errors.body ? (
            <Label pointing prompt>
              {formik.errors.body}
            </Label>
          ) : null}
        </Form.Field>

        <Button type="submit" primary>
          Send message
        </Button>
      </Form>

      <RedirectToMessages />
    </React.Fragment>
  );
}

export default ConversationForm;

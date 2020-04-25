import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Button, Form, Label } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import * as Yup from "yup";
import BlogAPI from "./../apis/BlogAPI";

function ConversationForm({ username }) {
  const [conversationId, setConversationId] = useState();
  const [friendOptions, setFriendsOptions] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      const response = await BlogAPI.get(`/users/${username}/friends`);
      const friends = response.data.data;

      const options = friends.map((friend) => {
        const username = friend.attributes.username;
        return { key: username, value: username, text: username };
      });

      setFriendsOptions(options);
    };

    fetchFriends();
  }, [username]);

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
          <Form.Dropdown
            id="friendUsernames"
            name="friendUsernames"
            clearable
            fluid
            multiple
            search
            selection
            options={friendOptions}
            onChange={(e, data) =>
              formik.setFieldValue("friendUsernames", data.value)
            }
            placeholder="Select your friends"
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

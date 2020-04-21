import React, { useContext } from "react";
import { Comment } from "semantic-ui-react";

import { MessagesContext } from "./../contexts/MessagesContext";
import MessageDetail from "./MessageDetail";

const MessageList = () => {
  const messageContext = useContext(MessagesContext);
  const { data, included } = messageContext.messages;

  const messages = data;
  const users = included.filter((element) => element.type === "user");

  const list = messages.map((message) => {
    const userId = message.relationships.user.data.id;
    const user = users.find((user) => user.id === userId);

    return <MessageDetail key={message.id} message={message} user={user} />;
  });

  return <Comment.Group threaded>{list}</Comment.Group>;
};

export default MessageList;

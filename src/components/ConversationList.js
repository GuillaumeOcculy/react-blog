import React, { useContext } from "react";
import { Menu } from "semantic-ui-react";

import { MessagesContext } from "./../contexts/MessagesContext";

const ConversationList = ({ conversations }) => {
  const messageContext = useContext(MessagesContext);

  return conversations.map((conversation) => {
    const { name } = conversation.attributes;

    return (
      <Menu.Item
        key={conversation.id}
        name={name}
        id={conversation.id}
        active={messageContext.activeConversation === conversation.id}
        onClick={messageContext.handleConversationClick}
      />
    );
  });
};

export default ConversationList;

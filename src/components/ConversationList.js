import React, { useContext } from "react";
import { Menu } from "semantic-ui-react";

import { MessagesContext } from "./../contexts/MessagesContext";

const ConversationList = ({ conversations }) => {
  const messageContext = useContext(MessagesContext);

  return conversations.map((conversation) => {
    const { name } = conversation.attributes;

    return (
      <Menu.Item
        key={name}
        name={name}
        active={messageContext.activeConversation === name}
        onClick={messageContext.handleConversationClick}
      />
    );
  });
};

export default ConversationList;

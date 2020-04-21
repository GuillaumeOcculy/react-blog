import React, { createContext, useState, useEffect } from "react";
import BlogAPI from "./../apis/BlogAPI";

const MessagesContext = createContext();

const MessagesContextProvider = ({ children }) => {
  const [activeConversation, setActiveConversation] = useState();
  const [messages, setMessages] = useState({ data: [], included: [] });
  const handleConversationClick = (e, { name }) => setActiveConversation(name);

  useEffect(() => {
    const fetchMessages = (conversationName) => {
      BlogAPI.get(`/conversations/${conversationName}/messages`)
        .then(function (response) {
          if (response.status === 200) {
            setMessages(response.data);
          } else {
            console.log(response);
          }
        })
        .catch(function (error) {
          console.log(JSON.stringify(error.response));
        });
    };
    if (activeConversation) {
      fetchMessages(activeConversation);
    }
  }, [activeConversation]);

  return (
    <MessagesContext.Provider
      value={{
        activeConversation,
        messages,
        setActiveConversation,
        handleConversationClick,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

export { MessagesContext, MessagesContextProvider };

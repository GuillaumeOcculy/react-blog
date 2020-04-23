import React, { createContext, useState, useEffect } from "react";
import BlogAPI from "./../apis/BlogAPI";

const MessagesContext = createContext();

const MessagesContextProvider = ({ children }) => {
  const [activeConversation, setActiveConversation] = useState();
  const [messages, setMessages] = useState({ data: [], included: [] });
  const handleConversationClick = (e, { id }) => setActiveConversation(id);

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

  const createMessage = (payload) => {
    BlogAPI.post(`/conversations/${activeConversation}/messages`, payload)
      .then(function (response) {
        if (response.status === 201) {
          const { data, included } = response.data;
          const newData = [...messages.data, data];
          const user = included.find((element) => element.type === "user");
          const newIncluded = [...messages.included, user];

          setMessages({ data: newData, included: newIncluded });
        } else {
          console.log(response);
        }
      })
      .catch(function (error) {
        console.log(JSON.stringify(error.response));
      });
  };

  return (
    <MessagesContext.Provider
      value={{
        activeConversation,
        messages,
        setActiveConversation,
        handleConversationClick,
        createMessage,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

export { MessagesContext, MessagesContextProvider };

import React, { createContext, useState, useEffect } from "react";

const MessagesContext = createContext();

const MessagesContextProvider = ({ children }) => {
  const [activeConversation, setActiveConversation] = useState();
  const handleConversationClick = (e, { name }) => setActiveConversation(name);

  useEffect(() => {
    // if (activeConversation)
  }, [activeConversation]);

  return (
    <MessagesContext.Provider
      value={{
        activeConversation,
        setActiveConversation,
        handleConversationClick,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

export { MessagesContext, MessagesContextProvider };

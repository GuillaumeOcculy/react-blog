import React, { useContext, useState, useEffect } from "react";
import { Button, Grid, Menu, Segment } from "semantic-ui-react";
import { Link, useParams } from "react-router-dom";

import { MessagesContext } from "./../contexts/MessagesContext";
import BlogAPI from "./../apis/BlogAPI";
import ConversationList from "./../components/ConversationList";
import MessageList from "./../components/MessageList";
import MessageForm from "./../components/MessageForm";

const ProfileMessages = () => {
  const messageContext = useContext(MessagesContext);
  const { username } = useParams();
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const fetchConversations = async () => {
      const response = await BlogAPI.get("/conversations");
      const conversations = response.data.data;
      setConversations(conversations);

      if (conversations.length > 0) {
        const conversationName = conversations[0].attributes.name;
        messageContext.setActiveConversation(conversationName);
      }
    };

    fetchConversations();
  }, [conversations.length]);

  const RenderMenu = () => {
    return (
      <div className="ui two column centered grid">
        <Menu secondary>
          <Menu.Item name="home" as={Link} to={`/@${username}`} />
          <Menu.Item name="friends" as={Link} to={`/@${username}/friends`} />
          <Menu.Item
            name="messages"
            active
            as={Link}
            to={`/@${username}/messages`}
          />
        </Menu>
      </div>
    );
  };

  return (
    <div>
      <RenderMenu />

      <Grid>
        <Grid.Column width={4}>
          <Button
            as={Link}
            to={`/@${username}/messages/new`}
            content="New message"
            primary
          />
          <Menu fluid vertical tabular>
            <ConversationList conversations={conversations} />
          </Menu>
        </Grid.Column>

        <Grid.Column stretched width={12}>
          <Segment>
            <MessageList />
            <MessageForm />
          </Segment>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default ProfileMessages;

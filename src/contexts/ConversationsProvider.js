import React, { useCallback, useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useContacts,  } from "./ContactsProvider";

const ConversationsContext = React.createContext();

export function useConversations() {
  return useContext(ConversationsContext);
}

export function ConversationsProvider({ id, children }) {
  const [conversations, setConversations] = useLocalStorage("conversations", []);
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
  const { contacts } = useContacts();
  const CONVERSATIONS_KEY='conversations';

  function createConversation(recipients) {
    let conversationToOpenIndex = conversations.findIndex((conversation) => 
      JSON.stringify(conversation.recipients) === JSON.stringify(recipients))

    if (conversationToOpenIndex < 0) {
      setConversations((prevConversations) => {
        return [...prevConversations, { recipients, messages: [], date: Date.now()}]
      });
      conversationToOpenIndex = conversations.length;
    }
    setSelectedConversationIndex(conversationToOpenIndex)
  }

  const addMessageToConversation = useCallback(
    ({ recipients, text, sender }) => {
      setConversations((prevConversations) => {
        let madeChange = false;
        const newMessage = { sender, text, date: Date.now() };
        const newConversations = prevConversations.map((conversation) => {
          if (arrayEquality(conversation.recipients, recipients)) {
            madeChange = true;
            return {
              ...conversation,
              messages: [...conversation.messages, newMessage],
            };
          }

          return conversation;
        });

        if (madeChange) {
          return newConversations;
        } else {
          return [...prevConversations, { recipients, messages: [newMessage] }];
        }
      });
    },
    [setConversations]
  );


  function sendMessage(recipients, text, userId = id) {
    addMessageToConversation({ recipients, text, sender: userId });
  }

  const formattedConversations = conversations.map((conversation, index) => {
    const recipients = conversation.recipients.map((recipient) => {
      const contact = contacts.find((contact) => {
        return contact.id === recipient;
      });
      const name = (contact && contact.name) || recipient;
      const image = contact.avatar;

      return { id: recipient, name, image };
    });

    const messages = conversation.messages.map((message) => {
      const contact = contacts.find((contact) => {
        return contact.id === message.sender;
      });
      const name = (contact && contact.name) || message.sender;
      const fromMe = id === message.sender;
      const senderAvatar = (contact && contact.avatar);

      return { ...message, senderName: name, fromMe, senderAvatar };
    });

    const selected = index === selectedConversationIndex;
    return { ...conversation, messages, recipients, selected };
  });

  const value = {
    conversations: formattedConversations,
    selectedConversation: formattedConversations[selectedConversationIndex],
    selectConversationIndex: setSelectedConversationIndex,
    sendMessage,
    createConversation,
    CONVERSATIONS_KEY
  };

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
}

function arrayEquality(a, b) {
  if (a.length !== b.length) return false;

  a.sort();
  b.sort();
  return a.every((element, index) => {
    return element === b[index];
  });
}

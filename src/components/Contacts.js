import React from 'react';
import { useContacts } from '../contexts/ContactsProvider';
import { FixedSizeList } from "react-window";
import { useConversations } from '../contexts/ConversationsProvider';

export default function Contacts({setActiveKey}) {
    const {contacts, searchText, setSearchText} = useContacts();
    const { createConversation, selectConversationIndex, CONVERSATIONS_KEY, conversations } = useConversations();

    let result;
      if(searchText) {
        result = contacts.filter((contact)=> contact.name.includes(searchText))
      }
      else {
        result = contacts;
      }
    console.log('result', result);
    console.log('seacrh', searchText)

    const renderRow = ({ index, style }) => (
        <button
          className={'btn btn-light'}
          onClick={() => {
          createConversation([result[index].id]);
          setActiveKey(CONVERSATIONS_KEY);
          }} 
         style={{ ...style, ...{ display: "flex" } }}>
          <img
            src={result[index].avatar }
            alt={result[index].name}
            className={`rounded-circle m-1`}
            width={50}
          /> <p>
            {result[index].name}
          </p>
        </button> );

    return ( <FixedSizeList
          height={window.innerHeight}
          width={window.innerWidth - 20}
          itemCount={searchText ? result.length : contacts.length}
          itemSize={58}
    >
          {renderRow}
        </FixedSizeList>
    ); }

import React from 'react'
import { useContacts } from '../contexts/ContactsProvider';
import { FixedSizeList } from "react-window";

export default function Contacts() {

    const {contacts, searchText, setSearchText} = useContacts();

    let result;
    const renderRow = ({ index, style }) => (
        <div style={{ ...style, ...{ display: "flex" } }}>
          <img
            src={contacts[index].avatar}
            alt={contacts[index].name}
            className={`rounded-circle m-1`}
            width={50}
    /> <p>
            {contacts[index].name}
          </p>
    </div> );

    if(searchText) {
       result = contacts.filter((contact)=> contact.name.includes(searchText))
    }
    console.log('result', result);
    console.log('seacrh', searchText)
    return ( <FixedSizeList
          height={window.innerHeight}
          width={window.innerWidth - 20}
          itemCount={searchText ? result.length : contacts.length}
          itemSize={58}
    >
          {renderRow}
        </FixedSizeList>
    ); }

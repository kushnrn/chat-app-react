import React from 'react'
import { useContacts } from '../contexts/ContactsProvider';
import { FixedSizeList } from "react-window";

export default function Contacts() {

    const {contacts} = useContacts();

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
    return ( <FixedSizeList
          height={window.innerHeight}
          width={window.innerWidth - 20}
          itemCount={contacts.length}
          itemSize={58}
    >
          {renderRow}
        </FixedSizeList>
    ); }

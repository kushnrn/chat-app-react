import React, { useContext, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { faker } from '@faker-js/faker';
import { v4 as uuidV4 } from 'uuid';

const ContactsContext = React.createContext();

export function useContacts() {
    return useContext(ContactsContext)
}

export function ContactsProvider({children}) {
    const CONTACTS_KEY='contacts';

    const [contacts, setContact] = useLocalStorage("contacts", 
        [...Array(20)].map(() => ({ 
            id: faker.datatype.uuid(),
            name: `${faker.name.firstName()} ${faker.name.lastName()}` ,
            avatar: faker.image.avatar()
          }))
    );

    function createContact(name) {
        setContact((prevContacts) => {
          return [...prevContacts, { id: uuidV4(), name, avatar: faker.image.avatar()}];
        });
      }

      const [searchText, setSearchText] = useState('');

    return (
        <ContactsContext.Provider value ={{contacts, createContact, setSearchText, searchText, CONTACTS_KEY}}>
            {children}
        </ContactsContext.Provider>
    )
}

import React from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContacts } from '../contexts/ContactsProvider';

export default function Search({setActiveKey,}) {
    const { setSearchText, CONTACTS_KEY } = useContacts();

    return (
        <div className="input-group rounded">
            <input onChange = {(event) => {setSearchText(event.target.value); setActiveKey(CONTACTS_KEY)}} type="search" className="form-control rounded" placeholder="Search contacts" aria-label="Search" aria-describedby="search-addon" />
            <span className="input-group-text border-0" id="search-addon">
            <FontAwesomeIcon icon={faSearch} />
            </span>
        </div>
    )
}

import React, { useState } from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContacts } from '../contexts/ContactsProvider';

export default function Search() {
    const { searchText, setSearchText } = useContacts();

    return (
        <div className="input-group rounded">
            <input onChange = {event => setSearchText(event.target.value)}  type="search" className="form-control rounded" placeholder="Search or start new chat" aria-label="Search" aria-describedby="search-addon" />
            <span className="input-group-text border-0" id="search-addon">
            <FontAwesomeIcon icon={faSearch} />
            </span>
        </div>
    )
}

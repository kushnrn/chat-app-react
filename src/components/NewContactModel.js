import React, { useRef } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { useContacts } from '../contexts/ContactsProvider';

export default function NewContactModel({closeModal}) {
    const nameRef = useRef();
    const { createContact } = useContacts();
    
    function handleSubmit(e) {
        e.preventDefault();
        createContact(nameRef.current.value);
        closeModal();
    }

    return (
        <>
        <Modal.Header closeButton>Create Contact</Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" ref={nameRef} required/>
                </Form.Group>
                <Button type="submit">Create</Button>
            </Form>    
        </Modal.Body>
        </>
    )
}

import React,{useState} from 'react'
import {Modal,Form,Button} from 'react-bootstrap'
import {useContacts} from '../contexts/ContactsProvider'
import {useConversations} from '../contexts/ConversationsProvider'

export default function NewConversationModel({closeModal}) {

    const [selectedContactId, setSelectedContactId]=useState([])
    const {contacts}=useContacts()
    const {createConversation}=useConversations()

    function handleSubmit(e){
        e.preventDefault();
        createConversation(selectedContactId);
        console.log("id to store" + selectedContactId + "end")
        closeModal();
    }

    function handleCheckboxChange(id){
        setSelectedContactId(prevselectedContactId=>{

            if(prevselectedContactId.includes(id)){
                return prevselectedContactId.filter(prevId=>{
                    return id !== prevId
                })
            }
            else{
                return[...prevselectedContactId, id]
            }
        })

    }
    return (
        <>
        <Modal.Header closeButton>Create Conversation</Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit}>
                {contacts.map(contact => (
                    <Form.Group controlId={contact.id} key={contact.id}>
                        <Form.Check
                            type='checkbox'
                            value={selectedContactId.includes(contact.id)}
                            label={contact.name}
                            onChange={()=>handleCheckboxChange(contact.id)}
                        />
                    </Form.Group>
                ))}
                
                
                <Button type="submit">Create</Button>
            </Form>
            
        </Modal.Body>
        </>
    )
}

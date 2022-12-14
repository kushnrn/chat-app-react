import React, { useState } from 'react'
import {Tab, Nav, Button, Modal } from 'react-bootstrap'
import Conversations from './Conversations'
import Contacts from './Contacts'
import NewConversationModel from './NewConversationModel'
import NewContactModel from './NewContactModel';
import Search from './Search';
import { useContacts } from '../contexts/ContactsProvider';
import { useConversations } from '../contexts/ConversationsProvider'


export default function Sidebar({id}) {
    const [modalOpen,setModalOpen] = useState(false);
    const { CONVERSATIONS_KEY } = useConversations();
    const [activeKey,setActiveKey] = useState(CONVERSATIONS_KEY);
    const ConversationIsOpen = activeKey === CONVERSATIONS_KEY;
    const { CONTACTS_KEY } = useContacts();

    function closeModal(){
        setModalOpen(false)
    }

    return (
        <div style={{width:'400px',minWidth:'250px'}} className='d-flex flex-column mb-2'>
        <Search setActiveKey={setActiveKey}/>
            <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
                <Nav variant="tabs" className="Justify-content-center">
                    <Nav.Item>
                        <Nav.Link eventKey={CONVERSATIONS_KEY} 
                        >Conversations</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content className="border-right overflow-auto flex-grow-1">
                    <Tab.Pane eventKey={CONVERSATIONS_KEY}>
                        <Conversations/>
                    </Tab.Pane>
                    <Tab.Pane eventKey={CONTACTS_KEY}>
                        <Contacts setActiveKey={setActiveKey} />
                    </Tab.Pane>
                </Tab.Content>
                <div className="p-3 border-top border-right small">
                    Your Id is <span className="text-muted">{id}</span>
                </div>
                <Button  onClick={()=>setModalOpen(true)} className="rounded-0">
                    New {ConversationIsOpen?'Conversation':'Contact'}
                </Button>
            </Tab.Container>
            <Modal show={modalOpen} onHide={closeModal}>
                {ConversationIsOpen?<NewConversationModel closeModal={closeModal}/>
                :<NewContactModel closeModal={closeModal}/>}
            </Modal>
        </div>
    )
}

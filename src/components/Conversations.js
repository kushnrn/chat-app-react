import React from 'react';
import {ListGroup} from 'react-bootstrap';
import {useConversations} from '../contexts/ConversationsProvider';
import { ReactPhotoCollage } from "react-photo-collage";



export default function Conversations() {
    const {conversations, selectConversationIndex} = useConversations();

    return (
        <ListGroup variant='flush'>
        {conversations.map((conversation, index)=> {
            const setting = {
                width: '100px',
                height: ['50px', '50px'],
                layout: [6],
                photos: conversation.recipients.map((r) => ({ source: r.image })),
                showNumOfRemainingPhotos: false
            }
            return (
        <ListGroup.Item key={index} action active={conversation.selected} onClick={()=>selectConversationIndex(index)}>
            <div style={{display: "flex" }}>
                <ReactPhotoCollage { ...setting} />
                <p>{conversation.recipients.map((r) =>r.name).join(', ')}</p>
            </div>
        </ListGroup.Item>
            )
          }  
        )
        }
    </ListGroup>
    )
 
}

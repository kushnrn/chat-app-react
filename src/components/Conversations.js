import React from 'react';
import {ListGroup} from 'react-bootstrap';
import {useConversations} from '../contexts/ConversationsProvider';
import { ReactPhotoCollage } from "react-photo-collage";

export default function Conversations() {
    const {conversations, selectConversationIndex} = useConversations();
    console.log('conversation to sort ')
    console.log(conversations)

    return (
        <ListGroup variant='flush'>
        {conversations.map((conversation, index)=> {
            const setting = {
                width: '50px',
                height: ['50px', '50px'],
                layout: [2],
                photos: conversation.recipients.map((r) => ({ source: r.image })),
                showNumOfRemainingPhotos: false
            }
            return (
        <ListGroup.Item key={index} action active={conversation.selected} onClick={()=>selectConversationIndex(index)}>
            <div style={{display: "flex"}} >
                <ReactPhotoCollage { ...setting} />
                <p>{conversation.recipients.map((r) =>r.name).join(', ')}</p>
            </div>
        </ListGroup.Item>
            )
          }  
        ).reverse()
        }
    </ListGroup>
    )
 
}

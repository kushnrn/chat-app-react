import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useConversations } from '../contexts/ConversationsProvider';
import G from '../images/G.png';

export default function Conversations() {
    const { conversations, selectConversationIndex } = useConversations();

    return (
        <ListGroup variant='flush'>
            {conversations.map((conversation, index)=> {
                return (
                    <ListGroup.Item key={index} action active={conversation.selected} onClick={()=>selectConversationIndex(index)}>
                        <div style={{display: "flex"}} >
                        { conversation.recipients.length > 1 
                        ?
                            <img
                                src={G}
                                alt={`avatar`}
                                className={`rounded-circle m-1`}
                                width={50}
                                height={50}
                                />
                        :
                            <img
                                src={conversation.recipients[0].image}
                                alt={conversation.recipients[0].name}
                                className={`rounded-circle m-1`}
                                width={50}
                                height={50}
                            />
                        }
                            <p>{conversation.recipients.map((r) =>r.name).join(', ')}</p>
                        </div>
                    </ListGroup.Item>
                )
            }).reverse()
            }
        </ListGroup>
    )
}

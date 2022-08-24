import React, { useState, useCallback } from 'react';
import { Button, Form, FormGroup, InputGroup } from 'react-bootstrap';
import { useConversations } from '../contexts/ConversationsProvider';
import useFetch from '../hooks/useFetch';

export default function OpenConversation() {
    const [text, setText] = useState('');

    const setRef = useCallback(node => {
        if (node) {node.scrollIntoView({smooth:true})}
        
    },[])

    const { sendMessage, selectedConversation }=useConversations();

    let joke = useFetch('https://api.chucknorris.io/jokes/random');

    function handleSubmit(e){
        e.preventDefault();
        sendMessage(selectedConversation.recipients.map(r=>r.id), text);
        setText('');
        const randomSender = selectedConversation.recipients[Math.floor(Math.random() * selectedConversation.recipients.length)];

        setTimeout(() => {
            sendMessage(selectedConversation.recipients.map(r=>r.id), joke.data.value, randomSender.id)
        }, 5000);

    }

    function parseTimestamp(timestamp){
        var current = new Date(timestamp );
        // var hours = date.getHours();
        // var minutes = "0" + date.getMinutes();
        // var seconds = "0" + date.getSeconds();
        return `${current.getFullYear() + "-" + ("0"+(current.getMonth()+1)).slice(-2) +"-"+("0" + current.getDate()).slice(-2) + ", " + ("0" + current.getHours()).slice(-2) + ":" + ("0" + current.getMinutes()).slice(-2)}`;
    }
    return (
        <div className="d-flex flex-column flex-grow-1">
            <div className="flex-grow-1 overflow-auto">
            {selectedConversation.messages.map((message,index)=> { 
                const lastMessage=selectedConversation.messages.length-1 ===index;

                return (
                    <div className="d-flex flex-column align-items-start justify-content-end px-3">
                        <div 
                            ref={lastMessage?setRef:null}
                            key={index}
                            className={`my-1 d-flex flex-column ${message.fromMe?`align-self-end`:''}`}
                            >
                            <div className="d-flex flex-row">
                            <div>
                                <img
                                src={message.senderAvatar}
                                alt={message.fromMe?``:message.senderName}
                                className={message.fromMe?``:`rounded-circle m-1`}
                                width={message.fromMe?``:50}
                                />
                            </div>
                            <div>
                                <div
                                    className={`rounded px-2 py-1 ${message.fromMe?`bg-primary  text-white`:`border`}`} >
                                    {message.text}
                                </div>
                            </div>
                            </div>
                            <div className={`text-muted small ${message.fromMe?` text-right`:``} `}>
                                {message.fromMe?'':message.senderName}
                                <p>{parseTimestamp(message.date)}</p>
                            </div>
                        </div>
                    </div>
                )
            })}
            
            </div>
            <Form onSubmit={handleSubmit}>
                <FormGroup className="m-2">
                    <InputGroup>
                        <Form.Control as="textarea" 
                        required value={text}
                        placeholder="Type your message"
                        onChange={e=>setText(e.target.value)}
                        style={{height:"50px" , resize :"none"}}/>
                        <InputGroup>
                            <Button className={'mt-1'} type="submit">Send</Button>
                        </InputGroup>
                    </InputGroup>
                </FormGroup>
            </Form>
        </div>
    )
}

import axios from 'axios';
import React, { useState, useEffect } from 'react';

const MessageComponent = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    // Fetch all messages
    useEffect(() => {
        axios.get('https://eventix-spring-production.up.railway.app/api/messages')
            .then(response => {
                setMessages(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the messages!', error);
            });
    }, []);

    // Add a new message
    const addMessage = () => {
        axios.post('https://eventix-spring-production.up.railway.app/api/messages', {
            content: newMessage,
            sender: 'Alice',
            receiver: 'Bob'
        })
        .then(response => {
            setMessages([...messages, response.data]);
            setNewMessage(''); // Clear the input field
        })
        .catch(error => {
            console.error('There was an error creating the message!', error);
        });
    };

    // Delete a message
    const deleteMessage = (id) => {
        axios.delete(`https://eventix-spring-production.up.railway.app/api/messages/${id}`)
            .then(() => {
                setMessages(messages.filter(message => message.id !== id));
            })
            .catch(error => {
                console.error('There was an error deleting the message!', error);
            });
    };

    return (
        <div>
            <h2>Messages</h2>
            <ul>
                {messages.map(message => (
                    <li key={message.id}>
                        {message.content} - {message.sender} to {message.receiver}
                        <button onClick={() => deleteMessage(message.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Enter a new message"
            />
            <button onClick={addMessage}>Add Message</button>
        </div>
    );
};

export default MessageComponent;

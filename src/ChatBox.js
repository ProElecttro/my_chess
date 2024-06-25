import React, { useState, useEffect } from 'react';
import styles from './ChatBox.module.css';

const ChatBox = ({ socket }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('sendMessage', (msg) => {
            console.log(msg)
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        return () => {
            socket.off('chatMessage');
        };
    }, [socket]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (message.trim()) {
            socket.emit('chatMessage', message);
            setMessage('');
        }
    };

    return (
        <div className={styles.chatBox}>
            <div className={styles.messages}>
                {messages.map((msg, index) => (
                    <div key={index} className={styles.message}>
                        {msg}
                    </div>
                ))}
            </div>
            <form onSubmit={sendMessage} className={styles.messageForm}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={styles.messageInput}
                    placeholder="Type a message..."
                />
                <button type="submit" className={styles.sendButton}>Send</button>
            </form>
        </div>
    );
};

export default ChatBox;

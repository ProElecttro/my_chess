import React, { useState, useEffect } from 'react';
import styles from './ChatBox.module.css';

const ChatBox = ({ socket, user }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('sendMessage', (msg) => {
            setMessages((prevMessages) => [...prevMessages, { msg: msg, type: 'received' }]);
        });

        return () => {
            socket.off('sendMessage');
        };
    }, [socket]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (message.trim()) {
            const msg = { text: message, user };
            socket.emit('chatMessage', msg);
            setMessages((prevMessages) => [...prevMessages, { msg: msg, type: 'sent' }]);
            setMessage('');
        }
    };

    return (
        <div className={styles.chatBox}>
            <div className={styles.messages}>
                {messages.map(({ msg, type }, index) => (
                    <div
                        key={index}
                        className={`${styles.message} ${type === 'sent' ? styles.myMessage : styles.otherMessage}`}
                    >
                        {msg.text}
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

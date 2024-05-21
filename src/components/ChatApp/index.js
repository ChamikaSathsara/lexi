import React, { useState } from 'react';
import styles from './ChatApp.module.scss'; // Corrected import

export const ChatApp = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false); // State variable for loading

    const fetchData = async (userInput) => {
        setLoading(true); // Set loading state to true when fetching data
        const url = 'https://robomatic-ai.p.rapidapi.com/api';
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Key': '2df2d16a42msh87355bed57cba9bp140b1fjsn73a45f8c6789',
                'X-RapidAPI-Host': 'robomatic-ai.p.rapidapi.com'
            },
            body: new URLSearchParams({
                in: userInput,
                op: 'in',
                cbot: '1',
                SessionID: 'RapidAPI1',
                cbid: '1',
                key: 'RHMN5hnQ4wTYZBGCF3dfxzypt68rVP',
                ChatSource: 'RapidAPI',
                duration: '1'
            })
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            const botResponse = result.out.trim();
            setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: botResponse }]);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false); // Set loading state to false when data fetching is complete
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (input.trim()) {
            setMessages(prevMessages => [...prevMessages, { sender: 'user', text: input }]);
            await fetchData(input);
            setInput('');
        }
    };

    return (
        <div className={styles.body}>
            <p className={styles.heading}>Lexi</p>
            <p className={styles.subheading}>AI ChatBot</p>
            <div className={styles.chatWindow}>
                {messages.map((msg, index) => (
                    <div key={index} className={`${styles.message} ${msg.sender === 'user' ? styles.user : styles.bot}`}>
                        <span>{msg.text}</span>
                    </div>
                ))}
                {loading && <div className={styles.loading}>Lexi Typing</div>} {/* Render loading animation */}
            </div>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message"
                    className={styles.input}
                />
                <button type="submit" className={styles.button}>Send</button>
            </form>
        </div>
    );
};

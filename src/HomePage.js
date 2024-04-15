import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import crypto from 'crypto'

import styles from './style.module.css'

const Homepage = () => {
    const [roomCode, setRoomCode] = useState('')

    const generateRoomCode = () => {
        const randomHex = crypto.randomBytes(4).toString('hex');
        setRoomCode(randomHex);
    }

    return (
        <div className={styles.homepage}>
            <div className={styles.container}>
                <div className={styles.join}>
                    <input 
                        type="text"
                        placeholder='Enter Game ID'
                        value={roomCode}
                        onChange={(e) => setRoomCode(e.target.value)}
                    />
                    <Link to='/game'><button onClick={joinRoom}> JOIN </button></Link>
                </div>
                <p id={styles.or}>OR</p>
                <button onClick={generateRoomCode}>Create a Game Room</button>
            </div>
        </div>
    )
}

export default Homepage
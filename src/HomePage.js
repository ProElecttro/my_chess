import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// import crypto from 'crypto'

import styles from "./style.module.css";

const HomePage = (props) => {
    let {roomCode, setRoomCode} = props
    
    const generateRoomCode = () => {
        const array = new Uint16Array(10);
        crypto.getRandomValues(array);
        
        // Convert each element of the array to hexadecimal and join them into a single string
        const hexString = Array.from(array).map(num => num.toString(16)).join('');
        
        setRoomCode(hexString);
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
                    
                    <Link to='/game' state={roomCode}><button onClick={()=>{
                        localStorage.setItem('roomcode', roomCode)
                    }}> JOIN </button></Link>
                </div>
                <p id={styles.or}>OR</p>
                <button onClick={generateRoomCode}>Create a Game Room</button>
            </div>
        </div>
    )
}

export default HomePage
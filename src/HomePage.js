import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './homepage.module.css';
import io from 'socket.io-client';

const HomePage = ({ roomCode, setRoomCode }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [roomSize, setRoomSize] = useState(0); // Track room size
  const navigate = useNavigate();

  const socket = useMemo(() => {
    console.log('Creating socket instance...');
    let url = 'http://ec2-13-232-79-219.ap-south-1.compute.amazonaws.com:8000/'
    return io(url);
  }, []);

  useEffect(() => {
    const handlePlayerJoined = (playerName) => {
      console.log(`${playerName} joined the room`);
      setRoomSize((prevSize) => prevSize + 1); // Increment room size on player join
    };
    socket.on('playerJoined', handlePlayerJoined);

    const handleStartGame = ({ gameId, board }) => {
      console.log(`Game started with ID: ${gameId}`);
      navigate(`/game/${gameId}`);
    };
    socket.on('startGame', handleStartGame);

    const handleRoomFull = () => {
      alert('Room is full. Please try another room.');
      // Handle UI feedback for room full
    };
    socket.on('roomFull', handleRoomFull);

    return () => {
      console.log('Disconnecting socket...');
      socket.off('playerJoined', handlePlayerJoined);
      socket.off('startGame', handleStartGame);
      socket.off('roomFull', handleRoomFull);
      socket.disconnect();
    };
  }, [socket, navigate]);

  const handleJoinRoom = () => {
    if (roomCode) {
      socket.emit('joinRoom', roomCode, 'PlayerName'); // Replace 'PlayerName' with actual player name
    } else {
      alert('Please enter or generate a room code first.');
    }
  };

  const handleGenerateRoomCode = () => {
    const generatedCode = generateRandomRoomCode();
    setRoomCode(generatedCode);
  };

  const generateRandomRoomCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  };

  const handleCopyCode = () => {
    if (roomCode) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(roomCode).then(() => {
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000); // Reset copy status after 2 seconds
        });
      } else {
        alert('Clipboard API is not available. Please copy the code manually.');
      }
    } else {
      alert('No room code to copy.');
    }
  };
  

  // Conditional rendering based on room size
  if (roomSize === 1) {
    return (
      <div className={styles.loading}>
        <p>Waiting for players to join...</p>
      </div>
    );
  }

  return (
    <div className={styles.homepage}>
      <h1 className={styles.title}>Welcome to Chess Game</h1>
      <div className={styles.join}>
        <input
          className={styles.input}
          type="text"
          placeholder="Enter Room Code"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
        />
        <button className={styles.copyButton} onClick={handleCopyCode}>
          {isCopied ? 'Copied!' : 'Copy'}
        </button>
        <button className={styles.joinButton} onClick={handleJoinRoom}>
          Join Room
        </button>
      </div>
      <div className={styles.or}>
        <p>or</p>
      </div>
      <button className={styles.generateButton} onClick={handleGenerateRoomCode}>
        Generate Room Code
      </button>
    </div>
  );
};

export default HomePage;

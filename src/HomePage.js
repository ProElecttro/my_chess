import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './homepage.module.css';
import io from 'socket.io-client';
import Loading from './loading';

const HomePage = ({ roomCode, setRoomCode }) => {
  let isempty = true;
  const [roomSize, setRoomSize] = useState(0);
  const navigate = useNavigate();

  const socket = useMemo(() => {
    console.log('Creating socket instance...');
    let url = 'http://ec2-13-232-79-219.ap-south-1.compute.amazonaws.com:8000/';
    // url = "http://localhost:8000/"
    return io(url);
  }, []);

  useEffect(() => {
    const handlePlayerJoined = (playerName, playerColor) => {
      console.log('Received color:', playerColor);
      if (isempty) {
        isempty = false;
        // localStorage.setItem('color', playerColor)
        document.cookie = `color=${playerColor}; path=/; max-age=7200`;
      }

      setRoomSize((prevSize) => prevSize + 1);
    };

    socket.on('playerJoined', handlePlayerJoined);

    const handleStartGame = ({ gameId, board }) => {
      console.log(`Game started with ID: ${gameId}`);
      navigate(`/game/${gameId}`);
    };

    socket.on('startGame', handleStartGame);

    const handleRoomFull = () => {
      alert('Room is full. Please try another room.');
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
      socket.emit('joinRoom', roomCode, 'PlayerName');
    } else {
      alert('Please enter or generate a room code first.');
    }
  };

  if (roomSize === 1) {
    return <Loading roomCode={roomCode} />;
  }

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

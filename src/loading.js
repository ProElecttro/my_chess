import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Rings } from 'react-loader-spinner';
import emailjs from 'emailjs-com';
import InviteButton from './components/inviteButton';

const pulse = keyframes`
  0% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.8);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f2f2f2;
  padding: 20px;
`;

const LoadingText = styled.div`
  margin-top: 20px;
  text-align: center;
  font-size: 24px;
  color: #333;
`;

const StyledLoader = styled(Rings)`
  margin: 40px 0; /* Adjusted margin for spacing */
  animation: ${pulse} 1.5s ease-in-out infinite; /* Apply pulse animation to the loader */
`;

const RoomID = styled.div`
  font-size: 36px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
  margin-top: 20px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-top: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
`;

const SuccessMessage = styled.div`
  color: green;
  margin-top: 10px;
`;

const Loading = ({ roomCode, player }) => {
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();

    if (!recipient) {
      setMessage('Please enter an email.');
      return;
    }

    const templateParams = {
      message: `Your room code is: ${roomCode}`,
      room_code: roomCode,
      user_email: recipient,
    };

    emailjs.send('service_uvc2i9u', 'template_wa7r89d', templateParams, 'whzrvm1nKjRv_POcE')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setMessage('Room code sent successfully!');
      })
      .catch((error) => {
        console.error('FAILED...', error);
        setMessage('Failed to send room code. Please try again.');
      });
  };

  return (
    <LoadingContainer>
      <RoomID>Room ID: {roomCode}</RoomID>
      <h1>Waiting for Opponent to Join</h1>
      <StyledLoader color="#333" height={80} width={80} />
      <LoadingText>
        <p>Please wait while we find an opponent...</p>
      </LoadingText>
      <FormContainer>
        <form onSubmit={sendEmail}>
          <InputField
            type="email"
            placeholder="Enter recipient's email"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
          <div>
            <InviteButton type="submit"/> 
          </div>
          
        </form>
        {message && (
          message.includes('successfully') ? (
            <SuccessMessage>{message}</SuccessMessage>
          ) : (
            <ErrorMessage>{message}</ErrorMessage>
          )
        )}
      </FormContainer>
    </LoadingContainer>
  );
};

export default Loading;

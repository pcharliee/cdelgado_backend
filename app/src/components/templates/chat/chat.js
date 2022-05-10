import './chat.css';
import React from 'react';
import socketIOClient from 'socket.io-client';
import Button from '../../atoms/button/button.js';
import { useUser } from '../../../context/UserContext.js';
const ENDPOINT = 'http://cdelgado-backend.herokuapp.com';

function Chat(props) {
  const [ messages, setMessages ] = React.useState([]);
  const inputRef = React.useRef();
  const { currentUser } = useUser();

  React.useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on('chat', function (data) {
      const formattedMessages = formatChat(data.payload);
      setMessages(formattedMessages);
    });
  }, []);

  const formatChat = function (messages) {
    return messages.map(function (message) {
      return {
        sender: message.sender.name,
        message: message.message,
        sent: message.createdAt,
        avatar: message.sender.avatar,
      }
    });
  };
  
  const handleSendMessage = function () {
    let message = {
      sender: {
        id: currentUser.id,
        avatar: currentUser.avatar,
        name: currentUser.name,
        lastName: currentUser.name,
        author: currentUser.email,
      },
      message: inputRef.current.value 
    }
    props.onSendMessage(message)
      .then(function () {
        inputRef.current.value = '';
      });
  };

  const renderEmptyChat = function () {
    return (
      <h2>Chat is empty</h2>
    );
  };

  const renderChatItems = function () {
    if (!messages) return renderEmptyChat();
    return messages.map(function (message, index) {
      return (
        <div className='message-item' key={index}>
          <div className='avatar-sender-container'>
            <img src={message.avatar} className='avatar'></img>
            <p className='sender'>{message.sender}</p>
          </div>
          <p className='message'>{message.message}</p>
          <span>{new Date(message.sent).toLocaleString()}</span>
        </div>
      );
    });
  };

  const renderSendMessageBox = function () {
    return (
      <div className='send-message-container'>
        <input
          type='text'
          ref={inputRef}
          placeholder='Type here'></input>
        <Button text='Enviar' onClick={handleSendMessage}/>
      </div>
    )
  };

  return (
    <div className='chat-container'>
      <div className='chats'>
        {renderChatItems()}
      </div>
      {renderSendMessageBox()}
    </div>
  );
}

export default Chat;

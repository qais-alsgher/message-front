import {React,useState,useEffect}from 'react';
import axios from 'axios';
import cookies from 'react-cookies';
import ScrollToBottom from 'react-scroll-to-bottom';

function Chat(props) {
    const [messages, setMessages] =useState([]);
    const userId = cookies.load('id');
    const getMessages = async() => {
        const response = await axios.get(`http://localhost:8081/messages/${props.room}`);
        setMessages(response.data);
    }

    const getOldMessages = async(room) => {
        const response = await axios.get(`http://localhost:8081/messages/${room}`);
        setMessages(response.data);
    }


    useEffect(() => {
        getMessages();
    }, []);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        console.log(e.target.message.value);
        const data={
          text:e.target.message.value,
          room:props.room,
          senderId:userId,
          // save the houre and menite
          date:  new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes()
        };
       await axios.post(`http://localhost:8081/messages`, data);
       props.socket.emit('sendMessage', data);
       getMessages();
    }


    props.socket.on('message', (data) => {
      getMessages();
      // setMessages([...messages, data]);
    });

    props.socket.on('oldMessage', (data) => {
      getOldMessages(data);

    });

  return (
    <div className='chat'>
      <h2>{props.userResived}</h2>
      <ScrollToBottom className="messages">
      {
        messages.map((message, index) => {
          return (
            <div key={index} className={message.senderId===+userId?'ownerMessage':'resvedMessage'}>
              <p className='nameATime'>{message.User.userName}</p>
              <p className='messageContent'>{message.text}</p>
              <p className='nameATime'>{message.date}</p>
            </div>
          )
        })
      }
      </ScrollToBottom>

        <form onSubmit={handleSendMessage} className='formSendMessage'>
            <input type="text" name="message" id="message" placeholder="message"/>
            <button type="submit">Send</button>
        </form>
    </div>
  )
}

export default Chat;

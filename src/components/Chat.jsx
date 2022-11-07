import {React,useState,useEffect}from 'react';
import axios from 'axios';
import cookies from 'react-cookies';

function Chat(props) {
    const [messages, setMessages] =useState([]);
    
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
          senderId:cookies.load('id'),
          // save the houre and menite
          date:  new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes()
        };
       await axios.post(`http://localhost:8081/messages`, data);
       props.socket.emit('sendMessage', data);
    }

    useEffect(() => {
      props.socket.on('message', (data) => {
        getMessages();
        // setMessages([...messages, data]);
      });

      props.socket.on('oldMessage', (data) => {
        getOldMessages(data);

      });
    }, [props.socket]);

  return (
    <div>
      {
        messages.map((message, index) => {
          return (
            <div key={index}>
              <p>{message.User.userName}</p>
              <p>{message.text}</p>
              <p>{message.date}</p>
            </div>
          )
        })
      }

        <form onSubmit={handleSendMessage}>
            <input type="text" name="message" id="message" placeholder="message"/>
            <button type="submit">Send</button>
        </form>
    </div>
  )
}

export default Chat;

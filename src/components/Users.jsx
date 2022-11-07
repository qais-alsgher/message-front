import {React,useState,useEffect}from 'react';
import axios from 'axios';
import cookies from 'react-cookies';
import io from 'socket.io-client';
import Chat from './Chat';

const socket = io.connect('http://localhost:8081');

function Users() {
    const [users, setUsers] =useState([]);
    const [room, setRoom] = useState('');
    
    const getUsers = async() => {
        const response = await axios.get(`http://localhost:8081/users`);
        setUsers(response.data);
    }

    useEffect(() => {
        getUsers();
    }, []);

    const handleJoinRoom = async (id) => {
        const userId = cookies.load('id');
        if(userId<id){
            const roomId = userId+id;
            socket.emit('joinRoom', roomId);
            setRoom(roomId);
        }else{
            const roomId = id+userId;
            socket.emit('joinRoom', roomId);
            setRoom(roomId);
        }

    }

  return (
    <div>
      {
        users.map((users)=>{
            return(
                <div key={users.id} onClick={()=>handleJoinRoom(users.id)} className='usergit '>
                    <img src={users.image} alt="userImage"/>
                    <p >{users.userName}</p>
                </div>
            )
        })
      }

      {room&&
        <Chat 
        room={room}
        socket={socket}/>
      }
    </div>
  )
}

export default Users;

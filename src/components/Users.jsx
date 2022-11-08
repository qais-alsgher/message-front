import {React,useState,useEffect}from 'react';
import axios from 'axios';
import cookies from 'react-cookies';
import io from 'socket.io-client';
import Chat from './Chat';

const socket = io.connect('http://localhost:8081');

function Users() {
    const [users, setUsers] =useState([]);
    const [room, setRoom] = useState('');
    const [userResived, setUserResived] = useState('');
    
    const getUsers = async() => {
        const response = await axios.get(`http://localhost:8081/users`);
        setUsers(response.data);
    }
    const getUserById= async (id) => {
        const response = await axios.get(`http://localhost:8081/users/${id}`);
        setUserResived(response.data);
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
            getUserById(id);
        }else{
            const roomId = id+userId;
            socket.emit('joinRoom', roomId);
            setRoom(roomId);
            getUserById(id);
        }

    }

  return (
    <div className='user' >
        <div>
      {
          users.map((users)=>{
              return(
                <div key={users.id} onClick={()=>handleJoinRoom(users.id)} className='userInfo'>
                    <img src={users.image} alt="userImage"/>
                    <p >{users.userName}</p>
                </div>
            )
        })
      }
        </div>

      {room&&
        <Chat 
        room={room}
        socket={socket}
        userResived={userResived.userName}/>
      }
    </div>
  )
}

export default Users;

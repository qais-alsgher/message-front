import {React,useState} from 'react';
import axios from 'axios';
import cookies from 'react-cookies';
function Signup() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
      e.preventDefault();
      const data={
        userName,
        password
      };
      const signupUser= await axios.post(`http://localhost:8081/signup`, data);
      cookies.save('name',signupUser.data.userName);
      cookies.save('id',signupUser.data.id);
      cookies.save('loggedIn',true);
      window.location.href = '/users';
    }
  return (
    <div className='regster'>
      <form onSubmit={handleLogin} className='regsterForm'>
        <h1>SignUp</h1>
        <input type="text" placeholder="userName" onChange={(e)=>{setUserName(e.target.value)}}/>
        <input type="password" placeholder="password" onChange={(e)=>{setPassword(e.target.value)}}/>
        <button type="submit" onClick={handleLogin}>SingUp</button>
      </form>
    </div>
  )
}

export default Signup;

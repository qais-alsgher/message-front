import {React,useState} from 'react';
import axios from 'axios';
import cookies from 'react-cookies';

function Login() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
      e.preventDefault();
      console.log(userName,password);
      const data={
        userName,
        password
      };
      const loginUser= await axios.post(`http://localhost:8081/login`, data);
      console.log(loginUser.data);
      cookies.save('name',loginUser.data.userName);
      cookies.save('id',loginUser.data.id);
      cookies.save('loggedIn',true);
      window.location.href = '/users';
    }
  return (
    <div className='regster'>
      <form onSubmit={handleLogin} className='regsterForm'>
        <h1>Login</h1>
        <input type="text" placeholder="userName" onChange={(e)=>{setUserName(e.target.value)}}/>
        <input type="password" placeholder="password" onChange={(e)=>{setPassword(e.target.value)}}/>
        <button type="submit" onClick={handleLogin}>Login</button>
        <a href="/signup">If Doesn't Have Account Click here to SignUp</a>
      </form>
    </div>
  )
}

export default Login;

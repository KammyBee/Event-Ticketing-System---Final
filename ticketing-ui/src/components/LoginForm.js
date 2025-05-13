// src/components/LoginForm.js
import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';

export default function LoginForm() {
  const [form, setForm] = useState({ email:'', password:'' });
  const { login } = useContext(AuthContext);

  const submit = async e => {
    e.preventDefault();
    const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, form);
    // Store token and (if returned) role
    login({ token: data.token, role: data.role });
  };

  return (
    <form onSubmit={submit}>
      <input placeholder="Email"  onChange={e=>setForm({...form,email:e.target.value})}/>
      <input placeholder="Password" type="password"
             onChange={e=>setForm({...form,password:e.target.value})}/>
      <button>Login</button>
    </form>
  );
}

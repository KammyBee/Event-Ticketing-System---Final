// src/components/RegisterForm.js
import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';

export default function RegisterForm() {
  const [form, setForm] = useState({ name:'', email:'', password:'' });
  const { login } = useContext(AuthContext);

  const submit = async e => {
    e.preventDefault();
    await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, form);
    // on success, auto-login:
    const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
      email: form.email,
      password: form.password
    });
    // data.token holds the JWT
    login({ token: data.token, role: data.role /* if you return it*/ });
  };

  return (
    <form onSubmit={submit}>
      <input placeholder="Name"   onChange={e=>setForm({...form,name:e.target.value})}/>
      <input placeholder="Email"  onChange={e=>setForm({...form,email:e.target.value})}/>
      <input placeholder="Password" type="password"
             onChange={e=>setForm({...form,password:e.target.value})}/>
      <button>Register & Login</button>
    </form>
  );
}

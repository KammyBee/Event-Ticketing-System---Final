// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import RegisterForm  from './components/RegisterForm';
import LoginForm     from './components/LoginForm';
import EventList     from './components/EventList';

function Home() {
  return (
    <div style={{ padding: '1rem' }}>
      <h1>Welcome to the Event Ticketing UI</h1>
      <p>This app will let you register, create events, and book tickets.</p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
        <Link to="/register" style={{ marginRight: '1rem' }}>Register</Link>
        <Link to="/login"    style={{ marginRight: '1rem' }}>Login</Link>
        <Link to="/events">Events</Link>
      </nav>

      <Routes>
        <Route path="/"         element={<Home />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login"    element={<LoginForm />} />
        <Route path="/events"   element={<EventList />} />
      </Routes>
    </BrowserRouter>
  );
}

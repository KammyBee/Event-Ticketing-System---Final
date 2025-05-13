// src/App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterForm  from './components/RegisterForm';
import LoginForm     from './components/LoginForm';
import EventList     from './components/EventList';
import BookingForm   from './components/BookingForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login"    element={<LoginForm />} />
        <Route path="/events"   element={<EventList />} />
        {/* For detail+booking: */}
        <Route
          path="/events/:id"
          element={<EventDetailWithBooking />}
        />
      </Routes>
    </BrowserRouter>
  );
}

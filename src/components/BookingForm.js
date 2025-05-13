// src/components/BookingForm.js
import { useState, useContext } from 'react';
import axios           from 'axios';
import { AuthContext } from '../AuthContext';

export default function BookingForm({ eventId }) {
  const [qty, setQty] = useState(1);
  const { token }     = useContext(AuthContext);

  const book = async () => {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/bookings`,
      { event: eventId, quantity: qty },
      { headers: { Authorization: `Bearer ${token}` }}
    );
    alert('Booked!');
  };

  return (
    <div>
      <input type="number"
             value={qty}
             min={1}
             onChange={e=>setQty(e.target.value)}/>
      <button onClick={book}>Book {qty} Ticket(s)</button>
    </div>
  );
}

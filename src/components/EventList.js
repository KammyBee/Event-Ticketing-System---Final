// src/components/EventList.js
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';

export default function EventList() {
  const [events, setEvents] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/events`)
      .then(res => setEvents(res.data));
  }, []);

  const createEvent = async newEvent => {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/events`,
      newEvent,
      { headers: { Authorization: `Bearer ${token}` }}
    );
    // re-fetch
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/events`);
    setEvents(data);
  };

  return (
    <div>
      <h2>All Events</h2>
      <ul>
        {events.map(e => (
          <li key={e._id}>{e.title} @ {new Date(e.date).toLocaleString()}</li>
        ))}
      </ul>
      {/* Show a CreateEventForm only if user is admin */}
      { token && <CreateEventForm onSubmit={createEvent} /> }
    </div>
  );
}

// src/components/CreateEventForm.js
import { useState, useContext } from 'react';
export default function CreateEventForm({ onSubmit }) {
  const [form, setForm] = useState({
    title:'', description:'', category:'', venue:'',
    date:'', time:'', seatCapacity:0, price:0
  });

  const handle = e => setForm({...form, [e.target.name]: e.target.value});

  return (
    <form onSubmit={e=>{ e.preventDefault(); onSubmit(form); }}>
      <input name="title"       placeholder="Title"       onChange={handle}/>
      <input name="category"    placeholder="Category"    onChange={handle}/>
      <input name="venue"       placeholder="Venue"       onChange={handle}/>
      <input name="date"        type="date"            onChange={handle}/>
      <input name="time"        type="time"            onChange={handle}/>
      <input name="seatCapacity" type="number"         onChange={handle}/>
      <input name="price"       type="number"          onChange={handle}/>
      <textarea name="description"
                placeholder="Description" onChange={handle}/>
      <button>Create Event</button>
    </form>
  );
}

import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';

export default function EventList() {
  // state hook for storing events
  const [events, setEvents] = useState([]);

  // grab the JWT token from context (if you need it for creating/updating)
  const { token } = useContext(AuthContext);

  // fetch all events on mount
  useEffect(() => {
    async function fetchEvents() {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/events`
        );
        setEvents(data);
      } catch (err) {
        console.error('Error loading events', err);
      }
    }
    fetchEvents();
  }, []);  // empty deps ⇒ only runs once

  // function to POST a new event (admins only)
  async function createEvent(newEvent) {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/events`,
        newEvent,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // refresh the list
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/events`
      );
      setEvents(data);
    } catch (err) {
      console.error('Error creating event', err);
    }
  }

  return (
    <div>
      <h2>All Events</h2>
      <ul>
        {events.map(ev => (
          <li key={ev._id}>
            {ev.title} — {new Date(ev.date).toLocaleString()}
          </li>
        ))}
      </ul>
      {/* 
        If you have a CreateEventForm component:
        {token && <CreateEventForm onSubmit={createEvent} />} 
      */}
    </div>
  );
}

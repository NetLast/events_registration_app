import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EventList.css';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/events')
      .then(response => response.json())
      .then(data => setEvents(data))
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  // Function to navigate to the registration page
  const handleRegister = (eventId) => {
    navigate(`/register/${eventId}`);
  };

  // Function to navigate to the event details page
  const handleViewDetails = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  // Filter events based on the search term
  const filteredEvents = events.filter(event => {
    const { name, date, organizer } = event;
    return (
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      new Date(date).toLocaleDateString().includes(searchTerm) ||
      (organizer && organizer.toLowerCase().includes(searchTerm.toLowerCase())) // Add organizer filter
    );
  });

  return (
    <div className="event-list-all">
      <div id="search-input-list"><input
        type="text"
        placeholder="Search by title, date, or organizer..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      /></div>
      <div className="event-list">
        {filteredEvents.map(event => (
          <div className="event-card" key={event._id}>
            <h2>{event.name.charAt(0).toUpperCase() + event.name.slice(1).toLowerCase()}</h2>
            <p>{event.description}</p>
            <p>{new Date(event.date).toLocaleDateString()}</p>
            <p>Organizer: {event.organizer || 'Unknown'}</p>
            <button className="register-btn" onClick={() => handleRegister(event._id)}>Register</button>
            <button className="view-btn" onClick={() => handleViewDetails(event._id)}>View Details</button>
          </div>
      ))}
      </div>
      </div>
  );
};

export default EventList;

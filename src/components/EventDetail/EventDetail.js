import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ParticipantCard from './ParticipantCard'; // Import the participant card component
import './EventDetail.css';

const EventDetail = () => {
  const { id } = useParams(); // Get ID from the route
  const [event, setEvent] = useState(null);
  const [participants, setParticipants] = useState([]); // State variable for participants
  const [searchTerm, setSearchTerm] = useState(''); // State variable for search term
  const [filteredParticipants, setFilteredParticipants] = useState([]); // State for filtered participants

  useEffect(() => {
    // Fetch event details by ID from URL
    fetch(`http://localhost:5000/api/events/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setEvent(data))
      .catch(error => console.error('Error fetching event details:', error));

    // Fetch participants for the event
    fetch(`http://localhost:5000/api/participants/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setParticipants(data);
        setFilteredParticipants(data); // Initialize filtered participants with all participants
      })
      .catch(error => console.error('Error fetching participants:', error));
  }, [id]);

  useEffect(() => {
    // Filter participants based on search term
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filtered = participants.filter(participant => {
      const fullName = `${participant.name} ${participant.surname}`.toLowerCase();
      return (
        fullName.includes(lowercasedSearchTerm) ||
        participant.email.toLowerCase().includes(lowercasedSearchTerm)
      );
    });
    setFilteredParticipants(filtered);
  }, [searchTerm, participants]);

  if (!event) {
    return <div>Loading event details...</div>;
  }

  return (
    <div className="event-detail">
      <h1>{event.name.charAt(0).toUpperCase() + event.name.slice(1).toLowerCase()}</h1>
      <input
        id="eventDetail-search"
        type="text"
        placeholder="Search by name or email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <h2>Participants:</h2>
      {filteredParticipants.length === 0 ? (
        <p>No participants found.</p>
      ) : (
        <div className="participant-list">
          {filteredParticipants.map(participant => (
            <ParticipantCard key={participant._id} participant={participant} />
          ))}
        </div>
      )}
    </div>
  );
};

export default EventDetail;

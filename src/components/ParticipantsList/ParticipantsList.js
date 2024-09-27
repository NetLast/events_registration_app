// ParticipantsList.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ParticipantsList.css';

const ParticipantsList = () => {
  const { id } = useParams();
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await fetch(`/api/events/participants/${id}`);
;
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setParticipants(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="participants-list">
      {participants.length > 0 ? (
        participants.map(participant => (
          <div className="participant-card" key={participant._id}>
            <h2>{participant.name}</h2>
            <p>Email: {participant.email}</p>
          </div>
        ))
      ) : (
        <p>No participants found.</p>
      )}
    </div>
  );
};

export default ParticipantsList;

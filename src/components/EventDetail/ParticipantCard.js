import React from 'react';
import './ParticipantCard.css'; // Стилі для картки учасника

const ParticipantCard = ({ participant }) => {
  return (
    <div className="participant-card">
      <h3>{participant.name}</h3>
      <p>Email: {participant.email}</p>
    </div>
  );
};

export default ParticipantCard;

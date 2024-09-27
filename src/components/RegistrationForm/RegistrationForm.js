import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './RegistrationForm.css'; // styles for the form

const RegistrationForm = () => {
  const { id } = useParams(); // Get the event ID from the URL
  const navigate = useNavigate(); // Initialize navigate for navigation
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState(''); // Date of birth
  const [source, setSource] = useState(''); // Source of information
  const [message, setMessage] = useState('');
  const [error, setError] = useState(''); // For error handling
  const [success, setSuccess] = useState(false); // State for successful registration

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/participants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          dob,
          source,
          event: id, // Add event ID
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Clear the form
      setName('');
      setEmail('');
      setDob('');
      setSource('');
      setMessage('');
      setError('');
      setSuccess(true); // Set successful state

      // navigate(`/event/${id}`); // Disabled navigation to show message
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error during registration');
      setError(''); // Reset error message
    }
  };

  return (
    <div className="registration-form">
      <h2>Event Registration</h2>
      {error && <p className="error">{error}</p>} {/* Show error message */}
      {success ? (
        <div className="success-message">
          <p>You have successfully registered for the event!</p>
          <button onClick={() => navigate('/')}>Go to event list</button> {/* Button to navigate to the event list */}
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Your Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Your Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="dob">Date of Birth:</label>
            <input
              type="date"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>How did you hear about the event:</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  value="Social Media"
                  checked={source === 'Social Media'}
                  onChange={(e) => setSource(e.target.value)}
                />
                Social Media
              </label>
              <label>
                <input
                  type="radio"
                  value="Friends"
                  checked={source === 'Friends'}
                  onChange={(e) => setSource(e.target.value)}
                />
                Friends
              </label>
              <label>
                <input
                  type="radio"
                  value="Found it on my own"
                  checked={source === 'Found it on my own'}
                  onChange={(e) => setSource(e.target.value)}
                />
                Found it on my own
              </label>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <button type="submit">Register</button>
        </form>
      )}
    </div>
  );
};

export default RegistrationForm;

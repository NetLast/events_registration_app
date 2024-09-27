import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import EventList from './components/EventList/EventList.js';
import EventDetail from './components/EventDetail/EventDetail.js';
import RegistrationForm from './components/RegistrationForm/RegistrationForm.js';
import ParticipantsList from './components/ParticipantsList/ParticipantsList.js'; // Компонент для перегляду учасників
import axios from 'axios';

const App = () => {
  const [events, setEvents] = useState([]); // Стан для подій
  const navigate = useNavigate();

  // Отримуємо дані з бекенду
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/events'); // URL вашого бекенду
        console.log('Отримані події:', response.data);
        setEvents(response.data);
      } catch (error) {
        console.error('Помилка при отриманні подій:', error);
      }
    };

    fetchEvents();
  }, []);

  // Функція для обробки реєстрації
  const handleRegister = (eventId) => {
    console.log(`Реєстрація на захід з ID: ${eventId}`);
    navigate(`/register/${eventId}`); // Переходить на сторінку реєстрації
  };

  // Функція для обробки перегляду заходу
  const handleView = (eventId) => {
    console.log(`Перегляд заходу з ID: ${eventId}`);
    navigate(`/event/${eventId}`); // Переходить на сторінку з деталями заходу
  };

  // Функція для перегляду учасників
  const handleViewParticipants = (eventId) => {
    console.log(`Перегляд учасників заходу з ID: ${eventId}`);
    navigate(`/participants/${eventId}`); // Переходить на сторінку з учасниками
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <EventList
            events={events}
            onRegister={handleRegister}
            onView={handleView}
            onViewParticipants={handleViewParticipants}
          />
        }
      />
      <Route path="/events/:id" element={<EventDetail />} />
      <Route path="/register/:id" element={<RegistrationForm />} />
    </Routes>
  );
};

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { faker } = require('@faker-js/faker');

// Імпорт маршрутів
const eventRoutes = require('./routes/events');
const participantRoutes = require('./routes/participants');

const app = express();
app.use(cors());
app.use(express.json());

// Підключення до MongoDB
mongoose.connect('mongodb://localhost:27017/eventsdb')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Генерація тестових даних (подій та учасників)
const generateTestData = async () => {
  const Event = require('./models/Event'); // Імпортуємо модель події
  const Participant = require('./models/Participant'); // Імпортуємо модель учасника

  const existingEvents = await Event.find();

  // Якщо дані вже існують, не генеруємо нові
  if (existingEvents.length > 0) {
    console.log('Test data already exists, skipping generation.');
    return;
  }

  // Генерація рандомних подій
  for (let i = 0; i < 10; i++) {
    const event = new Event({
      name: faker.lorem.words(3), // Генерація випадкової назви події
      date: faker.date.future(), // Генерація випадкової дати в майбутньому
      description: faker.lorem.sentence(), // Генерація випадкового опису події
      organizer: faker.company.name(), // Генерація випадкового організатора
    });
    await event.save().catch(err => console.log('Error saving event:', err));

    // Генерація рандомних учасників для кожної події
    for (let j = 0; j < 5; j++) {
      const participant = new Participant({
        name: faker.name.fullName(),
        email: faker.internet.email(),
        event: event._id // Зберігаємо ID заходу
      });

      await participant.save().catch(err => console.log('Error saving participant:', err));
    }
  }

  console.log('Test data generated successfully.');
};

// Виклик генерації тестових даних
generateTestData().catch(err => console.log('Error generating test data:', err));

// Маршрути
app.use('/api/events', eventRoutes);
app.use('/api/participants', participantRoutes);

const corsOptions = {
  origin: 'http://localhost:3000', // Додайте URL вашого клієнта
  methods: ['GET', 'POST'], // Додайте методи, які ви плануєте використовувати
  credentials: true,
};

app.use(cors(corsOptions));
// Запуск сервера
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

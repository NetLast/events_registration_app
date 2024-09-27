const express = require('express');
const Event = require('../models/Event');
const Participant = require('../models/Participant');
const { faker } = require('@faker-js/faker');

const router = express.Router();

// Генерація рандомних подій
router.get('/generate', async (req, res) => {
  const events = [];

  for (let i = 0; i < 10; i++) {
    const event = new Event({
      name: faker.lorem.words(3), // Генерація випадкової назви події
      date: faker.date.future(), // Генерація випадкової дати в майбутньому
      description: faker.lorem.sentence(), // Генерація випадкового опису події
      organizer: faker.company.name(), // Генерація випадкового організатора
    });

    // Зберігаємо подію у базі даних
    await event.save();
    events.push(event);
  }

  // Відправляємо згенеровані події у відповіді
  res.json(events);
});

// Отримати всі події
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events' });
  }
});

// Отримати подію по ID
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('participants');
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching event' });
  }
});

module.exports = router;

// routes/participants.js
const express = require('express');
const Participant = require('../models/Participant');
const router = express.Router();

// Отримання учасників за ID події
router.get('/:id', async (req, res) => {
  try {
    const participants = await Participant.find({ event: req.params.id });
    res.json(participants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving participants', error });
  }
});

// Додавання нового учасника
router.post('/', async (req, res) => {
  console.log('Received data:', req.body); // Лог для перевірки
  try {
    const newParticipant = new Participant(req.body);
    await newParticipant.save();
    res.status(201).json(newParticipant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding participant', error });
  }
});

module.exports = router;

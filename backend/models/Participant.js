const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  registrationDate: { type: Date, required: true }
});

module.exports = mongoose.model('Participant', participantSchema);

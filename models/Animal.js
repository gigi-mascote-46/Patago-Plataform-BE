const mongoose = require('mongoose');

const ConfirmationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  photoUrl: String,
  comment: String,
  confirmedAt: { type: Date, default: Date.now }
});

const AnimalSchema = new mongoose.Schema({
  species: {
    type: String,
    required: true,
    enum: ['dog', 'cat', 'bird', 'other']
  },
  description: { type: String, required: true },
  photoUrl: String,
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  dateFound: { type: Date, required: true },
  reporter: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  adopted: { type: Boolean, default: false },
  confirmations: [ConfirmationSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Animal', AnimalSchema);

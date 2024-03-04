const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, index: true },
  token: String,
  hash: String,
  birthdate: Date,
  location: [{ latitude: Number, longitude: Number }],
  bio: String,
  userPassion: [{ type: mongoose.Schema.Types.ObjectId, ref: 'userPassion' }],
  gender: { type: String, enum: ['homme', 'femme'], },
  isConnected: Boolean,
  chatChannels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'chatChannels' }],
}, { timestamps: true }); //ajoute automatiquement createdAt et updatedAt

const User = mongoose.model('users', userSchema);

module.exports = User;
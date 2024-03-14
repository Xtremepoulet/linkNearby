const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, index: true },
  hash: { type: String, required: true },
  name: String,
  birthdate: Date,
  location: [{ latitude: Number, longitude: Number }],
  bio: String,
  uri: String,
  userPassion: [{ type: mongoose.Schema.Types.ObjectId, ref: 'passions' }],
  gender: { type: String, enum: ['homme', 'femme'], },
  isConnected: { type: Boolean, default: true },
  lastHeartbeat: { type: Date, default: Date.now },
  chatChannels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'chatChannels' }],
  tokenNotification: String,
}, { timestamps: true }); //ajoute automatiquement createdAt et updatedAt

const User = mongoose.model('users', userSchema);

module.exports = User;
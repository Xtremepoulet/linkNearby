const mongoose = require('mongoose');


//ca ne stock pas tout les messages ? 
const messageSchema = new mongoose.Schema({
    channel: { type: mongoose.Schema.Types.ObjectId, ref: 'Channel' },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: String,
    createdAt: { type: Date, default: Date.now }
  });

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
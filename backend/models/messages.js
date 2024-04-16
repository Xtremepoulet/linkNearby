const mongoose = require('mongoose');


//ca ne stock pas tout les messages ? 
const messageSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  message: String,
  CreatedAt: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false }
});

const Message = mongoose.model('messages', messageSchema);

module.exports = Message;
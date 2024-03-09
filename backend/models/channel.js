const mongoose = require('mongoose');


const channelSchema = new mongoose.Schema({
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  });
  
  const Channel = mongoose.model('Channel', channelSchema);
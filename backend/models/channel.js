const mongoose = require('mongoose');


const channelSchema = new mongoose.Schema({
    users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }], 
});
  

const Channels = mongoose.model('Channel', channelSchema);

module.exports = Channels;
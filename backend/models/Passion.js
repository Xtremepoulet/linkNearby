const mongoose = require('mongoose');

const passionSchema = mongoose.Schema({
    name: String,
    emoji: String,
});

const Passion = mongoose.model('passions', passionSchema);

module.exports = Passion;
const mongoose = require("mongoose");

const TalkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  speaker: String
});

module.exports = mongoose.model('Talk', TalkSchema);
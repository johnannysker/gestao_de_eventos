import mongoose from 'mongoose';

const TalkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  speaker: String
});

export default mongoose.model('Talk', TalkSchema);
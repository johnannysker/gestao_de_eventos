import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'Organizer', required: true },
  speakers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Talk' }],
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Participant' }]
});

export default mongoose.model('Event', EventSchema);
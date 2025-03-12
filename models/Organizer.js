import mongoose from 'mongoose';


const organizerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile: {
    bio: { type: String },
    avatar: { type: String }
  }
});



const Organizer = mongoose.model("Organizer", organizerSchema);

export default Organizer;
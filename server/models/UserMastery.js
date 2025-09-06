import mongoose from 'mongoose';

const userMasterySchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  mastery: [
    {
      topic: { type: String, required: true },
      score: { type: Number, required: true, min: 0, max: 1 },
    },
  ],
});

const UserMastery = mongoose.model('UserMastery', userMasterySchema);
export default UserMastery;
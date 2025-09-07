import mongoose from 'mongoose';

const skillVectorSchema = new mongoose.Schema({
    skill: { type: String, required: true },
    weight: { type: Number, required: true } // How much this course teaches this skill
});

const courseSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  skillVector: [skillVectorSchema] // The set of skills this course teaches
});

const Course = mongoose.model('Course', courseSchema);
export default Course;
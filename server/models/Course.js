import mongoose from 'mongoose';
const courseSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
});
const Course = mongoose.model('Course', courseSchema);
export default Course;
import mongoose from 'mongoose';

const skillNodeSchema = new mongoose.Schema({
  skill: { type: String, required: true, index: true }, // e.g., 'React Hooks'
  mastery: { type: Number, default: 0.1, min: 0, max: 1 }, // User's mastery score
  lastUpdated: { type: Date, default: Date.now }
});

const knowledgeGraphSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  nodes: [skillNodeSchema],
  recentActivity: [{
    activityType: { type: String, enum: ['QUIZ', 'MODULE_COMPLETION', 'ENROLLMENT'] },
    details: String,
    points: { type: Number, default: 0 },
    timestamp: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

const KnowledgeGraph = mongoose.model('KnowledgeGraph', knowledgeGraphSchema);
export default KnowledgeGraph;
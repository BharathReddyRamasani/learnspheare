import OpenAI from 'openai';

// --- THE BULLETPROOF FIX ---
// Replace "YOUR_API_KEY_HERE" with your actual key from the OpenAI website.
const apiKey = "AIzaSyDsvXY77T-HO3TmayCI0mzd18sba-SAT1s"; 

const openai = new OpenAI({ apiKey: apiKey });
// --- END OF FIX ---

export const generateAIRoadmap = async (careerGoal, userKnowledgeModel) => {
  // ... rest of the function remains the same
  const skillsList = userKnowledgeModel.map(node => `${node.skill} (Mastery: ${node.mastery.toFixed(2)})`).join(', ');
  const prompt = `Act as a senior hiring manager and IIT placement mentor. A B.Tech student's career goal is "${careerGoal}". Their current skills are: ${skillsList || 'None specified'}. Generate a detailed, 3-month weekly learning roadmap in a structured JSON format. The plan must be tailored to help them get a high-paying job in India. Include technical skills, one relevant soft skill, and a mini-project idea for each week.

Return the response ONLY in a valid JSON format with a single key "generatedRoadmap". The value should be an array of 12 objects, where each object has "week", "theme", "technical_skills" (as an array), "soft_skill", and "mini_project_idea" keys.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });
    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error('Error generating AI Roadmap:', error);
    throw new Error('Failed to generate AI Roadmap.');
  }
};
// This service contains our core Data Science / Machine Learning logic.

/**
 * Calculates the cosine similarity between two vectors.
 * A core ML concept to measure how similar two items are.
 * @param {Map<string, number>} vecA - The first vector (e.g., user's skill gaps)
 * @param {Map<string, number>} vecB - The second vector (e.g., course's skill profile)
 * @returns {number} The cosine similarity score (from -1 to 1).
 */
function cosineSimilarity(vecA, vecB) {
  let dotProduct = 0.0;
  let normA = 0.0;
  let normB = 0.0;
  
  const allSkills = new Set([...vecA.keys(), ...vecB.keys()]);

  for (const skill of allSkills) {
    const valA = vecA.get(skill) || 0;
    const valB = vecB.get(skill) || 0;
    dotProduct += valA * valB;
    normA += valA * valA;
    normB += valB * valB;
  }
  
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}


/**
 * Recommends courses based on the user's knowledge gaps using cosine similarity.
 * @param {KnowledgeGraph} userKnowledgeGraph - The user's full knowledge graph document.
 * @param {Array<Course>} allCourses - An array of all available courses.
 * @returns {Array<Course>} - A sorted array of recommended courses.
 */
export const recommendCourses = (userKnowledgeGraph, allCourses) => {
  // 1. Create a "skill gap" vector for the user.
  // Skills with low mastery have high values in this vector (1 - mastery).
  const userGapVector = new Map(
    userKnowledgeGraph.nodes.map(node => [node.skill, 1 - node.mastery])
  );

  // 2. Calculate the similarity between the user's gap and each course.
  const courseScores = allCourses.map(course => {
    const courseSkillVector = new Map(
      course.skillVector.map(sv => [sv.skill, sv.weight])
    );
    const similarity = cosineSimilarity(userGapVector, courseSkillVector);
    return { course, score: similarity };
  });

  // 3. Sort courses by the highest similarity score and return them.
  const recommended = courseScores
    .sort((a, b) => b.score - a.score)
    .map(item => item.course);
  
  console.log(`Recommendation generated. Top course: ${recommended[0]?.title}`);
  return recommended;
};
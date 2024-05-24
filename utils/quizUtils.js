// Function to generate a random seed-based number
function seededRandom(seed) {
  let x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

// Function to shuffle array using seed-based random number generator
function shuffleArrayWithSeed(array, seed) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom(seed) * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Function to get random questions based on seed
export function getRandomQuestionsWithSeed(questions, seed, numQuestions = 16) {
  const shuffled = shuffleArrayWithSeed(questions, seed);
  return shuffled.slice(0, numQuestions);
}

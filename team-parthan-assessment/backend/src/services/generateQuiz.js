//Developed by Srishti

// netlify/functions/generate-quiz.js
const { OpenAI } = require('openai');

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { topics } = JSON.parse(event.body);

    if (!topics || !Array.isArray(topics) || topics.length === 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Topics array is required' }),
      };
    }

    // Check if GROQ_API_KEY exists
    if (!process.env.GROQ_API_KEY) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: 'Failed to generate quiz',
          details: 'GROQ_API_KEY environment variable is missing or empty',
        }),
      };
    }

    // Create OpenAI instance for Groq
    const openai = new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: 'https://api.groq.com/openai/v1',
    });

    const prompt = `
You are an expert in data structures and algorithms. Given the list of topics: ${topics.join(', ')}, generate exactly 5 multiple choice questions (MCQs) per topic. Each question must:
- Be clearly related to the given topic.
- Have exactly 4 options.
- Have only one correct option, specified using zero-based indexing (0, 1, 2, or 3).
- Include a short, correct explanation that matches the selected answer.
- Be formatted strictly as a JSON array of objects like this:
[
  {
    "question": "Your question here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": 2,
    "explanation": "Brief explanation of why this option is correct.",
    "topic": "name of topic from ${topics.join(', ')}"
  }
]

⚠️ Return only the valid JSON array. No markdown, no text, no comments. Just the array.
`;

    const completion = await openai.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    const response = completion.choices[0]?.message?.content ?? '';
    const match = response.match(/\[\s*{[\s\S]*}\s*\]/);

    if (!match) {
      throw new Error('Could not parse JSON array from Groq response.');
    }

    const rawQuiz = JSON.parse(match[0]);

    const quiz = rawQuiz.map((q, i) => ({
      id: `${i + 1}`,
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
      topic: q.topic || topics.join(', '),
    }));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ quiz }),
    };
  } catch (error) {
    console.error('Error generating quiz:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to generate quiz',
        details: error.message,
      }),
    };
  }
};

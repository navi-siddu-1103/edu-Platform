'use server';
/**
 * @fileOverview Generates a personalized email with quiz results.
 *
 * - generateQuizResultEmail - A function that creates email content based on quiz performance.
 * - GenerateQuizResultEmailInput - The input type for the function.
 * - GenerateQuizResultEmailOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const QuestionResultSchema = z.object({
  question: z.string(),
  selectedAnswer: z.string(),
  correctAnswer: z.string(),
  isCorrect: z.boolean(),
});

const GenerateQuizResultEmailInputSchema = z.object({
  userName: z.string().describe("The name of the user who took the quiz."),
  quizTitle: z.string().describe("The title of the quiz."),
  score: z.number().describe("The user's score as a percentage (e.g., 80)."),
  results: z.array(QuestionResultSchema).describe("An array of the user's answers and results for each question."),
});
export type GenerateQuizResultEmailInput = z.infer<typeof GenerateQuizResultEmailInputSchema>;

const GenerateQuizResultEmailOutputSchema = z.object({
  subject: z.string().describe("The subject line for the email."),
  body: z.string().describe("The HTML body of the email."),
});
export type GenerateQuizResultEmailOutput = z.infer<typeof GenerateQuizResultEmailOutputSchema>;

export async function generateQuizResultEmail(input: GenerateQuizResultEmailInput): Promise<GenerateQuizResultEmailOutput> {
  return generateQuizResultEmailFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQuizResultEmailPrompt',
  input: {schema: GenerateQuizResultEmailInputSchema},
  output: {schema: GenerateQuizResultEmailOutputSchema},
  prompt: `You are an encouraging AI tutor. Your task is to generate a personalized email for a student who has just completed a quiz.

The user's name is {{{userName}}}.
The quiz title is "{{{quizTitle}}}".
Their score was {{{score}}}%.

Here are their detailed results:
{{#each results}}
- Question: "{{question}}"
  - Their Answer: "{{selectedAnswer}}"
  - Correct Answer: "{{correctAnswer}}"
  - Was Correct: {{isCorrect}}
{{/each}}

Please generate an email with a friendly tone.
- The subject should be encouraging.
- The body should be in HTML format.
- Start by congratulating them on completing the quiz.
- Mention their score.
- If they did well (>= 80%), praise them.
- If they struggled (< 80%), be encouraging and suggest they review the module content.
- Do NOT include a summary of the questions and answers in the email body.
- Keep the email concise and positive.`,
});

const generateQuizResultEmailFlow = ai.defineFlow(
  {
    name: 'generateQuizResultEmailFlow',
    inputSchema: GenerateQuizResultEmailInputSchema,
    outputSchema: GenerateQuizResultEmailOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

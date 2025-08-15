'use server';
/**
 * @fileOverview Provides AI-powered code explanations.
 *
 * - explainCode - A function that explains a given code snippet.
 * - ExplainCodeInput - The input type for the explainCode function.
 * - ExplainCodeOutput - The return type for the explainCode function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainCodeInputSchema = z.object({
  code: z.string().describe("The user's code snippet to be explained."),
  programmingLanguage: z.string().describe('The programming language of the code.'),
});
export type ExplainCodeInput = z.infer<typeof ExplainCodeInputSchema>;

const ExplainCodeOutputSchema = z.object({
  explanation: z.string().describe('The AI-generated explanation of the code.'),
});
export type ExplainCodeOutput = z.infer<typeof ExplainCodeOutputSchema>;

export async function explainCode(input: ExplainCodeInput): Promise<ExplainCodeOutput> {
  return explainCodeFlow(input);
}

const explainCodePrompt = ai.definePrompt({
  name: 'explainCodePrompt',
  input: {schema: ExplainCodeInputSchema},
  output: {schema: ExplainCodeOutputSchema},
  prompt: `You are an expert programming tutor. A student has asked for an explanation of their code.

The student is using the {{{programmingLanguage}}} programming language.

Student's code:
\`\`\`{{{programmingLanguage}}}
{{{code}}}
\`\`\`

Provide a clear, concise, and easy-to-understand explanation of what the code does. Break it down step-by-step. Focus on the logic and concepts, not just a line-by-line translation.`,
});

const explainCodeFlow = ai.defineFlow(
  {
    name: 'explainCodeFlow',
    inputSchema: ExplainCodeInputSchema,
    outputSchema: ExplainCodeOutputSchema,
  },
  async input => {
    const {output} = await explainCodePrompt(input);
    return output!;
  }
);

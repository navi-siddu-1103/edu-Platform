// A Genkit flow that provides AI-powered coding hints to students.

'use server';

/**
 * @fileOverview Provides coding hints to students when they are stuck on a coding exercise.
 *
 * - codingHint - A function that provides coding hints based on the user's code and exercise description.
 * - CodingHintInput - The input type for the codingHint function.
 * - CodingHintOutput - The return type for the codingHint function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CodingHintInputSchema = z.object({
  code: z.string().describe('The user\u0027s current code.'),
  exerciseDescription: z.string().describe('The description of the coding exercise.'),
  programmingLanguage: z.string().describe('The programming language of the code.'),
});
export type CodingHintInput = z.infer<typeof CodingHintInputSchema>;

const CodingHintOutputSchema = z.object({
  hint: z.string().describe('The AI-powered hint to help the student complete the exercise.'),
});
export type CodingHintOutput = z.infer<typeof CodingHintOutputSchema>;

export async function codingHint(input: CodingHintInput): Promise<CodingHintOutput> {
  return codingHintFlow(input);
}

const codingHintPrompt = ai.definePrompt({
  name: 'codingHintPrompt',
  input: {schema: CodingHintInputSchema},
  output: {schema: CodingHintOutputSchema},
  prompt: `You are an AI coding tutor. A student is stuck on a coding exercise and needs a hint.  The student is using the {{{programmingLanguage}}} programming language.

Exercise description: {{{exerciseDescription}}}

Student\u0027s code:
```{{{programmingLanguage}}}
{{{code}}}
```

Provide a helpful hint to guide the student towards the correct solution, without giving the answer directly.`,
});

const codingHintFlow = ai.defineFlow(
  {
    name: 'codingHintFlow',
    inputSchema: CodingHintInputSchema,
    outputSchema: CodingHintOutputSchema,
  },
  async input => {
    const {output} = await codingHintPrompt(input);
    return output!;
  }
);

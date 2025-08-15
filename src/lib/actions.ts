"use server";

import { codingHint } from "@/ai/flows/coding-hint";
import { z } from "zod";

const HintSchema = z.object({
  code: z.string(),
  exerciseDescription: z.string(),
  programmingLanguage: z.string(),
});

type State = {
  hint?: string;
  error?: string;
}

export async function getCodingHintAction(prevState: State, formData: FormData): Promise<State> {
  try {
    const validatedFields = HintSchema.safeParse({
      code: formData.get('code'),
      exerciseDescription: formData.get('exerciseDescription'),
      programmingLanguage: formData.get('programmingLanguage'),
    });

    if (!validatedFields.success) {
      return { error: 'Invalid input.' };
    }

    const result = await codingHint(validatedFields.data);
    return { hint: result.hint };

  } catch (error) {
    console.error(error);
    return { error: 'Failed to get a hint. Please try again.' };
  }
}

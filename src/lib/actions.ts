"use server";

import { codingHint } from "@/ai/flows/coding-hint";
import { explainCode } from "@/ai/flows/explain-code";
import { z } from "zod";

const CodeActionSchema = z.object({
  code: z.string(),
  exerciseDescription: z.string(),
  programmingLanguage: z.string(),
});

type HintState = {
  hint?: string;
  error?: string;
}

export async function getCodingHintAction(prevState: HintState, formData: FormData): Promise<HintState> {
  try {
    const validatedFields = CodeActionSchema.safeParse({
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

type ExplanationState = {
  explanation?: string;
  error?: string;
}

export async function getCodeExplanationAction(prevState: ExplanationState, formData: FormData): Promise<ExplanationState> {
  try {
     const validatedFields = CodeActionSchema.safeParse({
      code: formData.get('code'),
      exerciseDescription: formData.get('exerciseDescription'), // Not used but present in form
      programmingLanguage: formData.get('programmingLanguage'),
    });

    if (!validatedFields.success) {
      return { error: 'Invalid input for explanation.' };
    }

    const result = await explainCode(validatedFields.data);
    return { explanation: result.explanation };

  } catch (error) {
    console.error(error);
    return { error: 'Failed to get an explanation. Please try again.' };
  }
}

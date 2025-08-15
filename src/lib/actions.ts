"use server";

import { codingHint } from "@/ai/flows/coding-hint";
import { explainCode } from "@/ai/flows/explain-code";
import { generateQuizResultEmail } from "@/ai/flows/generate-quiz-result-email";
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

// Schema for quiz results email action
const QuestionResultSchema = z.object({
  question: z.string(),
  selectedAnswer: z.string(),
  correctAnswer: z.string(),
  isCorrect: z.boolean(),
});

const EmailActionSchema = z.object({
  userEmail: z.string().email(),
  userName: z.string(),
  quizTitle: z.string(),
  score: z.number(),
  results: z.array(QuestionResultSchema),
});

type EmailState = {
  success?: boolean;
  error?: string;
}

export async function sendQuizResultEmailAction(data: z.infer<typeof EmailActionSchema>): Promise<EmailState> {
  try {
    const validatedData = EmailActionSchema.parse(data);

    const emailContent = await generateQuizResultEmail(validatedData);

    // In a real application, you would integrate an email sending service here.
    // For this example, we'll log the email content to the console.
    console.log('----- Sending Quiz Result Email -----');
    console.log(`To: ${validatedData.userEmail}`);
    console.log(`Subject: ${emailContent.subject}`);
    console.log('Body:');
    console.log(emailContent.body);
    console.log('------------------------------------');
    
    // Simulate a successful email send
    return { success: true };

  } catch (error) {
    console.error("Error sending quiz result email:", error);
    if (error instanceof z.ZodError) {
      return { error: 'Invalid data provided.' };
    }
    return { error: 'Failed to send quiz results. Please try again.' };
  }
}

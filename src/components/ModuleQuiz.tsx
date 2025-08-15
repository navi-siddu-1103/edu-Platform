"use client";

import type { Quiz, QuizQuestion } from "@/types";
import { useState } from "react";
import { HelpCircle, Check, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { sendQuizResultEmailAction } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";


interface ModuleQuizProps {
  quiz: Quiz;
}

type AnswerState = 'unanswered' | 'correct' | 'incorrect';
type Answers = Record<string, { selected: string; state: AnswerState }>;

export function ModuleQuiz({ quiz }: ModuleQuizProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [answerStates, setAnswerStates] = useState<Answers>({});
  const { toast } = useToast();
  const { user } = useAuth();


  const handleSelectAnswer = (questionId: string, option: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleSubmit = async () => {
    const newAnswerStates: Answers = {};
    let correctCount = 0;
    quiz.questions.forEach((q) => {
      const isCorrect = selectedAnswers[q.id] === q.correctAnswer;
      if (isCorrect) correctCount++;
      newAnswerStates[q.id] = {
        selected: selectedAnswers[q.id],
        state: isCorrect ? 'correct' : 'incorrect',
      };
    });
    setAnswerStates(newAnswerStates);
    setSubmitted(true);

    if (user?.email) {
       const score = (correctCount / quiz.questions.length) * 100;
       const results = quiz.questions.map(q => ({
        question: q.text,
        selectedAnswer: selectedAnswers[q.id],
        correctAnswer: q.correctAnswer,
        isCorrect: selectedAnswers[q.id] === q.correctAnswer
      }));

      const emailData = {
        userEmail: user.email,
        userName: user.displayName || user.email.split('@')[0],
        quizTitle: quiz.id, // Using quiz ID as a title for now
        score: score,
        results: results
      }

      const response = await sendQuizResultEmailAction(emailData);

      if (response.success) {
        toast({
            title: "Results Sent!",
            description: "A copy of your quiz results has been sent to your email.",
        });
      } else {
         toast({
            variant: "destructive",
            title: "Email Failed",
            description: response.error,
        });
      }
    }
  };
  
  const getResultColor = (questionId: string, option: string) => {
    if (!submitted) return '';
    const state = answerStates[questionId];
    const question = quiz.questions.find(q => q.id === questionId);
    
    if (option === question?.correctAnswer) return 'bg-green-100 border-green-300 text-green-800';
    if (state?.selected === option && state?.state === 'incorrect') return 'bg-red-100 border-red-300 text-red-800';

    return 'border-border';
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <div className="flex items-center gap-4">
           <div className="bg-primary/10 p-3 rounded-full">
            <HelpCircle className="h-6 w-6 text-primary" />
           </div>
          <div>
            <CardTitle className="font-headline">Module Quiz</CardTitle>
            <CardDescription>Test your understanding of the concepts covered in this module.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {quiz.questions.map((question, index) => (
            <div key={question.id}>
              <p className="font-semibold mb-4">
                {index + 1}. {question.text}
              </p>
              <RadioGroup
                value={selectedAnswers[question.id]}
                onValueChange={(value) => handleSelectAnswer(question.id, value)}
                disabled={submitted}
              >
                {question.options.map((option) => (
                   <div key={option} className={`flex items-center space-x-2 p-3 rounded-md border-2 transition-colors ${getResultColor(question.id, option)}`}>
                    <RadioGroupItem value={option} id={`${question.id}-${option}`} />
                    <Label htmlFor={`${question.id}-${option}`} className="w-full cursor-pointer">{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ))}
          {!submitted && (
            <Button onClick={handleSubmit} disabled={Object.keys(selectedAnswers).length !== quiz.questions.length}>
              Submit Quiz
            </Button>
          )}

          {submitted && (
             <Alert className={Object.values(answerStates).every(s => s.state === 'correct') ? 'border-green-500' : 'border-red-500'}>
                {Object.values(answerStates).every(s => s.state === 'correct') ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                <AlertTitle>
                  {Object.values(answerStates).every(s => s.state === 'correct') ? "Excellent!" : "Review needed"}
                </AlertTitle>
                <AlertDescription>
                   You answered {Object.values(answerStates).filter(s => s.state === 'correct').length} out of {quiz.questions.length} questions correctly.
                </AlertDescription>
              </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

"use client";

import type { Exercise } from "@/types";
import { useState, useEffect } from "react";
import { useFormState } from "react-dom";
import { Lightbulb, Terminal, AlertCircle, CheckCircle, BrainCircuit } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getCodingHintAction, getCodeExplanationAction } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";

interface CodingExerciseProps {
  exercise: Exercise;
}

const initialHintState = {
  hint: undefined,
  error: undefined,
};

const initialExplanationState = {
  explanation: undefined,
  error: undefined,
};

export function CodingExercise({ exercise }: CodingExerciseProps) {
  const [code, setCode] = useState(exercise.codeStub);
  const [output, setOutput] = useState('');
  const [hintState, hintFormAction] = useFormState(getCodingHintAction, initialHintState);
  const [explanationState, explanationFormAction] = useFormState(getCodeExplanationAction, initialExplanationState);
  const { toast } = useToast();

  useEffect(() => {
    if (hintState.error) {
      toast({
        variant: "destructive",
        title: "Oh no! Something went wrong.",
        description: hintState.error,
      });
    }
  }, [hintState.error, toast]);

  useEffect(() => {
    if (explanationState.error) {
      toast({
        variant: "destructive",
        title: "Oh no! Something went wrong.",
        description: explanationState.error,
      });
    }
  }, [explanationState.error, toast]);

  const handleRunCode = () => {
    setOutput('Running code...\n(Note: This is a simulated output)\n\nCongratulations! Your code works as expected.');
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <div className="flex items-center gap-4">
           <div className="bg-primary/10 p-3 rounded-full">
            <Terminal className="h-6 w-6 text-primary" />
           </div>
          <div>
            <CardTitle className="font-headline">Coding Exercise</CardTitle>
            <CardDescription>{exercise.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="bg-muted rounded-md p-4 mb-4">
          <label htmlFor="code-editor" className="sr-only">Code Editor</label>
          <Textarea
            id="code-editor"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="font-mono bg-card text-card-foreground min-h-[250px] border-0"
            placeholder="Write your code here..."
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <Button onClick={handleRunCode} className="w-full sm:w-auto bg-primary hover:bg-primary/90">
            Run Code
          </Button>
          <form action={hintFormAction} className="w-full sm:w-auto">
            <input type="hidden" name="code" value={code} />
            <input type="hidden" name="exerciseDescription" value={exercise.description} />
            <input type="hidden" name="programmingLanguage" value={exercise.language} />
            <Button type="submit" variant="outline" className="w-full">
              <Lightbulb className="mr-2 h-4 w-4" />
              Get a Hint
            </Button>
          </form>
          <form action={explanationFormAction} className="w-full sm:w-auto">
             <input type="hidden" name="code" value={code} />
             <input type="hidden" name="exerciseDescription" value={exercise.description} />
             <input type="hidden" name="programmingLanguage" value={exercise.language} />
             <Button type="submit" variant="outline" className="w-full">
                <BrainCircuit className="mr-2 h-4 w-4" />
                Explain Code
             </Button>
          </form>
        </div>
        
        {hintState.hint && (
          <Alert className="mb-4 bg-accent/20 border-accent/50">
            <Lightbulb className="h-4 w-4 text-accent-foreground" />
            <AlertTitle>Here's a hint!</AlertTitle>
            <AlertDescription>{hintState.hint}</AlertDescription>
          </Alert>
        )}

        {explanationState.explanation && (
          <Alert className="mb-4 bg-blue-500/10 border-blue-500/40">
            <BrainCircuit className="h-4 w-4 text-blue-600" />
            <AlertTitle>Code Explanation</AlertTitle>
            <AlertDescription>
                <div
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: explanationState.explanation.replace(/\n/g, '<br />') }}
                />
            </AlertDescription>
          </Alert>
        )}

        {output && (
          <Alert variant="default">
             <CheckCircle className="h-4 w-4" />
            <AlertTitle>Output</AlertTitle>
            <AlertDescription>
              <pre className="whitespace-pre-wrap">{output}</pre>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}

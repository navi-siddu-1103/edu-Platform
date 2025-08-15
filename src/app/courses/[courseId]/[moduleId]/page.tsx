import { notFound } from 'next/navigation';
import { findModule } from '@/lib/data';
import { CodingExercise } from '@/components/CodingExercise';
import { ModuleQuiz } from '@/components/ModuleQuiz';
import { Separator } from '@/components/ui/separator';

export default function ModulePage({ params }: { params: { courseId: string, moduleId: string } }) {
  const module = findModule(params.moduleId);

  if (!module || module.courseId !== params.courseId) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold tracking-tight font-headline text-primary">{module.title}</h1>
        <p className="text-lg text-muted-foreground mt-2">{module.content}</p>
      </div>
      
      <Separator />

      {module.exercise && <CodingExercise exercise={module.exercise} />}
      {module.quiz && <ModuleQuiz quiz={module.quiz} />}
    </div>
  );
}

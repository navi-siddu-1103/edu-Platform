import { notFound } from 'next/navigation';
import { findCourse, findModule } from '@/lib/data';
import { CodingExercise } from '@/components/CodingExercise';
import { ModuleQuiz } from '@/components/ModuleQuiz';

export default function CoursePage({ params }: { params: { courseId: string } }) {
  const course = findCourse(params.courseId);
  if (!course) {
    notFound();
  }
  
  // Display the first module of the course
  const firstModuleId = course.modules[0]?.id;
  if (!firstModuleId) {
    return (
      <div>
        <h1 className="text-3xl font-bold font-headline">{course.title}</h1>
        <p className="text-muted-foreground mt-2">{course.description}</p>
        <p className="mt-8">This course has no modules yet. Please check back later.</p>
      </div>
    );
  }

  const module = findModule(firstModuleId);
  if (!module) {
     notFound();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold font-headline">{module.title}</h1>
      <p className="text-muted-foreground mt-2">{module.content}</p>

      {module.exercise && <CodingExercise exercise={module.exercise} />}
      {module.quiz && <ModuleQuiz quiz={module.quiz} />}
    </div>
  );
}

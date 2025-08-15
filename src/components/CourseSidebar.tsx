import Link from 'next/link';
import type { Course } from '@/types';
import { CheckCircle, Circle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface CourseSidebarProps {
  course: Course;
  activeModuleId: string;
}

export function CourseSidebar({ course, activeModuleId }: CourseSidebarProps) {
  // Mock progress state
  const completedModules = ['module-1']; 

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle className="font-headline">{course.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <nav className="flex flex-col gap-2">
          {course.modules.map((module) => {
            const isActive = module.id === activeModuleId;
            const isCompleted = completedModules.includes(module.id);

            return (
              <Link
                key={module.id}
                href={`/courses/${course.id}/${module.id}`}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  isActive ? 'bg-primary/10 text-primary font-semibold' : ''
                }`}
              >
                {isCompleted ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <Circle className={`h-5 w-5 ${isActive ? 'text-primary' : ''}`} />
                )}
                {module.title}
              </Link>
            );
          })}
        </nav>
      </CardContent>
    </Card>
  );
}

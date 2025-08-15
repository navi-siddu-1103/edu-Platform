import { notFound } from 'next/navigation';
import { CourseSidebar } from '@/components/CourseSidebar';
import { findCourse } from '@/lib/data';

export default function CourseLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) {
  const course = findCourse(params.courseId);

  if (!course) {
    notFound();
  }
  
  // This logic is simplified; a real app would get active module from URL
  const activeModuleId = params.moduleId || course.modules[0]?.id;

  return (
    <div className="grid md:grid-cols-[250px_1fr] lg:grid-cols-[300px_1fr] gap-8 items-start">
      <div className="hidden md:block">
        <CourseSidebar course={course} activeModuleId={activeModuleId} />
      </div>
      <div>{children}</div>
    </div>
  );
}

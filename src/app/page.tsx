import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { courseCategories } from '@/lib/data';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="container mx-auto">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl font-headline">
          Welcome to CS-Academica
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Your journey into the world of computer science starts here. Explore our courses and start learning today.
        </p>
      </header>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {courseCategories.map((category) => (
          <Card key={category.id} className="overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <CardHeader>
              <Image
                src={`https://placehold.co/600x400.png`}
                data-ai-hint={category.imageHint}
                alt={category.title}
                width={600}
                height={400}
                className="rounded-t-lg object-cover"
              />
              <CardTitle className="pt-4 font-headline">{category.title}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                {category.courses.map((course) => (
                  <Link
                    href={`/courses/${course.id}`}
                    key={course.id}
                    className="group flex items-center justify-between rounded-md bg-secondary p-3 text-secondary-foreground transition-colors hover:bg-primary/10"
                  >
                    <span>{course.title}</span>
                    <ArrowRight className="h-5 w-5 text-primary transition-transform group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

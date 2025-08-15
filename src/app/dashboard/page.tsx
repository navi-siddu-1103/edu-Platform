import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { courseCategories } from "@/lib/data";

export default function DashboardPage() {
  return (
    <div className="container mx-auto">
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl font-headline">
          Welcome Back!
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Continue your learning journey and explore new courses.
        </p>
      </header>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {courseCategories.filter(c => c.courses.length > 0).map((category) => (
          <Card key={category.id} className="overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <CardHeader>
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

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { courseCategories } from "@/lib/data";

export default function DashboardPage() {
  return (
    <div className="container mx-auto">
      <header className="mb-12 relative">
        <div className="absolute inset-0 gradient-bg rounded-2xl -z-10"></div>
        <div className="py-8 px-6">
          <h1 className="text-4xl font-bold tracking-tight gradient-text sm:text-5xl md:text-6xl font-headline">
            Welcome Back!
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Continue your learning journey and explore new courses.
          </p>
        </div>
      </header>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {courseCategories.filter(c => c.courses.length > 0).map((category, index) => (
          <Card key={category.id} className="overflow-hidden card-hover border-2 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: `${index * 100}ms` }}>
            <CardHeader className="bg-gradient-to-br from-primary/5 to-accent/5">
              <CardTitle className="pt-4 font-headline bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{category.title}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex flex-col gap-4">
                {category.courses.map((course) => (
                  <Link
                    href={`/courses/${course.id}`}
                    key={course.id}
                    className="group flex items-center justify-between rounded-lg bg-gradient-to-r from-secondary to-secondary/50 p-3 text-secondary-foreground transition-all hover:from-primary/10 hover:to-accent/10 border border-transparent hover:border-primary/50 hover:shadow-md"
                  >
                    <span className="font-medium">{course.title}</span>
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

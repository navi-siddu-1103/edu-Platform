import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code, Lightbulb, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { courseCategories } from '@/lib/data';

export default function Home() {
  const features = [
    {
      icon: <Code className="h-10 w-10 text-primary" />,
      title: 'Interactive Coding Exercises',
      description: 'Get hands-on experience with real-world coding challenges right in your browser.',
    },
    {
      icon: <Lightbulb className="h-10 w-10 text-primary" />,
      title: 'AI-Powered Hints',
      description: 'Stuck on a problem? Our AI tutor provides helpful hints to guide you to the solution.',
    },
    {
      icon: <CheckCircle className="h-10 w-10 text-primary" />,
      title: 'Quizzes & Assessments',
      description: 'Test your knowledge with module-ending quizzes to solidify your learning.',
    },
  ];

  const testimonials = [
    {
      name: 'Alex Johnson',
      role: 'Aspiring Developer',
      avatar: 'https://placehold.co/100x100.png',
      dataAiHint: 'person portrait',
      quote: 'CS-Academica made learning to code so accessible. The interactive exercises are a game-changer!',
    },
    {
      name: 'Samantha Lee',
      role: 'Student',
      avatar: 'https://placehold.co/100x100.png',
      dataAiHint: 'woman smiling',
      quote: 'The AI hints are amazing! It’s like having a personal tutor available 24/7. I finally understand algorithms.',
    },
    {
        name: 'David Chen',
        role: 'Career Changer',
        avatar: 'https://placehold.co/100x100.png',
        dataAiHint: 'man portrait',
        quote: 'The courses are well-structured and easy to follow. I feel much more confident in my programming skills.',
    },
  ];

  return (
    <div className="container mx-auto">
      {/* Hero Section */}
      <section className="py-20 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl font-headline">
          Unlock Your Potential in Computer Science
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground">
          CS-Academica is your personal guide to mastering complex topics through hands-on coding, smart feedback, and structured learning paths.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/auth/signup">
              Start Learning for Free <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight font-headline">Why Choose CS-Academica?</h2>
            <p className="mt-2 text-muted-foreground">A better way to learn computer science.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="text-center">
              <CardHeader>
                <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                    {feature.icon}
                </div>
                <CardTitle className="pt-4 font-headline">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Course Categories Preview */}
      <section className="py-20 bg-secondary rounded-lg">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight font-headline">Explore Our Courses</h2>
          <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
            From algorithms to web development, we have a growing library of courses to help you achieve your goals.
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {courseCategories.filter(c => c.courses.length > 0).slice(0, 3).map((category) => (
              <Card key={category.id} className="overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <CardHeader>
                  <CardTitle className="pt-4 font-headline">{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{category.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
           <div className="mt-12">
            <Button asChild variant="outline">
                <Link href="/dashboard">
                View Full Catalog
                </Link>
            </Button>
           </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20">
         <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight font-headline">What Our Students Say</h2>
            <p className="mt-2 text-muted-foreground">Real stories from learners who leveled up their skills with CS-Academica.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial) => (
            <Card key={testimonial.name}>
                <CardContent className="pt-6">
                <p className="italic text-muted-foreground">"{testimonial.quote}"</p>
                <div className="mt-4 flex items-center gap-4">
                    <Avatar>
                        <AvatarImage src={testimonial.avatar} data-ai-hint={testimonial.dataAiHint} alt={testimonial.name} />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                </div>
                </CardContent>
            </Card>
            ))}
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 text-center">
         <h2 className="text-3xl font-bold tracking-tight font-headline">Ready to Start Your Journey?</h2>
         <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Create your free account today and get instant access to our courses.
         </p>
         <div className="mt-8">
            <Button asChild size="lg">
                <Link href="/auth/signup">
                  Sign Up Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
            </Button>
         </div>
      </section>
    </div>
  );
}

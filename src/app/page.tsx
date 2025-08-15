import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
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
         <div className="mt-8 flex justify-center gap-4">
          <Button asChild>
            <Link href="/auth/signup">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/dashboard">
              Go to Dashboard
            </Link>
          </Button>
        </div>
      </header>

      <div className="relative rounded-lg mt-16">
        <Image
            src="https://placehold.co/1200x600.png"
            data-ai-hint="programming learning"
            alt="E-learning platform hero image"
            width={1200}
            height={600}
            className="rounded-lg object-cover shadow-2xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent rounded-lg" />
      </div>
      
    </div>
  );
}

export interface QuizQuestion {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
}

export interface Quiz {
  id: string;
  questions: QuizQuestion[];
}

export interface Exercise {
  id: string;
  description: string;
  codeStub: string;
  language: string;
}

export interface Module {
  id: string;
  title: string;
  courseId: string;
  content: string;
  exercise?: Exercise;
  quiz?: Quiz;
}

export interface Course {
  id:string;
  title: string;
  description: string;
  modules: Module[];
}

export interface CourseCategory {
  id: string;
  title: string;
  description: string;
  courses: Course[];
  imageHint: string;
}

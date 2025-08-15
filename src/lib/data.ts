import type { CourseCategory, Course, Module } from '@/types';

export const modules: Module[] = [
  {
    id: 'module-1',
    title: 'Introduction to Algorithms',
    courseId: 'course-1',
    content: 'Learn the fundamentals of algorithmic thinking and how to measure complexity.',
    exercise: {
      id: 'ex-1',
      description: 'Write a function `sumArray` that takes an array of numbers and returns their sum.',
      codeStub: 'function sumArray(arr) {\n  // your code here\n}',
      language: 'javascript',
    },
    quiz: {
      id: 'quiz-1',
      questions: [
        {
          id: 'q-1-1',
          text: 'What is the time complexity of accessing an element in an array by its index?',
          options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'],
          correctAnswer: 'O(1)',
        },
        {
          id: 'q-1-2',
          text: 'Which of the following is a characteristic of a good algorithm?',
          options: ['It should be complex', 'It should be efficient', 'It should only work for one input', 'It should be slow'],
          correctAnswer: 'It should be efficient',
        },
      ],
    },
  },
  {
    id: 'module-2',
    title: 'Sorting Algorithms',
    courseId: 'course-1',
    content: 'Explore classic sorting algorithms like Bubble Sort, Merge Sort, and Quick Sort.',
    exercise: {
      id: 'ex-2',
      description: 'Implement the Bubble Sort algorithm to sort an array of numbers in ascending order.',
      codeStub: 'function bubbleSort(arr) {\n  // your code here\n}',
      language: 'javascript',
    },
    quiz: {
      id: 'quiz-2',
      questions: [
        {
          id: 'q-2-1',
          text: 'What is the worst-case time complexity of Bubble Sort?',
          options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'],
          correctAnswer: 'O(n^2)',
        },
      ],
    },
  },
    {
    id: 'module-3',
    title: 'Introduction to Data Structures',
    courseId: 'course-2',
    content: 'Understand the core concepts of data structures and their importance in programming.',
    exercise: {
      id: 'ex-3',
      description: 'Create a `Stack` class with `push`, `pop`, and `peek` methods.',
      codeStub: 'class Stack {\n  constructor() {\n    this.items = [];\n  }\n\n  // your methods here\n}',
      language: 'javascript',
    },
    quiz: {
      id: 'quiz-3',
      questions: [
        {
          id: 'q-3-1',
          text: 'Which data structure follows the Last-In, First-Out (LIFO) principle?',
          options: ['Queue', 'Stack', 'Linked List', 'Tree'],
          correctAnswer: 'Stack',
        },
      ],
    },
  },
];

export const courses: Course[] = [
  {
    id: 'course-1',
    title: 'Algorithms 101',
    description: 'A beginner-friendly introduction to essential algorithms.',
    modules: modules.filter(m => m.courseId === 'course-1'),
  },
  {
    id: 'course-2',
    title: 'Data Structures Fundamentals',
    description: 'Learn about fundamental data structures like stacks, queues, and linked lists.',
    modules: modules.filter(m => m.courseId === 'course-2'),
  },
];

export const courseCategories: CourseCategory[] = [
  {
    id: 'cat-1',
    title: 'Algorithms',
    description: 'Master the building blocks of efficient problem-solving.',
    courses: courses.filter(c => ['course-1'].includes(c.id)),
    imageHint: 'abstract algorithm'
  },
  {
    id: 'cat-2',
    title: 'Data Structures',
    description: 'Learn to organize and manage data effectively.',
    courses: courses.filter(c => ['course-2'].includes(c.id)),
    imageHint: 'data structure'
  },
   {
    id: 'cat-3',
    title: 'Coming Soon',
    description: 'More exciting courses are on the way to expand your knowledge.',
    courses: [],
    imageHint: ' futuristic technology'
  },
];

export const findCourse = (courseId: string) => courses.find(c => c.id === courseId);
export const findModule = (moduleId: string) => modules.find(m => m.id === moduleId);

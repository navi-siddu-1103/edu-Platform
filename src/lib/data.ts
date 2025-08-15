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
   {
    id: 'module-4',
    title: 'Python Basics',
    courseId: 'course-3',
    content: 'Learn about variables, data types, and basic operators in Python.',
    exercise: {
      id: 'ex-4',
      description: 'Write a Python function `greet` that takes a name and returns a greeting string.',
      codeStub: 'def greet(name):\n  # your code here\n  pass',
      language: 'python',
    },
    quiz: {
      id: 'quiz-4',
      questions: [
        {
          id: 'q-4-1',
          text: 'Which of the following is NOT a standard Python data type?',
          options: ['int', 'float', 'char', 'str'],
          correctAnswer: 'char',
        },
      ],
    },
  },
  {
    id: 'module-5',
    title: 'HTML Fundamentals',
    courseId: 'course-4',
    content: 'Learn the basic structure of a web page using HTML.',
    exercise: {
      id: 'ex-5',
      description: 'Create a simple HTML page with a heading, a paragraph, and a list.',
      codeStub: '<!DOCTYPE html>\n<html>\n<head>\n  <title>My Page</title>\n</head>\n<body>\n  <!-- your code here -->\n</body>\n</html>',
      language: 'html',
    },
    quiz: {
      id: 'quiz-5',
      questions: [
        {
          id: 'q-5-1',
          text: 'What does HTML stand for?',
          options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlink and Text Markup Language'],
          correctAnswer: 'Hyper Text Markup Language',
        },
      ],
    },
  },
  {
    id: 'module-6',
    title: 'Introduction to SQL',
    courseId: 'course-5',
    content: 'Learn how to query relational databases using SQL.',
    exercise: {
      id: 'ex-6',
      description: 'Write a SQL query to select all records from a table named `Customers`.',
      codeStub: '-- Your SQL query here',
      language: 'sql',
    },
    quiz: {
      id: 'quiz-6',
      questions: [
        {
          id: 'q-6-1',
          text: 'Which SQL statement is used to extract data from a database?',
          options: ['GET', 'SELECT', 'OPEN', 'EXTRACT'],
          correctAnswer: 'SELECT',
        },
      ],
    },
  },
  {
    id: 'module-7',
    title: 'Classes and Objects',
    courseId: 'course-6',
    content: 'Understand the core principles of Object-Oriented Programming.',
    exercise: {
      id: 'ex-7',
      description: 'Define a `Car` class with `make` and `model` attributes in Java.',
      codeStub: 'public class Car {\n  // your code here\n}',
      language: 'java',
    },
    quiz: {
      id: 'quiz-7',
      questions: [
        {
          id: 'q-7-1',
          text: 'Which concept is NOT a pillar of OOP?',
          options: ['Inheritance', 'Polymorphism', 'Encapsulation', 'Proceduralism'],
          correctAnswer: 'Proceduralism',
        },
      ],
    },
  },
  {
    id: 'module-8',
    title: 'The OSI Model',
    courseId: 'course-7',
    content: 'Learn the 7 layers of the OSI model for network communication.',
    exercise: {
      id: 'ex-8',
      description: 'List the 7 layers of the OSI model in order from bottom to top.',
      codeStub: '// Your answer here as a comment',
      language: 'plaintext',
    },
    quiz: {
      id: 'quiz-8',
      questions: [
        {
          id: 'q-8-1',
          text: 'Which layer of the OSI model is responsible for routing?',
          options: ['Physical Layer', 'Data Link Layer', 'Network Layer', 'Transport Layer'],
          correctAnswer: 'Network Layer',
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
  {
    id: 'course-3',
    title: 'Python Programming',
    description: 'Learn the fundamentals of Python, a versatile and popular programming language.',
    modules: modules.filter(m => m.courseId === 'course-3'),
  },
  {
    id: 'course-4',
    title: 'Web Development Basics',
    description: 'An introduction to HTML, CSS, and JavaScript for building web pages.',
    modules: modules.filter(m => m.courseId === 'course-4'),
  },
  {
    id: 'course-5',
    title: 'Introduction to Databases',
    description: 'Get started with relational databases and the SQL query language.',
    modules: modules.filter(m => m.courseId === 'course-5'),
  },
  {
    id: 'course-6',
    title: 'Object-Oriented Programming',
    description: 'Understand the principles of OOP using examples in Java.',
    modules: modules.filter(m => m.courseId === 'course-6'),
  },
  {
    id: 'course-7',
    title: 'Networking Basics',
    description: 'Learn the fundamentals of computer networking and the OSI model.',
    modules: modules.filter(m => m.courseId === 'course-7'),
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
    id: 'cat-4',
    title: 'Programming',
    description: 'Learn popular programming languages and paradigms.',
    courses: courses.filter(c => ['course-3', 'course-4', 'course-5', 'course-6', 'course-7'].includes(c.id)),
    imageHint: 'programming code'
  },
   {
    id: 'cat-3',
    title: 'Coming Soon',
    description: 'More exciting courses are on the way to expand your knowledge.',
    courses: [],
    imageHint: 'futuristic technology'
  },
];

export const findCourse = (courseId: string) => courses.find(c => c.id === courseId);
export const findModule = (moduleId: string) => modules.find(m => m.id === moduleId);

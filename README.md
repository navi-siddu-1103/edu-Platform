# CS-Academica: An Interactive E-Learning Platform

This is a Next.js application built with Firebase Studio, designed as an interactive e-learning platform for computer science education.

## Core Features

-   **Course Navigation**: Structured course display with clear module breakdown and progress tracking.
-   **Interactive Coding Exercises**: Hands-on coding exercises with real-time feedback.
-   **AI Hint System**: An AI-powered tool that provides contextual hints for coding exercises.
-   **Module Quizzes**: End-of-module quizzes to assess understanding and reinforce learning.
-   **User Authentication**: Secure user accounts to track progress and save completed work.
-   **Course Categories**: Courses organized into distinct categories like "Algorithms" and "Data Structures" for easy discovery.

## Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/) (with App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
-   **Generative AI**: [Firebase Genkit](https://firebase.google.com/docs/genkit)
-   **Authentication**: [Firebase Authentication](https://firebase.google.com/docs/auth)
-   **Database**: [MongoDB](https://www.mongodb.com/) for user data storage.
-   **Hosting**: [Firebase App Hosting](https://firebase.google.com/docs/app-hosting)

## Getting Started

The main application entry point is `src/app/page.tsx`, which serves as the landing page. The core application logic is organized within the `src` directory.

### Key Directories

-   `src/app/`: Contains all the application routes, including the main dashboard, course pages, and authentication flows.
-   `src/components/`: Reusable React components, including UI elements from ShadCN.
-   `src/lib/`: Core application logic, including data fetching (`data.ts`), Firebase configuration, and server actions.
-   `src/ai/`: Contains all Genkit flows for AI-powered features, such as generating coding hints and explanations.
-   `src/context/`: React context providers, such as the `AuthContext` for managing user authentication state.

## How to Run Locally

1.  **Install dependencies**:
    ```bash
    npm install
    ```
2.  **Run the development server**:
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:9002`.
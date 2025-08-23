# CS-Academica: Interactive E-Learning Platform

CS-Academica is an interactive e-learning platform designed to help users master computer science concepts through hands-on coding exercises, AI-powered assistance, and structured course modules.

## Key Features

- **User Authentication**: Secure sign-up and sign-in functionality using Firebase Authentication. User data is stored in MongoDB.
- **Course Dashboard**: A central hub where users can browse and select courses from different categories like Algorithms and Data Structures.
- **Structured Course Navigation**: Courses are broken down into easy-to-follow modules with a dedicated sidebar for navigation.
- **Interactive Coding Exercises**: Each module features a hands-on coding exercise where users can write and run code directly in the browser.
- **AI-Powered Hints**: If a user gets stuck on an exercise, they can request an AI-generated hint to guide them toward the solution without giving it away.
- **AI Code Explanations**: Users can get a detailed, step-by-step explanation of their code to better understand the underlying concepts.
- **Module Quizzes**: At the end of each module, users can test their knowledge with multiple-choice quizzes.
- **Email Quiz Results**: Upon completing a quiz, users receive a personalized email with their score and an encouraging message.

## Tech Stack

This project is built with a modern, robust, and scalable tech stack:

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **UI Library**: [React](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Generative AI**: [Genkit](https://firebase.google.com/docs/genkit)
- **Authentication**: [Firebase Authentication](https://firebase.google.com/docs/auth)
- **Database**: [MongoDB](https://www.mongodb.com/)

## Project Structure

Here is a brief overview of the key directories in the project:

- **/src/app/**: Contains the application's routes, pages, and layouts, following the Next.js App Router structure.
- **/src/components/**: Home to all reusable React components, including UI components from ShadCN.
- **/src/ai/flows/**: Genkit flows that power the application's AI features (e.g., coding hints, code explanations).
- **/src/lib/**: Includes utility functions, server actions (`actions.ts`), authentication logic (`auth-actions.ts`), and static data (`data.ts`).
- **/src/context/**: Contains the React Context providers, such as the `AuthContext` for managing user sessions.

## Getting Started

To get the project up and running locally, follow these steps:

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Set Up Environment Variables**:
    Create a `.env` file in the root of the project and add your Firebase and MongoDB credentials:
    ```env
    # From your Firebase project settings
    FIREBASE_SERVICE_ACCOUNT_KEY="..."

    # Your MongoDB connection string
    MONGODB_URI="mongodb+srv://<user>:<password>@<cluster-url>/<db-name>?retryWrites=true&w=majority"
    ```

3.  **Run the Development Server**:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:9002`.

## Available Scripts

- `npm run dev`: Starts the Next.js development server with Turbopack.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts a production server.
- `npm run lint`: Lints the codebase for errors.


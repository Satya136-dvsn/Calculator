# Scientific Calculator

This is a modern, advanced scientific calculator built with React, Vite, and Tailwind CSS. It provides a user-friendly interface for a wide range of mathematical calculations, from basic arithmetic to complex scientific functions.

## Features

- **Basic Operations**: Addition, Subtraction, Multiplication, Division.
- **Standard Functions**: Percentage, Square Root, Exponentiation, Square.
- **Trigonometric Functions**: sin, cos, tan (with Degree/Radian toggle).
- **Logarithmic Functions**: Natural Log (ln), Base-10 Log (log).
- **Constants**: Pi (π), Euler's number (e).
- **Other**: Factorial (n!), Memory functions (M+, M-, MR, MC).

## Tech Stack

- **Frontend Framework**: React.js (with Hooks)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS

## Project Structure

The project is organized as follows:

-   `public/`: Contains static assets that are publicly accessible.
-   `src/`: Contains the main source code for the application.
    -   `assets/`: Contains static assets like images and fonts.
    -   `components/`: Contains reusable React components.
        -   `Button.jsx`: The component for the calculator buttons.
        -   `Display.jsx`: The component for the calculator display.
    -   `App.jsx`: The main application component that contains the calculator logic.
    -   `main.jsx`: The entry point of the application.
-   `README.md`: This file.

## Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    ```
2.  **Install the dependencies:**
    ```bash
    npm install
    ```
3.  **Start the development server:**
    ```bash
    npm run dev
    ```

## Code Overview

The application is built around a few key components:

-   **`App.jsx`**: This is the main component that manages the calculator's state and logic. It handles all button clicks, performs calculations, and updates the display.
-   **`Display.jsx`**: A simple component that displays the current value of the calculator.
-   **`Button.jsx`**: A reusable component for the calculator buttons.

The calculator's state is managed using React Hooks (`useState`). The main state variables are:

-   `displayValue`: The value currently shown on the display.
-   `expression`: The mathematical expression being built.
-   `previousInput`: The type of the previous input (e.g., 'number', 'operator').
-   `isRadians`: A boolean to toggle between radians and degrees for trigonometric functions.
-   `memory`: The value stored in the calculator's memory.

## Deployment Instructions

You can deploy this application to a service like Vercel or Netlify.

### Vercel

1.  **Fork this repository.**
2.  **Go to your Vercel dashboard and click "Add New... > Project".**
3.  **Import the forked repository.**
4.  **Vercel will automatically detect that this is a Vite project and configure the build settings.**
5.  **Click "Deploy".**

### Netlify

1.  **Fork this repository.**
2.  **Go to your Netlify dashboard and click "Add new site > Import an existing project".**
3.  **Connect to your Git provider and select the forked repository.**
4.  **Netlify will automatically detect that this is a Vite project and configure the build settings.**
5.  **Click "Deploy site".**

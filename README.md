<div align="center">
  <img src="public/calculator.svg" alt="Calculator Logo" width="100" />
  <h1>Casio fx-991EX Scientific Calculator Replica</h1>
  <p>
    <strong>A production-grade, highly precise scientific calculator built with React and Tailwind CSS.</strong><br/>
    <em>Engineered for robust mathematical evaluation, security, and a premium user experience.</em>
  </p>

  [![React](https://img.shields.io/badge/React-18.3-blue.svg?logo=react)](https://react.dev)
  [![Vite](https://img.shields.io/badge/Vite-5.4-purple.svg?logo=vite)](https://vitejs.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC.svg?logo=tailwind-css)](https://tailwindcss.com/)
  [![Deployment](https://github.com/Satya136-dvsn/Calculator/actions/workflows/deploy.yml/badge.svg)](https://Satya136-dvsn.github.io/Calculator/)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

  [**Live Demo**](https://Satya136-dvsn.github.io/Calculator/) •
  [**Features**](#features) •
  [**Technical Architecture**](#technical-architecture) •
  [**Security Hardening**](#security--hardening)
</div>

---

## � Overview

This project is a high-fidelity replica of the renowned Casio fx-991EX ClassWiz scientific calculator. It goes beyond basic arithmetic to offer advanced features like numerical integration, equation solving (quadratic/cubic/linear systems), and multi-base conversions.

Designed with clean architecture and strict security protocols, this application demonstrates complex state management, custom algorithmic parsing, and responsive UI design without relying on bulky external math libraries.

<div align="center">
  <img src="public/screenshot_comp.png" alt="Calculator Interface" width="600" />
</div>

---

## ✨ Key Features

### 1. Complex Mathematical Evaluation (COMP Mode)

- **Advanced Operations:** Trigonometry (RAD/DEG), Hyperbolics, Logarithms, Roots, Exponents.
- **Combinatorics & Number Theory:** Permutations (nPr), Combinations (nCr), GCD, LCM, Modulo.
- **Engineering Notation:** Toggleable ENG mode for scientific data display.

### 2. Calculus & Equation Solvers

- **Numerical Integration (∫dx):** Implementation of Simpson's 1/3 Rule for definite integrals.
- **Numerical Differentiation (d/dx):** High-precision central difference method.
- **Equation Mode (EQN):** Solves Quadratic, Cubic, and 2x2/3x3 Systems of Linear Equations using determinant analysis and exact formulas.

### 3. Developer & Engineering Tools

- **Base-N Conversions:** Simultaneous conversion and display of Decimal, Hexadecimal, Octal, and Binary formats.
- **Coordinate Conversions:** Rectangular ↔ Polar.

### 4. Premium UI/UX

- **Modern Design System:** Glassmorphism UI using Tailwind CSS with subtle animations and focus states.
- **History Panel:** Persistent calculation history tracking.
- **Responsive & Accessible:** Fully usable via keyboard interactions with full ARIA support.

---

## �️ Technical Architecture

### Tech Stack

- **Frontend Framework:** React 18 (Hooks)
- **Styling:** Tailwind CSS
- **Build Tool:** Vite
- **Deployment:** GitHub Pages via GitHub Actions CI/CD

### Core Engineering Decisions

- **Zero External Math Dependencies:** All mathematical functions, including combinatorics, root finding, and calculus methodologies, were explicitly coded in `mathUtils.js` to demonstrate algorithmic proficiency.
- **Custom Expression Parser:** Instead of relying on unsafe `eval()` or external libraries, the app utilizes a custom **Recursive Descent Parser** (`safeEval.js`) to tokenize and evaluate mathematical expressions securely.
- **Modular Component Design:** Logic is strictly separated from presentation. Complex interactions are isolated into components like `<EquationSolver />`, `<IntegralPanel />`, and `<BaseConverter />`.

---

## 🛡️ Security & Hardening

A significant engineering effort was placed on making this application production-ready and secure against common web vulnerabilities:

- **Eliminated Code Injection (XSS):** Completely removed `new Function()` and `eval()`, replacing them with a strict, lexer-based Expression Parser.
- **Strict Input Validation:** Displays and expressions are length-capped (20 and 200 chars respectively) to prevent buffer overflows or DoS via massive inputs.
- **Error Boundaries:** Implemented React `<ErrorBoundary />` to gracefully catch rendering crashes and provide a recovery UI instead of the white screen of death.
- **Content Security Policy (CSP):** Strict CSP meta tags applied, limiting script execution strictly to `self`.
- **Accessibility (a11y):** Full ARIA labels for screen readers, `aria-live` regions for dynamic result announcements, and proper focus management.

---

## 📦 Local Configuration & Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Satya136-dvsn/Calculator.git
   cd Calculator
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

4. **Build for production:**

   ```bash
   npm run build
   ```

---

## 👨‍💻 Author

**Satya**

- GitHub: [@Satya136-dvsn](https://github.com/Satya136-dvsn)

*This project was developed to demonstrate advanced React concepts, secure JavaScript parsing, and complex algorithmic implementation. Feel free to explore the source code!*

<div align="center">

# 🧮 Scientific Calculator

### A Modern, Feature-Rich Scientific Calculator Web Application

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-GitHub_Pages-success?style=for-the-badge)](https://satya136-dvsn.github.io/Calculator/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

<br/>

<img src="https://img.shields.io/github/last-commit/Satya136-dvsn/Calculator?style=flat-square&color=blue" alt="Last Commit"/>
<img src="https://img.shields.io/github/languages/code-size/Satya136-dvsn/Calculator?style=flat-square&color=green" alt="Code Size"/>
<img src="https://img.shields.io/badge/License-MIT-yellow?style=flat-square" alt="License"/>

</div>

---

## 📋 Overview

A **production-ready scientific calculator** featuring 40+ mathematical functions, built with modern web technologies. This project demonstrates proficiency in **React development**, **state management**, **event handling**, and **responsive UI design**.

**🔗 [Try the Live Demo →](https://satya136-dvsn.github.io/Calculator/)**

---

## ⚡ Key Features

<table>
<tr>
<td width="50%">

### 🔢 Scientific Functions

- **Powers & Roots** — x², x³, xʸ, √x, ∛x
- **Trigonometry** — sin, cos, tan + inverses
- **Hyperbolic** — sinh, cosh, tanh
- **Logarithms** — ln, log₁₀, log₂
- **Exponentials** — eˣ, 10ˣ, 2ˣ
- **Utilities** — factorial, absolute, floor, ceil

</td>
<td width="50%">

### 🎯 User Experience

- **Keyboard Support** — Full keyboard navigation
- **2nd Function Mode** — Access alternate operations
- **Expression Preview** — See calculations as you type
- **RAD/DEG Toggle** — Angle unit switching
- **Memory Functions** — M+, M-, MR, MC
- **Answer Recall** — Reuse previous results

</td>
</tr>
</table>

---

## 🛠️ Technical Highlights

| Aspect | Implementation |
|--------|----------------|
| **Architecture** | Component-based React with functional components and hooks |
| **State Management** | React useState/useEffect for reactive state handling |
| **Event Handling** | Keyboard event listeners with useCallback optimization |
| **UI/UX** | Glassmorphism design, CSS gradients, ripple animations |
| **Performance** | Vite bundling for fast HMR and optimized builds |
| **Responsiveness** | Mobile-first design with Tailwind CSS utilities |

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/Satya136-dvsn/Calculator.git

# Navigate to project directory
cd Calculator

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

---

## ⌨️ Keyboard Shortcuts

| Key | Action | Key | Action |
|-----|--------|-----|--------|
| `0-9` | Input numbers | `Enter` | Calculate result |
| `+ - * /` | Operators | `Escape` | Clear all |
| `^` | Power (xʸ) | `Backspace` | Delete last |
| `( )` | Parentheses | `%` | Percentage |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Button.jsx      # Animated button with ripple effect
│   └── Display.jsx     # Dynamic display with expression preview
├── App.jsx             # Core calculator logic & state
├── index.css           # Global styles & animations
└── main.jsx            # Application entry point
```

---

## 🧪 Core Functionality

```javascript
// Example: Power function implementation with expression building
case 'xʸ':
  if (expression) {
    setExpression(`${expression} ${displayValue} ** `);
  } else {
    setExpression(`${displayValue} ** `);
  }
  setPreviousInput('operator');
  return;
```

---

## 📊 Tech Stack

<div align="center">

| Frontend | Tooling | Styling |
|:--------:|:-------:|:-------:|
| ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) | ![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E) | ![TailwindCSS](https://img.shields.io/badge/Tailwind-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) |
| React 19 | Vite 7 | Tailwind CSS 4 |

</div>

---

## 🎨 Design Features

- **🌑 Dark Theme** — Easy on the eyes, modern aesthetic
- **✨ Glassmorphism** — Backdrop blur and translucent panels
- **🎯 Micro-animations** — Button ripple effects and scale transitions
- **📱 Responsive** — Works seamlessly on all screen sizes
- **🔤 Dynamic Typography** — Auto-scaling for long numbers

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

### 👨‍💻 Author

**Satya** — [GitHub Profile](https://github.com/Satya136-dvsn)

---

<sub>Built with ❤️ using React + Vite + Tailwind CSS</sub>

</div>

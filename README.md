# 🔬 Scientific Calculator

A modern, feature-rich scientific calculator built with **React**, **Vite**, and **Tailwind CSS**. Features a sleek dark UI with smooth animations and full keyboard support.

![Scientific Calculator](https://img.shields.io/badge/React-19-blue) ![Vite](https://img.shields.io/badge/Vite-7-purple) ![Tailwind](https://img.shields.io/badge/Tailwind-4-cyan)

## ✨ Features

### Basic Operations

- ➕ Addition, Subtraction, Multiplication, Division
- 📊 Percentage calculations
- 🔄 Sign toggle (+/-)

### Scientific Functions

| Category | Functions |
|----------|-----------|
| **Powers** | x², x³, xʸ, eˣ, 10ˣ, 2ˣ |
| **Roots** | √x, ∛x |
| **Trigonometry** | sin, cos, tan, asin, acos, atan |
| **Hyperbolic** | sinh, cosh, tanh |
| **Logarithms** | ln, log₁₀, log₂ |
| **Other** | x!, 1/x, \|x\|, ⌊x⌋, ⌈x⌉ |

### Constants

- π (Pi) = 3.14159...
- e (Euler's number) = 2.71828...

### Memory Functions

- **M+** - Add to memory
- **M-** - Subtract from memory  
- **MR** - Recall memory
- **MC** - Clear memory

### Advanced Features

- 🔢 **2nd Mode** - Toggle for alternate functions
- 📝 **Expression Display** - See your calculation as you type
- ⌨️ **Keyboard Support** - Type naturally with your keyboard
- 📐 **RAD/DEG Toggle** - Switch between radians and degrees
- 🔙 **Answer Recall** - Use previous result with `Ans`

## 🛠️ Tech Stack

- **Frontend**: React 19 with Hooks
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4
- **Fonts**: Inter + JetBrains Mono

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Satya136-dvsn/Calculator.git

# Navigate to directory
cd Calculator

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

### Build for Production

```bash
npm run build
```

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `0-9` | Input numbers |
| `.` | Decimal point |
| `+` `-` `*` `/` | Operators |
| `Enter` or `=` | Calculate |
| `Escape` | Clear all |
| `Backspace` | Clear last entry |
| `(` `)` | Parentheses |
| `^` | Power (xʸ) |
| `%` | Percentage |

## 📁 Project Structure

```
Calculator/
├── public/
│   └── calculator.svg    # Favicon
├── src/
│   ├── components/
│   │   ├── Button.jsx    # Animated button component
│   │   └── Display.jsx   # Calculator display
│   ├── App.jsx           # Main calculator logic
│   ├── index.css         # Global styles
│   └── main.jsx          # Entry point
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## 🎨 UI Features

- 🌙 Dark mode by default
- ✨ Gradient backgrounds
- 🎯 Button ripple effects
- 📱 Fully responsive design
- 🔤 Dynamic font sizing for long numbers

## 📄 License

MIT License - feel free to use this project for learning or personal use.

## 👨‍💻 Author

**Satya** - [GitHub](https://github.com/Satya136-dvsn)

---

Made with ❤️ using React

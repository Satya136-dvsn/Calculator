/**
 * Safe Expression Evaluator
 * Replaces dangerous `new Function()` / `eval()` with a recursive descent parser.
 * Only allows: numbers, +, -, *, /, ** (power), parentheses, and whitespace.
 *
 * For IntegralPanel: also allows 'x' as a variable and whitelisted Math.* functions.
 */

// ─── Whitelisted Math functions for IntegralPanel ─────
const ALLOWED_MATH_FNS = new Set([
    'sin', 'cos', 'tan', 'asin', 'acos', 'atan',
    'sinh', 'cosh', 'tanh', 'asinh', 'acosh', 'atanh',
    'sqrt', 'cbrt', 'abs', 'floor', 'ceil', 'round',
    'log', 'log10', 'log2', 'exp', 'sign',
]);

const ALLOWED_MATH_CONSTS = { PI: Math.PI, E: Math.E, LN2: Math.LN2, LN10: Math.LN10 };

// ─── Token types ──────────────────────────────────────
const TOKEN = {
    NUMBER: 'NUMBER',
    PLUS: '+',
    MINUS: '-',
    MULTIPLY: '*',
    DIVIDE: '/',
    POWER: '**',
    LPAREN: '(',
    RPAREN: ')',
    VARIABLE: 'VAR',
    FUNC: 'FUNC',
    EOF: 'EOF',
};

// ─── Tokenizer ────────────────────────────────────────
function tokenize(expr, allowVariable = false) {
    const tokens = [];
    let i = 0;

    while (i < expr.length) {
        const ch = expr[i];

        // Skip whitespace
        if (/\s/.test(ch)) { i++; continue; }

        // Numbers (including decimals and scientific notation)
        if (/[0-9]/.test(ch) || (ch === '.' && i + 1 < expr.length && /[0-9]/.test(expr[i + 1]))) {
            let num = '';
            while (i < expr.length && /[0-9.eE\-+]/.test(expr[i])) {
                // Handle scientific notation carefully
                if ((expr[i] === '-' || expr[i] === '+') && num.length > 0 && !/[eE]/.test(num[num.length - 1])) {
                    break;
                }
                num += expr[i];
                i++;
            }
            const parsed = parseFloat(num);
            if (isNaN(parsed)) throw new Error(`Invalid number: ${num}`);
            tokens.push({ type: TOKEN.NUMBER, value: parsed });
            continue;
        }

        // Power operator **
        if (ch === '*' && expr[i + 1] === '*') {
            tokens.push({ type: TOKEN.POWER });
            i += 2;
            continue;
        }

        // Operators
        if (ch === '+') { tokens.push({ type: TOKEN.PLUS }); i++; continue; }
        if (ch === '-') { tokens.push({ type: TOKEN.MINUS }); i++; continue; }
        if (ch === '*') { tokens.push({ type: TOKEN.MULTIPLY }); i++; continue; }
        if (ch === '/') { tokens.push({ type: TOKEN.DIVIDE }); i++; continue; }
        if (ch === '(') { tokens.push({ type: TOKEN.LPAREN }); i++; continue; }
        if (ch === ')') { tokens.push({ type: TOKEN.RPAREN }); i++; continue; }

        // Variable x (only if allowed)
        if (allowVariable && ch === 'x' && (i + 1 >= expr.length || !/[a-zA-Z0-9_]/.test(expr[i + 1]))) {
            tokens.push({ type: TOKEN.VARIABLE, value: 'x' });
            i++;
            continue;
        }

        // Math.* function calls or Math.* constants
        if (/[a-zA-Z]/.test(ch)) {
            let ident = '';
            while (i < expr.length && /[a-zA-Z0-9_.]/.test(expr[i])) {
                ident += expr[i];
                i++;
            }

            // Handle "Math.sin", "Math.PI" etc.
            const fnName = ident.startsWith('Math.') ? ident.slice(5) : ident;

            // Check if it's a constant
            if (ALLOWED_MATH_CONSTS[fnName] !== undefined) {
                tokens.push({ type: TOKEN.NUMBER, value: ALLOWED_MATH_CONSTS[fnName] });
                continue;
            }

            // Check if it's a function
            if (allowVariable && ALLOWED_MATH_FNS.has(fnName)) {
                tokens.push({ type: TOKEN.FUNC, value: fnName });
                continue;
            }

            throw new Error(`Unknown identifier: ${ident}`);
        }

        throw new Error(`Unexpected character: ${ch}`);
    }

    tokens.push({ type: TOKEN.EOF });
    return tokens;
}

// ─── Recursive Descent Parser ─────────────────────────
// Grammar:
//   expression = term (('+' | '-') term)*
//   term       = power (('*' | '/') power)*
//   power      = unary ('**' power)?       (right-associative)
//   unary      = ('-' | '+') unary | call
//   call       = FUNC '(' expression ')' | atom
//   atom       = NUMBER | VARIABLE | '(' expression ')'

class Parser {
    constructor(tokens, variableValue = 0) {
        this.tokens = tokens;
        this.pos = 0;
        this.variableValue = variableValue;
    }

    peek() {
        return this.tokens[this.pos];
    }

    consume(expectedType) {
        const token = this.tokens[this.pos];
        if (expectedType && token.type !== expectedType) {
            throw new Error(`Expected ${expectedType}, got ${token.type}`);
        }
        this.pos++;
        return token;
    }

    parse() {
        const result = this.expression();
        if (this.peek().type !== TOKEN.EOF) {
            throw new Error('Unexpected tokens after expression');
        }
        return result;
    }

    expression() {
        let left = this.term();
        while (this.peek().type === TOKEN.PLUS || this.peek().type === TOKEN.MINUS) {
            const op = this.consume();
            const right = this.term();
            left = op.type === TOKEN.PLUS ? left + right : left - right;
        }
        return left;
    }

    term() {
        let left = this.power();
        while (this.peek().type === TOKEN.MULTIPLY || this.peek().type === TOKEN.DIVIDE) {
            const op = this.consume();
            const right = this.power();
            if (op.type === TOKEN.DIVIDE && right === 0) {
                return Infinity; // Let caller handle
            }
            left = op.type === TOKEN.MULTIPLY ? left * right : left / right;
        }
        return left;
    }

    power() {
        const base = this.unary();
        if (this.peek().type === TOKEN.POWER) {
            this.consume();
            const exp = this.power(); // Right-associative
            return Math.pow(base, exp);
        }
        return base;
    }

    unary() {
        if (this.peek().type === TOKEN.MINUS) {
            this.consume();
            return -this.unary();
        }
        if (this.peek().type === TOKEN.PLUS) {
            this.consume();
            return this.unary();
        }
        return this.call();
    }

    call() {
        if (this.peek().type === TOKEN.FUNC) {
            const fnToken = this.consume();
            this.consume(TOKEN.LPAREN);
            const arg = this.expression();
            this.consume(TOKEN.RPAREN);
            const fn = Math[fnToken.value];
            if (typeof fn !== 'function') {
                throw new Error(`Unknown function: ${fnToken.value}`);
            }
            return fn(arg);
        }
        return this.atom();
    }

    atom() {
        const token = this.peek();

        if (token.type === TOKEN.NUMBER) {
            this.consume();
            return token.value;
        }

        if (token.type === TOKEN.VARIABLE) {
            this.consume();
            return this.variableValue;
        }

        if (token.type === TOKEN.LPAREN) {
            this.consume();
            const result = this.expression();
            this.consume(TOKEN.RPAREN);
            return result;
        }

        throw new Error(`Unexpected token: ${token.type}`);
    }
}

// ─── Public API ───────────────────────────────────────

/**
 * Safely evaluate a math expression string.
 * Only allows numbers and basic operators: + - * / ** ( )
 * @param {string} expr - The expression to evaluate
 * @returns {number} The result
 * @throws {Error} If the expression is invalid or contains disallowed content
 */
export function safeEval(expr) {
    if (typeof expr !== 'string') throw new Error('Expression must be a string');
    if (expr.length > 200) throw new Error('Expression too long');

    const trimmed = expr.trim();
    if (!trimmed) throw new Error('Empty expression');

    const tokens = tokenize(trimmed, false);
    const parser = new Parser(tokens);
    return parser.parse();
}

/**
 * Create a safe function f(x) from an expression string.
 * Allows: numbers, operators, 'x' variable, and whitelisted Math.* functions.
 * @param {string} expr - Expression using 'x' as variable
 * @returns {Function} A function that takes x and returns the result
 * @throws {Error} If the expression is invalid
 */
export function createSafeFunction(expr) {
    if (typeof expr !== 'string') throw new Error('Expression must be a string');
    if (expr.length > 200) throw new Error('Expression too long');

    const trimmed = expr.replace(/\^/g, '**').trim();
    if (!trimmed) throw new Error('Empty expression');

    // Pre-tokenize to validate the expression structure
    const testTokens = tokenize(trimmed, true);
    new Parser(testTokens, 1).parse(); // Validate with x=1

    // Return a function that evaluates with a given x
    return (x) => {
        const tokens = tokenize(trimmed, true);
        const parser = new Parser(tokens, x);
        return parser.parse();
    };
}

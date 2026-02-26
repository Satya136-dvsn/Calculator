/**
 * Math utility functions for Casio fx-991EX Scientific Calculator
 */

// ─── Factorial ─────────────────────────────────────────
export const factorial = (n) => {
    if (n < 0 || !Number.isInteger(n)) return NaN;
    if (n > 170) return Infinity;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
};

// ─── Permutations nPr ──────────────────────────────────
export const nPr = (n, r) => {
    if (n < 0 || r < 0 || r > n || !Number.isInteger(n) || !Number.isInteger(r)) return NaN;
    return factorial(n) / factorial(n - r);
};

// ─── Combinations nCr ──────────────────────────────────
export const nCr = (n, r) => {
    if (n < 0 || r < 0 || r > n || !Number.isInteger(n) || !Number.isInteger(r)) return NaN;
    return factorial(n) / (factorial(r) * factorial(n - r));
};

// ─── GCD (Euclidean) ───────────────────────────────────
export const gcd = (a, b) => {
    a = Math.abs(Math.round(a));
    b = Math.abs(Math.round(b));
    while (b) {
        [a, b] = [b, a % b];
    }
    return a;
};

// ─── LCM ───────────────────────────────────────────────
export const lcm = (a, b) => {
    a = Math.abs(Math.round(a));
    b = Math.abs(Math.round(b));
    if (a === 0 || b === 0) return 0;
    return (a * b) / gcd(a, b);
};

// ─── Modulo ────────────────────────────────────────────
export const mod = (a, b) => {
    if (b === 0) return NaN;
    return ((a % b) + b) % b; // True modulo (always positive)
};

// ─── Polar ↔ Rectangular ──────────────────────────────
export const toPolar = (x, y, isDeg) => {
    const r = Math.sqrt(x * x + y * y);
    let theta = Math.atan2(y, x);
    if (isDeg) theta = theta * (180 / Math.PI);
    return { r, theta };
};

export const toRect = (r, theta, isDeg) => {
    if (isDeg) theta = theta * (Math.PI / 180);
    const x = r * Math.cos(theta);
    const y = r * Math.sin(theta);
    return { x, y };
};

// ─── DMS (Degrees, Minutes, Seconds) ──────────────────
export const decToDms = (decimal) => {
    const sign = decimal < 0 ? -1 : 1;
    decimal = Math.abs(decimal);
    const d = Math.floor(decimal);
    const minFloat = (decimal - d) * 60;
    const m = Math.floor(minFloat);
    const s = (minFloat - m) * 60;
    return { d: d * sign, m, s: Math.round(s * 1000) / 1000 };
};

export const dmsToDec = (d, m, s) => {
    const sign = d < 0 ? -1 : 1;
    return sign * (Math.abs(d) + m / 60 + s / 3600);
};

export const formatDms = (decimal) => {
    const { d, m, s } = decToDms(decimal);
    return `${d}°${m}'${s}"`;
};

// ─── Numerical Integration (Simpson's Rule) ───────────
export const numIntegrate = (fn, a, b, n = 1000) => {
    if (a === b) return 0;
    if (n % 2 !== 0) n++;
    const h = (b - a) / n;
    let sum = fn(a) + fn(b);
    for (let i = 1; i < n; i++) {
        const x = a + i * h;
        sum += fn(x) * (i % 2 === 0 ? 2 : 4);
    }
    return (h / 3) * sum;
};

// ─── Numerical Differentiation ────────────────────────
export const numDerivative = (fn, x, h = 1e-8) => {
    return (fn(x + h) - fn(x - h)) / (2 * h);
};

// ─── Summation Σ ──────────────────────────────────────
export const summation = (fn, start, end) => {
    let sum = 0;
    for (let i = start; i <= end; i++) {
        sum += fn(i);
    }
    return sum;
};

// ─── Product Π ────────────────────────────────────────
export const product = (fn, start, end) => {
    let prod = 1;
    for (let i = start; i <= end; i++) {
        prod *= fn(i);
    }
    return prod;
};

// ─── Quadratic Solver ─────────────────────────────────
export const solveQuadratic = (a, b, c) => {
    if (a === 0) {
        if (b === 0) return { error: 'No solution' };
        return { roots: [-c / b] };
    }
    const disc = b * b - 4 * a * c;
    if (disc > 0) {
        const x1 = (-b + Math.sqrt(disc)) / (2 * a);
        const x2 = (-b - Math.sqrt(disc)) / (2 * a);
        return { roots: [x1, x2], discriminant: disc };
    } else if (disc === 0) {
        return { roots: [-b / (2 * a)], discriminant: disc };
    } else {
        const real = -b / (2 * a);
        const imag = Math.sqrt(-disc) / (2 * a);
        return {
            roots: [`${round(real)} + ${round(imag)}i`, `${round(real)} - ${round(imag)}i`],
            discriminant: disc,
            complex: true,
        };
    }
};

// ─── Cubic Solver ─────────────────────────────────────
export const solveCubic = (a, b, c, d) => {
    if (a === 0) return solveQuadratic(b, c, d);

    // Normalize: x³ + px + q = 0 via substitution
    const p = (3 * a * c - b * b) / (3 * a * a);
    const q = (2 * b * b * b - 9 * a * b * c + 27 * a * a * d) / (27 * a * a * a);
    const disc = (q * q) / 4 + (p * p * p) / 27;
    const offset = -b / (3 * a);

    if (disc > 0) {
        const u = Math.cbrt(-q / 2 + Math.sqrt(disc));
        const v = Math.cbrt(-q / 2 - Math.sqrt(disc));
        const x1 = u + v + offset;
        const realPart = -(u + v) / 2 + offset;
        const imagPart = (Math.sqrt(3) / 2) * (u - v);
        return {
            roots: [
                round(x1),
                `${round(realPart)} + ${round(Math.abs(imagPart))}i`,
                `${round(realPart)} - ${round(Math.abs(imagPart))}i`,
            ],
        };
    } else if (disc === 0) {
        const u = Math.cbrt(-q / 2);
        return { roots: [round(2 * u + offset), round(-u + offset)] };
    } else {
        const r = Math.sqrt(-(p * p * p) / 27);
        const theta = Math.acos(-q / (2 * r));
        const m = 2 * Math.cbrt(r);
        return {
            roots: [
                round(m * Math.cos(theta / 3) + offset),
                round(m * Math.cos((theta + 2 * Math.PI) / 3) + offset),
                round(m * Math.cos((theta + 4 * Math.PI) / 3) + offset),
            ],
        };
    }
};

// ─── Linear System Solver (2×2) ───────────────────────
export const solveLinear2 = (a1, b1, c1, a2, b2, c2) => {
    const det = a1 * b2 - a2 * b1;
    if (det === 0) return { error: 'No unique solution' };
    const x = (c1 * b2 - c2 * b1) / det;
    const y = (a1 * c2 - a2 * c1) / det;
    return { x: round(x), y: round(y) };
};

// ─── Linear System Solver (3×3) ───────────────────────
export const solveLinear3 = (coeffs) => {
    // coeffs = [[a1,b1,c1,d1], [a2,b2,c2,d2], [a3,b3,c3,d3]]
    const [[a1, b1, c1, d1], [a2, b2, c2, d2], [a3, b3, c3, d3]] = coeffs;
    const det =
        a1 * (b2 * c3 - b3 * c2) -
        b1 * (a2 * c3 - a3 * c2) +
        c1 * (a2 * b3 - a3 * b2);
    if (det === 0) return { error: 'No unique solution' };
    const x =
        (d1 * (b2 * c3 - b3 * c2) - b1 * (d2 * c3 - d3 * c2) + c1 * (d2 * b3 - d3 * b2)) / det;
    const y =
        (a1 * (d2 * c3 - d3 * c2) - d1 * (a2 * c3 - a3 * c2) + c1 * (a2 * d3 - a3 * d2)) / det;
    const z =
        (a1 * (b2 * d3 - b3 * d2) - b1 * (a2 * d3 - a3 * d2) + d1 * (a2 * b3 - a3 * b2)) / det;
    return { x: round(x), y: round(y), z: round(z) };
};

// ─── Base Conversions ─────────────────────────────────
export const toBase = (num, base) => {
    const n = Math.floor(Math.abs(num));
    switch (base) {
        case 'HEX': return n.toString(16).toUpperCase();
        case 'OCT': return n.toString(8);
        case 'BIN': return n.toString(2);
        case 'DEC':
        default: return n.toString(10);
    }
};

export const fromBase = (str, base) => {
    switch (base) {
        case 'HEX': return parseInt(str, 16);
        case 'OCT': return parseInt(str, 8);
        case 'BIN': return parseInt(str, 2);
        case 'DEC':
        default: return parseInt(str, 10);
    }
};

// ─── Engineering Notation ─────────────────────────────
export const toEngNotation = (num) => {
    if (num === 0) return '0';
    const exp = Math.floor(Math.log10(Math.abs(num)));
    const engExp = Math.floor(exp / 3) * 3;
    const mantissa = num / Math.pow(10, engExp);
    if (engExp === 0) return round(mantissa).toString();
    return `${round(mantissa)}×10^${engExp}`;
};

// ─── Random Functions ─────────────────────────────────
export const randomNum = () => Math.random();

export const randomInt = (a, b) => {
    a = Math.ceil(a);
    b = Math.floor(b);
    return Math.floor(Math.random() * (b - a + 1)) + a;
};

// ─── Nth Root ─────────────────────────────────────────
export const nthRoot = (x, n) => {
    if (n === 0) return NaN;
    if (x < 0 && n % 2 === 0) return NaN;
    const sign = x < 0 ? -1 : 1;
    return sign * Math.pow(Math.abs(x), 1 / n);
};

// ─── Format Result ────────────────────────────────────
export const formatResult = (result, engMode = false) => {
    if (typeof result === 'string') return result;
    if (isNaN(result)) return 'Error';
    if (!isFinite(result)) return 'Error';
    if (engMode) return toEngNotation(result);
    if (Math.abs(result) < 1e-10 && result !== 0) return result.toExponential(6);
    if (Math.abs(result) > 1e10) return result.toExponential(6);
    const rounded = Math.round(result * 1e10) / 1e10;
    return rounded.toString();
};

// ─── Helper ───────────────────────────────────────────
const round = (n) => Math.round(n * 1e10) / 1e10;

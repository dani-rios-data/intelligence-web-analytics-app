// Suprimir advertencias específicas
const originalConsoleWarn = console.warn;
const originalConsoleError = console.error;

// Lista de patrones de advertencias que queremos suprimir
const suppressPatterns = [
  /The `punycode` module is deprecated/,
  /Critical dependency/,
  /Package exports/,
  /Warning.*React does not recognize/,
  /AuthenticationError:/,
  /NextAuth\[warn\]/,
  /DeprecationWarning/,
];

// Reemplazar console.warn para filtrar advertencias
console.warn = function filterWarnings(msg, ...args) {
  if (typeof msg === 'string' && suppressPatterns.some(pattern => pattern.test(msg))) {
    return; // Suprimir advertencia
  }
  originalConsoleWarn(msg, ...args);
};

// También filtrar errores que sean realmente advertencias
console.error = function filterErrors(msg, ...args) {
  if (typeof msg === 'string' && suppressPatterns.some(pattern => pattern.test(msg))) {
    return; // Suprimir error que coincide con nuestros patrones
  }
  originalConsoleError(msg, ...args);
};

module.exports = {}; 
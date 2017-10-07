// Polyfill for React 16
global.requestAnimationFrame = cb => {
  setTimeout(cb, 0)
}

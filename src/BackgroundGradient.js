export function BackgroundGradient() {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes gradientRotate {
      0%   { --angle: 0deg; }
      100% { --angle: 360deg; }
    }
    @property --angle {
      syntax: '<angle>';
      initial-value: 0deg;
      inherits: false;
    }
    #app {
      background: conic-gradient(
        from var(--angle) at 50% 200%,
        var(--color-primary-blue),
        var(--color-purple),
        var(--color-dark-blue),
        var(--color-blue),
        var(--color-yellow),
        var(--color-orange),
        var(--color-primary-blue)
      );
      animation: gradientRotate 25s linear infinite;
    }
  `;
  document.head.appendChild(style);
}

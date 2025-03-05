document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('.section-break__icon, .section-break__icon__dash');
  const observerOptions = { root: null, threshold: 0.5 };
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  elements.forEach(el => observer.observe(el));
});

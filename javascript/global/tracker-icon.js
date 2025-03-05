document.addEventListener('DOMContentLoaded', () => {
    const icons = document.querySelectorAll('.section-break__icon');
    const observerOptions = { root: null, threshold: 0.5 };
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    icons.forEach(icon => observer.observe(icon));
  });
  
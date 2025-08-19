document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".animate-onView");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.visibility = "visible";
          entry.target.style.animation = "onView .275s alternate";
          observer.unobserve(entry.target); // run once per element
        }
      });
    },
    { threshold: 0.0005 } // triggers when 10% of element is visible
  );

  elements.forEach(el => {
    el.style.visibility = "hidden"; // start hidden
    observer.observe(el);
  });
});

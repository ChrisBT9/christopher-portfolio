document.addEventListener("DOMContentLoaded", function() {
  const openLightboxButtons = document.querySelectorAll(".open-lightbox");
  const cardOverlay = document.querySelector(".card-overlay");
  const closeButton = document.querySelector(".close-card-overlay");

  const disableScroll = () => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
  };

  const enableScroll = () => {
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
  };

  openLightboxButtons.forEach(button => {
    button.addEventListener("click", function() {
      const container = this.closest(".lightbox-target-container");
      if (!container) return;
      const targetImg = container.querySelector(".lightbox-target-img");
      if (!targetImg) return;
      const computedStyle = window.getComputedStyle(targetImg);
      const bgImage = computedStyle.getPropertyValue("background-image");
      const urlMatch = bgImage.match(/url\(["']?(.*?)["']?\)/);
      if (urlMatch && urlMatch[1]) {
        const overlayImg = cardOverlay.querySelector("img");
        overlayImg.src = urlMatch[1];
        cardOverlay.style.display = "grid";
        disableScroll();
      }
    });
  });

  cardOverlay.addEventListener("click", function() {
    cardOverlay.style.display = "none";
    enableScroll();
  });

  closeButton.addEventListener("click", function(event) {
    event.stopPropagation();
    cardOverlay.style.display = "none";
    enableScroll();
  });
});

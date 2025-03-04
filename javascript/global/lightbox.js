document.addEventListener("DOMContentLoaded", function() {
  const blurElement = document.getElementById("lightbox-blur");
  if (blurElement) {
    blurElement.addEventListener("click", function() {
      const openLightboxes = document.querySelectorAll('.lightbox');
      openLightboxes.forEach(lb => {
        lb.style.display = "none";
      });
      blurElement.style.display = "none";
      // Re-enable scrolling on both body and html
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    });
  }

  function getLightboxNumberFromButton(button) {
    for (const cls of button.classList) {
      if (cls.startsWith("open-lightbox-")) {
        return cls.split("open-lightbox-")[1];
      }
    }
    return null;
  }

  function getIdentifierFromClassList(classList) {
    const regex = /^lightbox-[a-z0-9]$/i;
    for (const cls of classList) {
      if (regex.test(cls)) {
        return cls;
      }
    }
    return null;
  }

  function findImageElement(container, triggerElement) {
    const candidates = Array.from(container.querySelectorAll("*")).filter(el => el !== triggerElement && getIdentifierFromClassList(el.classList));
    return candidates.length ? candidates[0] : null;
  }

  function extractUrl(bgImage) {
    if (bgImage.startsWith("url(")) {
      return bgImage.slice(5, bgImage.length - 2);
    }
    return bgImage;
  }

  function updateTracker(container, activeIndex) {
    const thumbnails = container.querySelectorAll('.lightbox-img');
    const tracker = container.querySelector('#lightbox-tracker');
    if (tracker) {
      tracker.textContent = (activeIndex + 1) + " / " + thumbnails.length;
    }
  }

  function updateFocus(container, index) {
    const thumbnails = Array.from(container.querySelectorAll('.lightbox-img'));
    const focusImg = container.querySelector('.lightbox-focus-img');
    if (!thumbnails.length || index < 0 || index >= thumbnails.length) return;
    const thumb = thumbnails[index];
    const computedStyle = window.getComputedStyle(thumb);
    const bgImage = computedStyle.backgroundImage;
    const url = extractUrl(bgImage);
    if (focusImg) {
      focusImg.src = url;
      let classesToRemove = [];
      focusImg.classList.forEach(cls => {
        if (cls.startsWith("lightbox-") && cls !== "lightbox-focus-img") {
          classesToRemove.push(cls);
        }
      });
      classesToRemove.forEach(cls => focusImg.classList.remove(cls));
      const newIdentifier = getIdentifierFromClassList(thumb.classList);
      if (newIdentifier) {
        focusImg.classList.add(newIdentifier);
      }
    }
    thumbnails.forEach((thumb, idx) => {
      if (idx === index) {
        thumb.classList.add("active");
      } else {
        thumb.classList.remove("active");
      }
    });
    container.dataset.activeIndex = index;
    updateTracker(container, index);
  }

  function setupLightboxInteractions(container) {
    if (container.dataset.eventsBound === "true") return;
    const nextBtn = container.querySelector('.next-lightbox-img');
    const prevBtn = container.querySelector('.previous-lightbox-img');
    const closeBtn = container.querySelector('.close-lightbox');
    const thumbnails = container.querySelectorAll('.lightbox-img');
    if (nextBtn) {
      nextBtn.addEventListener("click", function() {
        const thumbsArray = Array.from(container.querySelectorAll('.lightbox-img'));
        let activeIndex = parseInt(container.dataset.activeIndex, 10);
        activeIndex = (activeIndex + 1) % thumbsArray.length;
        updateFocus(container, activeIndex);
      });
    }
    if (prevBtn) {
      prevBtn.addEventListener("click", function() {
        const thumbsArray = Array.from(container.querySelectorAll('.lightbox-img'));
        let activeIndex = parseInt(container.dataset.activeIndex, 10);
        activeIndex = (activeIndex - 1 + thumbsArray.length) % thumbsArray.length;
        updateFocus(container, activeIndex);
      });
    }
    thumbnails.forEach((thumb, idx) => {
      thumb.addEventListener("click", function() {
        updateFocus(container, idx);
      });
    });
    if (closeBtn) {
      closeBtn.addEventListener("click", function() {
        container.style.display = "none";
        if (blurElement) {
          blurElement.style.display = "none";
        }
        // Re-enable scrolling on both body and html
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
      });
    }
    container.dataset.eventsBound = "true";
  }

  const openLightboxButtons = document.querySelectorAll('[class*="open-lightbox-"]');
  openLightboxButtons.forEach(button => {
    button.addEventListener("click", function() {
      const lightboxNum = getLightboxNumberFromButton(button);
      if (!lightboxNum) return;
      const lightboxSelector = ".lightbox.lightbox-" + lightboxNum;
      const lightboxContainer = document.querySelector(lightboxSelector);
      if (!lightboxContainer) return;
      lightboxContainer.style.display = "flex";
      if (blurElement) {
        blurElement.style.display = "block";
      }
      // Disable scrolling on both body and html
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      const container = button.parentElement;
      const imageElement = findImageElement(container, button);
      if (!imageElement) return;
      const activeIdentifier = getIdentifierFromClassList(imageElement.classList);
      const thumbnails = Array.from(lightboxContainer.querySelectorAll('.lightbox-img'));
      let activeIndex = thumbnails.findIndex(thumb => thumb.classList.contains(activeIdentifier));
      if (activeIndex === -1) activeIndex = 0;
      updateFocus(lightboxContainer, activeIndex);
      setupLightboxInteractions(lightboxContainer);
    });
  });
});

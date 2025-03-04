document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.lightbox-target-container');
  function closeAllOverflows() {
    cards.forEach(card => {
      const overflowDes = card.querySelector('.overflow-full-des');
      if (overflowDes) overflowDes.style.display = 'none';
    });
  }
  cards.forEach(card => {
    const viewMoreBtn = card.querySelector('.view-more-overflow');
    const overflowDes = card.querySelector('.overflow-full-des');
    const closeBtn = card.querySelector('.close-overflow-full-des');
    if (viewMoreBtn && overflowDes) {
      viewMoreBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        closeAllOverflows();
        overflowDes.style.display = 'flex';
      });
    }
    if (closeBtn && overflowDes) {
      closeBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        overflowDes.style.display = 'none';
      });
    }
    if (overflowDes) {
      overflowDes.addEventListener('click', (event) => {
        event.stopPropagation();
      });
    }
  });
  document.addEventListener('click', () => {
    closeAllOverflows();
  });
});

  



  document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.lightbox-target-container');
    function updateOverflowForCard(card) {
      const overflowTxtContainer = card.querySelector('.overflow-txt-container');
      const overflowDes = card.querySelector('.overflow-des');
      const viewMoreBtn = card.querySelector('.view-more-overflow');
      if (!overflowDes) return;
      const computedStyle = window.getComputedStyle(overflowDes);
      let lineHeight = parseFloat(computedStyle.lineHeight);
      if (isNaN(lineHeight) || computedStyle.lineHeight === "normal") {
        lineHeight = parseFloat(computedStyle.fontSize) * 1.2;
      }
      const twoLineHeight = lineHeight * 2;
      if (overflowDes.scrollHeight > twoLineHeight + 1) {
        overflowDes.style.maxHeight = twoLineHeight + "px";
        overflowDes.style.overflow = "hidden";
        viewMoreBtn.style.display = 'block';
        if (overflowTxtContainer) {
          overflowTxtContainer.classList.remove('no-overflow');
        }
      } else {
        overflowDes.style.maxHeight = "";
        overflowDes.style.overflow = "";
        viewMoreBtn.style.display = 'none';
        if (overflowTxtContainer) {
          overflowTxtContainer.classList.add('no-overflow');
        }
      }
    }
    function updateAllCards() {
      cards.forEach(card => {
        updateOverflowForCard(card);
      });
    }
    updateAllCards();
    if (window.ResizeObserver) {
      cards.forEach(card => {
        const ro = new ResizeObserver(() => {
          updateOverflowForCard(card);
        });
        ro.observe(card);
      });
    }
    window.addEventListener('resize', updateAllCards);
    window.addEventListener('load', updateAllCards);
    cards.forEach(card => {
      const viewMoreBtn = card.querySelector('.view-more-overflow');
      const overflowFullDes = card.querySelector('.overflow-full-des');
      const closeBtn = card.querySelector('.close-overflow-full-des');
      if (viewMoreBtn && overflowFullDes) {
        viewMoreBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          overflowFullDes.style.display = 'flex';
        });
      }
      if (closeBtn && overflowFullDes) {
        closeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          overflowFullDes.style.display = 'none';
        });
      }
      if (overflowFullDes) {
        overflowFullDes.addEventListener('click', (e) => {
          e.stopPropagation();
        });
      }
    });
    document.addEventListener('click', (e) => {
      cards.forEach(card => {
        const overflowFullDes = card.querySelector('.overflow-full-des');
        if (overflowFullDes && window.getComputedStyle(overflowFullDes).display === 'flex') {
          if (!overflowFullDes.contains(e.target)) {
            overflowFullDes.style.display = 'none';
          }
        }
      });
    });
  });
  
  
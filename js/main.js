(function () {
  const slider = document.querySelector(".hero-slider");
  if (!slider) return;

  const slides = Array.from(slider.querySelectorAll(".hero-slide"));
  const dots = Array.from(document.querySelectorAll(".hero-dots .dot"));
  const AUTOPLAY_DELAY = 6000;
  let current = 0;
  let timer = null;

  function goToSlide(index) {
    slides[current].classList.remove("is-active");
    dots[current].classList.remove("is-active");
    current = (index + slides.length) % slides.length;
    slides[current].classList.add("is-active");
    dots[current].classList.add("is-active");
  }

  function startAutoplay() {
    stopAutoplay();
    timer = setInterval(() => goToSlide(current + 1), AUTOPLAY_DELAY);
  }

  function stopAutoplay() {
    if (timer) clearInterval(timer);
  }

  if (slides.length > 1) {
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        goToSlide(index);
        startAutoplay();
      });
    });

    startAutoplay();
  }
})();

(function () {
  const track = document.querySelector(".reviews-track");
  if (!track) return;

  const prevBtn = document.querySelector(".reviews-nav-prev");
  const nextBtn = document.querySelector(".reviews-nav-next");

  function scrollByCard(direction) {
    const card = track.querySelector(".review-card");
    if (!card) return;
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    const distance = (card.offsetWidth + gap) * direction;
    track.scrollBy({ left: distance, behavior: "smooth" });
  }

  if (prevBtn) prevBtn.addEventListener("click", () => scrollByCard(-1));
  if (nextBtn) nextBtn.addEventListener("click", () => scrollByCard(1));
})();

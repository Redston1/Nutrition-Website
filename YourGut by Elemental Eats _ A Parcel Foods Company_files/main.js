const revealItems = document.querySelectorAll('.reveal');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reduceMotion) {
  revealItems.forEach((el) => el.classList.add('visible'));
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
  );

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index * 55, 240)}ms`;
    revealObserver.observe(item);
  });

  const floatingMedia = document.querySelectorAll('.float-media');
  const onScrollParallax = () => {
    const offset = Math.min(window.scrollY * 0.08, 24);
    floatingMedia.forEach((media, index) => {
      const speed = 0.6 + index * 0.1;
      media.style.transform = `translate3d(0, ${offset * speed}px, 0)`;
    });
  };

  onScrollParallax();
  window.addEventListener('scroll', onScrollParallax, { passive: true });
}

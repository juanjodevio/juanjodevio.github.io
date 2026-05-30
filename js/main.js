const cur = document.getElementById('cur');
const motionOk = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (cur && motionOk) {
  let cx = 0, cy = 0, tx = 0, ty = 0, visible = false;
  const show = (e) => {
    tx = e.clientX;
    ty = e.clientY;
    if (!visible) {
      cx = tx;
      cy = ty;
      cur.classList.add('is-visible');
      visible = true;
    }
  };
  addEventListener('mousemove', show, { passive: true });
  addEventListener('mouseleave', () => {
    cur.classList.remove('is-visible');
    visible = false;
  }, { passive: true });
  (function loop() {
    if (visible) {
      cx += (tx - cx) * 0.72;
      cy += (ty - cy) * 0.72;
      cur.style.left = `${cx}px`;
      cur.style.top = `${cy}px`;
    }
    requestAnimationFrame(loop);
  })();
  document.querySelectorAll('[data-h]').forEach((el) => {
    el.addEventListener('mouseenter', () => cur.classList.add('big'));
    el.addEventListener('mouseleave', () => cur.classList.remove('big'));
  });
}

const navEl = document.querySelector('nav');
const posEl = document.querySelector('.pos');
if (navEl && posEl && 'IntersectionObserver' in window) {
  new IntersectionObserver(([e]) => navEl.classList.toggle('on-light', e.isIntersecting), {
    rootMargin: '-56px 0px -70% 0px',
    threshold: 0
  }).observe(posEl);
}

window.addEventListener('load', () => {
  if (!motionOk || typeof gsap === 'undefined') return;
  gsap.from('.hero .giant .l span', { y: '110%', duration: 1.1, stagger: 0.14, ease: 'expo.out', delay: 0.15 });
  gsap.utils.toArray('.mask .mi').forEach((mi) => {
    gsap.from(mi, {
      y: '105%',
      duration: 1,
      ease: 'expo.out',
      scrollTrigger: { trigger: mi.closest('.mask'), start: 'top 88%' }
    });
  });
  gsap.utils.toArray('.srow,.step,.stkrow,.proj .p,.about .lead,.about .caps').forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      y: 36,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%' }
    });
  });
  const track = document.getElementById('track');
  if (track && typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (s) => {
        gsap.to(track, {
          timeScale: 1 + Math.abs(s.getVelocity() / 300),
          duration: 0.3,
          overwrite: true
        });
      }
    });
  }
});

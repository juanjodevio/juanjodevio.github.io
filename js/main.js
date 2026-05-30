const cur = document.getElementById('cur');
const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)');
const fineMq = window.matchMedia('(pointer: fine)');
const motionOk = !motionMq.matches;

function canUseCustomCursor() {
  return cur && !motionMq.matches && fineMq.matches && window.innerWidth > 760;
}

if (cur && !motionMq.matches) {
  let cx = 0, cy = 0, tx = 0, ty = 0, visible = false;

  function enableCustomCursor() {
    if (!canUseCustomCursor()) return;
    document.body.classList.add('custom-cursor');
  }

  function disableCustomCursor() {
    document.body.classList.remove('custom-cursor');
    cur.classList.remove('is-visible', 'big');
    visible = false;
  }

  const show = (e) => {
    if (!canUseCustomCursor()) return;
    enableCustomCursor();
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
  addEventListener('mouseleave', disableCustomCursor, { passive: true });

  addEventListener('keydown', (e) => {
    if (e.key === 'Tab') disableCustomCursor();
  });

  addEventListener('mousedown', () => {
    if (canUseCustomCursor()) enableCustomCursor();
  });

  (function loop() {
    if (visible && document.body.classList.contains('custom-cursor')) {
      cx += (tx - cx) * 0.72;
      cy += (ty - cy) * 0.72;
      cur.style.left = `${cx}px`;
      cur.style.top = `${cy}px`;
    }
    requestAnimationFrame(loop);
  })();

  document.querySelectorAll('[data-h]').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      if (document.body.classList.contains('custom-cursor')) cur.classList.add('big');
    });
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

function revealOnScroll(el, fromVars, toVars, scrollTrigger) {
  gsap.fromTo(el, fromVars, {
    ...toVars,
    immediateRender: false,
    scrollTrigger
  });
}

window.addEventListener('load', () => {
  if (!motionOk || typeof gsap === 'undefined') return;

  const root = document.documentElement;
  if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);

  try {
    root.classList.add('js-motion');

    // Hero: intentional load reveal (GSAP absent → CSS keeps copy visible)
    gsap.fromTo(
      '.hero .giant .l span',
      { y: '110%' },
      { y: 0, duration: 1.1, stagger: 0.14, ease: 'expo.out', delay: 0.15 }
    );

    gsap.utils.toArray('.mask .mi').forEach((mi) => {
      revealOnScroll(
        mi,
        { y: '105%' },
        { y: 0, duration: 1, ease: 'expo.out' },
        { trigger: mi.closest('.mask'), start: 'top 88%', once: true }
      );
    });

    gsap.utils.toArray('.srow,.step,.stkrow,.proj .p,.about .lead,.about .caps').forEach((el) => {
      revealOnScroll(
        el,
        { y: 36 },
        { y: 0, duration: 0.8, ease: 'power3.out' },
        { trigger: el, start: 'top 90%', once: true }
      );
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
  } catch (err) {
    root.classList.remove('js-motion');
    console.error('motion init failed', err);
  }
});

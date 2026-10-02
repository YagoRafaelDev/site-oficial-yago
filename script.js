'use strict';

/* 01 — Helpers / state */
const $ = (selector, scope = document) => scope?.querySelector(selector) || null;
const $$ = (selector, scope = document) => [...(scope?.querySelectorAll(selector) || [])];
const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const precisePointer = matchMedia('(hover: hover) and (pointer: fine) and (min-width: 861px)');
const activeAnimations = new Set();
const faqAnimations = new Map();
const motionStyle = getComputedStyle(document.documentElement);
const motion = Object.fromEntries(['fast', 'ui', 'medium', 'reveal'].map(name => [name, parseFloat(motionStyle.getPropertyValue(`--motion-${name}`))]));
const easing = motionStyle.getPropertyValue('--ease').trim();
const pendingReveals = new Map();
let revealObserver = null;
// Shared motion limits, in pixels / milliseconds unless specified.
const interaction = Object.freeze({ ringLag: 62, maxTrail: 18, heroX: 34, heroY: 26, heroTilt: 5, caseX: 22, caseY: 18, contactX: 22, contactY: 18, magnetX: 12, magnetY: 8, shineInterval: 12000, shineCooldown: 9500 });

function animate(element, keyframes, options = {}) {
  if (!element || reducedMotion.matches || !element.animate) return;
  const animation = element.animate(keyframes, { duration: motion.reveal, easing, fill: 'backwards', ...options });
  activeAnimations.add(animation);
  animation.addEventListener('finish', () => activeAnimations.delete(animation));
  animation.addEventListener('cancel', () => activeAnimations.delete(animation));
  return animation;
}

/* 02 — Header / navigation: one scroll frame, reads before writes */
const header = $('.site-header');
const siteNav = $('.site-nav');
const navLinks = $$('a', siteNav);
const sections = $$('main > section');
const hero = $('.hero');
const heroTransition = $('.hero-transition');
const kineticRail = $('.kinetic-rail');
const railTrack = $('.rail-track');
const railWords = $$('.rail-track > span');
let railWidth = 0;
let railTravel = 0;
let railProgress = -1;
let activeRailWord = -1;
let firstScrollPlayed = false;
let previousScrollY = scrollY;
let scrollFrame = 0;

function measureRail() {
  if (!kineticRail || !railTrack) return;
  railWidth = $('.rail-window', kineticRail)?.clientWidth || kineticRail.clientWidth;
  railTravel = Math.max(0, railTrack.scrollWidth - railWidth);
  railProgress = -1;
  queueScroll();
}

function updateScroll() {
  scrollFrame = 0;
  const viewport = innerHeight;
  const pageHeight = document.documentElement.scrollHeight - viewport;
  const sectionRects = sections.map(section => section.getBoundingClientRect());
  const processState = readProcess(viewport);
  const transitionTop = heroTransition?.getBoundingClientRect().top ?? viewport;
  let currentSection = sections[0]?.id || '';
  sectionRects.forEach((rect, index) => {
    if (rect.top <= viewport * .38) currentSection = sections[index].id;
  });

  if (pointer.visible) refreshPointerAfterScroll();
  header?.classList.toggle('is-scrolled', scrollY > 24);
  header?.style.setProperty('--page-progress', clamp(scrollY / Math.max(1, pageHeight)));
  navLinks.forEach(link => {
    if (link.hash === `#${currentSection}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  updateProcess(processState);
  if (!reducedMotion.matches && kineticRail) {
    const progress = clamp((viewport * .85 - transitionTop) / (viewport * .8));
    if (Math.abs(progress - railProgress) > .001) {
      railProgress = progress;
      kineticRail.style.setProperty('--rail-x', `${(-railTravel * progress).toFixed(2)}px`);
      kineticRail.style.setProperty('--rail-marker-x', `${(Math.max(0, railWidth - 5) * progress).toFixed(2)}px`);
      const nextWord = Math.round(progress * (railWords.length - 1));
      if (nextWord !== activeRailWord) {
        activeRailWord = nextWord;
        railWords.forEach((word, index) => word.classList.toggle('is-active', index === nextWord));
      }
    }
    if (hero && !firstScrollPlayed && scrollY > 8 && scrollY > previousScrollY && sectionRects[0]?.bottom > viewport * .4) {
      firstScrollPlayed = true;
      hero.classList.add('is-starting');
      setTimeout(() => hero.classList.remove('is-starting'), 800);
    }
  }
  previousScrollY = scrollY;
}
function queueScroll() {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll);
}

/* 03 — Mobile menu: keyboard, Escape and navigation */
const menuButton = $('.menu-toggle');
function closeMenu(returnFocus = false) {
  if (!menuButton || !siteNav || menuButton.getAttribute('aria-expanded') !== 'true') return;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
  siteNav.classList.remove('is-open');
  if (returnFocus) menuButton.focus();
}
function toggleMenu() {
  if (!menuButton || !siteNav) return;
  if (menuButton.getAttribute('aria-expanded') === 'true') return closeMenu(true);
  menuButton.setAttribute('aria-expanded', 'true');
  menuButton.setAttribute('aria-label', 'Fechar menu');
  siteNav.classList.add('is-open');
  navLinks[0]?.focus();
  animate(siteNav, [{ opacity: .65, transform: 'translateY(-7px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 220 });
}

/* 04 — Reusable reveal vocabulary; nothing is hidden in the base stylesheet */
function reveal(element, type = 'text', delay = 0, paused = false) {
  const mobile = innerWidth <= 860;
  const distance = mobile ? 36 : 56;
  const frames = {
    text: [{ opacity: 0, translate: `0 ${mobile ? 22 : 30}px` }, { opacity: 1, translate: '0 0' }],
    heading: [{ opacity: 0, translate: `0 ${distance}px`, clipPath: 'inset(0 -3% 100% -3%)' }, { opacity: 1, translate: '0 0', clipPath: 'inset(0 -3% -12% -3%)' }],
    line: [{ opacity: 0, scale: '0 1' }, { opacity: 1, scale: '1 1' }],
    ink: [{ opacity: 0 }, { opacity: 1 }],
    number: [{ opacity: 0, translate: '0 14px', scale: '.92' }, { opacity: 1, translate: '0 0', scale: '1' }],
    image: [{ opacity: 0, translate: '0 40px', scale: '1.035', clipPath: 'inset(0 0 85% 0)' }, { opacity: 1, translate: '0 0', scale: '1', clipPath: 'inset(-12% -12% -12% -12%)' }],
    portrait: [{ opacity: 0, translate: '18px 24px', scale: '.98', clipPath: 'inset(0 75% 0 0)' }, { opacity: 1, translate: '0 0', scale: '1', clipPath: 'inset(-12% -12% -12% -12%)' }],
    lateral: [{ opacity: 0, translate: `${mobile ? 18 : 38}px 0` }, { opacity: 1, translate: '0 0' }],
    action: [{ opacity: 0, translate: '0 24px' }, { opacity: 1, translate: '0 0' }]
  };
  const durations = { heading: motion.reveal, image: motion.reveal + 80, portrait: motion.reveal + 80, line: motion.reveal, ink: motion.medium, number: motion.medium, action: motion.medium, lateral: motion.reveal, text: motion.medium };
  const animation = animate(element, frames[type], { duration: durations[type], delay, easing: ['heading', 'image', 'portrait'].includes(type) ? 'cubic-bezier(.22,1,.36,1)' : easing });
  if (animation && paused) { animation.pause(); animation.currentTime = 0; }
  return animation;
}

function releaseReveals() {
  if (revealObserver) revealObserver.disconnect();
  pendingReveals.clear();
  activeAnimations.forEach(animation => animation.cancel());
  document.documentElement.classList.remove('motion-ready');
  $$('.section-shell').forEach(section => section.classList.add('is-entered'));
}

function initializeReveals() {
  if (reducedMotion.matches || !('IntersectionObserver' in window) || !Element.prototype.animate) return;
  reveal($('.hero-kicker'), 'text');
  reveal($('.hero-main'), 'heading', 90);
  $$('.hero-support > p').forEach((element, index) => reveal(element, 'text', 190 + index * 80));
  $$('.hero-actions > a').forEach((element, index) => reveal(element, 'action', 340 + index * 80));

  revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      if (entry.target.matches('.hero-art') && entry.intersectionRatio < .18) return;
      const group = pendingReveals.get(entry.target);
      if (!group) return;
      revealObserver.unobserve(entry.target);
      pendingReveals.delete(entry.target);
      if (entry.target.matches('.section-shell')) entry.target.classList.add('is-entered');
      group.forEach(animation => { if (animation.playState === 'paused') animation.play(); });
    });
  }, { threshold: [0, .18], rootMargin: '0px 0px -9% 0px' });
  const observe = (target, group) => {
    if (!target || getComputedStyle(target).display === 'none') return;
    pendingReveals.set(target, group.filter(([element]) => element).map(([element, type, delay]) => reveal(element, type, delay, true)).filter(Boolean));
    revealObserver.observe(target);
  };
  const observeHeading = target => {
    const lead = target.matches('.about-copy') && innerWidth > 860 ? 400 : 0;
    observe(target, [
      [$('.eyebrow', target), 'text', lead],
      [$('h2', target), 'heading', lead + 100],
      ...$$('p:not(.eyebrow)', target).map((element, index) => [element, 'text', lead + 210 + index * 80])
    ]);
  };

  // Prepare finite, paused animations only after the observer exists. Base HTML
  // stays visible without JavaScript; any runtime error releases pending effects.
  const artDelay = innerWidth > 860 ? 390 : 0;
  observe($('.hero-art'), [
    ...$$('.kinetic-object > div').map((element, index) => [element, 'text', artDelay + index * 90]),
    [$('.art-axis-one'), 'line', artDelay + 230],
    [$('.art-axis-two'), 'line', artDelay + 270],
    [$('.art-coordinate'), 'text', artDelay + 300]
  ]);
  $$('.section-shell').forEach(section => observe(section, []));
  $$('.section-intro, .split-heading, .about-copy, .evolution-intro').forEach(observeHeading);
  $$('.section-rule').forEach(element => observe(element, [[element, 'line', 0]]));
  // On narrow screens the type rail spans the transition; scaling its parent
  // would change the containing block while the entrance is running.
  observe($('.hero-transition'), [[$('.hero-transition > span'), 'text', 0], [$('.hero-transition i'), innerWidth <= 620 ? 'ink' : 'line', 60], [$('.hero-transition a'), 'action', 150]]);
  observe($('.case-heading'), [[$('.case-context'), 'text', 0], [$('.case-status'), 'action', 120]]);
  observe($('.stage-guide'), [[$('.stage-guide i'), 'line', 0], ...$$('.stage-guide span').map((element, index) => [element, 'text', 80 + index * 60])]);
  observe($('.case-visual'), [[$('.case-visual'), 'image', 60]]);
  observe($('.case-mobile'), [[$('.case-mobile'), 'portrait', innerWidth > 620 ? 210 : 60]]);
  observe($('.case-summary'), [[$('.case-summary .eyebrow'), 'text', 0], [$('.case-delivery > p'), 'text', 100]]);
  $$('.case-deliverables li').forEach((item, index) => observe(item, [[item, 'text', 150 + index * 80]]));
  observe($('.case-links'), $$('a', $('.case-links')).map((element, index) => [element, 'action', 180 + index * 80]));
  $$('.service-row').forEach(row => observe(row, [[$('.row-index', row), 'number', 0], [$('h3', row), 'heading', 90], [$('p', row), 'text', 190]]));
  observe($('.section-note'), [[$('.section-note p'), 'text', 0], [$('.section-note a'), 'action', 110]]);
  processSteps.forEach(step => observe(step, [[$('h3', step), 'text', 0], [$('p', step), 'text', 80]]));
  observe($('.about-name'), [[$('.name-plate > span:first-child'), 'heading', 0], [$('.name-plate > span:nth-child(2)'), 'lateral', 140], [$('.name-plate i'), 'line', 250], [$('.name-period'), 'number', 380]]);
  observe($('.evolution-horizon'), [[$('.evolution-horizon i'), 'line', 0], ...$$('.evolution-horizon span, .evolution-horizon b').map((element, index) => [element, 'text', 80 + index * 55])]);
  $$('.evolution-list li').forEach((item, index) => {
    const delay = innerWidth > 620 ? index * 85 : 0;
    observe(item, [[item, 'lateral', delay], [$('h3', item), 'heading', delay + 50], [$('p', item), 'text', delay + 120]]);
  });
  observe($('.evolution-note'), [[$('.evolution-note'), 'text', 0]]);
  $$('.faq details').forEach((details, index) => observe(details, [[$('summary', details), 'text', Math.min(index, 2) * 65]]));
  observe($('.contact h2'), [[$('.contact .eyebrow'), 'text', 0], [$('.contact h2'), 'heading', 100]]);
  const signalGroup = [...$$('.contact-signal i').map((element, index) => [element, 'line', 340 + index * 70]), [$('.contact-signal span'), 'lateral', 480]];
  observe($('.contact-bottom'), [[$('.contact-bottom p'), 'text', 100], [$('.contact-bottom .button'), 'action', 220], [$('.contact-channel'), 'text', 300], ...(innerWidth > 620 ? signalGroup : [])]);
  if (innerWidth <= 620) observe($('.contact-signal'), signalGroup.map(([element, type, delay]) => [element, type, delay - 280]));
  observe($('.footer-inner'), [...$$('.footer-inner > *').map((element, index) => [element, 'text', index * 80])]);
  document.documentElement.classList.add('motion-ready');
}

/* 05 — Cursor: immediate point, smoothed ring, native fallback */
const cursorDot = $('.cursor-dot');
const cursorRing = $('.cursor-ring');
const pointer = { x: 0, y: 0, ringX: 0, ringY: 0, visible: false, frame: 0, lastTime: 0 };
let pointerTarget = null;
let pointerRect = null;
let pointerDirty = false;
let pointerScene = null;
let pointerSceneRect = null;
let selectingText = false;
const pointerAllowed = () => Boolean(cursorDot && cursorRing && precisePointer.matches && !reducedMotion.matches);

function hideCursor() {
  pointer.visible = false;
  document.body.classList.remove('cursor-ready', 'cursor-link', 'cursor-cta', 'cursor-project', 'cursor-media', 'cursor-service', 'cursor-faq', 'cursor-faq-open', 'cursor-pressed');
  cancelAnimationFrame(pointer.frame);
  pointer.frame = 0;
  pointer.lastTime = 0;
}
function updatePointer(time) {
  pointer.frame = 0;
  if (!pointer.visible || !pointerAllowed()) return;
  const elapsed = pointer.lastTime ? Math.min(time - pointer.lastTime, 32) : 16.7;
  const smoothing = 1 - Math.exp(-elapsed / interaction.ringLag);
  pointer.lastTime = time;
  pointer.ringX += (pointer.x - pointer.ringX) * smoothing;
  pointer.ringY += (pointer.y - pointer.ringY) * smoothing;
  // Bound the trailing distance, including fast pointer movements.
  const trailingDistance = Math.hypot(pointer.x - pointer.ringX, pointer.y - pointer.ringY);
  if (trailingDistance > interaction.maxTrail) {
    pointer.ringX = pointer.x - (pointer.x - pointer.ringX) * interaction.maxTrail / trailingDistance;
    pointer.ringY = pointer.y - (pointer.y - pointer.ringY) * interaction.maxTrail / trailingDistance;
  }
  // Individual translate precedes scale, keeping state changes centered on the pointer.
  cursorRing.style.translate = `${pointer.ringX}px ${pointer.ringY}px`;
  if (pointerDirty && pointerTarget && pointerRect) updatePointerTarget();
  if (pointerDirty && pointerScene && pointerSceneRect) {
    const x = clamp((pointer.x - pointerSceneRect.left) / pointerSceneRect.width) - .5;
    const y = clamp((pointer.y - pointerSceneRect.top) / pointerSceneRect.height) - .5;
    const inHero = pointerScene.matches('.hero');
    pointerScene.style.setProperty('--scene-x', `${(x * (inHero ? interaction.heroX : interaction.contactX)).toFixed(2)}px`);
    pointerScene.style.setProperty('--scene-y', `${(y * (inHero ? interaction.heroY : interaction.contactY)).toFixed(2)}px`);
    if (inHero) {
      pointerScene.style.setProperty('--scene-tilt-x', `${(-y * interaction.heroTilt).toFixed(2)}deg`);
      pointerScene.style.setProperty('--scene-tilt-y', `${(x * interaction.heroTilt).toFixed(2)}deg`);
    }
  }
  pointerDirty = false;
  if (Math.abs(pointer.x - pointer.ringX) + Math.abs(pointer.y - pointer.ringY) > .2) {
    pointer.frame = requestAnimationFrame(updatePointer);
  }
}

/* 06 — Pointer interactions: transform only, limited angles */
function resetPointerTarget() {
  if (pointerTarget) {
    ['--tilt-x', '--tilt-y', '--plane-x', '--plane-y', '--magnet-x', '--magnet-y'].forEach(property => pointerTarget.style.removeProperty(property));
  }
  pointerTarget = null;
  pointerRect = null;
  if (pointerScene) {
    ['--scene-x', '--scene-y', '--scene-tilt-x', '--scene-tilt-y'].forEach(property => pointerScene.style.removeProperty(property));
  }
  pointerScene = null;
  pointerSceneRect = null;
}
function updatePointerTarget() {
  const x = clamp((pointer.x - pointerRect.left) / pointerRect.width, 0, 1) - .5;
  const y = clamp((pointer.y - pointerRect.top) / pointerRect.height, 0, 1) - .5;
  if (pointerTarget.matches('[data-tilt]')) {
    const limit = Number(pointerTarget.dataset.tilt);
    pointerTarget.style.setProperty('--tilt-x', `${(-y * limit).toFixed(2)}deg`);
    pointerTarget.style.setProperty('--tilt-y', `${(x * limit).toFixed(2)}deg`);
    if (pointerTarget.matches('.hero-art, .project-stage')) {
      const hero = pointerTarget.matches('.hero-art');
      pointerTarget.style.setProperty('--plane-x', `${(x * (hero ? interaction.heroX : interaction.caseX)).toFixed(2)}px`);
      pointerTarget.style.setProperty('--plane-y', `${(y * (hero ? interaction.heroY : interaction.caseY)).toFixed(2)}px`);
    }
  } else {
    const primary = pointerTarget.matches('.button, .header-contact');
    pointerTarget.style.setProperty('--magnet-x', `${(x * (primary ? interaction.magnetX : 6)).toFixed(2)}px`);
    pointerTarget.style.setProperty('--magnet-y', `${(y * (primary ? interaction.magnetY : 4)).toFixed(2)}px`);
  }
}
function onPointerMove(event) {
  if (!(event.target instanceof Element)) return;
  if (selectingText && event.buttons === 0) selectingText = false;
  if (event.pointerType === 'touch' || selectingText || event.target.closest('input, textarea, select, [contenteditable="true"]')) {
    hideCursor();
    resetPointerTarget();
    return;
  }
  if (!pointerAllowed()) return;
  pointer.x = event.clientX;
  pointer.y = event.clientY;
  // The dot has no interpolation; only the outer ring follows in rAF.
  cursorDot.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0)`;
  if (!pointer.visible) {
    pointer.ringX = pointer.x;
    pointer.ringY = pointer.y;
    pointer.visible = true;
  }
  updatePointerContext(event.target);
}
function updatePointerContext(target) {
  if (!target) return;
  const interactive = target.closest('a, button, summary');
  const media = target.closest('.project-preview');
  const project = !media && target.closest('.project-stage');
  const service = target.closest('.service-row, .evolution-list li');
  const faq = target.closest('.faq summary');
  document.body.classList.add('cursor-ready');
  document.body.classList.toggle('cursor-link', Boolean(interactive));
  document.body.classList.toggle('cursor-cta', Boolean(target.closest('.button, .header-contact, .case-status')));
  document.body.classList.toggle('cursor-project', Boolean(project));
  document.body.classList.toggle('cursor-media', Boolean(media));
  document.body.classList.toggle('cursor-service', Boolean(service));
  document.body.classList.toggle('cursor-faq', Boolean(faq));
  document.body.classList.toggle('cursor-faq-open', Boolean(faq && faq.getAttribute('aria-expanded') === 'true'));
  const nextTarget = target.closest('[data-tilt]:not(.hero-art), .button, .case-status, .header-contact, .magnetic-link');
  const nextScene = target.closest('.hero, .contact');
  if (nextTarget !== pointerTarget || nextScene !== pointerScene || (nextTarget && !pointerRect) || (nextScene && !pointerSceneRect)) {
    resetPointerTarget();
    pointerTarget = nextTarget;
    if (pointerTarget) pointerRect = pointerTarget.getBoundingClientRect();
    pointerScene = nextScene;
    if (pointerScene) pointerSceneRect = pointerScene.getBoundingClientRect();
  }
  pointerDirty = true;
  if (!pointer.frame) pointer.frame = requestAnimationFrame(updatePointer);
}

// Keep the custom cursor under a stationary mouse when the page moves beneath it.
function refreshPointerAfterScroll() {
  if (!pointerAllowed() || selectingText) return;
  pointerRect = pointerSceneRect = null;
  updatePointerContext(document.elementFromPoint(pointer.x, pointer.y));
}

/* 07 — CTA light: finite passes, spaced out and only while visible */
const shineButtons = $$('.header-contact, .button-primary');
const visibleShineButtons = new Set();
const seenShineButtons = new WeakSet();
const lastShineAt = new WeakMap();
let shineTimer = 0;
let shineIndex = 0;
function playShine(button) {
  if (!button || reducedMotion.matches || document.hidden || button.classList.contains('is-shining')) return;
  const rect = button.getBoundingClientRect();
  if (!rect.width || !rect.height || rect.bottom <= 0 || rect.top >= innerHeight) return;
  lastShineAt.set(button, performance.now());
  button.classList.add('is-shining');
}
function scheduleShine() {
  if (reducedMotion.matches || document.hidden || !visibleShineButtons.size) {
    clearTimeout(shineTimer);
    shineTimer = 0;
    return;
  }
  if (shineTimer) return;
  shineTimer = setTimeout(() => {
    shineTimer = 0;
    const candidates = [...visibleShineButtons].filter(button => !button.matches(':hover, :focus-visible') && performance.now() - (lastShineAt.get(button) || 0) > interaction.shineCooldown);
    if (candidates.length) playShine(candidates[shineIndex++ % candidates.length]);
    scheduleShine();
  }, interaction.shineInterval);
}
function initializeShine() {
  shineButtons.forEach(button => {
    button.addEventListener('pointerenter', event => {
      if (event.pointerType !== 'touch' && pointerAllowed()) playShine(button);
    });
    button.addEventListener('focus', () => {
      if (button.matches(':focus-visible')) playShine(button);
    });
    button.addEventListener('animationend', event => {
      if (event.animationName === 'cta-shine') button.classList.remove('is-shining');
    });
  });
  if (!('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting || entry.intersectionRatio < .65) {
        visibleShineButtons.delete(entry.target);
        return;
      }
      visibleShineButtons.add(entry.target);
      if (!seenShineButtons.has(entry.target)) {
        seenShineButtons.add(entry.target);
        setTimeout(() => playShine(entry.target), entry.target.matches('.header-contact') ? 1000 : 650);
      }
    });
    scheduleShine();
  }, { threshold: .65 });
  shineButtons.forEach(button => observer.observe(button));
}

/* Project interactions */
// The stage uses the same pointer system; previews remain ordinary external links.
// Native links also work with keyboard, touch, reduced motion and JavaScript disabled.

/* 08 — Services */
// Editorial rows respond through CSS, keeping all information visible on touch.

/* 09 — Process */
const processList = $('.process-list');
const processSteps = $$('li', processList);
const processNumber = $('.process-current');
const processSegments = $$('.process-segments i');
let activeStep = -1;
let processNumberAnimation = null;

// Read layout first; updateScroll applies both header and process in the same frame.
function readProcess(viewport) {
  if (!processList || !processNumber || !processSteps.length) return null;
  const markers = processSteps.map(step => $('.row-index', step)?.getBoundingClientRect()).filter(Boolean);
  if (!markers.length) return null;
  const firstCenter = markers[0].top + markers[0].height / 2;
  const lastCenter = markers[markers.length - 1].top + markers[markers.length - 1].height / 2;
  const trackHeight = Math.max(1, lastCenter - firstCenter);
  let nextStep = 0;
  markers.forEach((marker, index) => {
    if (marker.top + marker.height / 2 <= viewport * .54) nextStep = index;
  });
  return { nextStep, trackHeight, progress: clamp((viewport * .54 - firstCenter) / trackHeight) };
}
function updateProcess(state) {
  if (!state || !processList || !processNumber) return;
  const { nextStep, progress, trackHeight } = state;
  processList.style.setProperty('--process-progress', progress);
  processList.style.setProperty('--process-track-height', `${trackHeight}px`);
  if (nextStep === activeStep) return;
  activeStep = nextStep;
  processNumber.textContent = String(nextStep + 1).padStart(2, '0');
  processSteps.forEach((step, index) => {
    step.classList.toggle('is-active', index === nextStep);
    step.classList.toggle('is-complete', index < nextStep);
  });
  processSegments.forEach((segment, index) => segment.classList.toggle('is-active', index <= nextStep));
  if (processNumberAnimation) processNumberAnimation.cancel();
  processNumberAnimation = animate(processNumber, [{ opacity: 0, translate: '0 24px', clipPath: 'inset(0 0 65% 0)' }, { opacity: 1, translate: '0 0', clipPath: 'inset(-10% 0 -10% 0)' }], { duration: motion.medium });
}

/* 10 — Native details + reversible CSS Grid transition, no JS height tween */
function toggleFaq(details) {
  const answer = $('.faq-answer', details);
  const summary = $('summary', details);
  if (!details || !answer || !summary) return;
  const previous = faqAnimations.get(details);
  const willOpen = previous ? !previous.willOpen : !details.open;
  if (previous) previous.cleanup();
  const wasOpen = details.open;
  details.open = true;
  if (!wasOpen) answer.getBoundingClientRect(); // Establish 0fr once before expanding.
  details.classList.toggle('is-closing', !willOpen);
  details.classList.toggle('is-expanded', willOpen);
  summary.setAttribute('aria-expanded', String(willOpen));
  if (summary.matches(':hover') && pointerAllowed()) document.body.classList.toggle('cursor-faq-open', willOpen);
  answer.inert = !willOpen;
  let timer;
  const cleanup = () => {
    clearTimeout(timer);
    answer.removeEventListener('transitionend', onEnd);
  };
  const finish = () => {
    cleanup();
    details.open = willOpen;
    details.classList.remove('is-closing');
    faqAnimations.delete(details);
    queueScroll();
  };
  const onEnd = event => {
    if (event.target === answer && event.propertyName === 'grid-template-rows') finish();
  };
  faqAnimations.set(details, { willOpen, finish, cleanup });
  answer.addEventListener('transitionend', onEnd);
  timer = setTimeout(finish, motion.ui + 90);
}

/* 11 — Reduced motion / device changes */
function refreshMotionPreference() {
  hideCursor();
  resetPointerTarget();
  if (reducedMotion.matches) {
    shineButtons.forEach(button => button.classList.remove('is-shining'));
    hero?.classList.remove('is-starting');
    kineticRail?.style.removeProperty('--rail-x');
    kineticRail?.style.removeProperty('--rail-marker-x');
    railWords.forEach(word => word.classList.remove('is-active'));
    railProgress = activeRailWord = -1;
    releaseReveals();
    faqAnimations.forEach(state => state.finish());
  }
  scheduleShine();
  if (!precisePointer.matches) closeMenu();
  queueScroll();
}

/* 12 — Initialization */
$$('.faq details').forEach(details => {
  const sync = () => {
    if (faqAnimations.has(details)) return;
    $('summary', details)?.setAttribute('aria-expanded', String(details.open));
    details.classList.toggle('is-expanded', details.open);
    const answer = $('.faq-answer', details);
    if (answer) answer.inert = !details.open;
  };
  details.addEventListener('toggle', sync);
  sync();
});
document.documentElement.classList.add('faq-ready');
menuButton?.addEventListener('click', toggleMenu);
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) closeMenu();
  const anchor = event.target.closest('a[href^="#"]');
  if (anchor && !event.defaultPrevented && event.button === 0 && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) {
    const destination = document.getElementById(anchor.hash.slice(1));
    if (destination) {
      closeMenu();
      destination.setAttribute('tabindex', '-1');
      destination.focus({ preventScroll: true });
    }
  }
  const summary = event.target.closest('.faq summary');
  if (summary && $('.faq-answer', summary.parentElement) && !reducedMotion.matches) {
    event.preventDefault();
    toggleFaq(summary.parentElement);
  }
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeMenu(true);
  if (event.key === 'Tab') { hideCursor(); resetPointerTarget(); }
});
document.addEventListener('focusin', event => {
  if (!header?.contains(event.target)) closeMenu();
  // Keyboard navigation must never wait for an entrance animation.
  activeAnimations.forEach(animation => {
    if (animation.effect.target.contains(event.target) || event.target.contains(animation.effect.target)) animation.cancel();
  });
});
document.addEventListener('pointerdown', event => {
  if (event.pointerType === 'touch') { hideCursor(); resetPointerTarget(); return; }
  if (!pointerAllowed()) return;
  selectingText = !event.target.closest('a, button, summary');
  if (selectingText) { hideCursor(); resetPointerTarget(); }
  else document.body.classList.add('cursor-pressed');
});
document.addEventListener('pointerup', () => { selectingText = false; document.body.classList.remove('cursor-pressed'); });
document.addEventListener('pointercancel', () => { selectingText = false; hideCursor(); resetPointerTarget(); });
document.addEventListener('pointermove', onPointerMove, { passive: true });
document.documentElement.addEventListener('pointerleave', () => { hideCursor(); resetPointerTarget(); });
window.addEventListener('blur', () => { selectingText = false; hideCursor(); resetPointerTarget(); });
window.addEventListener('scroll', queueScroll, { passive: true });
window.addEventListener('resize', () => {
  if (innerWidth > 860) closeMenu();
  resetPointerTarget();
  measureRail();
});
document.addEventListener('visibilitychange', () => {
  if (document.hidden) shineButtons.forEach(button => button.classList.remove('is-shining'));
  scheduleShine();
});
reducedMotion.addEventListener('change', refreshMotionPreference);
precisePointer.addEventListener('change', refreshMotionPreference);
document.fonts.ready.then(measureRail);
document.documentElement.classList.add('nav-ready');
window.addEventListener('error', releaseReveals);
try { initializeReveals(); } catch (error) { releaseReveals(); console.error(error); }
initializeShine();
measureRail();
queueScroll();

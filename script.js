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
const interaction = Object.freeze({ ringLag: 62, maxTrail: 18, lightLag: 240, heroX: 46, heroY: 34, heroTilt: 8, caseX: 26, caseY: 20, caseShift: 56, nameDrift: 30, contactX: 30, contactY: 24, magnetX: 12, magnetY: 8, nearReach: 150 });
const expo = 'cubic-bezier(.22,1,.36,1)';
// -1 when an element sits below the viewport centre, 0 when centred, 1 above it.
const centerOffset = (rect, viewport) => clamp((viewport / 2 - (rect.top + rect.height / 2)) / (viewport / 2 + rect.height / 2), -1, 1);

// With reduced motion only "calm" (opacity-only) animations run.
function animate(element, keyframes, { calm = false, ...options } = {}) {
  if (!element || !element.animate || (reducedMotion.matches && !calm)) return;
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
const caseMobile = $('.case-mobile');
const projectStage = $('.project-stage');
const namePlate = $('.name-plate');
const horizon = $('.evolution-horizon');
const navIndicator = $('.nav-indicator');
let navHover = null;
let lastSection = '';

// One shared indicator slides between links; it rests on the current section.
function placeIndicator() {
  if (!navIndicator) return;
  const link = navHover || navLinks.find(item => item.hasAttribute('aria-current'));
  if (!link || innerWidth <= 860) return navIndicator.classList.remove('is-visible');
  navIndicator.style.setProperty('--ind-x', `${link.offsetLeft}px`);
  navIndicator.style.setProperty('--ind-w', link.offsetWidth);
  navIndicator.classList.add('is-visible');
}

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
  const stageRect = projectStage?.getBoundingClientRect();
  const nameRect = namePlate?.getBoundingClientRect();
  const horizonRect = horizon?.getBoundingClientRect();
  const delta = scrollY - previousScrollY;
  let currentSection = sections[0]?.id || '';
  sectionRects.forEach((rect, index) => {
    if (rect.top <= viewport * .38) currentSection = sections[index].id;
  });

  if (pointer.visible) refreshPointerAfterScroll();
  header?.classList.toggle('is-scrolled', scrollY > 24);
  header?.style.setProperty('--page-progress', clamp(scrollY / Math.max(1, pageHeight)));
  // The header steps aside while reading downwards and returns on any upward intent.
  const menuOpen = menuButton?.getAttribute('aria-expanded') === 'true';
  if (scrollY < viewport * .7 || delta < -4 || menuOpen || header?.contains(document.activeElement) || reducedMotion.matches) header?.classList.remove('is-hidden');
  else if (delta > 4) header?.classList.add('is-hidden');
  navLinks.forEach(link => {
    if (link.hash === `#${currentSection}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  if (currentSection !== lastSection) {
    lastSection = currentSection;
    placeIndicator();
  }
  sectionRects.forEach((rect, index) => {
    const visible = rect.bottom > 0 && rect.top < viewport;
    if (sections[index].classList.contains('is-in-view') !== visible) sections[index].classList.toggle('is-in-view', visible);
  });
  updateProcess(processState);
  if (!reducedMotion.matches) {
    if (namePlate && nameRect) namePlate.style.setProperty('--name-fill', clamp((viewport * .9 - nameRect.top) / (nameRect.height + viewport * .45)).toFixed(3));
    if (horizon && horizonRect) horizon.style.setProperty('--horizon', clamp((viewport * .95 - horizonRect.top) / (viewport * .55)).toFixed(3));
  }
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
    // Scroll depth: values only; CSS decides on which viewports they apply.
    const heroRect = sectionRects[0];
    if (hero && heroRect) {
      hero.style.setProperty('--hero-scroll', clamp(-heroRect.top / Math.max(1, heroRect.height)).toFixed(3));
      hero.classList.toggle('is-offscreen', heroRect.bottom < 0);
    }
    if (caseMobile && stageRect) caseMobile.style.setProperty('--case-shift', `${(centerOffset(stageRect, viewport) * -interaction.caseShift).toFixed(2)}px`);
    if (namePlate && nameRect) namePlate.style.setProperty('--name-drift', `${(centerOffset(nameRect, viewport) * interaction.nameDrift).toFixed(2)}px`);
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
    action: [{ opacity: 0, translate: '0 24px' }, { opacity: 1, translate: '0 0' }],
    // Masked word rise for display type; the parent .word clips the overflow.
    word: [{ opacity: 0, translate: '0 105%', rotate: '4deg' }, { opacity: 1, translate: '0 0', rotate: '0deg' }],
    rise: [{ opacity: 0, translate: '0 70%', filter: mobile ? 'blur(0px)' : 'blur(8px)' }, { opacity: 1, translate: '0 0', filter: 'blur(0px)' }],
    wipe: [{ clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)' }],
    // Hero planes assemble from different depths instead of sharing one fade.
    planeBack: [{ opacity: 0, translate: '0 -34px', scale: '.94' }, { opacity: 1, translate: '0 0', scale: '1' }],
    planeMain: [{ opacity: 0, translate: `-${distance}px 0`, clipPath: 'inset(0 100% 0 0)' }, { opacity: 1, translate: '0 0', clipPath: 'inset(0 0% 0 0)' }],
    planeFront: [{ opacity: 0, translate: `${mobile ? 24 : 46}px ${mobile ? 30 : 56}px`, scale: '.96' }, { opacity: 1, translate: '0 0', scale: '1' }],
    // Letters climb out of their own mask; used for names and the case title.
    char: [{ opacity: 0, translate: '0 112%' }, { opacity: 1, translate: '0 0' }],
    // Words stand up from the baseline (parent sets the perspective).
    flip: [{ opacity: 0, transform: 'rotateX(-88deg)' }, { opacity: 1, transform: 'rotateX(0deg)' }],
    pop: [{ opacity: 0, scale: '.88', translate: '0 22px' }, { opacity: 1, scale: '1', translate: '0 0' }]
  };
  const durations = { heading: motion.reveal, image: motion.reveal + 80, portrait: motion.reveal + 80, line: motion.reveal, ink: motion.medium, number: motion.medium, action: motion.medium, lateral: motion.reveal, text: motion.medium, word: motion.reveal, rise: motion.reveal + 120, wipe: motion.reveal - 120, planeBack: motion.reveal + 120, planeMain: motion.reveal, planeFront: motion.reveal + 120, char: motion.reveal, flip: motion.reveal + 140, pop: motion.reveal };
  const expressive = ['heading', 'image', 'portrait', 'word', 'rise', 'wipe', 'planeBack', 'planeMain', 'planeFront', 'char', 'flip', 'pop'];
  // Reduced motion: every entrance becomes a short fade, keeping the same rhythm.
  const animation = reducedMotion.matches
    ? animate(element, [{ opacity: 0 }, { opacity: 1 }], { calm: true, duration: 420, delay: delay * .6, easing: 'ease-out' })
    : animate(element, frames[type], { duration: durations[type], delay, easing: expressive.includes(type) ? expo : easing });
  if (animation && paused) { animation.pause(); animation.currentTime = 0; }
  return animation;
}

// Wraps each word in a clipping span. The heading keeps its full text as the
// accessible name, so assistive technology never reads it word by word.
function splitWords(element) {
  if (!element) return [];
  if (element.dataset.split) return $$('.word-inner', element);
  element.dataset.split = 'true';
  // innerText keeps <br> as a space, so "possibilidades<br>pela" stays two words.
  element.setAttribute('aria-label', element.innerText.replace(/\s+/g, ' ').trim());
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);
  const words = [];
  textNodes.forEach(node => {
    const fragment = document.createDocumentFragment();
    node.textContent.split(/(\s+)/).forEach(part => {
      if (!part) return;
      if (!part.trim()) return fragment.append(part);
      const word = document.createElement('span');
      const inner = document.createElement('span');
      word.className = 'word';
      word.setAttribute('aria-hidden', 'true');
      inner.className = 'word-inner';
      inner.textContent = part;
      word.append(inner);
      fragment.append(word);
      words.push(inner);
    });
    node.replaceWith(fragment);
  });
  return words;
}

// Letters inside the word wrappers, so lines still break between words only.
function splitChars(element) {
  return splitWords(element).flatMap(word => {
    if ($('.char', word)) return $$('.char', word);
    const chars = [...word.textContent].map(letter => {
      const char = document.createElement('span');
      char.className = 'char';
      char.textContent = letter;
      return char;
    });
    word.replaceChildren(...chars);
    return chars;
  });
}

function releaseReveals() {
  if (revealObserver) revealObserver.disconnect();
  pendingReveals.clear();
  activeAnimations.forEach(animation => animation.cancel());
  document.documentElement.classList.remove('motion-ready');
  $$('.section-shell').forEach(section => section.classList.add('is-entered'));
}

function initializeReveals() {
  if (!('IntersectionObserver' in window) || !Element.prototype.animate) return;
  // Hero: one coordinated entrance — header, kicker wipe, words, underline, copy.
  animate(header, [{ translate: '0 -100%' }, { translate: '0 0' }], { duration: motion.reveal, easing: expo });
  reveal($('.hero-kicker'), 'wipe', 60);
  const heroWords = splitWords($('.hero h1'));
  heroWords.forEach((word, index) => reveal(word, 'word', 140 + index * 42));
  const wordsEnd = 140 + heroWords.length * 42;
  animate($('.hero-emphasis'), [{ scale: '0 1' }, { scale: '1 1' }], { duration: motion.reveal, delay: wordsEnd, easing: expo, pseudoElement: '::after' });
  $$('.hero-support > p').forEach((element, index) => reveal(element, 'text', wordsEnd - 160 + index * 80));
  $$('.hero-actions > a').forEach((element, index) => reveal(element, index ? 'action' : 'pop', wordsEnd + index * 90));
  animate($('.hero-aurora'), [{ opacity: 0, scale: '.85' }, { opacity: 1, scale: '1' }], { duration: 2200, easing: expo });

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
    const heading = $('h2', target);
    // Each chapter title enters its own way: letters, masked words, standing
    // words, a lateral cascade, or the plain clip used for compact titles.
    let title = [[heading, 'heading', lead + 100]];
    if (target.matches('.project-intro')) title = splitChars(heading).map((char, index) => [char, 'char', lead + 100 + index * 26]);
    else if (target.closest('.services')) title = splitWords(heading).map((word, index) => [word, 'word', lead + 100 + index * 55]);
    else if (target.matches('.about-copy')) title = splitWords(heading).map((word, index) => [word, 'flip', lead + 100 + index * 70]);
    else if (target.matches('.evolution-intro')) title = splitWords(heading).map((word, index) => [word, 'lateral', lead + 100 + index * 70]);
    const textStart = lead + 210 + Math.max(0, title.length - 1) * 30;
    observe(target, [
      [$('.eyebrow', target), 'wipe', lead],
      ...title,
      ...$$('p:not(.eyebrow)', target).map((element, index) => [element, 'text', textStart + index * 80])
    ]);
  };

  // Prepare finite, paused animations only after the observer exists. Base HTML
  // stays visible without JavaScript; any runtime error releases pending effects.
  const artDelay = innerWidth > 860 ? 390 : 0;
  observe($('.hero-art'), [
    [$('.kinetic-back'), 'planeBack', artDelay],
    [$('.kinetic-main'), 'planeMain', artDelay + 160],
    [$('.kinetic-front'), 'planeFront', artDelay + 280],
    [$('.art-axis-one'), 'line', artDelay + 230],
    [$('.art-axis-two'), 'line', artDelay + 270],
    [$('.art-coordinate'), 'text', artDelay + 300],
    [$('.art-readout'), 'wipe', artDelay + 420],
    [$('.art-corners'), 'pop', artDelay + 360]
  ]);
  $$('.section-shell').forEach(section => observe(section, []));
  $$('.section-intro, .split-heading, .about-copy, .evolution-intro').forEach(observeHeading);
  $$('.section-rule').forEach(element => observe(element, [[element, 'line', 0]]));
  // On narrow screens the type rail spans the transition; scaling its parent
  // would change the containing block while the entrance is running.
  observe($('.hero-transition'), [[$('.hero-transition > span'), 'text', 0], [$('.hero-transition i'), innerWidth <= 620 ? 'ink' : 'line', 60], [$('.hero-transition a'), 'action', 150]]);
  observe($('.case-heading'), [[$('.case-context'), 'text', 0], ...$$('.case-tags li').map((tag, index) => [tag, 'pop', 140 + index * 70]), [$('.case-status'), 'action', 220]]);
  observe($('.stage-guide'), [[$('.stage-guide i'), 'line', 0], ...$$('.stage-guide span').map((element, index) => [element, 'text', 80 + index * 60])]);
  observe($('.case-visual'), [[$('.case-visual'), 'image', 60]]);
  // A single light pass crosses the real screenshot once it has settled.
  pendingReveals.get($('.case-visual'))?.[0]?.finished.then(() => $('.case-visual')?.classList.add('is-scanned')).catch(() => {});
  observe($('.case-mobile'), [[$('.case-mobile'), 'portrait', innerWidth > 620 ? 210 : 60]]);
  observe($('.case-summary'), [[$('.case-summary .eyebrow'), 'wipe', 0], [$('.case-delivery > p'), 'text', 100]]);
  $$('.case-deliverables li').forEach((item, index) => observe(item, [[$('strong', item), 'lateral', 120 + index * 80], [$('span', item), 'text', 190 + index * 80]]));
  observe($('.case-links'), $$('a', $('.case-links')).map((element, index) => [element, 'action', 180 + index * 80]));
  $$('.service-row').forEach(row => observe(row, [[$('.row-index', row), 'number', 0], [$('h3', row), 'heading', 90], [$('p', row), 'text', 190], [$('.service-fit', row), 'wipe', 300]]));
  observe($('.section-note'), [[$('.section-note p'), 'text', 0], [$('.section-note a'), 'action', 110]]);
  processSteps.forEach(step => observe(step, [[$('.row-index', step), 'number', 0], [$('h3', step), 'lateral', 60], [$('p', step), 'text', 150]]));
  const nameChars = splitChars($('.name-plate > span:first-child'));
  observe($('.about-name'), [...nameChars.map((char, index) => [char, 'char', index * 70]), [$('.name-plate > span:nth-child(2)'), 'lateral', 260], [$('.name-plate i'), 'line', 420], [$('.name-period'), 'number', 560]]);
  observe($('.evolution-horizon'), [[$('.evolution-horizon i'), 'line', 0], ...$$('.evolution-horizon span, .evolution-horizon b').map((element, index) => [element, 'text', 80 + index * 55])]);
  $$('.evolution-list li').forEach((item, index) => {
    const delay = innerWidth > 620 ? index * 85 : 0;
    observe(item, [[item, 'lateral', delay], [$('h3', item), 'heading', delay + 50], [$('p', item), 'text', delay + 120]]);
  });
  observe($('.evolution-note'), [[$('.evolution-note'), 'text', 0]]);
  $$('.faq details').forEach((details, index) => observe(details, [[$('summary', details), 'text', Math.min(index, 2) * 65]]));
  observe($('.contact h2'), [[$('.contact .eyebrow'), 'text', 0], ...splitWords($('.contact h2')).map((word, index) => [word, 'rise', 100 + index * 60])]);
  const signalGroup = [...$$('.contact-signal i').map((element, index) => [element, 'line', 340 + index * 70]), [$('.contact-signal span'), 'lateral', 480]];
  observe($('.contact-bottom'), [[$('.contact-bottom p'), 'text', 100], [$('.contact-bottom .button'), 'pop', 240], [$('.contact-channel'), 'text', 300], ...(innerWidth > 620 ? signalGroup : [])]);
  if (innerWidth <= 620) observe($('.contact-signal'), signalGroup.map(([element, type, delay]) => [element, type, delay - 280]));
  observe($('.footer-inner'), [...$$('.footer-inner > *').map((element, index) => [element, 'text', index * 80])]);
  document.documentElement.classList.add('motion-ready');
}

/* 05 — Cursor: immediate point, smoothed ring, native fallback */
const cursorDot = $('.cursor-dot');
const cursorRing = $('.cursor-ring');
const ambientLight = $('.ambient-light');
const pointer = { x: 0, y: 0, ringX: 0, ringY: 0, lightX: 0, lightY: 0, visible: false, frame: 0, lastTime: 0 };
let spotTarget = null;
let spotRect = null;
let pointerTarget = null;
let pointerRect = null;
let pointerDirty = false;
let pointerScene = null;
let pointerSceneRect = null;
let selectingText = false;
// Proximity: the main CTA of the current scene leans towards a nearby pointer.
let nearButton = null;
let nearRect = null;
const readout = $('.art-readout');
let readoutText = '';
const formatAxis = value => `${value < 0 ? '−' : '+'}${String(Math.round(Math.abs(value) * 200)).padStart(3, '0')}`;
// Bounds without the element's current transform (magnet, lift, press scale),
// so the magnet and the proximity pull measure the control where it rests.
function restingRect(element) {
  const rect = element.getBoundingClientRect();
  const { a, d, e, f } = new DOMMatrixReadOnly(getComputedStyle(element).transform);
  const width = rect.width / (a || 1);
  const height = rect.height / (d || 1);
  return { left: rect.left + rect.width / 2 - e - width / 2, top: rect.top + rect.height / 2 - f - height / 2, width, height };
}
const pointerAllowed = () => Boolean(cursorDot && cursorRing && precisePointer.matches);

function hideCursor() {
  pointer.visible = false;
  document.body.classList.remove('cursor-ready', 'cursor-custom', 'cursor-project', 'cursor-media', 'cursor-pressed');
  cancelAnimationFrame(pointer.frame);
  pointer.frame = 0;
  pointer.lastTime = 0;
}
function updatePointer(time) {
  pointer.frame = 0;
  if (!pointer.visible || !pointerAllowed()) return;
  const elapsed = pointer.lastTime ? Math.min(time - pointer.lastTime, 32) : 16.7;
  const calm = reducedMotion.matches;
  const smoothing = calm ? 1 : 1 - Math.exp(-elapsed / interaction.ringLag);
  pointer.lastTime = time;
  if (pointerDirty && pointerTarget && pointerRect) updatePointerTarget();
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
  // The ambient light trails further behind, so it reads as depth, not as a second cursor.
  const lightSmoothing = 1 - Math.exp(-elapsed / interaction.lightLag);
  pointer.lightX += (pointer.x - pointer.lightX) * lightSmoothing;
  pointer.lightY += (pointer.y - pointer.lightY) * lightSmoothing;
  if (ambientLight) ambientLight.style.translate = `${pointer.lightX.toFixed(1)}px ${pointer.lightY.toFixed(1)}px`;
  if (pointerDirty && spotTarget && spotRect) {
    spotTarget.style.setProperty('--spot-x', `${(pointer.x - spotRect.left).toFixed(1)}px`);
    spotTarget.style.setProperty('--spot-y', `${(pointer.y - spotRect.top).toFixed(1)}px`);
  }
  if (pointerDirty && pointerScene && pointerSceneRect && !calm) {
    const x = clamp((pointer.x - pointerSceneRect.left) / pointerSceneRect.width) - .5;
    const y = clamp((pointer.y - pointerSceneRect.top) / pointerSceneRect.height) - .5;
    const inHero = pointerScene.matches('.hero');
    pointerScene.style.setProperty('--scene-x', `${(x * (inHero ? interaction.heroX : interaction.contactX)).toFixed(2)}px`);
    pointerScene.style.setProperty('--scene-y', `${(y * (inHero ? interaction.heroY : interaction.contactY)).toFixed(2)}px`);
    if (inHero) {
      pointerScene.style.setProperty('--scene-tilt-x', `${(-y * interaction.heroTilt).toFixed(2)}deg`);
      pointerScene.style.setProperty('--scene-tilt-y', `${(x * interaction.heroTilt).toFixed(2)}deg`);
      const text = `X ${formatAxis(x)} · Y ${formatAxis(-y)}`;
      if (readout && text !== readoutText) readout.textContent = readoutText = text;
    }
    if (nearButton && nearRect && nearButton !== pointerTarget) {
      const dx = pointer.x - (nearRect.left + nearRect.width / 2);
      const dy = pointer.y - (nearRect.top + nearRect.height / 2);
      const reach = interaction.nearReach + nearRect.width / 2;
      const strength = clamp(1 - Math.hypot(dx, dy) / reach);
      nearButton.classList.toggle('is-near', strength > 0);
      nearButton.style.setProperty('--near-x', `${(clamp(dx * strength * .12, -14, 14)).toFixed(2)}px`);
      nearButton.style.setProperty('--near-y', `${(clamp(dy * strength * .18, -10, 10)).toFixed(2)}px`);
      nearButton.style.setProperty('--near', strength.toFixed(3));
    }
  }
  pointerDirty = false;
  const ringMoving = Math.abs(pointer.x - pointer.ringX) + Math.abs(pointer.y - pointer.ringY) > .2;
  const lightMoving = ambientLight && Math.abs(pointer.x - pointer.lightX) + Math.abs(pointer.y - pointer.lightY) > .5;
  if (ringMoving || lightMoving) {
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
  if (nearButton) {
    nearButton.classList.remove('is-near');
    ['--near-x', '--near-y', '--near'].forEach(property => nearButton.style.removeProperty(property));
  }
  nearButton = nearRect = null;
  pointerScene = null;
  pointerSceneRect = null;
  spotTarget = null;
  spotRect = null;
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
    pointer.ringX = pointer.lightX = pointer.x;
    pointer.ringY = pointer.lightY = pointer.y;
    pointer.visible = true;
  }
  updatePointerContext(event.target);
}
function updatePointerContext(target) {
  if (!target) return;
  const media = target.closest('.project-preview');
  const project = !media && target.closest('.project-stage');
  document.body.classList.add('cursor-ready');
  // The visible custom cursor is limited to the VS Tattoo stage. On entry the ring
  // starts on the pointer, so it never travels in from elsewhere.
  const custom = Boolean(target.closest('.project-stage'));
  if (custom && !document.body.classList.contains('cursor-custom')) {
    pointer.ringX = pointer.x;
    pointer.ringY = pointer.y;
    cursorRing.style.translate = `${pointer.x}px ${pointer.y}px`;
  }
  document.body.classList.toggle('cursor-custom', custom);
  document.body.classList.toggle('cursor-project', Boolean(project));
  document.body.classList.toggle('cursor-media', Boolean(media));
  const nextTarget = target.closest('[data-tilt]:not(.hero-art), .button, .case-status, .header-contact, .magnetic-link');
  const nextScene = target.closest('.hero, .contact');
  if (nextTarget !== pointerTarget || nextScene !== pointerScene || (nextTarget && !pointerRect) || (nextScene && !pointerSceneRect)) {
    resetPointerTarget();
    pointerTarget = nextTarget;
    if (pointerTarget) pointerRect = restingRect(pointerTarget);
    pointerScene = nextScene;
    if (pointerScene) pointerSceneRect = pointerScene.getBoundingClientRect();
    nearButton = pointerScene ? $('.button-primary', pointerScene) : null;
    nearRect = nearButton ? restingRect(nearButton) : null;
  }
  // Surfaces with a local light that follows the pointer (see --spot-x / --spot-y).
  const nextSpot = target.closest('.service-row, .evolution-list li, .project-stage');
  if (nextSpot !== spotTarget || (nextSpot && !spotRect)) {
    spotTarget = nextSpot;
    spotRect = nextSpot ? nextSpot.getBoundingClientRect() : null;
  }
  pointerDirty = true;
  if (!pointer.frame) pointer.frame = requestAnimationFrame(updatePointer);
}

// Keep the custom cursor under a stationary mouse when the page moves beneath it.
function refreshPointerAfterScroll() {
  if (!pointerAllowed() || selectingText) return;
  pointerRect = pointerSceneRect = spotRect = null;
  updatePointerContext(document.elementFromPoint(pointer.x, pointer.y));
}

/* 07 — Controls: rolling labels, directional fills, turning arrows, press wave */
// The fill enters from the side the pointer came in and leaves towards the side it exits.
function setFillOrigin(event) {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty('--fill-origin', event.clientX - rect.left < rect.width / 2 ? 'left' : 'right');
}
function initializeControls() {
  $$('.button-label').forEach(label => {
    if ($('.label-roll', label)) return;
    const roll = document.createElement('span');
    roll.className = 'label-roll';
    roll.append(...label.childNodes);
    label.append(roll);
  });
  $$('.button-arrow').forEach(arrow => {
    if ($('.arrow-glyph', arrow)) return;
    const glyph = document.createElement('span');
    glyph.className = 'arrow-glyph';
    glyph.append(...arrow.childNodes);
    arrow.append(glyph);
  });
  $$('.button, .header-contact, .case-status, .text-link').forEach(control => {
    control.addEventListener('pointerenter', setFillOrigin);
    control.addEventListener('pointerleave', setFillOrigin);
  });
}
function pressWave(event) {
  const control = event.target.closest('.button, .header-contact, .case-status');
  if (!control || reducedMotion.matches || event.button !== 0) return;
  const rect = control.getBoundingClientRect();
  const wave = document.createElement('span');
  wave.className = 'press-wave';
  wave.setAttribute('aria-hidden', 'true');
  wave.style.left = `${event.clientX - rect.left}px`;
  wave.style.top = `${event.clientY - rect.top}px`;
  control.append(wave);
  wave.addEventListener('animationend', () => wave.remove());
  setTimeout(() => wave.remove(), 1200);
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
  // Segments fill continuously, so the indicator advances with the reader.
  processSegments.forEach((segment, index) => segment.style.setProperty('--seg', clamp(progress * (processSegments.length - 1) + 1 - index).toFixed(3)));
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
    hero?.classList.remove('is-starting');
    kineticRail?.style.removeProperty('--rail-x');
    kineticRail?.style.removeProperty('--rail-marker-x');
    railWords.forEach(word => word.classList.remove('is-active'));
    railProgress = activeRailWord = -1;
    header?.classList.remove('is-hidden');
    namePlate?.style.removeProperty('--name-fill');
    horizon?.style.removeProperty('--horizon');
    releaseReveals();
    faqAnimations.forEach(state => state.finish());
  }
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
  pressWave(event);
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
  placeIndicator();
});
navLinks.forEach(link => {
  const hover = () => { navHover = link; placeIndicator(); };
  link.addEventListener('pointerenter', hover);
  link.addEventListener('focus', hover);
});
siteNav?.addEventListener('pointerleave', () => { navHover = null; placeIndicator(); });
siteNav?.addEventListener('focusout', event => {
  if (!siteNav.contains(event.relatedTarget)) { navHover = null; placeIndicator(); }
});
reducedMotion.addEventListener('change', refreshMotionPreference);
precisePointer.addEventListener('change', refreshMotionPreference);
document.fonts.ready.then(() => { measureRail(); placeIndicator(); });
processList?.classList.add('is-tracking');
initializeControls();
document.documentElement.classList.add('nav-ready');
window.addEventListener('error', releaseReveals);
try { initializeReveals(); } catch (error) { releaseReveals(); console.error(error); }
measureRail();
queueScroll();

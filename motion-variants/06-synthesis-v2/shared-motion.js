(function () {
  const { gsap, ScrollTrigger } = window;

  if (!gsap || !ScrollTrigger) {
    document.documentElement.classList.add('motion-fallback');
    console.warn('[motion] GSAP or ScrollTrigger failed to load; content remains visible.');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  gsap.config({ nullTargetWarn: false });

  const body = document.body;
  const page = body.dataset.motionPage || 'portal';
  const variant = body.dataset.motionVariant || 'synthesis';
  const progress = document.querySelector('.progress');
  const navLinks = Array.from(document.querySelectorAll('.dock a, .mini-dock a, .rail-nav a'));
  const sections = Array.from(document.querySelectorAll('section[id], footer[id]'));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const variantProfiles = {
    editorial: { y: 34, duration: 0.78, stagger: 0.075, start: 'top 99%', ease: 'power3.out', heroY: 42 },
    os: { y: 24, duration: 0.54, stagger: 0.052, start: 'top 99%', ease: 'power2.out', heroY: 28 },
    kinetic: { y: 46, duration: 0.66, stagger: 0.045, start: 'top 99%', ease: 'power4.out', heroY: 56 },
    diagram: { y: 28, duration: 0.62, stagger: 0.055, start: 'top 99%', ease: 'power3.out', heroY: 30 },
    luxury: { y: 22, duration: 0.68, stagger: 0.06, start: 'top 99%', ease: 'power2.out', heroY: 24 },
    synthesis: { y: 36, duration: 0.72, stagger: 0.06, start: 'top 99%', ease: 'power4.out', heroY: 42 },
  };
  const profile = variantProfiles[variant] || variantProfiles.synthesis;

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function setProgress(value) {
    if (!progress) return;
    progress.style.transform = `scaleX(${clamp(value, 0, 100) / 100})`;
  }

  function isBelowViewport(element, ratio = 0.96) {
    return element.getBoundingClientRect().top > window.innerHeight * ratio;
  }

  function setVisible(targets) {
    gsap.set(targets, {
      autoAlpha: 1,
      x: 0,
      y: 0,
      scale: 1,
      clearProps: 'visibility,clipPath,willChange',
    });
  }

  function setActiveNav(id) {
    const hash = `#${id}`;
    navLinks.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === hash);
    });
  }

  function setupProgress() {
    if (progress) {
      progress.style.width = '100%';
      progress.style.transformOrigin = 'left center';
      setProgress(0);
    }

    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => setProgress(self.progress * 100),
    });
  }

  function setupNavigation() {
    if (sections[0]) setActiveNav(sections[0].id);

    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: section.id === 'hero' || section.id === 'summary' ? 'top top' : 'top 48%',
        end: 'bottom 48%',
        onEnter: () => setActiveNav(section.id),
        onEnterBack: () => setActiveNav(section.id),
      });
    });
  }

  function revealElement(element, options = {}) {
    if (!element) return;
    const y = options.y ?? profile.y;
    const duration = options.duration ?? profile.duration;
    const ease = options.ease || profile.ease;
    const start = options.start || profile.start;
    const delay = options.delay || 0;
    const scale = options.scale || 1;
    const clip = options.clip || false;

    if (reduceMotion || !isBelowViewport(element)) {
      setVisible(element);
      return;
    }

    const fromVars = {
      autoAlpha: 0,
      y,
      scale,
      willChange: 'transform, opacity',
    };
    const toVars = {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration,
      delay,
      ease,
      overwrite: 'auto',
      onComplete: () => gsap.set(element, { clearProps: 'willChange,visibility,clipPath' }),
    };

    if (clip) {
      fromVars.clipPath = 'inset(0% 0% 100% 0%)';
      toVars.clipPath = 'inset(0% 0% 0% 0%)';
    }

    gsap.set(element, fromVars);

    let played = false;
    const play = () => {
      if (played) return;
      played = true;
      gsap.to(element, toVars);
    };

    ScrollTrigger.create({
      trigger: element,
      start,
      once: true,
      onEnter: play,
      onEnterBack: play,
      onRefresh: () => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight * 1.04 && rect.bottom > 0) play();
      },
    });
  }

  function revealGroup(elements, options = {}) {
    const items = Array.from(elements || []).filter(Boolean);
    items.forEach((element, index) => {
      revealElement(element, {
        ...options,
        delay: isBelowViewport(element) ? index * (options.stagger ?? profile.stagger) : 0,
      });
    });
  }

  /* V2 Enhancement: ScrollTrigger.batch() for coordinated card reveals */
  function setupBatchReveals() {
    const batchTargets = document.querySelectorAll('.work-item, .resume-card, .project-card, .job');
    if (!batchTargets.length || reduceMotion) return;

    const belowItems = Array.from(batchTargets).filter(el => isBelowViewport(el));
    if (!belowItems.length) return;

    gsap.set(belowItems, { autoAlpha: 0, y: profile.y, scale: 0.985, willChange: 'transform, opacity' });

    ScrollTrigger.batch(belowItems, {
      interval: 0.1,
      batchMax: 4,
      start: 'top 88%',
      onEnter: (batch) => {
        gsap.to(batch, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: profile.duration,
          ease: profile.ease,
          stagger: 0.08,
          overwrite: 'auto',
          onComplete: function () {
            gsap.set(this.targets(), { clearProps: 'willChange,visibility' });
          },
        });
      },
    });
  }

  /* V2 Enhancement: GSAP-driven hover transform (replaces CSS top) */
  function setupHoverTransform() {
    if (reduceMotion) return;
    const hoverTargets = document.querySelectorAll(
      '.work-item, .resume-card, .profile-card, .signal-panel, .job, .project-card, .rail-card, .flow-step, .cap, .edu-card'
    );

    hoverTargets.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        gsap.to(el, { y: -4, duration: 0.28, ease: 'power2.out', overwrite: 'auto' });
      });
      el.addEventListener('mouseleave', () => {
        gsap.to(el, { y: 0, duration: 0.36, ease: 'power2.out', overwrite: 'auto' });
      });
    });
  }

  function setupGenericReveals() {
    const generic = Array.from(document.querySelectorAll('.reveal')).filter((target) => {
      return !target.closest('.hero')
        && !target.matches('.model, .flow, .cap-grid, .edu-grid, .cert-list, .resume-card');
    });

    revealGroup(generic, {
      y: profile.y,
      duration: profile.duration,
      start: profile.start,
      stagger: profile.stagger,
      clip: false,
    });
  }

  function setupPortalHero() {
    const hero = document.querySelector('.hero');
    const heroMain = document.querySelector('.hero-main');
    const heroAside = document.querySelector('.hero-aside');
    const cue = document.querySelector('.scroll-cue');
    if (!hero || !heroMain || !heroAside) return;

    if (reduceMotion || window.scrollY > hero.offsetHeight * 0.45) {
      setVisible([heroMain, heroAside, cue]);
      return;
    }

    const title = heroMain.querySelector('h1');
    const introItems = [
      ...heroMain.querySelectorAll('.hero-eyebrow span'),
      title,
      heroMain.querySelector('.hero-role'),
      heroMain.querySelector('.hero-copy'),
      ...heroMain.querySelectorAll('.hero-actions .btn'),
    ].filter(Boolean);

    gsap.set([heroMain, heroAside, cue], { autoAlpha: 1 });
    gsap.set(introItems, { autoAlpha: 0, y: profile.heroY });
    gsap.set(heroAside, { autoAlpha: 0, x: 34, y: 16, scale: 0.986 });
    gsap.set(cue, { autoAlpha: 0, y: 10 });

    gsap.timeline({ defaults: { ease: profile.ease } })
      .to(introItems, {
        autoAlpha: 1,
        y: 0,
        duration: variant === 'luxury' ? 0.92 : 0.68,
        stagger: variant === 'kinetic' ? 0.055 : 0.045,
      }, 0.05)
      .to(heroAside, { autoAlpha: 1, x: 0, y: 0, scale: 1, duration: 0.72 }, 0.2)
      .to(cue, { autoAlpha: 1, y: 0, duration: 0.42 }, 0.62);
  }

  function setupResumeHero() {
    const hero = document.querySelector('.hero');
    const heroCopy = hero?.querySelector('.hero > .reveal');
    const profileCard = hero?.querySelector('.profile-card');
    const metrics = profileCard?.querySelectorAll('.metric');
    if (!hero || !heroCopy || !profileCard) return;

    if (reduceMotion || window.scrollY > hero.offsetHeight * 0.45) {
      setVisible([heroCopy, profileCard, metrics]);
      return;
    }

    const copyItems = [
      heroCopy.querySelector('.kicker'),
      heroCopy.querySelector('h1'),
      heroCopy.querySelector('.role'),
      heroCopy.querySelector('.lede'),
      heroCopy.querySelector('.contact-row'),
    ].filter(Boolean);

    gsap.set([heroCopy, profileCard], { autoAlpha: 1 });
    gsap.set(copyItems, { autoAlpha: 0, y: profile.heroY * 0.75 });
    gsap.set(profileCard, { autoAlpha: 0, x: 28, y: 8, scale: 0.988 });
    gsap.set(metrics, { autoAlpha: 0, y: 14 });

    gsap.timeline({ defaults: { ease: profile.ease } })
      .to(copyItems, { autoAlpha: 1, y: 0, duration: 0.58, stagger: 0.055 }, 0.04)
      .to(profileCard, { autoAlpha: 1, x: 0, y: 0, scale: 1, duration: 0.68 }, 0.18)
      .to(metrics, { autoAlpha: 1, y: 0, duration: 0.38, stagger: 0.045 }, 0.44);
  }

  function setupWorkAccordion() {
    document.querySelectorAll('.work-trigger').forEach((trigger) => {
      const panel = document.getElementById(trigger.getAttribute('aria-controls'));
      const inner = panel?.querySelector('.work-panel-inner');
      if (!panel || !inner) return;

      trigger.addEventListener('click', () => {
        const willOpen = trigger.getAttribute('aria-expanded') !== 'true';
        trigger.setAttribute('aria-expanded', String(willOpen));
        panel.classList.toggle('is-open', willOpen);
        window.setTimeout(() => ScrollTrigger.refresh(), 460);

        if (!willOpen || reduceMotion) return;

        gsap.fromTo(
          inner.querySelectorAll('.case-copy p, .case-pill'),
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.42, ease: 'power2.out', stagger: 0.045, overwrite: 'auto' }
        );
      });
    });
  }

  function setupModelDiagram() {
    const model = document.querySelector('.model');
    if (!model) return;

    const core = model.querySelector('.model-core');
    const nodes = model.querySelectorAll('.node');

    if (reduceMotion || !isBelowViewport(model, 0.94)) {
      setVisible(model);
      gsap.set([core, nodes], { autoAlpha: 1, clearProps: 'visibility,willChange' });
      return;
    }

    gsap.set(model, { autoAlpha: 0, y: profile.y * 0.7, willChange: 'transform, opacity' });
    gsap.set(core, { autoAlpha: 0, scale: 0.88, willChange: 'transform, opacity' });
    gsap.set(nodes, { autoAlpha: 0, y: 18, scale: 0.975, willChange: 'transform, opacity' });

    let played = false;
    const play = () => {
      if (played) return;
      played = true;
      gsap.timeline({ defaults: { ease: profile.ease } })
        .to(model, { autoAlpha: 1, y: 0, duration: 0.5, clearProps: 'willChange,visibility' }, 0)
        .to(core, { autoAlpha: 1, scale: 1, duration: 0.54, clearProps: 'willChange,visibility' }, 0.08)
        .to(nodes, { autoAlpha: 1, y: 0, scale: 1, duration: 0.46, stagger: 0.055, clearProps: 'willChange,visibility' }, 0.18);
    };

    ScrollTrigger.create({
      trigger: model,
      start: 'top 99%',
      once: true,
      onEnter: play,
      onEnterBack: play,
      onRefresh: () => {
        const rect = model.getBoundingClientRect();
        if (rect.top < window.innerHeight * 1.04 && rect.bottom > 0) play();
      },
    });
  }

  function setupPortalSections() {
    setupModelDiagram();
    /* V2: resume-card reveal now handled by setupBatchReveals */
  }

  function setupResumeSections() {
    document.querySelectorAll('.cap-grid, .edu-grid, .cert-list').forEach((grid) => {
      revealGroup(grid.children, {
        y: profile.y * 0.55,
        scale: 0.99,
        duration: 0.48,
        start: 'top 88%',
        stagger: 0.04,
      });
    });

    const flow = document.querySelector('.flow');
    if (flow) {
      revealGroup(flow.querySelectorAll('.flow-step'), {
        y: 0,
        scale: 1,
        duration: 0.42,
        start: 'top 88%',
        stagger: 0.045,
      });
    }
  }

  function setupVariantInteractions() {
    if (variant === 'os' || variant === 'synthesis') {
      document.querySelectorAll('.work-item, .resume-card, .project-card').forEach((card) => {
        card.addEventListener('mouseenter', () => body.classList.add('is-inspecting'));
        card.addEventListener('mouseleave', () => body.classList.remove('is-inspecting'));
      });
    }

    if (variant === 'diagram' || variant === 'synthesis') {
      const nodes = document.querySelectorAll('.node');
      document.querySelectorAll('.work-item').forEach((item, index) => {
        item.addEventListener('mouseenter', () => nodes[index % nodes.length]?.classList.add('is-linked'));
        item.addEventListener('mouseleave', () => nodes[index % nodes.length]?.classList.remove('is-linked'));
      });
    }
  }

  function setupMotion() {
    body.classList.add('motion-ready');
    setupProgress();
    setupNavigation();

    setupGenericReveals();
    setupBatchReveals();
    setupHoverTransform();

    if (page === 'portal') {
      setupPortalHero();
      setupWorkAccordion();
      setupPortalSections();
    } else {
      setupResumeHero();
      setupResumeSections();
    }
    setupVariantInteractions();

    ScrollTrigger.refresh();
    if (document.fonts?.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
    window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupMotion, { once: true });
  } else {
    setupMotion();
  }
})();

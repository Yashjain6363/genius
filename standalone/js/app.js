/* Main app — no npm required */
document.addEventListener('DOMContentLoaded', () => {
  // Loader
  const loader = document.getElementById('loader');
  let progress = 0;
  const bar = document.querySelector('.loader-bar');
  const loadInterval = setInterval(() => {
    progress += 8 + Math.random() * 10;
    if (progress >= 100) {
      progress = 100;
      clearInterval(loadInterval);
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.classList.add('loaded');
        openDoors();
        setTimeout(() => {
          if (window.initHero3D) initHero3D();
          showFloatingPhotos();
        }, 1500);
      }, 400);
    }
    if (bar) bar.style.width = progress + '%';
  }, 100);

  // Portal doors
  function openDoors() {
    document.querySelector('.door-left')?.classList.add('open');
    document.querySelector('.door-right')?.classList.add('open');
  }

  // Floating polaroids in hero
  function showFloatingPhotos() {
    const container = document.getElementById('floating-photos');
    if (!container) return;
    const picks = GALLERY.slice(1, 6);
    const positions = [
      { l: '8%', t: '18%', r: -8, s: 130 },
      { l: '78%', t: '22%', r: 6, s: 115 },
      { l: '5%', t: '58%', r: -4, s: 105 },
      { l: '82%', t: '52%', r: 10, s: 120 },
      { l: '42%', t: '72%', r: -6, s: 100 },
    ];
    picks.forEach((img, i) => {
      const p = positions[i];
      const el = document.createElement('div');
      el.className = 'float-photo';
      el.style.cssText = `left:${p.l};top:${p.t};width:${p.s}px;transform:rotate(${p.r}deg);animation-delay:${i * 0.3}s`;
      el.innerHTML = `<img src="${img.src}" alt="${img.title}" loading="lazy"><span>${img.title}</span>`;
      container.appendChild(el);
    });
    container.classList.add('visible');

    document.addEventListener('mousemove', (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      container.querySelectorAll('.float-photo').forEach((el, i) => {
        const depth = 0.02 + i * 0.01;
        el.style.marginLeft = dx * depth * -60 + 'px';
        el.style.marginTop = dy * depth * -60 + 'px';
      });
    });
  }

  // Headline word animation
  document.querySelectorAll('.headline-word').forEach((w, i) => {
    w.style.animationDelay = 2.2 + i * 0.12 + 's';
  });

  // Build courses
  const courseGrid = document.getElementById('course-grid');
  if (courseGrid) {
    COURSES.forEach((c) => {
      const card = document.createElement('article');
      card.className = 'course-card';
      card.innerHTML = `
        <span class="course-emoji">${c.emoji}</span>
        <h3 style="color:${c.color}">${c.name}</h3>
        <p>${c.tagline}</p>
        <div class="tags">${c.programs.map((p) => `<span>${p}</span>`).join('')}</div>`;
      courseGrid.appendChild(card);
    });
  }

  // Build gallery
  const galleryGrid = document.getElementById('gallery-grid');
  if (galleryGrid) {
    GALLERY.forEach((g, i) => {
      const rot = [-4, 3, -2, 5, -3, 2, -5, 4, -1][i];
      const item = document.createElement('div');
      item.className = 'polaroid';
      item.style.transform = `rotate(${rot}deg)`;
      item.innerHTML = `<img src="${g.src}" alt="${g.title}" loading="lazy"><p>${g.title}</p>`;
      item.addEventListener('click', () => openLightbox(g));
      galleryGrid.appendChild(item);
    });
  }

  // Lightbox
  const lightbox = document.getElementById('lightbox');
  function openLightbox(g) {
    if (!lightbox) return;
    lightbox.querySelector('img').src = g.src;
    lightbox.querySelector('h3').textContent = g.title;
    lightbox.querySelector('p').textContent = g.caption;
    lightbox.classList.add('active');
  }
  lightbox?.querySelector('.lb-close')?.addEventListener('click', () => lightbox.classList.remove('active'));
  lightbox?.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.classList.remove('active'); });

  // Nav scroll
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    nav?.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // Mobile menu
  const menuBtn = document.querySelector('.menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  menuBtn?.addEventListener('click', () => mobileNav?.classList.toggle('open'));

  // Magnetic buttons
  document.querySelectorAll('.btn-magnetic').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });

  // Scroll reveal
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('revealed'); }),
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

  // Scroll progress
  const prog = document.querySelector('.scroll-progress');
  window.addEventListener('scroll', () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    if (prog && h > 0) prog.style.transform = `scaleX(${window.scrollY / h})`;
  }, { passive: true });

  // WhatsApp link
  const wa = document.querySelector('.btn-whatsapp');
  if (wa) {
    wa.href = `https://wa.me/91${PHONES[0]}?text=${encodeURIComponent("Hi! I'd like to book a free counselling session at VidhiDiya's Child Genius Academy.")}`;
  }
});

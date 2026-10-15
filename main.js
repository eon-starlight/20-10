document.addEventListener('DOMContentLoaded', () => {
  const introOverlay = document.getElementById('intro-overlay');
  const btnOpenSite = document.getElementById('btn-open-site');

  if (btnOpenSite && introOverlay) {
    btnOpenSite.addEventListener('click', () => {
      for (let i = 0; i < 16; i++) {
        setTimeout(() => {
          const rect = btnOpenSite.getBoundingClientRect();
          const heart = document.createElement('div');
          heart.className = 'click-heart';
          const icons = ['🌸', '💖', '🌹', '✨', '💐', '💕'];
          heart.textContent = icons[Math.floor(Math.random() * icons.length)];
          heart.style.fontSize = Math.floor(Math.random() * 14 + 20) + 'px';
          heart.style.left = (rect.left + rect.width / 2 + (Math.random() - 0.5) * 160) + 'px';
          heart.style.top = (rect.top + (Math.random() - 0.5) * 60) + 'px';
          document.body.appendChild(heart);
          setTimeout(() => heart.remove(), 1200);
        }, i * 35);
      }

      introOverlay.classList.add('fade-out');
      document.body.classList.remove('intro-locked');

      setTimeout(() => {
        introOverlay.style.display = 'none';
      }, 700);
    });
  }

  const mirrorForm = document.getElementById('mirror-form');
  const mirrorInputName = document.getElementById('mirror-input-name');
  const mirrorScanning = document.getElementById('mirror-scanning');
  const mirrorResult = document.getElementById('mirror-result');
  const mirrorResName = document.getElementById('mirror-res-name');
  const mirrorResTitle = document.getElementById('mirror-res-title');
  const mirrorResBadge = document.getElementById('mirror-res-badge');
  const mirrorResDesc = document.getElementById('mirror-res-desc');

  if (mirrorForm) {
    mirrorForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const rawName = mirrorInputName.value.trim();
      if (!rawName) return;

      mirrorResult.style.display = 'none';
      mirrorScanning.style.display = 'block';

      setTimeout(() => {
        mirrorScanning.style.display = 'none';

        if (typeof magicTitles !== 'undefined' && magicTitles.length > 0) {
          let hash = 0;
          for (let i = 0; i < rawName.length; i++) {
            hash = rawName.charCodeAt(i) + ((hash << 5) - hash);
          }
          const index = Math.abs(hash) % magicTitles.length;
          const award = magicTitles[index];

          mirrorResName.textContent = `Tặng Bạn: ${rawName} 💖`;
          mirrorResTitle.textContent = award.title;
          mirrorResBadge.textContent = award.badge;
          mirrorResDesc.textContent = award.desc;

          mirrorResult.style.display = 'block';
        }
      }, 750);
    });
  }

  const fortuneTrigger = document.getElementById('fortune-trigger');
  const fortuneTitle = document.getElementById('fortune-title');
  const fortuneContent = document.getElementById('fortune-content');
  const fortuneCard = document.getElementById('fortune-card');

  let isFortuneDrawing = false;

  if (fortuneTrigger) {
    function handleDrawFortune() {
      if (isFortuneDrawing) return;
      if (typeof luckyFortunes !== 'undefined' && luckyFortunes.length > 0) {
        isFortuneDrawing = true;

        fortuneTrigger.classList.remove('drawing');
        void fortuneTrigger.offsetWidth;
        fortuneTrigger.classList.add('drawing');

        const rect = fortuneTrigger.getBoundingClientRect();
        for (let i = 0; i < 7; i++) {
          setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'click-heart';
            const icons = ['✨', '🧧', '🌸', '💖', '🥠', '⭐'];
            heart.textContent = icons[Math.floor(Math.random() * icons.length)];
            heart.style.fontSize = Math.floor(Math.random() * 8 + 18) + 'px';
            heart.style.left = (rect.left + rect.width / 2 + (Math.random() - 0.5) * 80) + 'px';
            heart.style.top = (rect.top + rect.height / 2 + (Math.random() - 0.5) * 60) + 'px';
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 1100);
          }, i * 35);
        }

        if (fortuneCard) {
          fortuneCard.classList.remove('revealing');
          void fortuneCard.offsetWidth;
          fortuneCard.classList.add('revealing');
        }

        const fortuneIndex = Math.floor(Math.random() * luckyFortunes.length);
        const fortune = luckyFortunes[fortuneIndex];

        setTimeout(() => {
          fortuneTitle.innerHTML = `<span>${fortune.icon}</span> <span>${fortune.type}</span>`;
          fortuneContent.textContent = fortune.content;
          isFortuneDrawing = false;
        }, 160);
      }
    }

    fortuneTrigger.addEventListener('click', handleDrawFortune);
    fortuneTrigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleDrawFortune();
      }
    });
  }

  const polaroidGallery = document.getElementById('polaroid-gallery');
  if (polaroidGallery && typeof galleryItems !== 'undefined') {
    polaroidGallery.innerHTML = galleryItems.map((item, index) => `
      <div class="polaroid-card reveal-on-scroll" data-index="${index}">
        <div class="polaroid-img-wrapper">
          <img 
            src="${item.img}" 
            alt="${item.title}" 
            class="polaroid-img"
            loading="lazy"
          >
          <div class="polaroid-overlay">
            <span class="polaroid-zoom-hint">🔍 Nhấp để xem ảnh to</span>
          </div>
        </div>
        <div class="polaroid-caption-area">
          <div class="polaroid-tag">${item.tag}</div>
          <div class="polaroid-title">${item.title}</div>
          <p class="polaroid-desc">${item.desc}</p>
        </div>
      </div>
    `).join('');
  }

  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxQuote = document.getElementById('lightbox-quote');
  const lightboxClose = document.getElementById('lightbox-close');

  if (polaroidGallery) {
    polaroidGallery.addEventListener('click', (e) => {
      const card = e.target.closest('.polaroid-card');
      if (!card) return;
      const idx = card.getAttribute('data-index');
      if (typeof galleryItems !== 'undefined' && galleryItems[idx]) {
        const data = galleryItems[idx];
        lightboxImg.src = data.img;
        lightboxImg.alt = data.title;
        lightboxTitle.textContent = data.title;
        lightboxQuote.textContent = `"${data.quote}"`;
        lightboxModal.classList.add('active');
      }
    });
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      lightboxModal.classList.remove('active');
    });
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.remove('active');
      }
    });
  }

  const STORAGE_KEY = 'community_wall_wishes_2010';
  const wallGrid = document.getElementById('wall-grid');
  const wallForm = document.getElementById('wall-form');
  const wallNameInput = document.getElementById('wall-name');
  const wallMsgInput = document.getElementById('wall-msg');
  const wallSubmitBtn = wallForm ? wallForm.querySelector('button[type="submit"]') : null;

  try {
    const isUrlClear = window.location.search.includes('clear');
    if (isUrlClear) {
      localStorage.removeItem(STORAGE_KEY);
      history.replaceState(null, '', window.location.pathname);
    }
  } catch (e) {}

  function getSavedWishes() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveWishes(wishes) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
    } catch (e) {}
  }

  let currentWishes = getSavedWishes();

  function renderWall(wishesList) {
    if (!wallGrid) return;
    const wishes = wishesList !== undefined ? wishesList : currentWishes;

    if (!wishes || wishes.length === 0) {
      wallGrid.innerHTML = `
        <div class="wall-empty-state">
          🌸 Bức tường hoa đang chờ đón lời nhắn đầu tiên! Hãy để lại lời chúc ngọt ngào gửi tặng Mẹ, Cô giáo hoặc bạn nữ nhé.
        </div>
      `;
      return;
    }

    wallGrid.innerHTML = wishes.map(item => `
      <div class="wall-sticky-card">
        <div class="wall-card-author">🌸 ${escapeHtml(item.author || 'Bạn ẩn danh')}</div>
        <p class="wall-card-content">${escapeHtml(item.content || '')}</p>
        <div class="wall-card-time">${escapeHtml(item.time || '')}</div>
      </div>
    `).join('');
  }

  renderWall(currentWishes);

  async function loadCloudflareWishes() {
    try {
      const res = await fetch('/api/wishes', {
        headers: { 'Cache-Control': 'no-cache' }
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          currentWishes = data;
          saveWishes(data);
          renderWall(currentWishes);
        }
      }
    } catch (err) {}
  }

  loadCloudflareWishes();
  setInterval(loadCloudflareWishes, 20000);

  if (wallForm && wallGrid) {
    wallForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const author = wallNameInput.value.trim();
      const message = wallMsgInput.value.trim();

      if (!author || !message) return;

      const now = new Date();
      const timeStr = `${now.toLocaleDateString('vi-VN')} lúc ${now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}`;

      const tempWish = {
        id: Date.now(),
        author: author,
        content: message,
        time: timeStr
      };

      if (wallSubmitBtn) {
        wallSubmitBtn.disabled = true;
        wallSubmitBtn.innerHTML = '<span>Đang gửi... 🌸</span>';
      }

      try {
        const res = await fetch('/api/wishes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            author: author,
            content: message,
            time: timeStr
          })
        });

        if (res.ok) {
          const resData = await res.json();
          const savedWish = resData.wish || tempWish;
          currentWishes = [savedWish, ...currentWishes.filter(w => w.id !== savedWish.id)];
          saveWishes(currentWishes);
          renderWall(currentWishes);
          wallForm.reset();
        } else {
          currentWishes.unshift(tempWish);
          saveWishes(currentWishes);
          renderWall(currentWishes);
          wallForm.reset();
        }
      } catch (err) {
        currentWishes.unshift(tempWish);
        saveWishes(currentWishes);
        renderWall(currentWishes);
        wallForm.reset();
      } finally {
        if (wallSubmitBtn) {
          wallSubmitBtn.disabled = false;
          wallSubmitBtn.innerHTML = '<span>Gửi Lên Bảng 🌸</span>';
        }
      }
    });
  }

  window.addEventListener('click', (e) => {
    if (e.target.closest('button') || e.target.closest('input')) return;

    const heart = document.createElement('div');
    heart.className = 'click-heart';
    const icons = ['🌸', '💖', '🌹', '✨', '💕', '🌻'];
    heart.textContent = icons[Math.floor(Math.random() * icons.length)];
    heart.style.fontSize = Math.floor(Math.random() * 14 + 18) + 'px';
    heart.style.left = e.clientX + 'px';
    heart.style.top = e.clientY + 'px';
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 1200);
  });

  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  let isAutoScrolling = false;
  window.addEventListener('wheel', () => { isAutoScrolling = false; }, { passive: true });
  window.addEventListener('touchstart', () => { isAutoScrolling = false; }, { passive: true });

  function customSmoothScroll(targetY, duration = 800) {
    const startY = window.pageYOffset || document.documentElement.scrollTop;
    const diff = targetY - startY;
    let startTime = null;
    isAutoScrolling = true;

    function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }

    function step(currentTime) {
      if (!isAutoScrolling) return;
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const ease = easeInOutCubic(progress);
      window.scrollTo(0, startY + diff * ease);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        isAutoScrolling = false;
      }
    }

    window.requestAnimationFrame(step);
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const navHeight = navbar ? navbar.offsetHeight : 70;
          const targetY = targetId === '#hero' 
            ? 0 
            : targetElement.getBoundingClientRect().top + window.pageYOffset - (navHeight - 12);
          
          customSmoothScroll(targetY, 800);

          if (navMenu) navMenu.classList.remove('active');
          if (window.history && window.history.replaceState) {
            window.history.replaceState(null, null, window.location.pathname);
          }
        }
      }
    });
  });

  if (window.location.hash) {
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, null, window.location.pathname);
    }
  }

  let scrollTicking = false;
  function handleOptimizedScroll() {
    const currentScroll = window.pageYOffset;

    if (navbar) {
      if (currentScroll > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    const scrollPos = currentScroll + 140;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(() => {
        handleOptimizedScroll();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }, { passive: true });

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (lightboxModal) lightboxModal.classList.remove('active');
    }
  });

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
});

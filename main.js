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

      showToast("Chào mừng bạn đến với không gian yêu thương 20/10! 🌹");
    });
  }

  const toastEl = document.getElementById('toast-msg');
  const toastText = document.getElementById('toast-text');

  function showToast(message) {
    if (!toastEl || !toastText) return;
    toastText.innerText = message;
    toastEl.classList.add('show');
    setTimeout(() => {
      toastEl.classList.remove('show');
    }, 2500);
  }

  const mirrorForm = document.getElementById('mirror-form');
  const mirrorInputName = document.getElementById('mirror-input-name');
  const mirrorScanning = document.getElementById('mirror-scanning');
  const mirrorResult = document.getElementById('mirror-result');
  const mirrorResName = document.getElementById('mirror-res-name');
  const mirrorResTitle = document.getElementById('mirror-res-title');
  const mirrorResBadge = document.getElementById('mirror-res-badge');
  const mirrorResDesc = document.getElementById('mirror-res-desc');
  const mirrorResPrivilege = document.getElementById('mirror-res-privilege');

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
          mirrorResPrivilege.innerHTML = `🎁 <strong>Đặc quyền 20/10:</strong> ${award.privilege.replace("Đặc quyền 20/10: ", "")}`;

          mirrorResult.style.display = 'block';
          showToast(`Gương thần đã phong tặng danh hiệu cho ${rawName}! ✨`);
        }
      }, 750);
    });
  }

  const fortuneTrigger = document.getElementById('fortune-trigger');
  const fortuneTitle = document.getElementById('fortune-title');
  const fortuneContent = document.getElementById('fortune-content');

  if (fortuneTrigger) {
    fortuneTrigger.addEventListener('click', () => {
      if (typeof luckyFortunes !== 'undefined' && luckyFortunes.length > 0) {
        fortuneTrigger.style.transform = 'scale(0.92) rotate(-5deg)';
        setTimeout(() => {
          fortuneTrigger.style.transform = '';
        }, 200);

        const fortuneIndex = Math.floor(Math.random() * luckyFortunes.length);
        const fortune = luckyFortunes[fortuneIndex];

        fortuneTitle.innerHTML = `<span>${fortune.icon}</span> <span>${fortune.type}</span>`;
        fortuneContent.textContent = fortune.content;

        showToast(`Bạn vừa rút được: ${fortune.type}! 🥠`);
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

  const RESET_VERSION_KEY = 'community_wall_reset_v1';
  const STORAGE_KEY = 'community_wall_wishes_2010';
  const wallGrid = document.getElementById('wall-grid');
  const wallForm = document.getElementById('wall-form');
  const wallNameInput = document.getElementById('wall-name');
  const wallMsgInput = document.getElementById('wall-msg');

  try {
    const isUrlClear = window.location.search.includes('clear');
    if (!localStorage.getItem(RESET_VERSION_KEY) || isUrlClear) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.setItem(RESET_VERSION_KEY, 'done');
      if (isUrlClear) {
        history.replaceState(null, '', window.location.pathname);
      }
    }
  } catch (e) {}

  window.clearAllWishes = function() {
    try {
      localStorage.removeItem(STORAGE_KEY);
      renderWall();
      showToast("Đã xóa sạch toàn bộ lời chúc trong cơ sở dữ liệu! 🌸");
    } catch (e) {}
  };

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

  function renderWall() {
    if (!wallGrid) return;
    const wishes = getSavedWishes();

    if (wishes.length === 0) {
      wallGrid.innerHTML = `
        <div class="wall-empty-state">
          🌸 Bức tường hoa đang chờ đón lời nhắn đầu tiên! Hãy để lại lời chúc ngọt ngào gửi tặng Mẹ, Cô giáo hoặc bạn nữ nhé.
        </div>
      `;
      return;
    }

    wallGrid.innerHTML = wishes.map(item => `
      <div class="wall-sticky-card">
        <div class="wall-card-author">🌸 ${escapeHtml(item.author)}</div>
        <p class="wall-card-content">${escapeHtml(item.content)}</p>
        <div class="wall-card-time">${escapeHtml(item.time)}</div>
      </div>
    `).join('');
  }

  renderWall();

  if (wallForm && wallGrid) {
    wallForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const author = wallNameInput.value.trim();
      const message = wallMsgInput.value.trim();

      if (!author || !message) return;

      const now = new Date();
      const timeStr = `${now.toLocaleDateString('vi-VN')} lúc ${now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}`;

      const newWish = {
        id: Date.now(),
        author: author,
        content: message,
        time: timeStr
      };

      const wishes = getSavedWishes();
      wishes.unshift(newWish);
      saveWishes(wishes);

      renderWall();
      wallForm.reset();
      showToast("Lời chúc của bạn đã được lưu giữ vĩnh viễn trên bức tường! 💐");
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

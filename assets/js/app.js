// ============================================================
//  DON BOSCO SKILL MISSION BANGALORE
//  Main JavaScript — app.js  v2.1
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ────────────────────────────────
     0. DYNAMIC CATEGORY WELCOME TOAST NOTIFICATION
  ──────────────────────────────── */
  let toastContainer = document.querySelector('.welcome-toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'welcome-toast-container';
    document.body.appendChild(toastContainer);
  }

  let activeToastTimeout = null;

  function showCategoryWelcomeToast(categoryName, icon = '✨', theme = {}) {
    if (!categoryName) return;

    const primary = theme.primary || '#009e97';
    const accent  = theme.accent || '#2dc7bf';
    const bg      = theme.bg || 'rgba(10, 38, 36, 0.94)';
    const border  = theme.border || 'rgba(45, 199, 191, 0.55)';
    const glow    = theme.glow || 'rgba(0, 158, 151, 0.4)';

    // Remove existing toast if any
    const existing = toastContainer.querySelector('.welcome-toast');
    if (existing) {
      existing.classList.remove('show');
      setTimeout(() => existing.remove(), 150);
    }
    if (activeToastTimeout) clearTimeout(activeToastTimeout);

    const toast = document.createElement('div');
    toast.className = 'welcome-toast';
    toast.setAttribute('role', 'alert');
    toast.style.setProperty('--toast-primary', primary);
    toast.style.setProperty('--toast-accent', accent);
    toast.style.setProperty('--toast-bg', bg);
    toast.style.setProperty('--toast-border', border);
    toast.style.setProperty('--toast-glow', glow);

    toast.innerHTML = `
      <div class="welcome-toast-icon">${icon}</div>
      <div class="welcome-toast-content">
        <div class="welcome-toast-title">Welcome to ${categoryName}!</div>
        <div class="welcome-toast-subtitle">Don Bosco Skill Mission Bangalore</div>
      </div>
    `;

    toastContainer.appendChild(toast);
    
    // Force reflow for animation
    void toast.offsetWidth;
    toast.classList.add('show');

    activeToastTimeout = setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) toast.remove();
      }, 400);
    }, 3500);
  }

  // Make available globally if needed
  window.showCategoryWelcomeToast = showCategoryWelcomeToast;

  // Track categories and show welcome on click/open
  const categoryMap = {
    '#home': {
      name: 'Overview',
      icon: '🏠',
      primary: '#009e97',
      accent: '#2dc7bf',
      bg: 'rgba(10, 38, 36, 0.94)',
      border: 'rgba(45, 199, 191, 0.55)',
      glow: 'rgba(0, 158, 151, 0.4)'
    },
    '#about': {
      name: 'Our Legacy',
      icon: '🏛️',
      primary: '#2563eb',
      accent: '#60a5fa',
      bg: 'rgba(10, 24, 48, 0.94)',
      border: 'rgba(96, 165, 250, 0.55)',
      glow: 'rgba(37, 99, 235, 0.4)'
    },
    '#infrastructure': {
      name: 'Campus Hub',
      icon: '🏢',
      primary: '#d97706',
      accent: '#fbbf24',
      bg: 'rgba(42, 28, 10, 0.94)',
      border: 'rgba(251, 191, 36, 0.55)',
      glow: 'rgba(217, 119, 6, 0.4)'
    },
    '#team': {
      name: 'Leadership',
      icon: '👥',
      primary: '#7c3aed',
      accent: '#c084fc',
      bg: 'rgba(28, 14, 48, 0.94)',
      border: 'rgba(192, 132, 252, 0.55)',
      glow: 'rgba(124, 58, 237, 0.4)'
    },
    '#courses': {
      name: 'Skill Tracks',
      icon: '📚',
      primary: '#e11d48',
      accent: '#fb7185',
      bg: 'rgba(46, 12, 20, 0.94)',
      border: 'rgba(251, 113, 133, 0.55)',
      glow: 'rgba(225, 29, 72, 0.4)'
    },
    '#excellence': {
      name: 'Apex Hub',
      icon: '⭐',
      primary: '#059669',
      accent: '#34d399',
      bg: 'rgba(10, 38, 26, 0.94)',
      border: 'rgba(52, 211, 153, 0.55)',
      glow: 'rgba(5, 150, 105, 0.4)'
    },
    '#faq': {
      name: 'FAQ',
      icon: '❓',
      primary: '#0891b2',
      accent: '#38bdf8',
      bg: 'rgba(10, 34, 44, 0.94)',
      border: 'rgba(56, 189, 248, 0.55)',
      glow: 'rgba(8, 145, 178, 0.4)'
    },
    '#contact': {
      name: 'Connect',
      icon: '📞',
      primary: '#4f46e5',
      accent: '#818cf8',
      bg: 'rgba(20, 18, 48, 0.94)',
      border: 'rgba(129, 140, 248, 0.55)',
      glow: 'rgba(79, 70, 229, 0.4)'
    },
    '#register': {
      name: 'Free Registration',
      icon: '🚀',
      primary: '#ea580c',
      accent: '#ff8c42',
      bg: 'rgba(46, 20, 10, 0.94)',
      border: 'rgba(255, 140, 66, 0.55)',
      glow: 'rgba(234, 88, 12, 0.4)'
    },
    '#pathway-finder': {
      name: 'Skill Pathway Finder',
      icon: '🔮',
      primary: '#a855f7',
      accent: '#e879f9',
      bg: 'rgba(38, 14, 48, 0.94)',
      border: 'rgba(232, 121, 249, 0.55)',
      glow: 'rgba(168, 85, 247, 0.4)'
    }
  };

  let lastTriggeredCat = '';

  function updateActiveNavLink(hash, theme) {
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href === hash) {
        link.classList.add('cat-active');
        if (theme && theme.accent) {
          link.style.setProperty('--cat-accent', theme.accent);
          link.style.setProperty('--cat-glow', theme.glow);
        }
      } else {
        link.classList.remove('cat-active');
        link.style.removeProperty('--cat-accent');
        link.style.removeProperty('--cat-glow');
      }
    });
  }

  function handleCategoryTrigger(hash, customName, customIcon, customTheme) {
    let name = customName;
    let icon = customIcon || '✨';
    let theme = customTheme || {};

    if (hash && categoryMap[hash]) {
      name = name || categoryMap[hash].name;
      icon = customIcon || categoryMap[hash].icon;
      theme = categoryMap[hash];
    }

    if (hash) {
      updateActiveNavLink(hash, theme);
    }

    if (name && lastTriggeredCat !== name) {
      lastTriggeredCat = name;
      showCategoryWelcomeToast(name, icon, theme);
    }
  }

  // Listen to all nav links (Desktop & Mobile)
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && categoryMap[href]) {
        const cat = categoryMap[href];
        handleCategoryTrigger(href, cat.name, cat.icon, cat);
      }
    });
  });

  // Section Observer to trigger welcome on scroll into categories
  setTimeout(() => {
    const categorySections = document.querySelectorAll('section[id], header[id]');
    if ('IntersectionObserver' in window && categorySections.length) {
      let isInitialLoad = true;
      const catObserver = new IntersectionObserver((entries) => {
        if (isInitialLoad) {
          isInitialLoad = false;
          return;
        }
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = '#' + entry.target.id;
            if (categoryMap[id]) {
              handleCategoryTrigger(id, categoryMap[id].name, categoryMap[id].icon, categoryMap[id]);
            }
          }
        });
      }, { threshold: 0.45 });

      categorySections.forEach(sec => catObserver.observe(sec));
    }
  }, 1000);

  /* ────────────────────────────────
     1. NAVBAR & BACK TO TOP
  ──────────────────────────────── */
  const navbar  = document.getElementById('navbar');
  const backTop = document.getElementById('back-top');

  const onScroll = () => {
    const y = window.scrollY;
    if (navbar) navbar.classList.toggle('scrolled', y > 60);
    if (backTop) backTop.classList.toggle('show', y > 300);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  if (backTop) {
    backTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      showCategoryWelcomeToast('Overview', '🏠');
    });
  }

  /* ────────────────────────────────
     2. MOBILE DRAWER
  ──────────────────────────────── */
  const hamburger   = document.getElementById('hamburger');
  const drawer      = document.getElementById('mobile-drawer');
  const drawerClose = document.getElementById('drawer-close');
  const drawerApply = document.getElementById('drawer-apply');

  const openDrawer = () => {
    if (!drawer) return;
    drawer.style.display = 'flex';
    drawer.getBoundingClientRect(); // Force reflow
    drawer.classList.add('open');
    if (hamburger) {
      hamburger.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
    }
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    if (!drawer) return;
    drawer.classList.remove('open');
    if (hamburger) {
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
    document.body.style.overflow = '';
    setTimeout(() => {
      if (!drawer.classList.contains('open')) drawer.style.display = 'none';
    }, 560);
  };

  if (hamburger) hamburger.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerApply) drawerApply.addEventListener('click', closeDrawer);
  if (drawer) {
    drawer.querySelectorAll('.drawer-link').forEach(a => a.addEventListener('click', closeDrawer));
  }

  /* ────────────────────────────────
     3. TICKER DUPLICATION FOR CONTINUOUS LOOP
  ──────────────────────────────── */
  const ticker = document.getElementById('ticker-inner');
  if (ticker) ticker.innerHTML += ticker.innerHTML;

  /* ────────────────────────────────
     4. HERO DYNAMIC PARTICLES
  ──────────────────────────────── */
  const pContainer = document.getElementById('hero-particles');
  if (pContainer) {
    pContainer.style.cssText = 'position:absolute;inset:0;overflow:hidden;pointer-events:none;';
    for (let i = 0; i < 20; i++) {
      const p = document.createElement('div');
      const s = Math.random() * 45 + 12;
      p.style.cssText = `
        position:absolute;
        width:${s}px; height:${s}px;
        left:${Math.random()*100}%;
        border-radius:50%;
        background:rgba(0,158,151,${Math.random()*.12+.04});
        animation:float ${Math.random()*10+8}s linear -${Math.random()*15}s infinite;
      `;
      pContainer.appendChild(p);
    }

    if (!document.querySelector('#float-kf')) {
      const style = document.createElement('style');
      style.id = 'float-kf';
      style.textContent = `
        @keyframes float {
          0%   { transform:translateY(100vh) scale(0); opacity:0; }
          10%  { opacity:1; }
          90%  { opacity:1; }
          100% { transform:translateY(-5vh) scale(1); opacity:0; }
        }
      `;
      document.head.appendChild(style);
    }
  }

  /* ────────────────────────────────
     5. SCROLL REVEAL ANIMATIONS
  ──────────────────────────────── */
  const reveals = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 30);
          revealObs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.01, rootMargin: '50px 0px 50px 0px' }
  );
  reveals.forEach(el => revealObs.observe(el));

  // Guaranteed Failsafe: Ensure all reveal elements become visible
  setTimeout(() => {
    reveals.forEach(el => el.classList.add('visible'));
  }, 600);

  /* ────────────────────────────────
     6. COUNTER ANIMATIONS
  ──────────────────────────────── */
  const easeOut = t => 1 - Math.pow(1 - t, 4);

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const dur    = 2000;
    const start  = performance.now();

    const step = now => {
      const p = Math.min((now - start) / dur, 1);
      el.textContent = Math.round(easeOut(p) * target).toLocaleString() + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  const counterObs = new IntersectionObserver(
    entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          animateCounter(e.target);
          counterObs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  document.querySelectorAll('[data-target]').forEach(el => counterObs.observe(el));

  /* ────────────────────────────────
     7. DYNAMIC COURSE FILTERING & SEARCH
  ──────────────────────────────── */
  const filterBtns   = document.querySelectorAll('.filter-btn');
  const courseTiles  = document.querySelectorAll('.course-tile');
  const searchInput  = document.getElementById('course-search');
  const clearBtn     = document.getElementById('clear-search');
  const noResults    = document.getElementById('no-courses-found');
  const resetFilters = document.getElementById('reset-filters-btn');

  let currentCategory = 'all';
  let currentSearch   = '';

  function filterCourses() {
    let visibleCount = 0;

    courseTiles.forEach(tile => {
      const catMatch = currentCategory === 'all' || tile.dataset.category === currentCategory;
      const textContent = tile.textContent.toLowerCase();
      const searchMatch = !currentSearch || textContent.includes(currentSearch);

      if (catMatch && searchMatch) {
        tile.classList.remove('hidden');
        visibleCount++;
      } else {
        tile.classList.add('hidden');
      }
    });

    if (noResults) {
      if (visibleCount === 0) {
        noResults.classList.remove('hidden');
      } else {
        noResults.classList.add('hidden');
      }
    }
  }

  const catNames = {
    'all': {
      name: 'All Skill Tracks',
      icon: '📚',
      primary: '#e11d48',
      accent: '#fb7185',
      bg: 'rgba(46, 12, 20, 0.94)',
      border: 'rgba(251, 113, 133, 0.55)',
      glow: 'rgba(225, 29, 72, 0.4)'
    },
    'tech': {
      name: 'Tech & Cloud Ecosystem',
      icon: '💻',
      primary: '#0284c7',
      accent: '#38bdf8',
      bg: 'rgba(12, 34, 52, 0.94)',
      border: 'rgba(56, 189, 248, 0.55)',
      glow: 'rgba(2, 132, 199, 0.4)'
    },
    'green': {
      name: 'Green Energy & Trades',
      icon: '⚡',
      primary: '#16a34a',
      accent: '#4ade80',
      bg: 'rgba(12, 40, 24, 0.94)',
      border: 'rgba(74, 222, 128, 0.55)',
      glow: 'rgba(22, 163, 74, 0.4)'
    },
    'hospitality': {
      name: 'Luxury Hospitality Ops',
      icon: '🍽️',
      primary: '#d97706',
      accent: '#fbbf24',
      bg: 'rgba(42, 28, 10, 0.94)',
      border: 'rgba(251, 191, 36, 0.55)',
      glow: 'rgba(217, 119, 6, 0.4)'
    },
    'lifestyle': {
      name: 'Wellness & Aviation',
      icon: '💄',
      primary: '#9333ea',
      accent: '#c084fc',
      bg: 'rgba(32, 12, 48, 0.94)',
      border: 'rgba(192, 132, 252, 0.55)',
      glow: 'rgba(147, 51, 234, 0.4)'
    }
  };

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      currentCategory = btn.dataset.filter;
      filterCourses();
      if (catNames[currentCategory]) {
        const t = catNames[currentCategory];
        showCategoryWelcomeToast(t.name, t.icon, t);
      }
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', e => {
      currentSearch = e.target.value.trim().toLowerCase();
      if (clearBtn) clearBtn.classList.toggle('show', currentSearch.length > 0);
      filterCourses();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      currentSearch = '';
      clearBtn.classList.remove('show');
      filterCourses();
    });
  }

  if (resetFilters) {
    resetFilters.addEventListener('click', () => {
      currentCategory = 'all';
      currentSearch = '';
      if (searchInput) searchInput.value = '';
      if (clearBtn) clearBtn.classList.remove('show');
      filterBtns.forEach(b => {
        b.classList.toggle('active', b.dataset.filter === 'all');
        b.setAttribute('aria-selected', b.dataset.filter === 'all' ? 'true' : 'false');
      });
      filterCourses();
    });
  }

  /* ────────────────────────────────
     7.3 CATEGORY DEEP-DIVE SPOTLIGHT SWITCHER
  ──────────────────────────────── */
  const spotlightTabs = document.querySelectorAll('.spotlight-tab');
  const spotlightCard = document.getElementById('spotlight-card');
  const spBadge       = document.getElementById('sp-badge');
  const spTitle       = document.getElementById('sp-title');
  const spDesc        = document.getElementById('sp-desc');
  const spSalary      = document.getElementById('sp-salary');
  const spGrowth      = document.getElementById('sp-growth');
  const spCert        = document.getElementById('sp-cert');
  const spSkills      = document.getElementById('sp-skills');
  const spFilterBtn   = document.getElementById('sp-filter-btn');

  const categorySpotlightData = {
    tech: {
      badge: "💻 Tech & Cloud Ecosystem",
      title: "Tech & Cloud Infrastructure Pathways",
      desc: "Master AWS cloud architecture, Linux server administration, network routing, and data center operations. Tailored for tech-driven career acceleration.",
      salary: "₹25,000 – ₹45,000 / mo",
      growth: "🔥 +34% YoY Growth",
      growthColor: "#00f2fe",
      cert: "AWS & NASSCOM",
      skills: ["AWS Cloud Ops", "Linux Server Admin", "Data Infrastructure", "Cloud Security", "Virtualization"],
      buttonText: "Explore Tech & Cloud Courses ↓"
    },
    green: {
      badge: "⚡ Green Energy & Engineering Trades",
      title: "Sustainable Green Energy & Industrial Trades",
      desc: "High-growth green infrastructure specialization covering Electric Vehicle (EV) charging point assembly, HVAC refrigeration, electrical panels, and commercial piping.",
      salary: "₹22,000 – ₹40,000 / mo",
      growth: "🌱 +42% Green Jobs Demand",
      growthColor: "#34d399",
      cert: "NSDC & Sector Skill Council",
      skills: ["EV Station Tech", "Panel Wiring", "HVAC Refrigerants", "Piping Blueprints", "Grid Safety"],
      buttonText: "Explore Green Energy & Trades ↓"
    },
    hospitality: {
      badge: "🍽️ Luxury Hospitality & Customer Ops",
      title: "5-Star Hospitality & Retail Experience",
      desc: "Flagship hotel management and service excellence track. Includes table service protocol, front desk reservation systems, business English, and luxury resort visits.",
      salary: "₹20,000 – ₹38,000 / mo",
      growth: "⭐ 100% Placement Record",
      growthColor: "#fbbf24",
      cert: "Tourism SSC Certified",
      skills: ["Front Office SOPs", "F&B Table Service", "Business English", "POS Systems", "Hotel Field Visits"],
      buttonText: "Explore Hospitality Courses ↓"
    },
    lifestyle: {
      badge: "💄 Wellness, Aesthetics & Aviation",
      title: "Aviation Cabin Services & Personal Care",
      desc: "Premium training in flight safety protocols, international poise, cosmetological aesthetics, and salon management for luxury airline & wellness enterprises.",
      salary: "₹24,000 – ₹50,000 / mo",
      growth: "✈️ Overseas & Flight Opportunities",
      growthColor: "#a78bfa",
      cert: "Aviation & Beauty SSC",
      skills: ["In-Flight Safety", "Cosmetology Science", "High-Altitude Care", "Grooming Mastery", "Client Relations"],
      buttonText: "Explore Wellness & Aviation Courses ↓"
    }
  };

  let activeSpotlightCat = 'tech';

  function updateCategorySpotlight(cat) {
    const data = categorySpotlightData[cat];
    if (!data || !spotlightCard) return;

    activeSpotlightCat = cat;

    // Update Card Theme Class
    spotlightCard.className = `spotlight-card spotlight-card--${cat}`;

    if (spBadge)  spBadge.textContent  = data.badge;
    if (spTitle)  spTitle.textContent  = data.title;
    if (spDesc)   spDesc.textContent   = data.desc;
    if (spSalary) spSalary.textContent = data.salary;
    if (spGrowth) {
      spGrowth.textContent = data.growth;
      spGrowth.style.color = data.growthColor;
    }
    if (spCert) spCert.textContent = data.cert;

    if (spSkills) {
      spSkills.innerHTML = data.skills.map(s => `<span class="sp-skill-chip">${s}</span>`).join('');
    }

    if (spFilterBtn) spFilterBtn.textContent = data.buttonText;
  }

  spotlightTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      spotlightTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      const cat = tab.dataset.spotlight;
      updateCategorySpotlight(cat);
    });
  });

  if (spFilterBtn) {
    spFilterBtn.addEventListener('click', () => {
      // Find corresponding filter button and click it
      const matchFilterBtn = Array.from(filterBtns).find(b => b.dataset.filter === activeSpotlightCat);
      if (matchFilterBtn) matchFilterBtn.click();
      const toolbar = document.querySelector('.courses-toolbar');
      if (toolbar) toolbar.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  const staffCatBtns = document.querySelectorAll('.staff-cat-btn');
  const staffCards   = document.querySelectorAll('.staff-card');
  const staffSearch  = document.getElementById('staff-search-input');

  let currentStaffCat   = 'all';
  let currentStaffQuery = '';

  function filterStaff() {
    staffCards.forEach(card => {
      const catMatch    = currentStaffCat === 'all' || card.dataset.staffCat === currentStaffCat;
      const text        = card.textContent.toLowerCase();
      const searchMatch = !currentStaffQuery || text.includes(currentStaffQuery);

      if (catMatch && searchMatch) {
        card.classList.remove('hidden');
        card.style.display = 'flex';
      } else {
        card.classList.add('hidden');
        card.style.display = 'none';
      }
    });
  }

  staffCatBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      staffCatBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentStaffCat = btn.dataset.staffCat;
      filterStaff();
    });
  });

  if (staffSearch) {
    staffSearch.addEventListener('input', e => {
      currentStaffQuery = e.target.value.trim().toLowerCase();
      filterStaff();
    });
  }

  /* ────────────────────────────────
     8. FAQ ACCORDION TOGGLE
  ──────────────────────────────── */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const q = item.querySelector('.faq-question');
    q.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });
      if (!isActive) {
        item.classList.add('active');
        q.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ────────────────────────────────
     9. CAREER PATHWAY FINDER MODAL WIDGET
  ──────────────────────────────── */
  const pathwayModal = document.getElementById('pathway-modal');
  const openModalBtns = [
    document.getElementById('hero-pathway-btn'),
    document.getElementById('open-pathway-modal-btn'),
    document.getElementById('drawer-pathway-trigger')
  ];
  const closeModalBtn = document.getElementById('modal-close');

  const pStep1  = document.getElementById('p-step-1');
  const pStep2  = document.getElementById('p-step-2');
  const pResult = document.getElementById('p-result');

  const recTitle = document.getElementById('rec-course-name');
  const recDesc  = document.getElementById('rec-course-desc');
  const applyRecBtn = document.getElementById('apply-rec-btn');
  const resetPwBtn  = document.getElementById('reset-pw-btn');

  let selectedEdu = '';
  let selectedInterest = '';

  const courseRecommendations = {
    hospitality: {
      title: "Guest Service Associate (GSA) — Food & Beverage",
      desc: "Ideal for hospitality enthusiasts! Covers front office, dining etiquette, housekeeping, English communication, and luxury hotel exposure visits."
    },
    tech: {
      title: "Cloud Computing Practitioner",
      desc: "Perfect for IT aspirants! Learn cloud infrastructure, AWS/Azure fundamentals, data center operations, and server administration."
    },
    green: {
      title: "EV Charging Infrastructure Technician",
      desc: "High-growth green energy career! Covers EV charging station setup, grid connectivity, electrical safety, and maintenance."
    },
    "hands-on": {
      title: "Industrial Electrical / HVAC / Plumbing Engineering",
      desc: "Hands-on engineering trade! Master panel wiring, air conditioning diagnostics, or piping layout with domestic & Gulf job opportunities."
    },
    lifestyle: {
      title: "Wellness Services or Aviation Cabin Crew",
      desc: "Express your passion for service and elegance! Comprehensive training in cosmetology, grooming, customer care, or flight safety."
    }
  };

  function openPathwayModal() {
    if (!pathwayModal) return;
    pathwayModal.classList.remove('hidden');
    // Reset steps
    selectedEdu = '';
    selectedInterest = '';
    if (pStep1) pStep1.classList.remove('hidden');
    if (pStep2) pStep2.classList.add('hidden');
    if (pResult) pResult.classList.add('hidden');
  }

  function closePathwayModal() {
    if (!pathwayModal) return;
    pathwayModal.classList.add('hidden');
  }

  openModalBtns.forEach(btn => {
    if (btn) btn.addEventListener('click', (e) => {
      e.preventDefault();
      openPathwayModal();
    });
  });

  if (closeModalBtn) closeModalBtn.addEventListener('click', closePathwayModal);
  if (pathwayModal) {
    pathwayModal.addEventListener('click', (e) => {
      if (e.target === pathwayModal) closePathwayModal();
    });
  }

  // Quiz step 1 handlers
  if (pStep1) {
    pStep1.querySelectorAll('.pw-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedEdu = btn.dataset.edu;
        pStep1.classList.add('hidden');
        pStep2.classList.remove('hidden');
      });
    });
  }

  // Quiz step 2 handlers
  if (pStep2) {
    pStep2.querySelectorAll('.pw-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedInterest = btn.dataset.interest;
        pStep2.classList.add('hidden');
        pResult.classList.remove('hidden');

        const rec = courseRecommendations[selectedInterest] || courseRecommendations.hospitality;
        if (recTitle) recTitle.textContent = rec.title;
        if (recDesc) recDesc.textContent = rec.desc;
      });
    });
  }

  if (resetPwBtn) {
    resetPwBtn.addEventListener('click', () => {
      pStep1.classList.remove('hidden');
      pStep2.classList.add('hidden');
      pResult.classList.add('hidden');
    });
  }

  if (applyRecBtn) {
    applyRecBtn.addEventListener('click', () => {
      closePathwayModal();
      const recName = recTitle ? recTitle.textContent.trim() : '';
      const courseSelect = document.getElementById('reg-course');
      if (courseSelect) {
        Array.from(courseSelect.options).forEach(opt => {
          if (opt.value && (opt.value.toLowerCase().includes(recName.slice(0, 8).toLowerCase()) || recName.toLowerCase().includes(opt.value.slice(0, 8).toLowerCase()))) {
            courseSelect.value = opt.value;
          }
        });
      }
      const regSection = document.getElementById('register');
      if (regSection) regSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  /* ────────────────────────────────
     10. ENROLL BUTTONS → AUTOSCROLL TO FORM
  ──────────────────────────────── */
  document.querySelectorAll('.btn-enroll').forEach(btn => {
    btn.addEventListener('click', () => {
      const courseName = btn.dataset.course || (btn.closest('.course-tile') ? btn.closest('.course-tile').querySelector('.course-name').textContent.trim() : '');
      const sel = document.getElementById('reg-course');
      if (sel && courseName) {
        Array.from(sel.options).forEach(opt => {
          if (opt.value && courseName.toLowerCase().includes(opt.value.split(' ')[0].toLowerCase())) {
            sel.value = opt.value;
          }
        });
      }
      const regSection = document.getElementById('register');
      if (regSection) regSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ────────────────────────────────
     11. REGISTRATION FORM VALIDATION & RECEIPT GENERATOR
  ──────────────────────────────── */
  const form  = document.getElementById('reg-form');
  const toast = document.getElementById('toast');

  const receiptModal = document.getElementById('receipt-modal');
  const closeReceiptBtn = document.getElementById('btn-close-receipt');
  const modalCloseReceiptBtn = document.getElementById('receipt-close');

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4500);
  }

  function closeReceipt() {
    if (receiptModal) receiptModal.classList.add('hidden');
  }

  if (closeReceiptBtn) closeReceiptBtn.addEventListener('click', closeReceipt);
  if (modalCloseReceiptBtn) modalCloseReceiptBtn.addEventListener('click', closeReceipt);
  if (receiptModal) {
    receiptModal.addEventListener('click', (e) => {
      if (e.target === receiptModal) closeReceipt();
    });
  }

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();

      const name  = document.getElementById('reg-name').value.trim();
      const phone = document.getElementById('reg-phone').value.trim();
      const email = document.getElementById('reg-email').value.trim();
      const course = document.getElementById('reg-course').value || 'Undecided / Career Counseling Needed';
      const edu    = document.getElementById('reg-edu').value || 'Not Specified';

      if (!name || !phone || !email) {
        showToast('⚠️ Please complete all required fields.');
        return;
      }
      if (!/^[6-9]\d{9}$/.test(phone)) {
        showToast('⚠️ Please enter a valid 10-digit mobile number.');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showToast('⚠️ Please enter a valid email address.');
        return;
      }

      const btn = form.querySelector('.btn-submit');
      if (btn) {
        btn.disabled = true;
        btn.innerHTML = '⏳ Submitting Application…';
      }

      setTimeout(() => {
        form.reset();
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = '🚀 Submit Application Now';
        }

        // Generate unique reference ID
        const refId = 'DBSM-2026-' + Math.floor(1000 + Math.random() * 9000);
        const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

        // Populate receipt
        document.getElementById('rc-ref-id').textContent = refId;
        document.getElementById('rc-name').textContent   = name;
        document.getElementById('rc-phone').textContent  = '+91 ' + phone;
        document.getElementById('rc-email').textContent  = email;
        document.getElementById('rc-course').textContent = course;
        document.getElementById('rc-edu').textContent    = edu;
        document.getElementById('rc-date').textContent   = today;

        if (receiptModal) receiptModal.classList.remove('hidden');

        showToast(`✅ Application Submitted! Reference ID: ${refId}`);
      }, 1200);
    });
  }

  /* ────────────────────────────────
     12. COURSE SYLLABUS DETAILS MODAL
  ──────────────────────────────── */
  const courseSyllabusData = {
    gsa: {
      title: "Guest Service Associate (GSA) — Food & Beverage",
      duration: "2–3 Months (Full-Time Residential)",
      eligibility: "10th (SSLC) / 12th (PUC) Pass",
      certification: "NSDC & Tourism Sector Skill Council Certified",
      partners: "Taj Hotels, Marriott International, Hyatt, The Leela Palace",
      modules: [
        "Module 1: Front Office Systems & Reservation Desk Etiquette",
        "Module 2: Food & Beverage Table Service & Dining Protocol",
        "Module 3: Housekeeping Standard Operating Procedures (SOPs)",
        "Module 4: Business English Communication & Professional Grooming",
        "Module 5: Luxury Hotel Industrial Exposure Visits & Internships"
      ]
    },
    cloud: {
      title: "Cloud Computing Practitioner",
      duration: "2–3 Months (Full-Time Residential)",
      eligibility: "12th (PUC) / ITI / Diploma / Any Graduate",
      certification: "NSDC & NASSCOM FutureSkills Prime Certified",
      partners: "Infosys, Wipro, Enterprise Cloud Integrators",
      modules: [
        "Module 1: Computer Networking & Linux Administration Fundamentals",
        "Module 2: Amazon Web Services (AWS) Core Services (EC2, S3, IAM, VPC)",
        "Module 3: Cloud Security, Backup & Identity Access Management",
        "Module 4: Data Center Infrastructure & Virtualization",
        "Module 5: Real-World Cloud Deployment & Interview Prep"
      ]
    },
    ev: {
      title: "EV Charging Infrastructure Technician",
      duration: "3 Months (Full-Time Residential)",
      eligibility: "10th Pass / ITI Electrical / Diploma",
      certification: "NSDC & Green Jobs Sector Skill Council Certified",
      partners: "Schneider Electric, Bosch India, EV Station Operators",
      modules: [
        "Module 1: EV Battery Technology & AC/DC Fast Charger Architecture",
        "Module 2: Electrical Panel Assembly & High Voltage Safety Protocols",
        "Module 3: Grid Interconnection, Metering & Diagnostic Maintenance",
        "Module 4: EV Station Site Survey, Blueprint Reading & Commissioning",
        "Module 5: Industrial Field Practicum & On-Site Diagnostics"
      ]
    },
    plumbing: {
      title: "Plumbing & Piping Engineering",
      duration: "3 Months (Full-Time Residential)",
      eligibility: "Below 10th / 10th Pass / ITI",
      certification: "NSDC & Plumbing Sector Skill Council Certified",
      partners: "Larsen & Toubro, Commercial Construction & Gulf Enterprises",
      modules: [
        "Module 1: Piping Blueprint Reading & Layout Design",
        "Module 2: Water Supply, Drainage & Modern Sanitation Systems",
        "Module 3: Commercial Fitting Installation & Pipe Welding/Threading",
        "Module 4: Pressure Testing, Leakage Diagnostics & Maintenance",
        "Module 5: Gulf Trade Competency Prep & Industrial Site Training"
      ]
    },
    hvac: {
      title: "HVAC & Refrigeration Systems",
      duration: "3 Months (Full-Time Residential)",
      eligibility: "10th Pass / ITI Refrigeration / Electrical",
      certification: "NSDC & Electronics Sector Skill Council Certified",
      partners: "Voltas, Blue Star, Carrier, Gulf MEP Contractors",
      modules: [
        "Module 1: Thermodynamics Fundamentals & Refrigerant Handling",
        "Module 2: Window & Split AC Installation, Wiring & Commissioning",
        "Module 3: Commercial Chiller Systems & Ducting Blueprint Layouts",
        "Module 4: Fault Diagnostics, Gas Charging & Preventive Maintenance",
        "Module 5: Industrial Exposure & Commercial MEP Practice"
      ]
    },
    electrical: {
      title: "Industrial Electrical Technician",
      duration: "3 Months (Full-Time Residential)",
      eligibility: "10th Pass / ITI Electrical",
      certification: "NSDC & Power Sector Skill Council Certified",
      partners: "Schneider Electric, L&T, Gulf Overseas Placement Agencies",
      modules: [
        "Module 1: Industrial Control Panel Blueprint & Wiring Schematics",
        "Module 2: AC/DC Motor Starters, Relays & Contactors Maintenance",
        "Module 3: Domestic & Industrial Transformer Safety Isolation",
        "Module 4: Circuit Breaker Testing & Electrical Safety Codes",
        "Module 5: Gulf Trade Assessment Preparation & Hands-on Lab"
      ]
    },
    retail: {
      title: "Retail & Customer Operations (BPO)",
      duration: "2 Months (Full-Time Residential)",
      eligibility: "10th Pass / 12th Pass",
      certification: "NSDC & Retail Association's Skill Council Certified",
      partners: "Reliance Retail, BigBasket, Landmark Group, Customer Support Hubs",
      modules: [
        "Module 1: Point of Sale (POS) Software & Inventory Control",
        "Module 2: Customer Relationship Management (CRM) & Desk Etiquette",
        "Module 3: Spoken English Fluency & Accent Neutralization",
        "Module 4: Visual Merchandising & Store Display Dynamics",
        "Module 5: Mock Customer Handling & Corporate Interviews"
      ]
    },
    wellness: {
      title: "Wellness & Aesthetic Services",
      duration: "3 Months (Full-Time Residential)",
      eligibility: "10th Pass / 12th Pass",
      certification: "NSDC & Beauty & Wellness Sector Skill Council Certified",
      partners: "Urban Company, Salon Chains, Resort Spas & Micro-Enterprise Support",
      modules: [
        "Module 1: Professional Skincare Science & Facial Aesthetics",
        "Module 2: Hair Styling, Chemical Treatments & Barbering Artistry",
        "Module 3: Bridal Makeup & High-Fashion Cosmetic Techniques",
        "Module 4: Hygiene, Sterilization & Salon Management SOPs",
        "Module 5: Client Consultation & Self-Employment Mentorship"
      ]
    },
    aviation: {
      title: "Aviation Hospitality & Cabin Services",
      duration: "3 Months (Full-Time Residential)",
      eligibility: "12th (PUC) Pass / Graduate",
      certification: "NSDC & Aviation Sector Skill Council Certified",
      partners: "Airlines, Ground Handling Agencies, Luxury Cruise Lines",
      modules: [
        "Module 1: In-Flight Passenger Service Standards & Flight Safety",
        "Module 2: International Etiquette, Poise & Personal Grooming",
        "Module 3: Aviation First Aid, Emergency Protocols & Cabin Demo",
        "Module 4: Airport Ground Operations & Check-in Desk Systems",
        "Module 5: Mock Airline Crew Selection Drives & Interview Coaching"
      ]
    }
  };

  const courseModal = document.getElementById('course-modal');
  const cmClose = document.getElementById('cm-close');
  const cmTitle = document.getElementById('cm-title');
  const cmSub   = document.getElementById('cm-sub');
  const cmBody  = document.getElementById('cm-body');

  function openCourseModal(courseId) {
    const data = courseSyllabusData[courseId];
    if (!data || !courseModal) return;

    cmTitle.textContent = data.title;
    cmSub.textContent   = `${data.duration} • ${data.certification}`;

    let modulesHtml = data.modules.map(m => `<li>${m}</li>`).join('');

    cmBody.innerHTML = `
      <div class="cm-grid">
        <div class="cm-block">
          <h4>⏱️ Duration & Format</h4>
          <p>${data.duration}</p>
        </div>
        <div class="cm-block">
          <h4>🎓 Target Qualification</h4>
          <p>${data.eligibility}</p>
        </div>
        <div class="cm-block">
          <h4>📜 Certification</h4>
          <p>${data.certification}</p>
        </div>
        <div class="cm-block">
          <h4>💼 Top Placement Partners</h4>
          <p>${data.partners}</p>
        </div>
      </div>
      <div class="cm-block" style="margin-bottom:1.5rem;">
        <h4>📖 Core Curriculum &amp; Modules Breakdown</h4>
        <ul>${modulesHtml}</ul>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;background:var(--teal-50);padding:1rem;border-radius:var(--radius-xs);border:1px solid var(--teal-200);">
        <div>
          <strong style="color:var(--teal-900);display:block;font-size:.95rem;">100% Scholarship Covered</strong>
          <span style="color:var(--teal-700);font-size:.8rem;">Tuition, meals, and hostel lodging fully funded</span>
        </div>
        <button id="cm-apply-now" class="btn btn-primary" data-course-name="${data.title}">🚀 Enroll in This Track — FREE</button>
      </div>
    `;

    courseModal.classList.remove('hidden');

    const applyNowBtn = document.getElementById('cm-apply-now');
    if (applyNowBtn) {
      applyNowBtn.addEventListener('click', () => {
        courseModal.classList.add('hidden');
        const courseSel = document.getElementById('reg-course');
        if (courseSel) {
          const matchOpt = Array.from(courseSel.options).find(opt => opt.value && (opt.value.toLowerCase().includes(courseId) || data.title.toLowerCase().includes(opt.value.slice(0, 8).toLowerCase())));
          if (matchOpt) courseSel.value = matchOpt.value;
        }
        const regSection = document.getElementById('register');
        if (regSection) regSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }

  function closeCourseModal() {
    if (courseModal) courseModal.classList.add('hidden');
  }

  document.querySelectorAll('.btn-details').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.courseId;
      openCourseModal(id);
    });
  });

  if (cmClose) cmClose.addEventListener('click', closeCourseModal);
  if (courseModal) {
    courseModal.addEventListener('click', (e) => {
      if (e.target === courseModal) closeCourseModal();
    });
  }

  /* ────────────────────────────────
     13. CAMPUS GALLERY LIGHTBOX
  ──────────────────────────────── */
  const lightbox = document.getElementById('image-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCap = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');

  function closeLightbox() {
    if (lightbox) lightbox.classList.add('hidden');
  }

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const imgSrc = item.dataset.img;
      const caption = item.dataset.caption || '';
      if (lightbox && lightboxImg) {
        lightboxImg.src = imgSrc;
        if (lightboxCap) lightboxCap.textContent = caption;
        lightbox.classList.remove('hidden');
      }
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  /* ────────────────────────────────
     13.5 CAMPUS HUB FACILITY FILTER & SPECS MODAL
  ──────────────────────────────── */
  const hubTabs  = document.querySelectorAll('.hub-tab');
  const hubCards = document.querySelectorAll('.infra-card--hub');

  let currentHubCat = 'all';

  hubTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      hubTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      currentHubCat = tab.dataset.hubCat;

      hubCards.forEach(card => {
        const catMatch = currentHubCat === 'all' || card.dataset.hubCat === currentHubCat;
        if (catMatch) {
          card.classList.remove('hidden');
          card.style.display = 'flex';
        } else {
          card.classList.add('hidden');
          card.style.display = 'none';
        }
      });
    });
  });

  const facilityDetailsData = {
    classrooms: {
      title: "8 Dedicated Smart Classrooms",
      type: "Academic Learning Spaces",
      capacity: "210 Trainees (Simultaneous)",
      features: "HVAC Climate Control, High-Lumen Projectors, Ergonomic Seating, Acoustic Insulation",
      specs: [
        "Capacity: 8 Classrooms holding 25-30 trainees per room",
        "Audio-Visual: Overhead Digital Projectors & Smart Boards",
        "Environment: Central HVAC Ventilation & Soundproofing",
        "Furniture: Individual Modular Desks & Ergonomic Chairs",
        "Usage: Theoretical Domain Instruction, Soft Skills & Spoken English"
      ]
    },
    itlab: {
      title: "High-Tech IT Laboratory",
      type: "Digital & Cloud Workspace",
      capacity: "45 Workstations",
      features: "Gigabit Fiber Connection, LMS Server Access, Dual Monitor Setup, UPS Backup",
      specs: [
        "Connectivity: High-Speed Dedicated Gigabit Fiber Internet",
        "Hardware: Cloud Terminal PCs with Intel i5/i7 Processors",
        "Software: AWS Management Console, Linux Terminal, LMS Portal",
        "Power Backup: 100% Online Industrial UPS Battery Backup",
        "Security: Hardware Firewall & Biometric Lab Entry"
      ]
    },
    auditorium: {
      title: "Grand Assembly Auditorium",
      type: "Convocation & Conference Arena",
      capacity: "350+ Guests",
      features: "Surround Digital Sound System, Motorized Stage Screen, VIP Holding Rooms",
      specs: [
        "Capacity: Accommodates over 350 audience members",
        "A/V Setup: Multi-channel Surround Sound System & Stage Lighting",
        "Stage: Raised Performance & Convocation Podium",
        "Usage: Graduation Ceremonies, Corporate Placement Drives, Symposia"
      ]
    },
    motherteresa: {
      title: "Mother Teresa Assembly Hall",
      type: "Community & Reflection Center",
      capacity: "180 Participants",
      features: "Multi-Functional Assembly Space, Counseling Alcoves, Morning Meeting Setup",
      specs: [
        "Purpose: Dedicated to student reflection, value education & moral guidance",
        "Acoustics: Natural Ventilation & Acoustic Wall Panels",
        "Activities: Morning Assemblies, Trainee Mentoring & Group Discussions"
      ]
    },
    tot: {
      title: "Training & Conference Suite (ToT)",
      type: "Executive Academic Suite",
      capacity: "35 Executive Seats",
      features: "Conference Boardroom Table, Recruiter Interview Rooms, Video Conferencing",
      specs: [
        "Executive Suite: Fully furnished corporate boardroom for 'Training of Trainers'",
        "Recruiter Suite: Private interview cabins for visiting corporate HR teams",
        "Tech: High-Def Video Conferencing & Smart TV Displays"
      ]
    },
    hostel: {
      title: "Residential Student Hostel",
      type: "100% Free Scholar Housing",
      capacity: "150 Residential Beds",
      features: "24/7 On-Site Resident Warden, Solar Water Heaters, CCTV Supervision, Study Lounges",
      specs: [
        "Grant: 100% Free Lodging for BPL & Eligible Youth",
        "Security: 24/7 CCTV Monitoring, Gated Perimeter & Resident Wardens",
        "Amenities: Clean Beds, Personal Lockers, Solar Water Heating & Laundry Facilities"
      ]
    },
    dining: {
      title: "Central Dining Complex",
      type: "Nutritious Food Facility",
      capacity: "120 Seats (Batch Dining)",
      features: "3 Wholesome Daily Meals, FSSAI Certified Hygiene Kitchen, Steam Cooking Plant",
      specs: [
        "Meals: Breakfast, Lunch & Dinner provided FREE for residential trainees",
        "Hygiene: FSSAI-Standard Commercial Kitchen with Industrial Steam Cooking",
        "Dietary Plan: Nutritionist-Approved Balanced Meals (Vegetarian & Non-Vegetarian)"
      ]
    },
    sports: {
      title: "Recreation & Sports Ground",
      type: "Outdoor & Indoor Sports Arena",
      capacity: "Open Campus Field",
      features: "Volleyball Court, Badminton Arena, Fitness Gym Equipment, Blindfold Volleyball Challenge",
      specs: [
        "Outdoor Facilities: Regulation Volleyball Court & Football Field",
        "Indoor Facilities: Badminton, Table Tennis, Carrom & Chess",
        "Events: Inter-batch tournaments like the annual Blindfold Volleyball Challenge"
      ]
    }
  };

  const facModal = document.getElementById('facility-modal');
  const fmClose  = document.getElementById('fm-close');
  const fmTitle  = document.getElementById('fm-title');
  const fmSub    = document.getElementById('fm-sub');
  const fmBody   = document.getElementById('fm-body');

  function openFacilityModal(facId) {
    const data = facilityDetailsData[facId];
    if (!data || !facModal) return;

    fmTitle.textContent = data.title;
    fmSub.textContent   = `${data.type} • ${data.capacity}`;

    let specsHtml = data.specs.map(s => `<li>${s}</li>`).join('');

    fmBody.innerHTML = `
      <div class="cm-grid">
        <div class="cm-block">
          <h4>🏫 Facility Type</h4>
          <p>${data.type}</p>
        </div>
        <div class="cm-block">
          <h4>🪑 Capacity &amp; Scale</h4>
          <p>${data.capacity}</p>
        </div>
        <div class="cm-block" style="grid-column: span 2;">
          <h4>⚡ Key Technical Features</h4>
          <p>${data.features}</p>
        </div>
      </div>
      <div class="cm-block" style="margin-bottom:1.5rem;">
        <h4>📋 Detailed Specifications &amp; Operational Standards</h4>
        <ul>${specsHtml}</ul>
      </div>
    `;

    facModal.classList.remove('hidden');
  }

  function closeFacilityModal() {
    if (facModal) facModal.classList.add('hidden');
  }

  document.querySelectorAll('.btn-fac-specs').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const facId = btn.dataset.facilityId;
      openFacilityModal(facId);
    });
  });

  if (fmClose) fmClose.addEventListener('click', closeFacilityModal);
  if (facModal) {
    facModal.addEventListener('click', (e) => {
      if (e.target === facModal) closeFacilityModal();
    });
  }

  /* ────────────────────────────────
     14. SMOOTH SCROLL FOR ANCHOR LINKS
  ──────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});



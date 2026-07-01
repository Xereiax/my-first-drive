/* =============================================================
   MY FIRST DRIVE — Main JavaScript
   ============================================================= */

/* --- Config ---
   TODO: Replace WHATSAPP_NUMBER with the actual number (digits only, no + or spaces)
   Format: country code + number, e.g. 447712345678
----------------------------------------------------------- */
const WHATSAPP_NUMBER  = '447700000000'; // ← TODO: replace
const WHATSAPP_MESSAGE = 'Hi, I%27d%20like%20to%20book%20a%20lesson%20with%20My%20First%20Drive';
const WHATSAPP_URL     = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

/* --- Coverage area data ---
   Each town becomes one accordion card.
   testCentre: set to null until verified — see TODO below.
   Once the DVSA test centre names/addresses are confirmed, replace
   each null with a string like "Isleworth Driving Test Centre — [address]"
----------------------------------------------------------- */
const COVERAGE_AREAS = [
  {
    name: 'Hounslow',
    region: 'Central West London',
    description: 'We cover all of Hounslow town centre and the surrounding residential roads — a great area for building confidence on varied routes, from quieter suburban streets to busier A-roads.',
    testCentre: null, // TODO: Verify DVSA test centre name & address for Hounslow area
  },
  {
    name: 'Feltham',
    region: 'West London',
    description: 'Lessons across Feltham, including the town centre, Feltham Hill Road, and the quieter roads towards Bedfont — ideal for new drivers looking to build up from low-traffic roads.',
    testCentre: null, // TODO: Verify DVSA test centre
  },
  {
    name: 'Bedfont',
    region: 'West London',
    description: 'East and West Bedfont covered — including the residential roads near Bedfont Lakes and routes out towards Staines. Good mix of quiet residential and busier A-road practice.',
    testCentre: null, // TODO: Verify DVSA test centre
  },
  {
    name: 'Hanworth',
    region: 'West London',
    description: "Lessons covering Hanworth village, Hampton Hill, and the surrounding roads — a quieter patch of West London that's great for earlier-stage learners.",
    testCentre: null, // TODO: Verify DVSA test centre
  },
  {
    name: 'Hampton',
    region: 'Southwest London',
    description: 'We cover Hampton, Hampton Wick, and routes into Bushy Park — a calmer driving environment with some lovely routes suitable for building confidence.',
    testCentre: null, // TODO: Verify DVSA test centre
  },
  {
    name: 'Teddington',
    region: 'Southwest London',
    description: 'Full coverage across Teddington — from the High Street to the quieter roads near the Thames. A well-rounded area for learners at all stages.',
    testCentre: null, // TODO: Verify DVSA test centre
  },
  {
    name: 'Twickenham',
    region: 'Southwest London',
    description: 'Twickenham town centre and surrounding roads covered — including routes through St Margarets and towards Richmond Bridge. Mixed traffic conditions for progressive learning.',
    testCentre: null, // TODO: Verify DVSA test centre
  },
  {
    name: 'Osterley',
    region: 'West London',
    description: 'Osterley, Northfields, and the roads around Osterley Park — including useful A-road and roundabout practice on routes towards the M4 corridor.',
    testCentre: null, // TODO: Verify DVSA test centre
  },
  {
    name: 'Isleworth',
    region: 'West London',
    description: 'Isleworth and Spring Grove area fully covered — including routes along the A315 and quieter residential streets. Well-connected area for varied lesson routes.',
    testCentre: null, // TODO: Verify DVSA test centre — note: Isleworth is believed to have a DVSA-approved test centre nearby, confirm name and address before publishing
  },
  {
    name: 'Ashford',
    region: 'Surrey / West London border',
    description: 'Ashford and the Staines Road area covered — including routes towards Staines-upon-Thames and the M25 corridor for more advanced lesson practice.',
    testCentre: null, // TODO: Verify DVSA test centre
  },
];

/* -------------------------------------------------------
   Utility: set all WhatsApp links on the page
------------------------------------------------------- */
function initWhatsAppLinks() {
  document.querySelectorAll('[data-whatsapp]').forEach(el => {
    const town = el.dataset.whatsapp;
    let msg;
    if (town) {
      msg = encodeURIComponent(`Hi, I'd like to book a lesson in ${town} with My First Drive`);
    } else {
      msg = WHATSAPP_MESSAGE;
    }
    el.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
    el.rel  = 'noopener noreferrer';
    el.target = '_blank';
  });
}

/* -------------------------------------------------------
   Navigation: transparent over hero → solid on scroll
------------------------------------------------------- */
function initNav() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const isHeroPage = document.querySelector('.hero');

  function updateNav() {
    if (isHeroPage) {
      if (window.scrollY > 20) {
        header.classList.remove('site-header--transparent');
        header.classList.add('site-header--scrolled');
      } else {
        header.classList.add('site-header--transparent');
        header.classList.remove('site-header--scrolled');
      }
    } else {
      header.classList.remove('site-header--transparent');
      header.classList.add('site-header--scrolled');
    }
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();
}

/* -------------------------------------------------------
   Mobile nav toggle
------------------------------------------------------- */
function initMobileNav() {
  const toggle  = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  if (!toggle || !mobileNav) return;

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    mobileNav.classList.toggle('is-open', !isOpen);
    document.body.style.overflow = isOpen ? '' : 'hidden';
  });

  // Close on link click
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      mobileNav.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
      toggle.setAttribute('aria-expanded', 'false');
      mobileNav.classList.remove('is-open');
      document.body.style.overflow = '';
      toggle.focus();
    }
  });
}

/* -------------------------------------------------------
   Transmission toggle in hero (Automatic / Manual)
   Changes hero sub-copy based on selection
------------------------------------------------------- */
function initTransmissionToggle() {
  const radios = document.querySelectorAll('[name="transmission"]');
  const subCopy = document.getElementById('hero-sub');
  if (!radios.length || !subCopy) return;

  const copy = {
    automatic: 'Many learners find automatics easier and less stressful — no clutch, no stalling. Great for nervous drivers or those who just want to focus on the road.',
    manual:    'Manual lessons teach you full vehicle control and give you the flexibility to drive any car. Our instructors make the clutch feel natural from lesson one.',
  };

  radios.forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.checked) {
        subCopy.textContent = copy[radio.value] || subCopy.textContent;
      }
    });
  });
}

/* -------------------------------------------------------
   Coverage areas accordion
------------------------------------------------------- */
function renderCoverageAreas(containerSelector, options = {}) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const { limit = null, showTestCentre = true } = options;
  const areas = limit ? COVERAGE_AREAS.slice(0, limit) : COVERAGE_AREAS;

  container.innerHTML = areas.map((area, i) => {
    const testCentreHTML = showTestCentre
      ? `<div class="area-card__testcentre" aria-label="Nearest test centre information">
          <div>
            <span class="area-card__testcentre-label">Nearest test centre</span>
            ${area.testCentre
              ? area.testCentre
              : '<em style="opacity:0.6">To be confirmed — verifying with DVSA</em>'}
          </div>
        </div>`
      : '';

    const townMsg = encodeURIComponent(`Hi, I'd like to book a lesson in ${area.name} with My First Drive`);
    const waLink  = `https://wa.me/${WHATSAPP_NUMBER}?text=${townMsg}`;

    const slug = area.name.toLowerCase().replace(/\s+/g, '-');
    return `
      <div class="area-card" id="${slug}" data-area="${i}">
        <div class="area-card__header" role="button" tabindex="0"
             aria-expanded="false" aria-controls="area-body-${i}">
          <div>
            <div class="area-card__name">${area.name}</div>
            <div class="area-card__region">${area.region}</div>
          </div>
          <div class="area-card__toggle" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M7 1v12M1 7h12" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>
            </svg>
          </div>
        </div>
        <div class="area-card__body" id="area-body-${i}" role="region" aria-label="${area.name} details">
          <div class="area-card__body-inner">
            <p class="area-card__desc">${area.description}</p>
            ${testCentreHTML}
            <a href="${waLink}" class="btn btn--whatsapp btn--sm"
               target="_blank" rel="noopener noreferrer"
               aria-label="Book a lesson in ${area.name} via WhatsApp">
              ${whatsappIcon(16)} Book in ${area.name}
            </a>
          </div>
        </div>
      </div>
    `.trim();
  }).join('');

  // Bind accordion interactions
  container.querySelectorAll('.area-card__header').forEach(header => {
    function toggleArea() {
      const card = header.closest('.area-card');
      const isOpen = card.classList.contains('is-open');

      // Close all others
      container.querySelectorAll('.area-card.is-open').forEach(open => {
        if (open !== card) {
          open.classList.remove('is-open');
          open.querySelector('.area-card__header').setAttribute('aria-expanded', 'false');
        }
      });

      card.classList.toggle('is-open', !isOpen);
      header.setAttribute('aria-expanded', String(!isOpen));
    }

    header.addEventListener('click', toggleArea);
    header.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleArea();
      }
    });
  });
}

/* -------------------------------------------------------
   Announcement Bar
------------------------------------------------------- */
function initAnnouncementBar() {
  const bar = document.getElementById('announcement-bar');
  if (!bar) return;

  // Measure actual height so nav offset is pixel-perfect
  const h = bar.offsetHeight;
  document.documentElement.style.setProperty('--bar-h', h + 'px');

  // Dismissed this session — hide immediately, no animation
  if (sessionStorage.getItem('bar-dismissed')) {
    bar.style.display = 'none';
    document.documentElement.style.setProperty('--bar-h', '0px');
    return;
  }

  const closeBtn = document.getElementById('bar-close');
  if (!closeBtn) return;

  closeBtn.addEventListener('click', () => {
    bar.classList.add('is-dismissed');
    document.documentElement.style.setProperty('--bar-h', '0px');
    sessionStorage.setItem('bar-dismissed', '1');
  });
}

/* -------------------------------------------------------
   3D Scroll Card (ContainerScroll port — vanilla)
   Mirrors the framer-motion ContainerScroll component:
   rotateX 18→0, scale 1.04→1 as element scrolls into view
------------------------------------------------------- */
function initScrollCard() {
  const stages = document.querySelectorAll('[data-scroll-stage]');
  if (!stages.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    stages.forEach(stage => {
      const card = stage.querySelector('[data-scroll-card]');
      if (card) card.style.transform = 'rotateX(0deg) scale(1)';
    });
    return;
  }

  let ticking = false;

  function update() {
    stages.forEach(stage => {
      const card = stage.querySelector('[data-scroll-card]');
      if (!card) return;

      const rect = stage.getBoundingClientRect();
      const vh   = window.innerHeight;

      // 0 = stage just entering viewport bottom, 1 = stage top at viewport top
      const raw      = (vh - rect.top) / (vh * 0.9);
      const progress = Math.max(0, Math.min(1, raw));

      const isMobile  = window.innerWidth <= 768;
      const startRot  = 18;
      const startScale = isMobile ? 1.0 : 1.04;
      const endScale   = isMobile ? 0.96 : 1;

      const rotate = startRot * (1 - progress);
      const scale  = startScale + (endScale - startScale) * progress;

      card.style.transform = `rotateX(${rotate}deg) scale(${scale})`;
    });
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });

  update();
}

/* -------------------------------------------------------
   Scroll-triggered reveal (Intersection Observer)
------------------------------------------------------- */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal, .reveal-group');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(el => observer.observe(el));
}

/* -------------------------------------------------------
   Inline SVG helpers (keeps HTML clean)
------------------------------------------------------- */
function whatsappIcon(size = 20) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path d="M10 0C4.477 0 0 4.477 0 10c0 1.76.46 3.41 1.26 4.845L0 20l5.305-1.235A9.953 9.953 0 0010 20c5.523 0 10-4.477 10-10S15.523 0 10 0zm4.88 13.786c-.207.583-1.21 1.114-1.658 1.183-.424.065-.96.092-1.548-.097-.357-.112-.815-.26-1.398-.51-2.458-1.06-4.063-3.485-4.185-3.647-.12-.163-.977-1.3-.977-2.48 0-1.18.62-1.76.838-2 .217-.237.473-.296.63-.296l.454.009c.145.005.34-.055.532.405.196.467.666 1.625.723 1.743.058.118.097.256.019.41-.077.153-.116.247-.232.38-.115.132-.241.295-.345.396-.115.11-.235.23-.1.45.134.22.596.982 1.28 1.59.88.784 1.622 1.027 1.851 1.14.228.115.36.097.493-.056.133-.153.57-.664.722-.893.152-.23.303-.19.51-.114.208.077 1.32.622 1.548.735.228.115.38.172.435.268.056.097.056.558-.15 1.14z"/>
  </svg>`;
}

/* -------------------------------------------------------
   Active nav link highlighting
------------------------------------------------------- */
function initActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav__link, .mobile-nav__link').forEach(link => {
    const href = link.getAttribute('href') || '';
    const linkFile = href.split('/').pop();
    if (linkFile === path || (path === '' && linkFile === 'index.html')) {
      link.setAttribute('aria-current', 'page');
    }
  });
}

/* -------------------------------------------------------
   Init
------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initAnnouncementBar();
  initWhatsAppLinks();
  initNav();
  initMobileNav();
  initTransmissionToggle();
  initScrollCard();
  initScrollReveal();
  initActiveNav();

  // Render areas if container present
  if (document.querySelector('.areas-grid--home')) {
    renderCoverageAreas('.areas-grid--home', { limit: 6, showTestCentre: false });
  }
  if (document.querySelector('.areas-grid--full')) {
    renderCoverageAreas('.areas-grid--full', { limit: null, showTestCentre: true });
  }
});

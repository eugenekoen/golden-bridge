// Main Application Controller for Golden Bridge Services

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Navigation Menu Toggle
  const mobileNavToggle = document.getElementById('mobile-nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileNavToggle && navMenu) {
    mobileNavToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileNavToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileNavToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-times');
        }
      });
    });
  }

  // 2. Durban Hospitals Directory Search & Render
  const hospitalGrid = document.getElementById('hospitals-grid');
  const hospitalSearchInput = document.getElementById('hospital-search');

  function renderHospitals(filterText = '') {
    if (!hospitalGrid) return;
    const query = filterText.toLowerCase().trim();
    const filtered = GOLDEN_BRIDGE_DATA.hospitals.filter(h => 
      h.name.toLowerCase().includes(query) ||
      h.region.toLowerCase().includes(query) ||
      h.address.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
      hospitalGrid.innerHTML = `
        <div class="no-hospitals-found">
          <i class="fas fa-search-location fa-2x"></i>
          <p>No hospital found matching "${filterText}". Don't worry! We cover all hospitals in Greater Durban upon request.</p>
        </div>
      `;
      return;
    }

    hospitalGrid.innerHTML = filtered.map(h => `
      <div class="hospital-card">
        <div class="hospital-img-wrapper">
          <img src="${h.image}" alt="${h.name}" loading="lazy" />
          <span class="hospital-status-badge"><i class="fas fa-check-circle"></i> ${h.status}</span>
        </div>
        <div class="hospital-card-body">
          <span class="hospital-region"><i class="fas fa-map-marker-alt"></i> ${h.region}</span>
          <h3 class="hospital-name">${h.name}</h3>
          <p class="hospital-address">${h.address}</p>
          <div class="hospital-hours">
            <i class="far fa-clock"></i> <span>Visiting: ${h.visitingHours}</span>
          </div>
          <button class="btn btn-sm btn-outline-navy select-hospital-btn" data-hospital="${h.name}">
            Select for Visit
          </button>
        </div>
      </div>
    `).join('');

    // Select Hospital Button link to Booking Estimator
    document.querySelectorAll('.select-hospital-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const hospitalName = btn.getAttribute('data-hospital');
        const calcSelect = document.getElementById('calc-hospital');
        if (calcSelect) {
          calcSelect.value = hospitalName;
          calcSelect.dispatchEvent(new Event('change'));
        }
        const calcSection = document.getElementById('calculator-section');
        if (calcSection) {
          calcSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  if (hospitalSearchInput) {
    hospitalSearchInput.addEventListener('input', (e) => {
      renderHospitals(e.target.value);
    });
  }
  renderHospitals();

  // 3. Post-Visit Sample Update Interactive Viewer
  const reportTabsContainer = document.getElementById('report-tabs-container');
  const reportDisplayBox = document.getElementById('report-display-box');

  function renderReportViewer(reportId = 'report-1') {
    if (!reportDisplayBox || !reportTabsContainer) return;

    reportTabsContainer.innerHTML = GOLDEN_BRIDGE_DATA.sampleReports.map(rep => `
      <button class="report-tab-btn ${rep.id === reportId ? 'active' : ''}" data-report-id="${rep.id}">
        <i class="fas fa-file-alt"></i> ${rep.patient} - ${rep.hospital.split(',')[0]}
      </button>
    `).join('');

    const activeReport = GOLDEN_BRIDGE_DATA.sampleReports.find(r => r.id === reportId) || GOLDEN_BRIDGE_DATA.sampleReports[0];

    reportDisplayBox.innerHTML = `
      <div class="sample-report-card">
        <div class="report-header">
          <div class="patient-meta">
            <span class="report-badge"><i class="fas fa-heartbeat"></i> Post-Visit Family Update</span>
            <h3 class="report-patient-name">${activeReport.patient}</h3>
            <p class="report-hospital-info"><i class="fas fa-building"></i> ${activeReport.hospital} • <i class="far fa-clock"></i> ${activeReport.date}</p>
          </div>
          <div class="mood-pill">
            <span>Mood Status:</span>
            <strong>${activeReport.mood}</strong>
          </div>
        </div>

        <div class="report-body-text">
          <p class="report-summary-paragraph">"${activeReport.summary}"</p>
        </div>

        <div class="report-highlights-box">
          <h4><i class="fas fa-list-check"></i> Visit Highlights & Actions:</h4>
          <ul>
            ${activeReport.highlights.map(h => `<li><i class="fas fa-check"></i> ${h}</li>`).join('')}
          </ul>
        </div>

        <div class="report-footer-meta">
          <span><i class="fas fa-user-shield"></i> Visit Completed by: <strong>${activeReport.visitor}</strong></span>
          <span class="verified-tag"><i class="fas fa-shield-alt"></i> Verified Golden Bridge Report</span>
        </div>
      </div>
    `;

    document.querySelectorAll('.report-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        renderReportViewer(btn.getAttribute('data-report-id'));
      });
    });
  }
  renderReportViewer();

  // 4. FAQ Accordion Handler
  const faqContainer = document.getElementById('faq-accordion-container');
  if (faqContainer) {
    faqContainer.innerHTML = GOLDEN_BRIDGE_DATA.faqs.map((faq, index) => `
      <div class="faq-item ${index === 0 ? 'active' : ''}">
        <div class="faq-question">
          <h4>${faq.q}</h4>
          <span class="faq-toggle-icon"><i class="fas ${index === 0 ? 'fa-minus' : 'fa-plus'}"></i></span>
        </div>
        <div class="faq-answer">
          <p>${faq.a}</p>
        </div>
      </div>
    `).join('');

    document.querySelectorAll('.faq-question').forEach(q => {
      q.addEventListener('click', () => {
        const item = q.parentElement;
        const isActive = item.classList.contains('active');

        // Close all items
        document.querySelectorAll('.faq-item').forEach(el => {
          el.classList.remove('active');
          const icon = el.querySelector('.faq-toggle-icon i');
          if (icon) {
            icon.classList.remove('fa-minus');
            icon.classList.add('fa-plus');
          }
        });

        // Open clicked item if wasn't active
        if (!isActive) {
          item.classList.add('active');
          const icon = item.querySelector('.faq-toggle-icon i');
          if (icon) {
            icon.classList.remove('fa-plus');
            icon.classList.add('fa-minus');
          }
        }
      });
    });
  }

  // 5. General Contact Form Listener
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending Message...';

      setTimeout(() => {
        contactForm.innerHTML = `
          <div class="contact-success-box">
            <div class="success-icon"><i class="fas fa-paper-plane"></i></div>
            <h3>Message Sent Successfully!</h3>
            <p>Thank you for reaching out to Golden Bridge Services. Our Durban coordinator will get in touch with you shortly.</p>
          </div>
        `;
      }, 1200);
    });
  }

  // 6. Header Scroll Shadow Effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });
});

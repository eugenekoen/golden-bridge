// Interactive Booking & Fee Estimator Engine

document.addEventListener('DOMContentLoaded', () => {
  let selectedPackageId = 'comfort'; // default selected
  let selectedAddOns = new Set();
  let currentCurrency = { code: 'ZAR', symbol: 'R' };

  const packageCardsContainer = document.getElementById('package-cards-grid');
  const calcHospitalSelect = document.getElementById('calc-hospital');
  const addOnsContainer = document.getElementById('add-ons-container');
  const summaryPackageName = document.getElementById('summary-package-name');
  const summaryPackagePrice = document.getElementById('summary-package-price');
  const summaryAddonsList = document.getElementById('summary-addons-list');
  const summaryTotalPrice = document.getElementById('summary-total-price');
  const openModalBtn = document.getElementById('open-booking-modal-btn');
  const modal = document.getElementById('booking-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const bookingForm = document.getElementById('booking-form');
  const modalPackageInput = document.getElementById('modal-package-input');
  const modalHospitalInput = document.getElementById('modal-hospital-input');
  const modalTotalInput = document.getElementById('modal-total-input');

  if (!packageCardsContainer) return;

  // Render Hospitals Dropdown
  if (calcHospitalSelect) {
    calcHospitalSelect.innerHTML = GOLDEN_BRIDGE_DATA.hospitals.map(h => 
      `<option value="${h.name}">${h.name} (${h.region})</option>`
    ).join('');
  }

  // Render Package Cards
  function renderPackageCards() {
    packageCardsContainer.innerHTML = GOLDEN_BRIDGE_DATA.packages.map(pkg => {
      const isSelected = pkg.id === selectedPackageId;
      let displayPrice = `R ${pkg.basePriceZAR}`;
      if (currentCurrency.code === 'GBP') displayPrice = `£${pkg.basePriceGBP}`;
      if (currentCurrency.code === 'USD') displayPrice = `$${pkg.basePriceUSD}`;
      if (currentCurrency.code === 'AUD') displayPrice = `A$${pkg.basePriceAUD}`;

      return `
        <div class="package-card ${isSelected ? 'selected' : ''} ${pkg.recommended ? 'featured' : ''}" data-id="${pkg.id}">
          ${pkg.recommended ? '<div class="package-badge-popular"><i class="fas fa-star"></i> Recommended</div>' : ''}
          <div class="package-header">
            <div class="package-icon"><i class="fas ${pkg.icon}"></i></div>
            <span class="package-tag">${pkg.badge}</span>
            <h3 class="package-title">${pkg.name}</h3>
            <p class="package-subtitle">${pkg.subtitle}</p>
          </div>
          <div class="package-price-box">
            <span class="price-val">${displayPrice}</span>
            <span class="price-period">/ ${pkg.duration}</span>
          </div>
          <ul class="package-features">
            ${pkg.features.map(f => `<li><i class="fas fa-check-circle"></i> ${f}</li>`).join('')}
          </ul>
          <button class="btn ${isSelected ? 'btn-gold' : 'btn-outline-navy'} select-pkg-btn" data-id="${pkg.id}">
            ${isSelected ? '<i class="fas fa-check"></i> Selected Package' : 'Choose Package'}
          </button>
        </div>
      `;
    }).join('');

    // Attach click listeners to cards & buttons
    document.querySelectorAll('.package-card, .select-pkg-btn').forEach(el => {
      el.addEventListener('click', (e) => {
        const pkgId = el.getAttribute('data-id');
        if (pkgId) {
          selectedPackageId = pkgId;
          renderPackageCards();
          updateCalculatorSummary();
        }
      });
    });
  }

  // Render Add-ons
  function renderAddOns() {
    if (!addOnsContainer) return;
    addOnsContainer.innerHTML = GOLDEN_BRIDGE_DATA.addOns.map(addon => {
      const isChecked = selectedAddOns.has(addon.id);
      let priceDisplay = `+R ${addon.priceZAR}`;
      if (currentCurrency.code === 'GBP') priceDisplay = `+£${addon.priceGBP}`;
      if (currentCurrency.code === 'USD') priceDisplay = `+$${addon.priceUSD}`;
      if (currentCurrency.code === 'AUD') priceDisplay = `+A$${addon.priceAUD}`;

      return `
        <label class="addon-checkbox-label ${isChecked ? 'active' : ''}">
          <input type="checkbox" class="addon-input" value="${addon.id}" ${isChecked ? 'checked' : ''}>
          <div class="addon-info">
            <span class="addon-name">${addon.name}</span>
            <span class="addon-price">${priceDisplay}</span>
          </div>
        </label>
      `;
    }).join('');

    document.querySelectorAll('.addon-input').forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {
        if (e.target.checked) {
          selectedAddOns.add(e.target.value);
        } else {
          selectedAddOns.delete(e.target.value);
        }
        renderAddOns();
        updateCalculatorSummary();
      });
    });
  }

  // Calculate Totals & Update Summary Panel
  function updateCalculatorSummary() {
    const pkg = GOLDEN_BRIDGE_DATA.packages.find(p => p.id === selectedPackageId) || GOLDEN_BRIDGE_DATA.packages[1];
    
    let basePrice = pkg.basePriceZAR;
    let currSymbol = 'R ';
    if (currentCurrency.code === 'GBP') { basePrice = pkg.basePriceGBP; currSymbol = '£'; }
    if (currentCurrency.code === 'USD') { basePrice = pkg.basePriceUSD; currSymbol = '$'; }
    if (currentCurrency.code === 'AUD') { basePrice = pkg.basePriceAUD; currSymbol = 'A$'; }

    summaryPackageName.textContent = pkg.name;
    summaryPackagePrice.textContent = `${currSymbol}${basePrice}`;

    // Addons
    let addonsTotal = 0;
    const addonElements = [];
    selectedAddOns.forEach(addonId => {
      const addonObj = GOLDEN_BRIDGE_DATA.addOns.find(a => a.id === addonId);
      if (addonObj) {
        let addPrice = addonObj.priceZAR;
        if (currentCurrency.code === 'GBP') addPrice = addonObj.priceGBP;
        if (currentCurrency.code === 'USD') addPrice = addonObj.priceUSD;
        if (currentCurrency.code === 'AUD') addPrice = addonObj.priceAUD;

        addonsTotal += addPrice;
        addonElements.push(`<li><span>${addonObj.name}</span><strong>${currSymbol}${addPrice}</strong></li>`);
      }
    });

    if (summaryAddonsList) {
      summaryAddonsList.innerHTML = addonElements.length > 0 
        ? addonElements.join('') 
        : '<li class="no-addons">No optional add-ons selected</li>';
    }

    const grandTotal = basePrice + addonsTotal;
    summaryTotalPrice.textContent = `${currSymbol}${grandTotal} ${currentCurrency.code !== 'ZAR' ? '(' + currentCurrency.code + ')' : ''}`;

    // Update modal inputs
    if (modalPackageInput) modalPackageInput.value = pkg.name;
    if (modalHospitalInput && calcHospitalSelect) modalHospitalInput.value = calcHospitalSelect.value;
    if (modalTotalInput) modalTotalInput.value = `${currSymbol}${grandTotal} ${currentCurrency.code}`;
  }

  // Handle Currency Switcher Event
  window.addEventListener('currencyChange', (e) => {
    currentCurrency.code = e.detail.code;
    currentCurrency.symbol = e.detail.symbol;
    renderPackageCards();
    renderAddOns();
    updateCalculatorSummary();
  });

  if (calcHospitalSelect) {
    calcHospitalSelect.addEventListener('change', updateCalculatorSummary);
  }

  // Modal logic
  if (openModalBtn && modal) {
    openModalBtn.addEventListener('click', () => {
      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => {
      modal.classList.remove('show');
      document.body.style.overflow = '';
    });
  }

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('show');
      document.body.style.overflow = '';
    }
  });

  // Booking Form Submission
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = bookingForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing Request...';

      setTimeout(() => {
        bookingForm.innerHTML = `
          <div class="booking-success-message">
            <div class="success-icon"><i class="fas fa-check-circle"></i></div>
            <h3>Thank You for Trusting Golden Bridge Services!</h3>
            <p>We have received your hospital visit request for <strong>${calcHospitalSelect ? calcHospitalSelect.value : 'Durban Hospital'}</strong>.</p>
            <p>Our coordinator will reach out to you via email / WhatsApp within 2 hours to confirm visiting hours and payment details.</p>
            <button class="btn btn-navy" onclick="location.reload()"><i class="fas fa-arrow-left"></i> Back to Main Site</button>
          </div>
        `;
      }, 1500);
    });
  }

  // Initial Render
  renderPackageCards();
  renderAddOns();
  updateCalculatorSummary();
});

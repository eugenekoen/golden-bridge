// Live Timezone Sync Controller for Golden Bridge Services

document.addEventListener('DOMContentLoaded', () => {
  const durbanClockEl = document.getElementById('durban-clock');
  const userClockEl = document.getElementById('user-clock');
  const userTzSelect = document.getElementById('user-tz-select');

  if (!durbanClockEl || !userClockEl || !userTzSelect) return;

  // Populate timezone select options
  userTzSelect.innerHTML = GOLDEN_BRIDGE_DATA.timezones.map(tz => 
    `<option value="${tz.offset}" data-city="${tz.city}" data-code="${tz.code}" data-symbol="${tz.symbol}">
      ${tz.city} (${tz.label})
    </option>`
  ).join('');

  function updateClocks() {
    const now = new Date();
    
    // Durban Time (CAT is UTC+2)
    const durbanDate = new Date(now.getTime() + (now.getTimezoneOffset() + 120) * 60000);
    const durbanHours = String(durbanDate.getHours()).padStart(2, '0');
    const durbanMins = String(durbanDate.getMinutes()).padStart(2, '0');
    const durbanSecs = String(durbanDate.getSeconds()).padStart(2, '0');
    durbanClockEl.textContent = `${durbanHours}:${durbanMins}:${durbanSecs} CAT`;

    // Visitor Selected Timezone
    const selectedOffset = parseFloat(userTzSelect.value) || 0;
    const userDate = new Date(now.getTime() + (now.getTimezoneOffset() + (selectedOffset * 60)) * 60000);
    const userHours = String(userDate.getHours()).padStart(2, '0');
    const userMins = String(userDate.getMinutes()).padStart(2, '0');
    const userSecs = String(userDate.getSeconds()).padStart(2, '0');

    const selectedOption = userTzSelect.options[userTzSelect.selectedIndex];
    const label = selectedOption ? selectedOption.text.split('(')[1]?.replace(')', '') || '' : '';
    userClockEl.textContent = `${userHours}:${userMins}:${userSecs} ${label}`;
  }

  setInterval(updateClocks, 1000);
  updateClocks();

  userTzSelect.addEventListener('change', () => {
    updateClocks();
    // Dispatch custom event for currency updates across booking widget
    const selectedOpt = userTzSelect.options[userTzSelect.selectedIndex];
    const currencyCode = selectedOpt.getAttribute('data-code') || 'ZAR';
    const currencySymbol = selectedOpt.getAttribute('data-symbol') || 'R';
    
    const event = new CustomEvent('currencyChange', { 
      detail: { code: currencyCode, symbol: currencySymbol, offset: parseFloat(userTzSelect.value) } 
    });
    window.dispatchEvent(event);
  });
});

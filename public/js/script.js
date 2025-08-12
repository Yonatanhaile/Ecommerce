// fetch items and render responsively
fetch("/items")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("items-container");
    if (!data || data.length === 0) {
      container.innerHTML = `<p class="empty">No items posted yet.</p>`;
      return;
    }

    container.innerHTML = data.map(item => `
      <div class="item-card">
        <img src="${item.image || '/img-placeholder.png'}" alt="${escapeHtml(item.name)}">
        <h3>${escapeHtml(item.name)}</h3>
        <p>${escapeHtml(item.description)}</p>
        <div class="meta-row">
          <span>${formatNumber(item.price)} ብር</span>
          <span>${escapeHtml(item.phone)}</span>
        </div>
      </div>
    `).join("");
  })
  .catch(err => {
    const container = document.getElementById("items-container");
    if (container) container.innerHTML = `<p class="error">Failed to load items</p>`;
    console.error(err);
  });

// helper: small escape to avoid injected HTML
function escapeHtml(text = '') {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// helper: format number with commas
function formatNumber(value) {
  const n = Number(value) || 0;
  return n.toLocaleString('en-US'); // uses commas: 1,500
}

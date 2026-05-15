// ── DATA ──
let equipment = [
  { id: 1, name: 'VolleyBall',   category: 'Sports Equipment', total: 3, available: 2, borrowed: 1, damaged: 0, dateAdded: 'May 10, 2026', lastBorrowed: 'May 12, 2026' },
  { id: 2, name: 'Frisbee Disc', category: 'Sports Equipment', total: 3, available: 2, borrowed: 1, damaged: 0, dateAdded: 'May 10, 2026', lastBorrowed: 'May 12, 2026' },
  { id: 3, name: 'Football',     category: 'Sports Equipment', total: 2, available: 2, borrowed: 0, damaged: 0, dateAdded: 'May 10, 2026', lastBorrowed: 'May 12, 2026' },
  { id: 4, name: 'Sepakball',    category: 'Sports Equipment', total: 1, available: 1, borrowed: 0, damaged: 0, dateAdded: 'May 10, 2026', lastBorrowed: 'May 12, 2026' },
  { id: 5, name: 'Basketball',   category: 'Sports Equipment', total: 2, available: 2, borrowed: 0, damaged: 0, dateAdded: 'May 10, 2026', lastBorrowed: 'May 12, 2026' },
];

let nextId = 6;
let deleteTargetId = null;
let editTargetId = null;

// ── SIDEBAR TOGGLE ──
document.getElementById('menuBtn').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('open');
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    this.classList.add('active');
  });
});

// ── RENDER ──
function updateSummary() {
  const total     = equipment.length;
  const available = equipment.reduce((a, e) => a + e.available, 0);
  const borrowed  = equipment.reduce((a, e) => a + e.borrowed,  0);
  const damaged   = equipment.reduce((a, e) => a + e.damaged,   0);

  document.getElementById('totalEquipment').textContent = total;
  document.getElementById('availableItems').textContent = available;
  document.getElementById('borrowedItems').textContent  = borrowed;
  document.getElementById('damagedItems').textContent   = damaged;
}

function buildTags(item) {
  let tags = '';
  tags += `<span class="tag">${item.total} Item${item.total !== 1 ? 's' : ''}</span>`;
  if (item.available > 0) tags += `<span class="tag available">${item.available} Available</span>`;
  if (item.borrowed  > 0) tags += `<span class="tag borrowed">${item.borrowed} Borrowed</span>`;
  if (item.damaged   > 0) tags += `<span class="tag damaged">${item.damaged} Damaged</span>`;
  return tags;
}

function renderList() {
  const list = document.getElementById('equipmentList');
  list.innerHTML = '';

  if (equipment.length === 0) {
    list.innerHTML = `<div style="text-align:center;padding:48px 0;color:var(--muted);font-size:15px;">No equipment found. Click <strong>+ Add Equipment</strong> to get started.</div>`;
    return;
  }

  equipment.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'eq-card';
    card.style.animationDelay = `${index * 0.05}s`;

    card.innerHTML = `
      <div class="eq-thumb">No Image</div>
      <div class="eq-info">
        <div class="eq-name">${item.name}</div>
        <div class="eq-category">${item.category}</div>
        <div class="eq-tags">${buildTags(item)}</div>
      </div>
      <div class="eq-meta">
        <span>Date Added: ${item.dateAdded}</span>
        <span>Last Borrowed: ${item.lastBorrowed}</span>
      </div>
      <div class="eq-actions">
        <button class="btn-icon" title="Edit" data-edit="${item.id}">
          <svg viewBox="0 0 24 24" fill="none"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <button class="btn-delete" data-delete="${item.id}">Delete</button>
        <button class="btn-icon" title="View" data-view="${item.id}">
          <svg viewBox="0 0 24 24" fill="none"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/></svg>
        </button>
      </div>
    `;
    list.appendChild(card);
  });

  // Bind buttons
  document.querySelectorAll('[data-delete]').forEach(btn => {
    btn.addEventListener('click', () => openDeleteModal(+btn.dataset.delete));
  });
  document.querySelectorAll('[data-view]').forEach(btn => {
    btn.addEventListener('click', () => openViewModal(+btn.dataset.view));
  });
  document.querySelectorAll('[data-edit]').forEach(btn => {
    btn.addEventListener('click', () => openEditModal(+btn.dataset.edit));
  });
}

function render() {
  updateSummary();
  renderList();
}

// ── ADD / EDIT MODAL ──
const modalOverlay = document.getElementById('modalOverlay');
const modalTitle   = document.getElementById('modalTitle');
const inputName    = document.getElementById('inputName');
const inputCat     = document.getElementById('inputCategory');
const inputTotal   = document.getElementById('inputTotal');
const inputAvail   = document.getElementById('inputAvailable');

function openAddModal() {
  editTargetId = null;
  modalTitle.textContent = 'Add Equipment';
  inputName.value  = '';
  inputCat.value   = '';
  inputTotal.value = '';
  inputAvail.value = '';
  modalOverlay.classList.add('open');
  inputName.focus();
}

function openEditModal(id) {
  const item = equipment.find(e => e.id === id);
  if (!item) return;
  editTargetId = id;
  modalTitle.textContent = 'Edit Equipment';
  inputName.value  = item.name;
  inputCat.value   = item.category;
  inputTotal.value = item.total;
  inputAvail.value = item.available;
  modalOverlay.classList.add('open');
  inputName.focus();
}

function closeAddModal() {
  modalOverlay.classList.remove('open');
  editTargetId = null;
}

document.getElementById('addEquipmentBtn').addEventListener('click', openAddModal);
document.getElementById('modalClose').addEventListener('click', closeAddModal);
document.getElementById('modalCancel').addEventListener('click', closeAddModal);

document.getElementById('modalSave').addEventListener('click', () => {
  const name  = inputName.value.trim();
  const cat   = inputCat.value.trim();
  const total = parseInt(inputTotal.value) || 0;
  const avail = parseInt(inputAvail.value) || 0;

  if (!name) { inputName.style.borderColor = 'var(--red)'; inputName.focus(); return; }
  inputName.style.borderColor = '';

  const today = new Date().toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' });

  if (editTargetId !== null) {
    const item = equipment.find(e => e.id === editTargetId);
    if (item) {
      item.name      = name;
      item.category  = cat || 'Uncategorized';
      item.total     = total;
      item.available = avail;
      item.borrowed  = Math.max(0, total - avail);
    }
  } else {
    equipment.push({
      id: nextId++,
      name,
      category: cat || 'Uncategorized',
      total,
      available: avail,
      borrowed:  Math.max(0, total - avail),
      damaged:   0,
      dateAdded:    today,
      lastBorrowed: '—',
    });
  }

  closeAddModal();
  render();
});

// ── VIEW MODAL ──
const viewOverlay = document.getElementById('viewOverlay');
const viewBody    = document.getElementById('viewBody');

function openViewModal(id) {
  const item = equipment.find(e => e.id === id);
  if (!item) return;

  viewBody.innerHTML = `
    <div class="detail-row"><span class="dl">Name</span><span class="dv">${item.name}</span></div>
    <div class="detail-row"><span class="dl">Category</span><span class="dv">${item.category}</span></div>
    <div class="detail-row"><span class="dl">Total Items</span><span class="dv">${item.total}</span></div>
    <div class="detail-row"><span class="dl">Available</span><span class="dv">${item.available}</span></div>
    <div class="detail-row"><span class="dl">Borrowed</span><span class="dv">${item.borrowed}</span></div>
    <div class="detail-row"><span class="dl">Damaged</span><span class="dv">${item.damaged}</span></div>
    <div class="detail-row"><span class="dl">Date Added</span><span class="dv">${item.dateAdded}</span></div>
    <div class="detail-row"><span class="dl">Last Borrowed</span><span class="dv">${item.lastBorrowed}</span></div>
  `;
  viewOverlay.classList.add('open');
}

function closeViewModal() { viewOverlay.classList.remove('open'); }

document.getElementById('viewClose').addEventListener('click', closeViewModal);
document.getElementById('viewCloseBtn').addEventListener('click', closeViewModal);

// ── DELETE MODAL ──
const deleteOverlay = document.getElementById('deleteOverlay');
const deleteName    = document.getElementById('deleteName');

function openDeleteModal(id) {
  const item = equipment.find(e => e.id === id);
  if (!item) return;
  deleteTargetId = id;
  deleteName.textContent = item.name;
  deleteOverlay.classList.add('open');
}

function closeDeleteModal() {
  deleteOverlay.classList.remove('open');
  deleteTargetId = null;
}

document.getElementById('deleteClose').addEventListener('click', closeDeleteModal);
document.getElementById('deleteCancelBtn').addEventListener('click', closeDeleteModal);

document.getElementById('deleteConfirmBtn').addEventListener('click', () => {
  equipment = equipment.filter(e => e.id !== deleteTargetId);
  closeDeleteModal();
  render();
});

// Close overlays on backdrop click
[modalOverlay, viewOverlay, deleteOverlay].forEach(overlay => {
  overlay.addEventListener('click', function (e) {
    if (e.target === this) this.classList.remove('open');
  });
});

// ── INIT ──
render();
/* ============================================================
   EQUIPMENT BORROWING SYSTEM — Inventory Management
   app.js
   ============================================================ */

// ── DATA ──────────────────────────────────────────────────────
let equipment = [
  { id:1, name:'VolleyBall',   category:'Sports Equipment', total:3, available:2, dateAdded:'May 10, 2026', lastBorrowed:'May 12, 2026' },
  { id:2, name:'Frisbee Disc', category:'Sports Equipment', total:3, available:2, dateAdded:'May 10, 2026', lastBorrowed:'May 12, 2026' },
  { id:3, name:'Football',     category:'Sports Equipment', total:2, available:2, dateAdded:'May 10, 2026', lastBorrowed:'May 12, 2026' },
  { id:4, name:'Sepakball',    category:'Sports Equipment', total:1, available:1, dateAdded:'May 10, 2026', lastBorrowed:'May 12, 2026' },
  { id:5, name:'Basketball',   category:'Sports Equipment', total:2, available:2, dateAdded:'May 10, 2026', lastBorrowed:'May 12, 2026' },
];

let nextId      = 6;
let editingId   = null;
let deletingId  = null;

// ── UNDO STATE ────────────────────────────────────────────────
let pendingDelete   = null;   // { item, index } — item not yet wiped
let undoTimer       = null;

// ── HELPERS ───────────────────────────────────────────────────
function today() {
  return new Date().toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' });
}

// ── RENDER ───────────────────────────────────────────────────
function render() {
  const list = document.getElementById('equipmentList');
  list.innerHTML = '';

  equipment.forEach(eq => {
    const card = document.createElement('div');
    card.className = 'equipment-card';
    card.dataset.id = eq.id;
    card.innerHTML = `
      <div class="equipment-img">No Image</div>
      <div class="equipment-info">
        <div class="equipment-name">${eq.name}</div>
        <div class="equipment-category">${eq.category}</div>
        <div class="equipment-meta">${eq.total} Item${eq.total !== 1 ? 's' : ''}<br>${eq.available} Available</div>
      </div>
      <div class="equipment-dates">
        Date Added: ${eq.dateAdded}<br>
        Last Borrowed: ${eq.lastBorrowed}
      </div>
      <div class="equipment-actions">
        <button class="edit-btn" title="Edit"   onclick="openEditModal(${eq.id})">&#9998;</button>
        <button class="delete-btn"              onclick="openDeleteModal(${eq.id})">Delete</button>
        <button class="edit-btn" title="View"   onclick="showToast('Viewing ${eq.name}')">&#128065;</button>
      </div>
    `;
    list.appendChild(card);
  });

  updateStats();
}

function updateStats() {
  const total    = equipment.reduce((s, e) => s + e.total,    0);
  const avail    = equipment.reduce((s, e) => s + e.available, 0);
  const borrowed = Math.max(0, total - avail);

  document.getElementById('statTotal').textContent     = total;
  document.getElementById('statAvailable').textContent = avail;
  document.getElementById('statBorrowed').textContent  = borrowed;
}

// ── MODALS ────────────────────────────────────────────────────
function openAddModal() {
  editingId = null;
  document.getElementById('formModalTitle').textContent   = 'Add Equipment';
  document.getElementById('inputName').value              = '';
  document.getElementById('inputCategory').value          = 'Sports Equipment';
  document.getElementById('inputTotal').value             = 1;
  document.getElementById('inputAvail').value             = 1;
  document.getElementById('formConfirmBtn').textContent   = 'Add';
  openModal('formModal');
}

function openEditModal(id) {
  editingId = id;
  const eq = equipment.find(e => e.id === id);
  document.getElementById('formModalTitle').textContent   = 'Edit Equipment';
  document.getElementById('inputName').value              = eq.name;
  document.getElementById('inputCategory').value          = eq.category;
  document.getElementById('inputTotal').value             = eq.total;
  document.getElementById('inputAvail').value             = eq.available;
  document.getElementById('formConfirmBtn').textContent   = 'Save Changes';
  openModal('formModal');
}

function saveEquipment() {
  const name      = document.getElementById('inputName').value.trim();
  const category  = document.getElementById('inputCategory').value.trim();
  const total     = parseInt(document.getElementById('inputTotal').value)  || 1;
  const available = parseInt(document.getElementById('inputAvail').value)  || 0;

  if (!name)            { showToast('Please enter a name.', 'error');               return; }
  if (available > total){ showToast('Available cannot exceed total.', 'error');      return; }

  if (editingId !== null) {
    const eq = equipment.find(e => e.id === editingId);
    eq.name      = name;
    eq.category  = category;
    eq.total     = total;
    eq.available = available;
    showToast(`"${name}" updated.`, 'success');
  } else {
    equipment.push({ id: nextId++, name, category, total, available, dateAdded: today(), lastBorrowed: '—' });
    showToast(`"${name}" added.`, 'success');
  }

  closeModal('formModal');
  render();
}

function openDeleteModal(id) {
  deletingId = id;
  const eq = equipment.find(e => e.id === id);
  document.getElementById('deleteItemName').textContent = eq.name;
  openModal('deleteModal');
}

function confirmDelete() {
  const index = equipment.findIndex(e => e.id === deletingId);
  const item  = equipment[index];

  // If there's already a pending undo, finalize it immediately
  commitPendingDelete();

  // Animate card out
  const card = document.querySelector(`.equipment-card[data-id="${item.id}"]`);
  if (card) card.classList.add('deleting');

  // Store pending state BEFORE removing from array
  pendingDelete = { item, index };

  // Remove from live array and re-render after animation
  setTimeout(() => {
    equipment = equipment.filter(e => e.id !== item.id);
    render();
    showUndoToast(item.name);
  }, 280);

  closeModal('deleteModal');
}

// ── UNDO LOGIC ────────────────────────────────────────────────
function showUndoToast(name) {
  const toast = document.getElementById('undoToast');
  const msg   = document.getElementById('undoMsg');

  msg.textContent = `"${name}" deleted.`;

  // Reset animation by forcing reflow
  toast.classList.remove('show');
  void toast.offsetWidth;
  toast.classList.add('show');

  clearTimeout(undoTimer);
  undoTimer = setTimeout(() => {
    commitPendingDelete();
    hideUndoToast();
  }, 5000);
}

function hideUndoToast() {
  document.getElementById('undoToast').classList.remove('show');
}

function undoDelete() {
  if (!pendingDelete) return;

  clearTimeout(undoTimer);

  // Re-insert item at original position
  const { item, index } = pendingDelete;
  equipment.splice(index, 0, item);
  pendingDelete = null;

  hideUndoToast();
  render();
  showToast(`"${item.name}" restored.`, 'success');
}

function commitPendingDelete() {
  pendingDelete = null;
  clearTimeout(undoTimer);
}

// ── LOGOUT ────────────────────────────────────────────────────
function confirmLogout() { openModal('logoutModal'); }

// ── MODAL HELPERS ─────────────────────────────────────────────
function openModal(id)  { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }

// ── NAVIGATION ───────────────────────────────────────────────
function setActive(el, page) {
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  if (page === 'logout') return;
  el.classList.add('active');
  if (page !== 'inventory') showToast(`Navigating to ${el.textContent.trim()}…`);
}

// ── NOTIFICATIONS ────────────────────────────────────────────
function toggleNotif() {
  const panel = document.getElementById('notifPanel');
  panel.classList.toggle('open');
  document.getElementById('notifDot').style.display = 'none';
}

// ── REGULAR TOAST ─────────────────────────────────────────────
let toastTimer;
function showToast(msg, type = '') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className   = 'toast show ' + type;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.className = 'toast'; }, 2800);
}

// ── INIT ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  render();

  // Close modals when clicking outside
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) overlay.classList.remove('open');
    });
  });

  // Close notification panel when clicking outside
  document.addEventListener('click', e => {
    const panel = document.getElementById('notifPanel');
    if (
      panel.classList.contains('open') &&
      !panel.contains(e.target) &&
      !e.target.closest('.notif-badge')
    ) {
      panel.classList.remove('open');
    }
  });
});
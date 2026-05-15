let isPending = false;

function showToast(msg, duration = 2400) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), duration);
}

function handleSubmit() {
  if (isPending) return;

  const policy  = document.getElementById('policyCheck').checked;
  const returnD = document.getElementById('returnDate').value;
  const purpose = document.getElementById('purpose').value.trim();

  if (!returnD) { showToast('⚠️ Please enter a return date.'); return; }
  if (!purpose) { showToast('⚠️ Please enter a purpose for borrowing.'); return; }
  if (!policy)  { showToast('⚠️ Please agree to the borrowing policies.'); return; }

  isPending = true;
  const btn = document.getElementById('submitBtn');
  btn.textContent = 'Pending';
  btn.classList.add('pending');
  btn.onclick = null;

  document.getElementById('borrowDate').disabled  = true;
  document.getElementById('returnDate').disabled  = true;
  document.getElementById('purpose').disabled     = true;
  document.getElementById('policyCheck').disabled = true;

  showToast('✅ Request submitted successfully!', 3000);
}

function handleCancel() {
  document.getElementById('cancelModal').classList.add('open');
}

function closeModal() {
  document.getElementById('cancelModal').classList.remove('open');
}

function confirmCancel() {
  closeModal();

  isPending = false;
  const btn = document.getElementById('submitBtn');
  btn.textContent = 'Submit';
  btn.classList.remove('pending');
  btn.onclick = handleSubmit;

  document.getElementById('borrowDate').disabled  = false;
  document.getElementById('returnDate').disabled  = false;
  document.getElementById('purpose').disabled     = false;
  document.getElementById('policyCheck').disabled = false;

  document.getElementById('returnDate').value    = '';
  document.getElementById('purpose').value       = '';
  document.getElementById('policyCheck').checked = false;

  showToast('Request cancelled.', 2000);
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('cancelModal').addEventListener('click', function (e) {
    if (e.target === this) closeModal();
  });
});
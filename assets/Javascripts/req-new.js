let isPending = false;
let approvalTimer = null;

document.addEventListener('DOMContentLoaded', () => {
    const borrowDateInput = document.getElementById('borrowDate');
    const returnDateInput = document.getElementById('returnDate');

    // --- 1. DATE RESTRICTION (Hindi pwede ang kahapon at ngayong araw) ---
    // Kunin ang petsa ngayon
    const today = new Date();

    // Para makuha ang "Date After Today" (Bukas):
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // I-format ang date sa YYYY-MM-DD para sa HTML input
    const minDateStr = tomorrow.toISOString().split('T')[0];

    // I-set ang 'min' attribute: Hindi pwedeng pumili ng date ngayong araw o sa nakaraan
    borrowDateInput.min = minDateStr;
    returnDateInput.min = minDateStr;

    // Kapag nagbago ang Borrow Date, i-update din ang min ng Return Date
    borrowDateInput.addEventListener('change', () => {
        returnDateInput.min = borrowDateInput.value || minDateStr;
        // Kung ang piniling Return Date ay mas maaga pa sa Borrow Date, i-clear
        if (returnDateInput.value && returnDateInput.value < borrowDateInput.value) {
            returnDateInput.value = '';
        }
    });

    // --- 2. LOAD DATA FROM BROWSE PAGE ---
    const storedItem = localStorage.getItem('selectedBorrowItem');
    if (storedItem) {
        const itemData = JSON.parse(storedItem);
        document.getElementById('reqItemIdLabel').innerText = `ITEM ID: ${itemData.id}`;
        document.getElementById('reqItemImg').src = itemData.imgSrc;
    }
});

// --- 3. SUBMIT SEQUENCE (Alert -> Pending -> Alert -> Approved) ---
function handleSubmit() {
    if (isPending) return; // Iwas double submit

    const borrowD = document.getElementById('borrowDate').value;
    const returnD = document.getElementById('returnDate').value;
    const purpose = document.getElementById('purpose').value.trim();
    const policy  = document.getElementById('policyCheck').checked;

    // Validation: Siguraduhin na may laman ang lahat
    if (!borrowD || !returnD || !purpose || !policy) {
        alert("Please fill up all information and agree to the policies.");
        return;
    }

    // A. Unang Alert
    alert("Your request form is submitted to the admin.");

    // B. Baguhin ang Button sa PENDING
    isPending = true;
    const btn = document.getElementById('submitBtn');
    btn.textContent = 'PENDING';
    btn.style.backgroundColor = '#f39c12'; // Orange color
    btn.disabled = true; // I-disable para hindi na mapindot

    // I-disable ang mga inputs habang pending
    document.getElementById('borrowDate').disabled = true;
    document.getElementById('returnDate').disabled = true;
    document.getElementById('purpose').disabled = true;
    document.getElementById('policyCheck').disabled = true;

    // C. Simulation: Pagkatapos ng 5 segundo (simulating admin approval)
    approvalTimer = setTimeout(() => {
        // Pangalawang Alert
        alert("APPROVE");

        // D. Baguhin ang Button sa APPROVE
        btn.textContent = 'APPROVE';
        btn.style.backgroundColor = '#28a745'; // Green color
        btn.disabled = true; // Keep disabled after approved
    }, 5000);
}

// --- 4. CANCEL LOGIC — opens the modal ---
function handleCancel() {
    // Ipakita ang modal para sa confirmation
    document.getElementById('cancelModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('cancelModal').style.display = 'none';
}

function confirmCancel() {
    closeModal();

    // stop ang timer kung sakaling naghihintay pa ng approval
    if (approvalTimer) clearTimeout(approvalTimer);

    //  Burahin ang impormasyon ng item
    localStorage.removeItem('selectedBorrowItem');
    document.getElementById('reqItemIdLabel').innerText = 'ITEM ID: ---';
    document.getElementById('reqItemImg').src = "";
    document.getElementById('reqItemImg').alt = "No Item Selected";

    //  I-clear lahat ng inputs (Wipe/Delete data)
    document.getElementById('borrowDate').value = '';
    document.getElementById('returnDate').value = '';
    document.getElementById('purpose').value = '';
    document.getElementById('policyCheck').checked = false;

    //  I-reset ang Submit Button
    isPending = false;
    const btn = document.getElementById('submitBtn');
    btn.textContent = 'Submit';
    btn.style.backgroundColor = '';
    btn.disabled = false;

    // 4. I-enable ulit ang mga inputs
    document.getElementById('borrowDate').disabled = false;
    document.getElementById('returnDate').disabled = false;
    document.getElementById('purpose').disabled = false;
    document.getElementById('policyCheck').disabled = false;

    alert("All inputs have been deleted.");
}

// --- 5. TOAST HELPER ---
function showToast(msg) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}
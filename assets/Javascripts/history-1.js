document.addEventListener('DOMContentLoaded', () => {
    console.log("EBS Borrow History Loaded");
    
    // 1. Navigation Active Link Highlight
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', function() {
            links.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // 2. Exact elements by ID
    const btnBorrowed = document.getElementById('btnBorrowed');
    const btnOverdue = document.getElementById('btnOverdue');
    const borrowedItemsGrid = document.getElementById('borrowedItems');
    const noOverdueMessage = document.getElementById('noOverdueMessage');
    const sectionTitle = document.getElementById('sectionTitle');

    // 3. Action when "Total Borrowed" is clicked
    if (btnBorrowed) {
        btnBorrowed.addEventListener('click', () => {
            borrowedItemsGrid.style.display = 'grid';   // Show grid
            noOverdueMessage.style.display = 'none';   // Hide message
            sectionTitle.innerText = 'Borrow Library'; // Change title back
        });
    } else {
        console.error("Could not find the Total Borrowed button.");
    }

    // 4. Action when "Overdue" is clicked
    if (btnOverdue) {
        btnOverdue.addEventListener('click', () => {
            borrowedItemsGrid.style.display = 'none';  // Hide grid
            noOverdueMessage.style.display = 'block';  // Show message
            sectionTitle.innerText = 'Overdue Items';  // Change title
        });
    } else {
        console.error("Could not find the Overdue button.");
    }
});
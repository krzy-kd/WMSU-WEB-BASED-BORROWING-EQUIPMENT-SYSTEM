document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. SMOOTH SCROLLING LOGIC ---
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault(); 
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const target = btn.getAttribute('data-target');
            let targetSection;

            if (target === 'sports') {
                targetSection = document.getElementById('sport-section');
            } else if (target === 'electronics') { 
                targetSection = document.getElementById('others-section');
            } else if (target === 'Works') {
                targetSection = document.getElementById('help-section');
            }

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // --- 2. AVAILABILITY FILTERING LOGIC ---
    function setupAvailabilityFilter(dropdownId, gridId) {
        const dropdown = document.getElementById(dropdownId);
        const grid = document.getElementById(gridId);
        
        if (!dropdown || !grid) return;

        const items = grid.querySelectorAll('.item-card');

        dropdown.addEventListener('change', (e) => {
            const selectedText = e.target.options[e.target.selectedIndex].text.toLowerCase();

            items.forEach(item => {
                const statusDiv = item.querySelector('.status');
                const isAvailable = statusDiv.classList.contains('available');
                const isUnavailable = statusDiv.classList.contains('unavailable');

                if (selectedText === 'available') {
                    item.style.display = isAvailable ? '' : 'none';
                } else if (selectedText === 'unavailable') {
                    item.style.display = isUnavailable ? '' : 'none';
                } else {
                    item.style.display = ''; 
                }
            });
        });
    }

    setupAvailabilityFilter('availability-filter', 'itemsGrid');          
    setupAvailabilityFilter('others-availability-filter', 'others-itemsGrid'); 

    // --- 3. ITEMS DROPDOWN ---
    const itemDropdowns = [document.getElementById('item-dropdown'), document.getElementById('others-item-dropdown')];
    itemDropdowns.forEach(dropdown => {
        if (dropdown) {
            dropdown.addEventListener('change', (e) => {
                e.target.selectedIndex = 0; 
            });
        }
    });

    // --- 4. BACK TO TOP BUTTON ---
    const toTopBtn = document.getElementById('toTop');
    if (toTopBtn) {
        toTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- 5. CLICK ITEM TO REQUEST LOGIC ---
    const itemCards = document.querySelectorAll('.item-card');
    
    itemCards.forEach(card => {
        card.addEventListener('click', () => {
            // Prevent users from clicking unavailable items if you want
            const statusDiv = card.querySelector('.status');
            if (statusDiv.classList.contains('unavailable')) {
                alert("This item is currently unavailable.");
                return; // Stop the script here so it doesn't redirect
            }

            // Grab the details from the clicked card
            const itemId = card.querySelector('.item-id').innerText;
            const itemName = card.querySelector('h3').innerText;
            const itemCategory = card.querySelector('p').innerText;
            const imgSrc = card.querySelector('img').src;

            // Package the data
            const itemData = {
                id: itemId,
                name: itemName,
                category: itemCategory,
                imgSrc: imgSrc
            };

            // Save to localStorage and redirect to My Request page
            localStorage.setItem('selectedBorrowItem', JSON.stringify(itemData));
            window.location.href = 'request-new.html'; // Ensure this path matches your directory structure
        });
    });
});
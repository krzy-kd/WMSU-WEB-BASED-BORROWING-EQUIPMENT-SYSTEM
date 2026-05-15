document.addEventListener('DOMContentLoaded', () => {
    
    const itemDropdown = document.getElementById('item-dropdown');
    const availabilityFilter = document.getElementById('availability-filter');
    const searchInput = document.getElementById('searchInput');
    const itemCards = document.querySelectorAll('.item-card');
    const filterButtons = document.querySelectorAll('.filter-btn');

    
    const navigate = (event) => {
        const url = event.target.value;
        if (url && url.trim() !== "") {
            window.location.href = url;
        }
    };

    if (itemDropdown) {
        itemDropdown.addEventListener('change', navigate);
    }

    if (availabilityFilter) {
        availabilityFilter.addEventListener('change', navigate);
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            itemCards.forEach(card => {
                const itemName = card.getAttribute('data-name') 
                    ? card.getAttribute('data-name').toLowerCase() 
                    : "";
                card.style.display = itemName.includes(query) ? 'block' : 'none';
            });
        });
    }

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
});
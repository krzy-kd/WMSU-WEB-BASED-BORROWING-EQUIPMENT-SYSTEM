document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const itemCards = document.querySelectorAll('.item-card');

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        itemCards.forEach(card => {
            const itemName = card.getAttribute('data-name').toLowerCase();
            card.style.display = itemName.includes(query) ? 'block' : 'none';
        });
    });

    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
});
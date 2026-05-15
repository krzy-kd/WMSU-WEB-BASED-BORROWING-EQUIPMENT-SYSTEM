document.addEventListener('DOMContentLoaded', () => {
    const favBtn = document.getElementById('fav-btn');

    if (favBtn) {
        favBtn.addEventListener('click', function() {
            alert("This item has been recorded in your favorites!");

            const heart = this.querySelector('.heart-icon');
            if (heart) {
                heart.classList.toggle('favorited');
                
                if (heart.classList.contains('favorited')) {
                    heart.style.color = "red";
                } else {
                    heart.style.color = "inherit";
                }
            }
            
            
        });
    }
});
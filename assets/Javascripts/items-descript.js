// Function to handle thumbnail clicks
function swapImage(imagePath) {
    const mainImage = document.getElementById('main-target');
    if (imagePath) {
        mainImage.src = imagePath;
    }
}

document.getElementById('fav-btn').addEventListener('click', function() {
    const activeColor = 'rgb(255, 240, 240)'; 
    
    if (this.style.backgroundColor === activeColor) {
        this.style.backgroundColor = 'white';
    } else {
        this.style.backgroundColor = activeColor;
    }
});
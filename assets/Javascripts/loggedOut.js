document.addEventListener('DOMContentLoaded', function() {
    const logoutBtn = document.getElementById('logoutBtn');

    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(event) {
            event.preventDefault(); 

            const confirmLogout = confirm("Are you sure you want to log out?");


            if (confirmLogout) {
                alert("Successfully logged out!");
                window.location.href = "ClogOut-lt.html";
            } else {
                alert("log out cancelled")
                window.location.href = "user-profile.html";
            }

        });
    }

    const cancelBtn = document.getElementById('cancelBtn');

    if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
        alert("log out cancelled") 
        window.location.href = "user-profile.html";
    });
    }

}); 
const passInput = document.getElementById('inputPass'); 

    registrationForm.addEventListener('submit', function(e) {
    e.preventDefault(); 

        const passValue = passInput.value;

    if (passValue.length < 8) {
        alert("Incorrect Password., Pls try again");
        return;
    }


    alert("Account successfully Login!");
    window.location.href = "home-page.html";

    });
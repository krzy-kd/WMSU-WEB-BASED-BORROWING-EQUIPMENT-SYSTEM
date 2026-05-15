
const registrationForm = document.getElementById('registrationForm');
const emailInput = document.getElementById("inputScEmail");
const roleDisplay = document.getElementById("roleDisplay");
const nameInput = document.getElementById('inputName');
const idNumberInput = document.getElementById('inputIDNumber');
const passInput = document.getElementById('inputPass');
const confirmPassInput = document.getElementById('inputConPass');
const policyCheckbox = document.getElementById('checkbox'); 

emailInput.addEventListener("input", function () {
    const email = emailInput.value.toLowerCase();
    
    if (email.includes("ty202502829@wmsu.edu.ph")) {
        roleDisplay.value = "Student";
    } else if (email.includes("tp202502829@wmsu.edu.ph")) {
        roleDisplay.value = "Teacher";
    } else if (email.includes("sp202502829@wmsu.edu.ph")) {
        roleDisplay.value = "Staff";
    } else if (email.includes("ap202502829@wmsu.edu.ph")) {
        roleDisplay.value = "Alumni";
    } else {
        roleDisplay.value = ""; 
    }
});

document.querySelectorAll('.toggle-password').forEach(icon => {
    icon.addEventListener('click', function() {
        const input = this.parentElement.querySelector('input');
        if (input.type === "password") {
            input.type = "text";
            this.textContent = "🔒"; 
        } else {
            input.type = "password";
            this.textContent = "👁";
        }
    });
});

registrationForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const nameValue = nameInput.value.trim();
    const idValue = idNumberInput.value.trim();
    const passValue = passInput.value;
    const confirmValue = confirmPassInput.value;

    const nameParts = nameValue.split(/\s+/).filter(part => part.length > 0);
    const nameCharsPattern = /^[a-zA-Z\s]+$/;

    if (!nameCharsPattern.test(nameValue)) {
        alert("Invalid Name! Use letters only. Please do not use dots (.) or numbers.");
        return;
    }
    if (nameParts.length < 3) {
        alert("Incomplete Name! Please provide your Full Name (First, Middle, and Last) without initials.");
        return;
    }

    const idPattern = /^\d{9,100}$/; 
    if (!idPattern.test(idValue)) {
        alert("Invalid ID Number! It must be between 9 digits or more (Example: 202502829).");
        return;
    }

    if (roleDisplay.value === "") {
        alert("Please use a valid WMSU School Email to determine your role.");
        return;
    }

    if (passValue.length < 8) {
        alert("Password too short! It must be at least 8 characters long.");
        return;
    }

    if (passValue !== confirmValue) {
        alert("Passwords do not match!");
        return;
    } 

    if (!policyCheckbox || !policyCheckbox.checked) {
        alert("Invalid! You must agree to the Borrowing Policies and Responsibilities to proceed.");
        return;
    } else {
        alert("You may proceed, Goodluck")
    }

    window.location.href = "sign-for-teacher.html";
});


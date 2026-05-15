const inputs = document.querySelectorAll('.otp-input');

inputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
        if (e.target.value.length === 1 && index < inputs.length - 1) {
            inputs[index + 1].focus();
        }
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && e.target.value.length === 0 && index > 0) {
            inputs[index - 1].focus();
        }
    });
});

document.getElementById('otp-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const code = Array.from(inputs).map(i => i.value).join('');
    if (code.length === 6) {
        alert("Verified code: " + code);
    } else {
        alert("Please enter the full 6-digit code.");
    }

    alert("Account successfully  Verified!");
    window.location.href = "acc-ver.html";
});
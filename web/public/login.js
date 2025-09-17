function validateForm() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const usernameError = document.querySelector('#username + small');
    const passwordError = document.querySelector('#password + small');

    let valid = true;

    // Username validation: at least 3 characters
    if (username.length < 3) {
        usernameError.textContent = 'Username must be at least 3 characters';
        usernameError.style.visibility = 'visible';
        valid = false;
    } else {
        usernameError.style.visibility = 'hidden';
    }

    // Password validation: at least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
        passwordError.textContent = 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number';
        passwordError.style.visibility = 'visible';
        valid = false;
    } else {
        passwordError.style.visibility = 'hidden';
    }

    return valid;
}

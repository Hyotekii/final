// Show the selected form
function showForm(formId) {
    document.querySelectorAll('.form-box').forEach(box => box.classList.remove('active'));
    document.getElementById(formId).classList.add('active');
}

// Register functionality
document.querySelector('#register-form form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = this.name.value.trim();
    const email = this.email.value.trim();
    const password = this.password.value.trim();
    const role = this.role.value;

    if (!name || !email || !password || !role) {
        alert("Please fill all fields.");
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.some(u => u.email === email)) {
        alert("Email already registered!");
        return;
    }

    users.push({ name, email, password, role });
    localStorage.setItem('users', JSON.stringify(users));

    alert("Registration successful! You can now log in.");
    showForm('login-form');
    this.reset();
});

// Login functionality
document.querySelector('#login-form form').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = this.email.value.trim();
    const password = this.password.value.trim();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // Store the logged-in user
        localStorage.setItem('currentUser', JSON.stringify(user));

        alert(`Welcome back, ${user.name}!`);

        // Redirect based on role
        if (user.role === 'Admin') {
            window.location.href = 'admin.html';
        } else if (user.role === 'Coach') {
            window.location.href = 'trainer.html';
        } else {
            window.location.href = 'profile.html';
        }
    } else {
        alert("Invalid email or password!");
    }
});

// Display user info in profile
function displayUserProfile() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
        const profileDiv = document.querySelector('.profile-container');
        profileDiv.innerHTML = `
            <h2>Welcome, ${user.name}!</h2>
            <p>Role: ${user.role}</p>
            <button id="logoutBtn">Logout</button>
        `;

        document.getElementById('logoutBtn').addEventListener('click', () => {
            localStorage.removeItem('currentUser');
            window.location.reload();
        });
    } else {
        showForm('login-form'); // if not logged in, show login
    }
}

// Run displayUserProfile if on profile page
if (document.querySelector('.profile-container')) {
    displayUserProfile();
}
// auth.js

// Handles login form submission
function handleLoginForm() {
  const loginForm = document.getElementById('loginForm');
  if (!loginForm) return; // Safe check — runs only if login form exists

  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Login successful (demo only)');
    const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
    modal.hide();
  });
}

// Handles signup form submission
function handleSignupForm() {
  const signupForm = document.getElementById('signupForm');
  if (!signupForm) return;

  signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Account created successfully (demo only)');
    const modal = bootstrap.Modal.getInstance(document.getElementById('signupModal'));
    modal.hide();
  });
}

// ✅ Initialize all forms when page loads
function initAuthForms() {
  handleLoginForm();
  handleSignupForm();
}

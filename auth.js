// Auth state management
const auth = {
  // Check if user is logged in (has valid token)
  isLoggedIn() {
    try {
      const authData = JSON.parse(localStorage.getItem('authData'));
      return !!(authData && authData.token);
    } catch (e) {
      return false;
    }
  },

  // Get current user profile
  getProfile() {
    try {
      return JSON.parse(localStorage.getItem('profile'));
    } catch (e) {
      return null;
    }
  },

  // Get auth token
  getToken() {
    try {
      const authData = JSON.parse(localStorage.getItem('authData'));
      return authData ? authData.token : null;
    } catch (e) {
      return null;
    }
  },

  // Clear auth state and redirect to login
  logout() {
    localStorage.removeItem('authData');
    localStorage.removeItem('profile');
    window.location.href = 'login.html';
  },

  // Redirect to login if not authenticated
  requireAuth() {
    if (!this.isLoggedIn()) {
      // Save current page as redirect target
      localStorage.setItem('redirectAfterLogin', window.location.href);
      window.location.href = 'login.html';
      return false;
    }
    return true;
  },

  // Update navbar UI based on auth state
  updateUI() {
    const navActions = document.getElementById('navActions');
    if (!navActions) return;

    if (this.isLoggedIn()) {
      const profile = this.getProfile() || {};
      const avatar = profile.image || 'https://i.pravatar.cc/100';
      const name = profile.firstName || profile.firstname || profile.username || 'User';
      const email = profile.email || '';

      navActions.innerHTML = `
        <div class="user-info d-flex align-items-center gap-2">
          <img src="${avatar}" class="rounded-circle" width="40" height="40" alt="${name}">
          <div>
            <div class="fw-semibold">${name}</div>
            ${email ? `<small class="text-muted">${email}</small>` : ''}
          </div>
          <button class="btn btn-outline-danger btn-sm ms-2" onclick="auth.logout()">Logout</button>
        </div>`;
    } else {
      navActions.innerHTML = `
        <a href="login.html" class="btn btn-outline-primary me-2">Login</a>
        <a href="login.html" class="btn btn-primary">Signup</a>`;
    }
  }
};

// Auto-update UI when auth.js loads
document.addEventListener('DOMContentLoaded', () => auth.updateUI());

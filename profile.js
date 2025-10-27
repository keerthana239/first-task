function updateNavbar(navActionsId = "navActions") {
  const navActions = document.getElementById(navActionsId);
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (user) {
    // Generate avatar URL or use default
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}&background=0D6EFD&color=fff`;

    // show avatar + dropdown; clicking avatar or View Profile goes to profile.html
    navActions.innerHTML = `
      <div class="dropdown d-flex align-items-center">
        <a href="profile.html"><img src="${avatarUrl}" alt="Profile" class="profile-avatar me-2"></a>
        <button class="btn btn-outline-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"></button>
        <ul class="dropdown-menu dropdown-menu-end">
          <li><a class="dropdown-item" href="profile.html" id="viewProfileBtn">View Profile</a></li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item text-danger" href="#" id="logoutBtn">Logout</a></li>
        </ul>
      </div>`;

    // Logout handler
    document.getElementById("logoutBtn").addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("loggedInUser");
      location.href = "thoughts.html";
    });
  } else {
    navActions.innerHTML = `
      <button class="btn btn-outline-primary me-2" onclick="window.location.href='login.html'">Login</button>
      <button class="btn btn-primary" onclick="window.location.href='signup.html'">Signup</button>`;
  }

}
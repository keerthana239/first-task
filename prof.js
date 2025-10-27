// profile.js
function updateNavbar(navActionsId = "navActions") {
  const navActions = document.getElementById(navActionsId);
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (user) {
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}&background=0D6EFD&color=fff`;

    navActions.innerHTML = `
      <div class="dropdown">
        <img src="${avatarUrl}" alt="Profile" class="profile-avatar" data-bs-toggle="dropdown" 
             style="width:40px;height:40px;border-radius:50%;cursor:pointer;">
        <ul class="dropdown-menu dropdown-menu-end">
          <li><a class="dropdown-item" href="#" id="viewProfileBtn">View Profile</a></li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item text-danger" href="#" id="logoutBtn">Logout</a></li>
        </ul>
      </div>`;

    // Logout
    document.getElementById("logoutBtn").addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");
      location.href = "thoughts.html";
    });

    // View Profile
    document.getElementById("viewProfileBtn").addEventListener("click", () => {
      window.location.href = "profile.html";
    });

  } else {
    navActions.innerHTML = `
      <button class="btn btn-outline-primary me-2" onclick="window.location.href='login.html'">Login</button>
      <button class="btn btn-primary" onclick="window.location.href='signup.html'">Signup</button>`;
  }
}

// 🟢 Load user details when on profile.html
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.endsWith("profile.html")) {
    const spinner = document.getElementById("profileSpinner");
    const details = document.getElementById("userDetails");

    spinner.classList.remove("d-none");
    details.classList.add("d-none");

    // Fetch directly without auth (simpler + always works)
    fetch("https://dummyjson.com/users/1")
      .then(res => res.json())
      .then(userData => {
        spinner.classList.add("d-none");
        details.classList.remove("d-none");

        const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.username)}&background=0D6EFD&color=fff`;

        details.innerHTML = `
          <div class="card shadow p-4 border-0">
            <div class="text-center mb-4">
              <img src="${userData.image}" alt="Profile Picture" 
                   onerror="this.src='${avatarUrl}'" class="rounded-circle mb-3" 
                   width="120" height="120">
              <h4>${userData.firstName} ${userData.lastName}</h4>
              <p class="text-muted">@${userData.username}</p>
            </div>
            <div class="row">
              <div class="col-md-6"><strong>Email:</strong> ${userData.email}</div>
              <div class="col-md-6"><strong>Phone:</strong> ${userData.phone}</div>
              <div class="col-md-6"><strong>Gender:</strong> ${userData.gender}</div>
              <div class="col-md-6"><strong>Age:</strong> ${userData.age}</div>
              <div class="col-md-6"><strong>Blood Group:</strong> ${userData.bloodGroup}</div>
              <div class="col-md-6"><strong>Birth Date:</strong> ${userData.birthDate}</div>
              <div class="col-md-6"><strong>Address:</strong> ${userData.address.address}, ${userData.address.city}</div>
              <div class="col-md-6"><strong>Company:</strong> ${userData.company.name} (${userData.company.department})</div>
            </div>
          </div>`;
      })
      .catch(err => {
        spinner.classList.add("d-none");
        details.classList.remove("d-none");
        details.innerHTML = `<div class="alert alert-danger">⚠️ Failed to load user profile.</div>`;
        console.error("Profile fetch error:", err);
      });
  }
});

function updateNavbar(navActionsId = "navActions") {
  const navActions = document.getElementById(navActionsId);
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (user) {
    // Generate avatar URL or use default
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}&background=0D6EFD&color=fff`;

    navActions.innerHTML = `
      <div class="dropdown">
        <img src="${avatarUrl}" alt="Profile" class="profile-avatar" data-bs-toggle="dropdown">
        <ul class="dropdown-menu dropdown-menu-end">
          <li><a class="dropdown-item" href="#" id="viewProfileBtn">View Profile</a></li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item text-danger" href="#" id="logoutBtn">Logout</a></li>
        </ul>
      </div>`;

    // Logout handler
    document.getElementById("logoutBtn").addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");
      location.href = "thoughts.html";
    });

    // Profile view handler This snippet sets up the “View Profile” button so that when clicked:
//A Bootstrap modal is initialized for the user profile.
//The modal is shown to the user immediately.
    document.getElementById("viewProfileBtn").addEventListener("click", () => {
      const modal = new bootstrap.Modal(document.getElementById('userProfileModal'));
      modal.show();
      
      // Show spinner and hide previous details
      document.getElementById('profileSpinner').classList.remove('d-none');
      document.getElementById('userDetails').classList.add('d-none');

      // First get a valid token using the dummy login API
      fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'emilys', password: 'emilyspass' })
      })
      .then(res => res.json())


      .then(loginData => {
        // Now fetch user details with the valid token
        return fetch('https://dummyjson.com/users/1', {
          headers: { 'Authorization': `Bearer ${loginData.token}` }
        });
      })

      
      .then(res => res.json())
      .then(userData => {
        console.log('User data:', userData); // For debugging
        const userDetails = document.getElementById('userDetails');
        userDetails.innerHTML = `
          <img src="${userData.image}" alt="Profile Picture" onerror="this.src='${avatarUrl}'">
          <h4 class="mb-4">${userData.username}</h4>
          <div class="user-info-item"><span class="user-info-label">Full Name:</span><span>${userData.firstName} ${userData.lastName}</span></div>
          <div class="user-info-item"><span class="user-info-label">Email:</span><span>${userData.email}</span></div>
          <div class="user-info-item"><span class="user-info-label">Phone:</span><span>${userData.phone}</span></div>
          <div class="user-info-item"><span class="user-info-label">Gender:</span><span>${userData.gender}</span></div>
          <div class="user-info-item"><span class="user-info-label">Age:</span><span>${userData.age}</span></div>
          <div class="user-info-item"><span class="user-info-label">Birth Date:</span><span>${userData.birthDate}</span></div>
          <div class="user-info-item"><span class="user-info-label">Blood Group:</span><span>${userData.bloodGroup}</span></div>
          <div class="user-info-item"><span class="user-info-label">Height:</span><span>${userData.height} cm</span></div>
          <div class="user-info-item"><span class="user-info-label">Weight:</span><span>${userData.weight} kg</span></div>
          <div class="user-info-item"><span class="user-info-label">Address:</span><span>${userData.address.address}, ${userData.address.city}</span></div>
          <div class="user-info-item"><span class="user-info-label">Company:</span><span>${userData.company.name} - ${userData.company.department}</span></div>
        `;
        document.getElementById('profileSpinner').classList.add('d-none');
        userDetails.classList.remove('d-none');
      })
      .catch(error => {
        document.getElementById('userDetails').innerHTML = `<div class="alert alert-danger">Failed to load profile details. Please try again later.</div>`;
        document.getElementById('profileSpinner').classList.add('d-none');
        document.getElementById('userDetails').classList.remove('d-none');
      });
    });
  } else {
    navActions.innerHTML = `
      <button class="btn btn-outline-primary me-2" onclick="window.location.href='login.html'">Login</button>
      <button class="btn btn-primary" onclick="window.location.href='signup.html'">Signup</button>`;
  }

}
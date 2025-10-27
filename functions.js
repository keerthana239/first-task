// Global variables (optional, can also pass them as args)
let thoughts = [];
let currentPage = 1;
const postsPerPage = 6;

// -------------------------
// Navbar login/logout setup
// -------------------------
// profile.js
function updateNavbar(navActionsId = "navActions") {
  const navActions = document.getElementById(navActionsId);
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (user) {
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}&background=0D6EFD&color=fff`;

    navActions.innerHTML = `
      <div class="dropdown">
        <img src="${avatarUrl}" alt="Profile" class="profile-avatar" onclick="window.location.href='profile.html'" data-bs-toggle="dropdown" 
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

// -------------------------
// Display thoughts
// -------------------------
function showPage(containerId = "thought-section", page = currentPage) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  const start = (page - 1) * postsPerPage;
  const end = start + postsPerPage;
  thoughts.slice(start, end).forEach(thought => {
    container.innerHTML += `
      <div class="col-md-4">
        <div class="card h-100 shadow-sm" onclick="openDetail(${thought.id})" style="cursor:pointer;">
          <div class="card-img-wrapper">
            <div class="card-img-spinner">
              <div class="spinner-grow spinner-grow-sm text-primary mx-1" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
             
            </div>
            <img src="https://picsum.photos/400/200?random=${thought.id}" 
                 class="card-img-top" 
                 alt="Thought image"
                 onload="this.classList.add('loaded'); this.parentElement.querySelector('.card-img-spinner').style.display='none';">
          </div>
          <div class="card-body">
            <h5 class="card-title">${thought.title}</h5>
            <p class="card-text text-secondary">${thought.body}</p>
          </div>
        </div>
      </div>`;
  });
}

// -------------------------
// Pagination setup
// -------------------------
function setupPagination(paginationId = "pagination") {
  const pagination = document.getElementById(paginationId);
  const totalPages = Math.ceil(thoughts.length / postsPerPage);
  pagination.innerHTML = "";

  // Prev button
  pagination.innerHTML += `
    <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
      <a class="page-link" href="#" onclick="changePage(${currentPage - 1})">Prev</a>
    </li>`;

  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pagination.innerHTML += `
      <li class="page-item ${i === currentPage ? 'active' : ''}">
        <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
      </li>`;
  }

  // Next button
  pagination.innerHTML += `
    <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
      <a class="page-link" href="#" onclick="changePage(${currentPage + 1})">Next</a>
    </li>`;
}

// -------------------------
// Change page
// -------------------------
function changePage(page) {
  const totalPages = Math.ceil(thoughts.length / postsPerPage);
  if (page < 1 || page > totalPages) return;
  currentPage = page;
  showPage();
  setupPagination();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// -------------------------
// Open detail with login check
// -------------------------
function openDetail(id) {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (user) {
    window.location.href = `thought-detail.html?id=${id}`;
  } else {
    localStorage.setItem("redirectAfterLogin", `thought-detail.html?id=${id}`);
    window.location.href = "login.html";
  }
}

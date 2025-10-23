// Global variables (optional, can also pass them as args)
let thoughts = [];
let currentPage = 1;
const postsPerPage = 6;

// -------------------------
// Navbar login/logout setup
// -------------------------
function updateNavbar(navActionsId = "navActions") {
  const navActions = document.getElementById(navActionsId);
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (user) {
    navActions.innerHTML = `
      <div class="dropdown">
        <button class="btn btn-outline-primary dropdown-toggle" type="button" data-bs-toggle="dropdown">
          👋 ${user.username}
        </button>
        <ul class="dropdown-menu dropdown-menu-end">
          <li><a class="dropdown-item text-danger" href="#" id="logoutBtn">Logout</a></li>
        </ul>
      </div>`;
    document.getElementById("logoutBtn").addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");
      location.href = "thoughts.html";
    });
  } else {
    navActions.innerHTML = `
      <button class="btn btn-outline-primary me-2" onclick="window.location.href='login.html'">Login</button>
      <button class="btn btn-primary" onclick="window.location.href='signup.html'">Signup</button>`;
  }
}

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
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading image...</span>
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

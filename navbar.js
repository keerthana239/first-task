document.addEventListener("DOMContentLoaded", () => {
  const navActions = document.getElementById("navActions");
  if (!navActions) return;
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
});

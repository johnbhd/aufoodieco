export function protectRoute() {
  const raw = sessionStorage.getItem("session");
  const currentUser = raw ? JSON.parse(raw) : null;
  const path = window.location.pathname;

  if (!currentUser) {
    alert("You must log in first!");
    window.location.href = "/index.html";
    return;
  }

  const role = currentUser.role;

  if (path.includes("/admin") && role !== "admin") {
    alert("Access denied! Admins only.");
    window.location.href = "/index.html";
    return;
  }

}
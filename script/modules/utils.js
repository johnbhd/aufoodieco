export function showToast(message) {
  const toast = document.getElementById("toast");
  const box = document.getElementById("toast-box");
  const text = document.getElementById("toast-message");

  text.textContent = message;

  toast.classList.remove("hidden");
  toast.classList.add("flex");

  // animate in
  setTimeout(() => {
    box.classList.remove("scale-95", "opacity-0");
    box.classList.add("scale-100", "opacity-100");
  }, 10);

  // animate out
  setTimeout(() => {
    box.classList.add("scale-95", "opacity-0");
  }, 1800);

  setTimeout(() => {
    toast.classList.add("hidden");
    toast.classList.remove("flex");
    window.location.reload();
  }, 1200);
}

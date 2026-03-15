export function generateOrderId() {
  const now = new Date();

  // Time part
  const hours = String(now.getHours()).padStart(2, "0");      // 13
  const minutes = String(now.getMinutes()).padStart(2, "0");  // 05
  const seconds = String(now.getSeconds()).padStart(2, "0");  // 07

  // Date part
  const year = now.getFullYear();                             // 2026
  const month = String(now.getMonth() + 1).padStart(2, "0");  // 03
  const day = String(now.getDate()).padStart(2, "0");         // 15

  // Combine: time first (with '-') then date
  return `ORD${hours}-${minutes}-${seconds}-${year}${month}${day}`;
  // ORD13-05-07-20260315
}
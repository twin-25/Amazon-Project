// ✅ For rendering only
export function getOrders() {
  return JSON.parse(localStorage.getItem('orders')) || [];
}

// ✅ For saving new orders
export function addOrder(order) {
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  orders.unshift(order);
  localStorage.setItem('orders', JSON.stringify(orders));
}
console.log(getOrders());
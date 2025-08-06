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

export function findOrder(orderId) {
  return getOrders().find(order => order.id === orderId);
}

export function findProduct(orderId, productId) {
  const order = findOrder(orderId);
  if (!order) return null;

  return order.products.find(product => product.productId === productId);
}
console.log(getOrders());
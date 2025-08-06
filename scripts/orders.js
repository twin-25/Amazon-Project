import { getOrders } from "../data/ordersData.js";
import { loadProductsFetch, getProduct } from "../data/products.js";
 import {formatCurrency} from "./utils/money.js";
 import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
 import { renderOrderHeader } from "./ordersHeader.js";
import { addToCart } from "../data/cart.js";


const ordersGrid = document.querySelector('.js-orders-grid');

loadProductsFetch().then(() =>{
  renderOrderHeader();
  const orders = getOrders().reverse();
  let orderHTML = '';
  orders.forEach((order)=>{
    let productsHTML = ''
    order.products.forEach((orderproduct) =>{
    const product = getProduct(orderproduct.productId);
    productsHTML += `            
    <div class="product-image-container">
      <img src="${product.image}">
    </div>

    <div class="product-details">
      <div class="product-name">
        ${product.name}
      </div>
      <div class="product-delivery-date">
        Arriving on: ${dayjs(orderproduct.estimatedDeliveryTime).format('MMMM D')}
      </div>
      <div class="product-quantity">
        Quantity: ${orderproduct.quantity}
      </div>
      <button class="buy-again-button button-primary js-buy-again" data-product-id = "${orderproduct.productId}">
        <img class="buy-again-icon" src="images/icons/buy-again.png">
        <span class="buy-again-message">Buy it again</span>
      </button>
    </div>

    <div class="product-actions">
      <a href="tracking.html?orderId=123&productId=4">
        <button class="track-package-button button-secondary">
          Track package
        </button>
      </a>
    </div>
  `
  });


  orderHTML = `<div class="order-container">
          
    <div class="order-header">
      <div class="order-header-left-section">
        <div class="order-date">
          <div class="order-header-label">Order Placed:</div>
          <div>${dayjs(order.orderTime).format('MMMM D')}</div>
        </div>
        <div class="order-total">
          <div class="order-header-label">Total:</div>
          <div>$${formatCurrency(order.totalCostCents)}</div>
        </div>
      </div>

    <div class="order-header-right-section">
      <div class="order-header-label">Order ID:</div>
      <div>${order.id}</div>
    </div>
  </div>

  <div class="order-details-grid js-order-details-grid">${productsHTML}
    </div>
  </div>
      `
  ordersGrid.insertAdjacentHTML('afterbegin', orderHTML);
});
ordersGrid.addEventListener('click', (event)=>{
  const target = event.target.closest('.js-buy-again');
  if (!target){
    return;
  }
  else{
    const productId = target.dataset.productId;
    addToCart(productId);
    renderOrderHeader();
  }

})



});



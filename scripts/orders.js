import { getOrders } from "../data/ordersData.js";
import { loadProductsFetch, getProduct } from "../data/products.js";
 import {formatCurrency} from "./utils/money.js";
 import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';


const ordersGrid = document.querySelector('.js-orders-grid');

loadProductsFetch().then(() =>{
  const orders = getOrders();
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
      <button class="buy-again-button button-primary">
        <img class="buy-again-icon" src="images/icons/buy-again.png">
        <span class="buy-again-message ">Buy it again</span>
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


});







// [{"id":"77018759-658a-4cfb-9ea4-38b6d0b7e4a8","orderTime":"2025-08-05T18:59:29.784Z","totalCostCents":25957,"products":[{"productId":"e43638ce-6aa0-4b85-b27f-e1d07eb678c6","quantity":20,"estimatedDeliveryTime":"2025-08-08T18:59:29.784Z","variation":null},{"productId":"83d4ca15-0f35-48f5-b7a3-1ea210004f2e","quantity":1,"estimatedDeliveryTime":"2025-08-08T18:59:29.784Z","variation":null}]},{"id":"57d2da71-e67a-4df6-b709-41b3c391bfd4","orderTime":"2025-08-05T18:57:08.427Z","totalCostCents":3176,"products":[{"productId":"e43638ce-6aa0-4b85-b27f-e1d07eb678c6","quantity":1,"estimatedDeliveryTime":"2025-08-08T18:57:08.427Z","variation":null},{"productId":"83d4ca15-0f35-48f5-b7a3-1ea210004f2e","quantity":1,"estimatedDeliveryTime":"2025-08-08T18:57:08.427Z","variation":null}]}]'


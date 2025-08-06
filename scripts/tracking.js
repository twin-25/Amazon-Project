import { loadProductsFetch, getProduct } from "../data/products.js";
import { findOrder, findProduct} from "../data/ordersData.js"; 
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

loadProductsFetch().then(()=>{
const url = new URL(window.location.href);
const orderId = url.searchParams.get('orderId');
const productId = url.searchParams.get('productId');
const order = findOrder(orderId)
console.log(order)
const product = getProduct(productId);
const productdetails = findProduct(orderId, productId);

const trackingHTML = `<a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${dayjs(productdetails.estimatedDeliveryTime).format('dddd, MMMM DD')}
        </div>

        <div class="product-info">
          ${product.name}
        </div>

        <div class="product-info">
          Quantity: ${productdetails.quantity}
        </div>

        <img class="product-image" src=${product.image}>

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>`;
  document.querySelector('.js-order-tracking').innerHTML = trackingHTML;

  });
import { cart, removeFromCart, updateQuantity, updateDeliveryOption } from "../../data/cart.js";
import { products, getProduct} from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import{hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {deliveryOptions, getDeliveryOption} from '../../data/deliveryOptions.js'

// hello();

//console.log(deliveryOptions);
// const today = dayjs();
// const deliveryDate = today.add('7', 'days');
// console.log(deliveryDate.format('dddd, MMMM D'));

 export function renderOrderSummary(){

  let cartSummaryHTML = '';

  cart.forEach((cartItem)=>{

    const productId = cartItem.productId;

    let matchingProduct = getProduct(productId);

    //console.log(cartItem)
    const deliveryOptionId = cartItem.deliveryOptionId;
    const deliveryOption = getDeliveryOption(deliveryOptionId);
    //console.log(deliveryOption);

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');
    cartSummaryHTML += `
          <div class="cart-item-container 
          js-cart-item-container-${matchingProduct.id}">
          <div class="delivery-date">
            Delivery date: ${dateString}
          </div>

          <div class="cart-item-details-grid">
            <img class="product-image"
              src="${matchingProduct.image}">

            <div class="cart-item-details">
              <div class="product-name">
                ${matchingProduct.name}
              </div>
              <div class="product-price">
                $${formatCurrency(matchingProduct.priceCents)}
              </div>
              <div class="product-quantity">
                <span>
                  Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary js-update-link" data-product-id = "${matchingProduct.id}">
                  Update
                </span>
                <input class="quantity-input js-quantity-input-${matchingProduct.id}"/>
                <span tabindex="0" class = "save-quantity-link link-primary js-save-quantity-link" data-product-id = "${matchingProduct.id}">Save</span>
                <span class="delete-quantity-link link-primary js-delete-link" data-product-id = "${matchingProduct.id}">
                  Delete
                </span>
              </div>
            </div>

            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
              ${deliveryOptionsHTML(matchingProduct, cartItem)}
            </div>
          </div>
        </div>
    `;

  });

  function deliveryOptionsHTML(matchingProduct, cartItem){

    let html ='';

    deliveryOptions.forEach((deliveryOption) =>{
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
      const dateString = deliveryDate.format('dddd, MMMM D');
      const priceString = deliveryOption.priceCents === 0 ? 'FREE -': `${ formatCurrency(deliveryOption.priceCents)} -`;
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
      //console.log(deliveryOption.id, cartItem.deliveryOptionId);

      
      html += 
      `<div class="delivery-option js-delivery-option"
      data-product-id = "${matchingProduct.id}" data-delivery-option-id= "${deliveryOption.id}">
        <input type="radio"
          ${isChecked? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString}  Shipping
          </div>
        </div>
      </div>
      `

    });

    return html;

  }


  updateCartQuantity();

  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

  document.querySelectorAll('.js-delete-link').forEach((link) =>{

    link.addEventListener('click', () => 
    {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.remove();
      updateCartQuantity();
    });

  });


  document.querySelectorAll('.js-update-link').forEach((link)=>{
    link.addEventListener('click', ()=>{
      const container = document.querySelector(`.js-cart-item-container-${link.dataset.productId}`);
      container.classList.add('is-editing-quantity');
      // console.log(container);
    });
  });


  function handleEvent(link){
      const container = document.querySelector(`.js-cart-item-container-${link.dataset.productId}`)
      // console.log(container)
      container.classList.remove('is-editing-quantity');
      // console.log(container)
      const quantityInput = document.querySelector(`.js-quantity-input-${link.dataset.productId}`);
      const newQuantity = Number(quantityInput.value);
      updateQuantity(link.dataset.productId, newQuantity);
      const quantityLabel = container.querySelector('.quantity-label');
      quantityLabel.innerText = updateQuantity(link.dataset.productId, newQuantity);
      updateCartQuantity();
      
    }


  document.querySelectorAll('.js-save-quantity-link').forEach((link)=>{
      link.addEventListener('click', () => handleEvent(link));
      link.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          handleEvent(link);
        }
      });
  });


 function updateCartQuantity(){

  let cartQuantity = 0; 

  cart.forEach((cartItem) =>{
    cartQuantity += cartItem.quantity;
  });

  document.querySelector('.js-return-to-home-link').innerHTML = `${cartQuantity} items`;

  }

  document.querySelectorAll('.js-delivery-option'). forEach((elemnet)=>{
    elemnet.addEventListener('click', ()=>{
      const {productId, deliveryOptionId} = elemnet.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
    })
  });

}



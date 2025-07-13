import { cart, removeFromCart, updateQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";


let cartSummaryHTML = '';

cart.forEach((cartItem)=>{

  const productId = cartItem.productId;

  let matchingProduct;
  products.forEach((product) =>{
    if(product.id === productId){
      matchingProduct = product;

    }
  });
  cartSummaryHTML += `
        <div class="cart-item-container 
        js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: Tuesday, June 21
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
            <div class="delivery-option">
              <input type="radio" checked
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
              <div>
                <div class="delivery-option-date">
                  Tuesday, June 21
                </div>
                <div class="delivery-option-price">
                  FREE Shipping
                </div>
              </div>
            </div>
            <div class="delivery-option">
              <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
              <div>
                <div class="delivery-option-date">
                  Wednesday, June 15
                </div>
                <div class="delivery-option-price">
                  $4.99 - Shipping
                </div>
              </div>
            </div>
            <div class="delivery-option">
              <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
              <div>
                <div class="delivery-option-date">
                  Monday, June 13
                </div>
                <div class="delivery-option-price">
                  $9.99 - Shipping
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  `

});
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


export function updateCartQuantity(){

let cartQuantity = 0; 

cart.forEach((cartItem) =>{
  cartQuantity += cartItem.quantity;
});

document.querySelector('.js-return-to-home-link').innerHTML = `${cartQuantity} items`;

}


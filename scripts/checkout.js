import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderChekoutHeader } from "./checkout/checkoutHeader.js";
import {loadProductsFetch } from "../data/products.js";
//import '../data/cart-class.js';
//import '../data/backend-practice.js';
import { loadCarts } from "../data/cart.js";

Promise.all([
  loadProductsFetch(),
  new Promise((resolve)=>{
    loadCarts(() =>{
      resolve();
    });
  })
]).then(() =>{
    renderChekoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
})



// new Promise((resolve) =>{
//   loadProducts(()=>{
//     resolve();
//   });

// }).then(() =>{
//   return new Promise((resolve)=>{
//     loadCarts(() =>{
//       resolve();
//     });
//   });

//   }).then(()=>{
//     renderChekoutHeader();
//     renderOrderSummary();
//     renderPaymentSummary();
//   });

// loadProducts(()=>{
//   loadCarts(() =>{
//     renderChekoutHeader();
//     renderOrderSummary();
//     renderPaymentSummary();
//   });

// });

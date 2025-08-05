import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderChekoutHeader } from "./checkout/checkoutHeader.js";
import {loadProductsFetch } from "../data/products.js";
//import '../data/cart-class.js';
//import '../data/backend-practice.js';
import { loadCarts } from "../data/cart.js";



async function loadPage() {

  await loadProductsFetch();

  await new Promise((resolve)=>{
    loadCarts(() =>{
      resolve();
    });
  })
    renderChekoutHeader();
    renderOrderSummary();
    renderPaymentSummary();

  return 'value2';
  
}
loadPage()


// Promise.all([
//   loadProductsFetch(),
//   new Promise((resolve)=>{
//     loadCarts(() =>{
//       resolve();
//     });
//   })
// ]).then(() =>{
//     renderChekoutHeader();
//     renderOrderSummary();
//     renderPaymentSummary();
// })



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

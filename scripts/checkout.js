import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderChekoutHeader } from "./checkout/checkoutHeader.js";
import '../data/cart-class.js';

renderChekoutHeader();
renderOrderSummary();
renderPaymentSummary();
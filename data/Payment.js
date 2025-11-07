import { cart } from "./cart.js";
import { deliveryopt } from "./deliverytiming.js";
import { getproduct } from "./products.js";




export function payment(){

  let productPrice = 0;
  let shippingPrice = 0;
  let buyitem = 0;

  cart.forEach((cartItem)=>{
    
    // For product with it's quantity , we made function in product.
    let product = getproduct(cartItem.productId)
    productPrice += product.priceCents * cartItem.quantity ;

    let shippig = deliveryopt(cartItem.deliveryOptionId);
    shippingPrice += shippig.priceCents ;

    let totalItem = cartItem.quantity;
    buyitem += totalItem;

    const totalBeforeTax = productPrice + shippingPrice ;

    const tax = totalBeforeTax * 0.1 ;

    const total = totalBeforeTax + tax ;

    let paymentHtml = ` 
          <div class="payment-summary-title paymentsection">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${buyitem}):</div>
            <div class="payment-summary-money">$${(productPrice / 100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${(shippingPrice / 100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${(totalBeforeTax / 100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${(tax / 100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${(total / 100).toFixed(2)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
          
          `;

          document.querySelector('.payment-summary').innerHTML = paymentHtml;
    
    
    })


}
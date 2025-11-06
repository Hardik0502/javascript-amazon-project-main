// first we made the array names cart, including the object: projectid and the quantity.

import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'

// for learning purposer : External libraries for dayjs
// let today = dayjs();
// let deliveryDate = today.add(7, 'days')
// console.log(deliveryDate.format('dddd, MMM D'));

import { cart, removeproduct, updateDeliveryOption } from "../data/cart.js";
import { getproduct, products } from "../data/products.js";
import { deliveryopt, deliveryOptions } from '../data/deliverytiming.js';



// We pasted the html. Now we need the productid to search the product inorder to get the other data of product on products.js file


  
    let productsHtml = '';

    cart.forEach((item)=>{

        const productId = item.productId;   // This productId is for the cart products

        let matchingProduct ;

        products.forEach((product)=>{   // For all the products
            if(product.id === productId ){  // here product.id means all product's id matched with the cart product's id then , that product becomes the matching product so we can access the data of that product.

                matchingProduct = product ;

            }

        });
        // console.log(matchingProduct);

        const deliveryOptionId = item.deliveryOptionsId;

        let deliveryoption ;

        deliveryOptions.forEach((opt)=>{

          if(opt.id === deliveryOptionId){
            deliveryoption = opt ;
          }
        })

          const today = dayjs();
          // const deliveryDate = today.add(deliveryoption.deliveryDays , 'Days');
          const finalDate = today.format('dddd , MMM D')
        

      productsHtml +=  ` <div class="cart-item-container oneproduct-${matchingProduct.id} " >
                <div class="delivery-date">
                  Current Date : ${finalDate}
                </div>

                <div class="cart-item-details-grid">
                  <img class="product-image"
                    src="${matchingProduct.image}">

                  <div class="cart-item-details">
                    <div class="product-name">
                      ${matchingProduct.name}
                    </div>
                    <div class="product-price">
                      $ ${(matchingProduct.priceCents / 100).toFixed(2)}
                    </div>
                    <div class="product-quantity">
                      <span>
                        Quantity: <span class="quantity-label">${item.quantity}</span>
                      </span>
                      <span class="update-quantity-link link-primary">
                        Update
                      </span>
                      <span class="delete-quantity-link link-primary deletebtn" data-product-id=${matchingProduct.id}>
                        Delete
                      </span>
                    </div>
                  </div>

                  <div class="delivery-options">
                    <div class="delivery-options-title">
                      Choose a delivery option:
                    </div>
                    ${deliveryoptionHtml(matchingProduct)}
                  </div>
                </div>
              </div>

        ` ;
    })

    // console.log(productsHtml);

    document.querySelector('.order-summary').innerHTML = productsHtml;

      removeproduct();


      // We want to show the delivery date in form of option 1 has 7 days delay, 2 has 3 days delay and 3 has 1 day delay. We want all option so we used foreach loop to get the exact days delay.
      function deliveryoptionHtml(matchingProduct){

        let optionsHtml = ' ';


        deliveryOptions.forEach((deliveryoption)=>{ // firstly format the date and price
          const today = dayjs();
          const deliveryDate = today.add(deliveryoption.deliveryDays , 'Days');
          const finalDate = deliveryDate.format('dddd , MMM D')

          const productPrice = deliveryoption.priceCents === 0 ? ' FREE' : `$ ${(deliveryoption.priceCents / 100).toFixed(2)} - `  ;

          
          
          
            optionsHtml +=  `
                                <div class="delivery-option selectedOption"
                                  data-product-id="${matchingProduct.id}"
                                  data-deliveryoption-id="${deliveryoption.id}"
                                >
                                  <input type="radio" checked
                                    class="delivery-option-input"
                                    name="delivery-option-${matchingProduct.id}">
                                  <div>
                                    <div class="delivery-option-date">
                                      ${ finalDate }
                                    </div>
                                    <div class="delivery-option-price">
                                      ${ productPrice } Shipping
                                    </div>
                                  </div>
                                </div>
                                          `
        })
          return optionsHtml;   // A function that creates or builds data/HTML/tex, the return must be written.
      }


//     document.querySelectorAll('.selectedOption').forEach((opt)=>{
//         opt.addEventListener('click',()=>{

//           const { productId , deliveryoptionId } = opt.dataset ;
//           // const productId = opt.dataset.productId;
//           // const deliveryoptionId = opt.dataset.deliveryoptionId;
    
//           updateDeliveryOption(productId , deliveryoptionId);

//         })
// })

function payment(){


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

payment();

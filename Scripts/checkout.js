// first we made the array names cart, including the object: projectid and the quantity.

import { cart } from "../data/cart.js";
import { products } from "../data/products.js";

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


   productsHtml +=  ` <div class="cart-item-container oneproduct-${matchingProduct.id}" >
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

    ` ;
})

// console.log(productsHtml);

document.querySelector('.order-summary').innerHTML = productsHtml;


  
  document.querySelectorAll('.deletebtn').forEach((dellink)=>{
    
    dellink.addEventListener("click",()=>{
      let productId = dellink.dataset.productId ;     // Data element in delete link to get the delete click product's id
     
      const productHtml = document.querySelector(`.oneproduct-${productId}`)  // The parent containar that we wan to delete along with unique id to specify the product.
      if(productHtml){
        productHtml.remove();
        // console.log("removed.",productId);
      }

      // console.log(productHtml);

    })
  })

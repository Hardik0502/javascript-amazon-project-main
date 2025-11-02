// We have the data of all product in seperate file so we just added into the amazon.html page that helps to give that data.

// const products = [
// {
//     image : 'images/products/athletic-cotton-socks-6-pairs.jpg',
//     name : 'Black and Gray Athletic Cotton Socks - 6 Pairs',
//     rating : {
//         stars : 4.5,
//         count : 87
//             },
//     priceCents : 1090
// },

// {
//     image : 'images/products/intermediate-composite-basketball.jpg',
//     name : 'Intermediate Size Basketball',
//     rating : {
//         stars : 4.0,
//         count : 127
//             },
//     priceCents : 2095
// },

// {
//     image : 'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
//     name : 'Adults Plain Cotton T-Shirt - 2 Pack',
//     rating : {
//         stars : 4.5,
//         count : 56
//             },
//     priceCents : 799
// }
    
// ];



// toFixed(2) gives two decimal numbers after point.

// Now we have to combine all the html code into one variable so we can directly put into html.This helps to prevent from adding data manually.

let productsHtml = '';

products.forEach((product)=>{

    // const html = `<div class="product-container">
    // productsHtml = productsHtml + `<div class="product-container">
    productsHtml += `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10 }.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
           $ ${(product.priceCents / 100).toFixed(2) }   
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary cartbtn " data-product-id = "${product.id}" >
            Add to Cart
          </button>
        </div>`

        
        //   <button class="add-to-cart-button button-primary cartbtn " data-product-name = "${product.name}" >
        // console.log(html);
})

// data-product-name is a Data Attribute. We want like when the user press any add to cart button, we just track the pressed button. that's why we used data attribute as it helps to sepereate the data.
// Data attribute must be start with keyword data-NameOfData = value 

// console.log(productsHtml);

document.querySelector('.allproduct').innerHTML = productsHtml;

document.querySelectorAll('.cartbtn').forEach((btn)=>{
    btn.addEventListener('click', ()=>{
        // dataset gives all the properties that are attached with the data Attribute. or the selected btn

        // console.log(btn.dataset.productName);       // productName is the property of the btn.datset

        // const productName = btn.dataset.productName ;   // There is a chance, some product may have same name so we should use ID of the prodcut that always unique.
        const productId = btn.dataset.productId ;   // There is a chance, some product may have same name so we should use ID of the prodcut that always unique.

        // Imp : When you use dataset, the browser automatically converts the HTML attribute name into camelCase. meanse if you write like user-name = userName similarly the product-id = productId .
        

        // cart.push({
        //     productName : productName,
        //     quantity : 1
        // })
        // console.log(cart);  // Here is a problem, when we press again the add to cart, same product added again rather than increasing the quantity.

        let machingItem;
        
        cart.forEach((item)=>{
            // if(productName === item.productName ){  // There is a chance, some product may have same name so we should use ID of the prodcut that always unique.
            if(productId === item.productId ){  // There is a chance, some product may have same name so we should use ID of the prodcut that always unique.
                machingItem = item ;
            }           
        })

         if(machingItem){
                machingItem.quantity += 1;
            }
            else{
                cart.push({
                    // productName : productName,
                    productId : productId,
                    quantity : 1
                })
            }

            console.log(cart);


    })
})
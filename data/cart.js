// const cart = [];

// export const cart = [{productid and the quantity that written below was here}]
export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){  // cart should not be null so it gives default value.
  cart = [{
    productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', // The first item's id.
    quantity : 2    // We are writing based on the checkout page.
},
{ // You may have question why i write only these two properties though checkout page has image,name,price etc. Because we can take it from our product.js file which has all data. and the product id here is needed because we can search on the product.js file through this productid.

    productId : '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity : 1
}];
    }



// [{
//     productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', // The first item's id.
//     quantity : 2    // We are writing based on the checkout page.
// },
// { // You may have question why i write only these two properties though checkout page has image,name,price etc. Because we can take it from our product.js file which has all data. and the product id here is needed because we can search on the product.js file through this productid.

//     productId : '15b6fc6f-327a-4ec4-896f-486349e85a3d',
//     quantity : 1
// }
// ];




let saveproductdata = ()=>{
  localStorage.setItem('cart', JSON.stringify(cart)); // when we refreshed the page, the product get back so we used it to store the updated (added or deleted) product in cart. So use it whereever the cart gets changed like in added and deleted.
}

// When we click the add to cart, the product should be add on the cart means our local storage so we have to use getItem as well to all the cart products because we want to store the data in cart. 


export let addTocart = (productId)=>{

  const SelectQuantity = document.querySelector(`.selectProduct-${productId}`)  // Default the DOM gives us String so we have to convert it into a number.
  const SelectedQuantity = Number(SelectQuantity.value);

  let machingItem;

  cart.forEach((item) => {
    // if(productName === item.productName ){  // There is a chance, some product may have same name so we should use ID of the prodcut that always unique.
    if (productId === item.productId) {  // There is a chance, some product may have same name so we should use ID of the prodcut that always unique.
      machingItem = item;
    }
  })

  if (machingItem) {
    machingItem.quantity += SelectedQuantity;
  }
  else {
    cart.push({
      // productName : productName,
      productId: productId,
      quantity: SelectedQuantity
    })
  }

  // At the top left cornner you can see the shop icon that usually shows the total cart that you cart. So first we make a variable and then store into the other cart. as like machingItem.

  let cartQuantity = 0;

  cart.forEach((item) => {
    cartQuantity += item.quantity;
  })

  console.log(cartQuantity);

  document.querySelector('.totalcart').innerHTML = cartQuantity;


  saveproductdata();

}

// Delete product from the cart.

export let removeproduct = ()=>{
  
  document.querySelectorAll('.deletebtn').forEach((dellink)=>{
    
    dellink.addEventListener("click",()=>{
      let productId = dellink.dataset.productId ;     // Data element in delete link to get the delete click product's id

      // All the addtocart product are stored in cart array. so first we have to remove the product from the cart array. and then remove from the html.
      // as we know the filter method takes the true value and delete the false value. so our item should not match with the other product, it's like we have a,b,c,d item and the user want to delete c item
      // a = b false, a = c true a = d false so only a = x will stay and the rest are removed.That's how you get the deleted product's localation.
      cart = cart.filter((item)=>{
        return item.productId !== productId;
      })
     
      const productHtml = document.querySelector(`.oneproduct-${productId}`)  // The parent containar that we wan to delete along with unique id to specify the product.
      if(productHtml){
        productHtml.remove();
      }

      // console.log(productHtml);
      
      saveproductdata();
    })
  })


}
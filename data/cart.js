// const cart = [];

export const cart = [{
    // See below , we have to write the exact object that we wrote before in line 30 and 31.
    productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', // The first item's id.
    quantity : 2    // We are writing based on the checkout page.
},
{ // You may have question why i write only these two properties though checkout page has image,name,price etc. Because we can take it from our product.js file which has all data. and the product id here is needed because we can search on the product.js file through this productid.

    productId : '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity : 1
}
];


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

}
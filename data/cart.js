// const cart = [];

export const cart = [];


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
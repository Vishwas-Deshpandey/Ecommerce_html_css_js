import { products } from "./data.js";



//  fetch the cart items and add in the array if available
let cart = [];
let cartValue = JSON.parse(localStorage.getItem('cart'));


// check wheather the cart is empty or null or not
isCart();




// fetch all the cart items
function fetchCartItems() {

  if (cartValue !== null) {
    cartValue.forEach(item => {
      let finds = products.find((c) => c.id === item.id)


      let cartItem = {
        id: finds.id,
        cartId:item.cartId,
        image: finds.imageUrl,
        title: finds.title,
        quantity: item.quantity,
        size: item.size,
        productPrice: finds.discountedPrice,
        subtotal: item.subtotal

      }
      cart.push(cartItem);
    })
  }
}


// show the cart items in the dom
function ShowCart() {
  let html = '';

  cart.forEach((cartItem, index) => {
    html += `  <tr>
        <td>${index + 1}</td>
        <td>
          <img
            src="${cartItem.image}"
            alt="${cartItem.title}"
            class="responsive-image"
          />
        </td>
        <td class="titleTr">${cartItem.title}</td>

        <td>
          <div style="width: 100%; text-align: center; border:none;">
          <div class="product-quantity" >
          <button id="decrease-${index}" data-id=${cartItem.cartId}>
            -
          </button>
          
          <input type="number" id="qty-${index}"  class="qty-input"  value="${cartItem.quantity}" readonly/>

          <button id="increase-${index}"  data-id=${cartItem.cartId}>
            +
          </button>
        </div>
        </div>

        </td>

        <td>${cartItem.size}</td>
        <td>${cartItem.productPrice}</td>
        <td>${cartItem.subtotal}</td>

        <td>
        <button class="bi-remove" data-id=${cartItem.id}>
          Remove
        </button>
        </td>
      
      </tr>`
  })

  document.querySelector("tbody").innerHTML = html;

  // add a event listener to fetch the id
  document.querySelectorAll('.bi-remove').forEach((button) => {
    button.addEventListener('click', (e) => {
      let id = e.target.dataset.id
      removeCartItemById(id)
    })
  })
}


// remove a specific cart item
function removeCartItemById(productId) {
  let id = parseInt(productId)
  // find product with this id in the cart

  let findProduct = cartValue.findIndex((item) => item.id === id)
  cartValue.splice(findProduct, 1)

  localStorage.setItem('cart', JSON.stringify(cartValue))
  window.location.reload()
}

// calculate the cart total and total items..
function cartTotal() {
  const totalPrices = cartValue.reduce((amt, cart) => amt + cart.subtotal, 0)
  const totlaItems = cartValue.reduce((qty, items) => qty + items.quantity, 0)

  let total = document.querySelector(".total-payment").childNodes
  let items = document.querySelector(".total-items").childNodes

  total[2].textContent = `₹ ${totalPrices}`
  items[2].textContent = totlaItems;
}

function isCart() {
  if (cartValue) {

    if (cartValue.length === 0) {
      document.querySelector(".cart-container").innerHTML = `<h1>No items to show you right Now</h1>`
    } else {
      fetchCartItems();
      ShowCart();
      cartTotal();
    }
  } else {
    document.querySelector(".cart-container").innerHTML = `<h1>No items to show you right Now</h1>`
  }
}

// change item quantity of cart


ChangeItemQuantity();


function ChangeItemQuantity() {
  let productQuantity = document.querySelectorAll(".product-quantity");

  productQuantity.forEach((product, index) => {

      let increase = document.querySelector(`#increase-${index}`)
      let quantity = document.querySelector(`#qty-${index}`);
      let decrease = document.querySelector(`#decrease-${index}`)

      increase.addEventListener('click', (e) => {
        let id = parseInt(e.target.dataset.id);

        let cartItem = cartValue.find((item) => parseInt(item.cartId) === id);
        let cartItemPrice = cart.find((item) => parseInt(item.cartId) === id)

        let price = cartItemPrice.productPrice;
        
        let value = parseInt(quantity.value);

        quantity.value = value + 1;

        // update quantity
        cartItem.quantity = quantity.value = value + 1;
        
        // update subtotal
        cartItem.subtotal = cartItem.quantity * price 

        localStorage.setItem('cart', JSON.stringify(cartValue))
        window.location.reload()
      })
      
      decrease.addEventListener('click', (e) => {
        let id = parseInt(e.target.dataset.id);
        let cartItem = cartValue.find((item) => parseInt(item.cartId) === id);

        let cartItemPrice = cart.find((item) => parseInt(item.cartId) === id)

        let price = cartItemPrice.productPrice;
        let value = parseInt(quantity.value);

        if (value <= 1) {
          quantity.readOnly = true
        }
        else {
        // update quantity
        cartItem.quantity = quantity.value = value - 1;
  
        // update subtotal
        cartItem.subtotal = cartItem.quantity * price
        localStorage.setItem('cart', JSON.stringify(cartValue))
        window.location.reload()
      }
      })
  })

}

import { products } from "./data.js";


let image = document.querySelector("img")
let title = document.querySelector(".title")
let Ptitle = document.querySelector(".p-title")
let category = document.querySelector("#category")
let description = document.querySelector("#description")
let stock = document.getElementById('Stock');
let size = document.getElementsByName('size')
let relatedImages = document.querySelector('.related-images');

let price = document.querySelector(".price")
let discount = document.querySelector('.discount')
let discountedPrice = document.querySelector('.discountPrice')
let increase = document.querySelector('#increase');
let quantity = document.querySelector("#qty")
let decrease = document.querySelector('#decrease');
let addinCart = document.querySelector("#addinCart");
let cartCount = document.querySelectorAll(".cartCount");


// get product id based on the viewd product
const queryString = window.location.search
const parms = new URLSearchParams(queryString);
const id = parms.get('id');



let cart = JSON.parse(localStorage.getItem('cart')) || [];


function FindProduct() {

  const product = products.find((product) => product.id === parseInt(id))

  image.src = product.imageUrl
  title.innerText = product.title
  Ptitle.innerText = product.brand
  category.innerText = product.category
  description.innerText = product.description

  // append all the related images
  product.relatedImages.forEach((relatedImage) => {
    let image = document.createElement('img');
    image.src = relatedImage,
    image.classList.add("related")
    relatedImages.append(image)
  })


  let purchasedProductQty = 0;
  if (purchasedProductQty > product.quantity) {
    stock.innerText = 'out of stock'
  } else {
    stock.innerText = 'in stock'
  }

  price.innerText = `₹ ${product.price}`
  discount.innerText = product.discountPersent ? `${product.discountPersent}%` : '0 %'
  discountedPrice.innerText = product.discountedPrice

}

//  change product quantity value

increase.addEventListener('click', () => {
  let value = parseInt(quantity.value)
  quantity.value = value + 1;
})

decrease.addEventListener('click', () => {
  let value = parseInt(quantity.value);

  if (value <= 1) {
    quantity.readOnly = true
  }
  else {
    quantity.value = value - 1;
  }
})


addinCart.addEventListener('click', addProductInCart);

function addProductInCart() {

  // check which radio button is selected first and add in selectedSize variable
  let selectedSize = ''
  let cartId = new Date().getTime().toString();

  // iterate a loop on size dom
  for (let i = 0; i < size.length; i++) {
    if (size[i].checked) {
      selectedSize = size[i].value
    }
  }

  // check existing cart item 
  let existingCartItem = cart.find((item) => item.id === parseInt(id))
  if (existingCartItem) {
    if (existingCartItem.size === selectedSize) {
      existingCartItem.quantity += parseInt(quantity.value)
      existingCartItem.subtotal = discountedPrice.textContent * existingCartItem.quantity
    }

    if (existingCartItem.size !== selectedSize) {
      const CartItem = {
        id: parseInt(id),
        cartId,
        quantity: parseInt(quantity.value),
        size: selectedSize,
        subtotal: discountedPrice.textContent * parseInt(quantity.value)
      }

      cart.push(CartItem);
    }
  } else {

    const CartItem = {
      id: parseInt(id),
      cartId,
      quantity: parseInt(quantity.value),
      size: selectedSize,
      subtotal: discountedPrice.textContent * parseInt(quantity.value)
    }

    cart.push(CartItem);
  }

  
  let totalItemsInTheCart = cart.reduce((quantity, item) => quantity + item.quantity, 0)

  cartCount.forEach((cartIcon) => {
    cartIcon.innerHTML = totalItemsInTheCart;
  })



  // add items in the cart
  localStorage.setItem('cart', JSON.stringify(cart))
}

FindProduct()

// append all the related images
let allImages = document.querySelectorAll('.related')
allImages.forEach((Relatedimage) => {
  Relatedimage.addEventListener('click', (e) => {
    image.src = e.target.src;
  })
})

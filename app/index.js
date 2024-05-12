import { products } from "./data.js";

function genrateProducts() {
    let productsContainer = document.getElementById("products-container");

    let dom = '';
    let url = window.location.pathname;

    products.forEach((p) => {
        dom += `
        <div class="product">
            <img
              src="${p.imageUrl}"
              alt=""
              class="product-image"
            />

            <h5 class="product-title">
             ${p.title}
            </h5>

            <div class="price-section">
              <p class="price">₹ ${p.price}</p>
              <p class="discountPrice">₹ ${p.discountedPrice}</p>
            </div>

            <a href=${url === '/pages/products.html' ? `productdetail.html?id=${p.id}&product=${encodeURIComponent(p.title)}` : `/pages/productdetail.html?id=${p.id}&product=${encodeURIComponent(p.title)}`} class="add-in-cart">about product</a>
          </div>
        `
    })

    productsContainer.innerHTML = dom
}

genrateProducts();

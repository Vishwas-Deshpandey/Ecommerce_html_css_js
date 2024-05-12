import { products } from "./data.js";




// flter products by search
function filterProductsBySearch() {
    let search = document.getElementById("search");

    search.addEventListener('keyup', (e) => {
        let dom = ''
        let values = e.target.value;
        let productsContainer = document.querySelector("#products-container")
        let searchProduct = products.filter((product) => product.brand.toLowerCase() === values.toLowerCase())

        if (searchProduct.length <= 0) {
            productsContainer.innerHTML = `<h2 class="center-class">finding <i class="fa-solid fa-magnifying-glass"></i> please continue to type.."${e.target.value}"</h2>`
        } else {
            dom = ''
            productsContainer.innerHTML = ''

            searchProduct.forEach((product) => {
                dom += `
                    <div class="product">
                        <img
                        src="${product.imageUrl}"
                        alt=""
                        class="product-image"
                        />
            
                        <h5 class="product-title">
                        ${product.title}
                        </h5>
            
                        <div class="price-section">
                        <p class="price">₹ ${product.price}</p>
                        <p class="discountPrice">₹ ${product.discountedPrice}</p>
                        </div>
            
                        <a href=${`productdetail.html?id=${product.id}&product=${encodeURIComponent(product.title)}`} class="add-in-cart">about product</a>
                    </div>
                    `
            })

            productsContainer.innerHTML = dom;
        }
        
        if(values === ''){
            window.location.reload();
        }
    })
}


// append categories
function appendCategories() {
    let arr = []
    let filterByCategory = document.querySelector("#filter-by-category");

    // get all the products category
    products.forEach((product) => {
        arr.push(product.category)
    })

    // remove the duplicate categories
    arr = [...new Set(arr)]

    // append the category in the DOM
    let html = '';

    arr.forEach((product, index) => {
        html += `
        <div class="filter-category">
            <input type="radio" name="category" value="${product}" id="category-${index}" /><label
            for="category-${index}">${product}</label>
      </div>
        `
    })
    filterByCategory.innerHTML = html

}


// filter products by category;
function filterProductsByCategory() {
    let dom = ''

    let filterCategory = document.querySelectorAll('.filter-category');
    let productsContainer = document.querySelector("#products-container")

    filterCategory.forEach(category => {

        category.children[0].addEventListener('click', (e) => {
            dom = ''
            productsContainer.innerHTML = ''
            let category_Value = e.target.value;

            let filteredProducts = products.filter((product) => product.category === category_Value)

            filteredProducts.forEach((product) => {
                dom += `
                <div class="product">
                    <img
                      src="${product.imageUrl}"
                      alt=""
                      class="product-image"
                    />
        
                    <h5 class="product-title">
                     ${product.title}
                    </h5>
        
                    <div class="price-section">
                      <p class="price">₹ ${product.price}</p>
                      <p class="discountPrice">₹ ${product.discountedPrice}</p>
                    </div>
        
                    <a href=${`productdetail.html?id=${product.id}&product=${encodeURIComponent(product.title)}`} class="add-in-cart">about product</a>
                  </div>
                `
            })

            productsContainer.innerHTML = dom;
        })
    })
}


function toogleFilter() {
    let filterIcon =document.querySelector(".fa-filter");
    let hideFilterClass = document.querySelectorAll(".hide-filters");

    filterIcon.addEventListener('click', () => {
        hideFilterClass.forEach((elem) => {
            elem.classList.toggle('hide-filters')
        })
    })
}


// this will open or hide the filter div
toogleFilter();
filterProductsBySearch()
appendCategories();
filterProductsByCategory();

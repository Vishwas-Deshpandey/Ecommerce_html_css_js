
let sideBar = document.getElementById('sideBar');
let openSideBar = document.querySelector('.open-side-bar');
let login = document.getElementById('login')
let responsiveLogin = document.getElementById('responsiveLogin')

sideBar.addEventListener('click', () => {
    openSideBar.classList.toggle('toogleClass')
})

login.addEventListener('click', (e) => {
    let account = document.querySelector('.account')
    account.classList.toggle('toogleClass')
})

responsiveLogin.addEventListener('click', (e) => {
    let account = document.querySelector('.account')
    account.classList.toggle('toogleClass')
    openSideBar.classList.toggle('toogleClass')
})


let registerForm = document.getElementById("registerForm");
let loginForm = document.getElementById('loginForm');
let toogleSignUp = document.getElementById("toogleSignUp");
let toogleLogin = document.getElementById('toogleLogin');

toogleLogin.addEventListener('click', () => {
    registerForm.style.display = 'none'
    loginForm.style.display = 'block'
})

toogleSignUp.addEventListener('click', () => {
    registerForm.style.display = 'block'
    loginForm.style.display = 'none'
})


loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let name = document.getElementById('name');
    let password = document.getElementById('password')
    name.value = ""
    password.value = ""
})


registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let userName = document.getElementById('userName');
    let your_password = document.getElementById('your_password')
    let confirmPassword = document.getElementById('confirmPassword')

    if (your_password.value === confirmPassword.value) {
        userName.value = ""
        your_password = ""
        confirmPassword = ""
    } else {
        alert("password does not matched")
    }
})


// show cart total items count;

let cartItems = JSON.parse(localStorage.getItem('cart'));
function showCartItemsCount(){
    let cartCount = document.querySelectorAll(".cartCount");
    let totalItemsInTheCart = cartItems.reduce((quantity, item) => quantity + item.quantity, 0)
    
    cartCount.forEach((cartIcon) => {
        cartIcon.innerHTML = totalItemsInTheCart;
    })
}




if (cartItems && cartItems.length !== 0) {
    showCartItemsCount()
}

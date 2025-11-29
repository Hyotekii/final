const cartContainer = document.getElementById("cart-container");
const cartTotal = document.getElementById("cart-total");

// Get cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

let total = 0;

cart.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
        <span>${item.name}</span>
        <span>$${item.price}</span>
    `;
    cartContainer.appendChild(div);

    total += parseFloat(item.price);
});

cartTotal.textContent = `Total: $${total.toFixed(2)}`;

document.getElementById("clear-cart").addEventListener("click", () => {
    localStorage.removeItem("cart");
    location.reload();
});
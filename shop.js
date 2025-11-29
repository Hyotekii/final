const shopButtons = document.querySelectorAll(".shop-btn");

shopButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        e.preventDefault();

        const itemName = button.dataset.name;
        const itemPrice = button.dataset.price;

        // Get current cart from localStorage
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Add new item
        cart.push({ name: itemName, price: itemPrice });

        // Save back to localStorage
        localStorage.setItem("cart", JSON.stringify(cart));

        alert(`${itemName} added to cart!`);
    });
});
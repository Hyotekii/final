const div = document.querySelector(".main-title");
const cursor = document.createElement("span");
cursor.classList.add("cursor");
div.appendChild(cursor);
const texts = [
  "Welcome to ARuns",
  "This is where it all starts",
  "Made by Aim Cosa"
];

let textIndex = 0;

function textTypingEffect(element, text, i = 0) {
  element.textContent += text[i];

  if (i === text.length - 1) {
    setTimeout(() => textDeletingEffect(element, text, text.length - 1), 1000);
    return;
  }

  setTimeout(() => textTypingEffect(element, text, i + 1), 100);
}

function textDeletingEffect(element, text, i) {
  element.textContent = text.substring(0, i);

  if (i === 0) {
    textIndex = (textIndex + 1) % texts.length;
    setTimeout(() => textTypingEffect(element, texts[textIndex], 0), 1000);
    return;
  }

  setTimeout(() => textDeletingEffect(element, text, i - 1), 100);
}

textTypingEffect(div, texts[textIndex]);

/*---------------------cart----------------------*/
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
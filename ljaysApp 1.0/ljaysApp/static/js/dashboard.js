let cart = {};
function updateCartDisplay() {
    const cartList = document.getElementById("cart-items");
    cartList.innerHTML = "";

    let total = 0;
    let itemsSummary = [];

    for (let item in cart) {
        const entry = document.createElement("li");
        entry.textContent = `${item} (x${cart[item].count}) - ₱${cart[item].total}`;
        cartList.appendChild(entry);
        total += cart[item].total;
        itemsSummary.push(`${item} x${cart[item].count}`);
    }

    document.getElementById("cart-total").textContent = `Total: ₱${total}`;
    document.getElementById("cart-items-input").value = itemsSummary.join(", ");
    document.getElementById("total-price-input").value = total;
}

function addToCart(packageName, price) {
    if (!cart[packageName]) {
        cart[packageName] = { count: 1, total: price };
    } 
    else {
        cart[packageName].count += 1;
        cart[packageName].total += price;
    }
    updateCartDisplay();
}

function removeFromCart(packageName, price) {
    if (cart[packageName]) {
        cart[packageName].count -= 1;
        cart[packageName].total -= price;

        if (cart[packageName].count <= 0) delete cart[packageName];
    }
    updateCartDisplay();
}

window.onload = function () {
    updateCartDisplay();
};
function fetchItems() {
    fetch("/items-json/") // Endpoint to fetch items from the server
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const container = document.querySelector(".container");

            // Clear existing items
            container.innerHTML = "";

            // Add new items
            if (data.length === 0) {
                container.innerHTML = `<p>No items available.</p>`;
            } else {
                data.forEach(item => {
                    const itemElement = document.createElement("div");
                    itemElement.classList.add("menu-item");

                    itemElement.innerHTML = `
                        <div class="item-info">
                            <h3>${item.name}</h3>
                            <img src="/static/img/${item.item_id}.jpg" alt="${item.name}" class="item-image" onerror="this.src='/static/img/default.png'">
                        </div>
                        <p class="price">Starts at: ₱<span id="${item.item_id}_price">${item.price}</span></p>
                        <div class="quantity-controls">
                            <span>Quantity: <span id="${item.item_id}_qty_display">0</span></span>
                            <div class="buttons">
                                <button type="button" onclick="updateQuantity('${item.item_id}', -1, ${item.price})">-</button>
                                <button type="button" onclick="updateQuantity('${item.item_id}', 1, ${item.price})">+</button>
                            </div>
                        </div>
                        <input type="hidden" id="${item.item_id}_qty" name="${item.item_id}_qty" value="0">
                    `;

                    container.appendChild(itemElement); // Append the item to the container
                });
            }
        })
        .catch(error => console.error("Error fetching items:", error));
}

// Function to update quantity and total price
function updateQuantity(itemId, change, price) {
    const qtyInput = document.getElementById(`${itemId}_qty`);
    const qtyDisplay = document.getElementById(`${itemId}_qty_display`);

    // Get current quantity
    let currentQty = parseInt(qtyInput.value) || 0;

    // Update quantity
    currentQty += change;

    // Ensure quantity is not negative
    if (currentQty < 0) {
        currentQty = 0;
    }

    // Update the DOM
    qtyInput.value = currentQty;
    qtyDisplay.textContent = currentQty;

    // Update totals
    updateTotals();
}

// Function to update total quantity and total price
function updateTotals() {
    let totalQty = 0;
    let totalPrice = 0;

    // Loop through all items and calculate totals
    document.querySelectorAll(".menu-item").forEach(item => {
        const qty = parseInt(item.querySelector("input[type='hidden']").value) || 0;
        const price = parseFloat(item.querySelector(".price span").textContent) || 0;

        totalQty += qty;
        totalPrice += qty * price;
    });

    // Update totals in the DOM
    document.getElementById("total_qty").textContent = totalQty;
    document.getElementById("total_price").textContent = `₱${totalPrice.toFixed(2)}`;
}

// Function to clear all fields and reset the form
function clearFields() {
    // Reset all quantities to 0
    document.querySelectorAll(".menu-item").forEach(item => {
        const qtyInput = item.querySelector("input[type='hidden']");
        const qtyDisplay = item.querySelector("span[id$='_qty_display']");

        qtyInput.value = 0;
        qtyDisplay.textContent = 0;
    });

    // Reset totals
    document.getElementById("total_qty").textContent = 0;
    document.getElementById("total_price").textContent = "₱0.00";

    // Reset the form fields
    const form = document.querySelector("form");
    if (form) {
        form.reset();
    }
}

// Function to toggle select all checkboxes
function toggleSelectAll(selectAllCheckbox) {
    const checkboxes = document.querySelectorAll(".order-checkbox");
    checkboxes.forEach(checkbox => {
        if (!checkbox.disabled) {
            checkbox.checked = selectAllCheckbox.checked;
        }
    });
}

setInterval(fetchItems, 15000);

// Initial fetch
fetchItems();
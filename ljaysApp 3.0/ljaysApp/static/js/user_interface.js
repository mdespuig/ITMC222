let unitPrices = {}; // Store unit prices dynamically fetched from the server

function clearFields() {
    document.getElementById("insertForm").reset();
}

function toggleSelectAll(selectAllCheckbox) {
            // Get all checkboxes with the class 'user-checkbox'
            const checkboxes = document.querySelectorAll('.user-checkbox');

            // Set the checked state of each checkbox to match the "Select All" checkbox
            checkboxes.forEach(checkbox => {
                if (!checkbox.disabled) { // Only toggle checkboxes that are not disabled
                    checkbox.checked = selectAllCheckbox.checked;
                }
            });
        }

function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('collapsed');
}

function enableEdit() {
    document.getElementById('display-section').style.display = 'none';
    document.getElementById('edit-form').style.display = 'block';
    togglePositionField();
}

function cancelEdit() {
    window.location.reload();
}

function togglePositionField() {
    const userType = document.getElementById('user_type').value;
    const positionField = document.getElementById('position');
    positionField.disabled = (userType === 'customer');
}

function updateQuantity(id, change) {
    const qtyInput = document.getElementById(`${id}_qty`);
    const qtyDisplay = document.getElementById(`${id}_qty_display`);
    const priceSpan = document.getElementById(`${id}_price`);

    let qty = parseInt(qtyInput.value) + change;
    if (qty < 0) qty = 0;

    qtyInput.value = qty;
    qtyDisplay.textContent = qty;

    updateTotals();
}

function updateTotals() {
    let totalQty = 0;
    let totalPrice = 0;

    for (const id in unitPrices) {
        const qty = parseInt(document.getElementById(`${id}_qty`).value) || 0;
        totalQty += qty;
        totalPrice += qty * unitPrices[id];
    }

    document.getElementById("total_qty").textContent = totalQty;
    document.getElementById("total_price").textContent = `₱${totalPrice.toFixed(2)}`;
}

document.addEventListener("DOMContentLoaded", () => {
    fetchUnitPrices();

    const form = document.querySelector("form");
    form.addEventListener("reset", () => {
        setTimeout(() => {
            for (const id in unitPrices) {
                document.getElementById(`${id}_qty_display`).textContent = '0';
                document.getElementById(`${id}_qty`).value = '0';
            }
            document.getElementById("total_qty").textContent = '0';
            document.getElementById("total_price").textContent = '₱0';
        }, 0);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const selectAllCheckbox = document.getElementById('select-all');
    const orderCheckboxes = document.querySelectorAll('.order-checkbox');

    selectAllCheckbox.addEventListener('change', function () {
      orderCheckboxes.forEach(cb => {
        cb.checked = selectAllCheckbox.checked;
      });
    });
  });

function showOrderNamePrompt() {
    document.getElementById('orderNamePrompt').style.display = 'block';
    document.getElementById('submitOrderButton').style.display = 'none';
}

function cancelOrderNamePrompt() {
    document.getElementById('orderNamePrompt').style.display = 'none';
    document.getElementById('submitOrderButton').style.display = 'inline-block';
}

document.addEventListener("DOMContentLoaded", function () {
    const sectionButtons = document.querySelectorAll(".tab-btn");
    const sectionContents = document.querySelectorAll(".tab-content");

    const defaultSection = document.getElementById("menu-section");
    if (defaultSection) {
        defaultSection.style.display = "block";
    }

    sectionButtons.forEach(button => {
        button.addEventListener("click", () => {
            const targetId = button.getAttribute("data-category");

            sectionButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            sectionContents.forEach(content => {
                content.classList.remove("active");
                content.style.display = "none";
            });

            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add("active");
                targetSection.style.display = "block";
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");
    const greeting = document.getElementById("dashboard-greeting");

    tabContents.forEach(content => content.style.display = "none");

    greeting.style.display = "block";

    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            const category = button.getAttribute("data-category");

            tabContents.forEach(content => content.style.display = "none");

            const targetContent = document.getElementById(category);
            if (targetContent) {
                targetContent.style.display = "block";
            }

            if (category === "order-packages-section") {
                greeting.style.display = "block";
            } else if (category === "transactions-section") {
                greeting.style.display = "none";
            } else {
                greeting.style.display = "block";
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const mainDishesButton = document.querySelector(".tab-btn[data-category='main-dishes']");
    const mainDishesSection = document.getElementById("main-dishes-section");
    const riceSection = document.getElementById("rice-section");
    const beverageSection = document.getElementById("beverage-section");

    if (mainDishesSection) {
        mainDishesSection.style.display = "block";
    }
    if (riceSection) {
        riceSection.style.display = "none";
    }
    if (beverageSection) {
        beverageSection.style.display = "none";
    }

    mainDishesButton.addEventListener("click", () => {
        mainDishesSection.style.display = "block";
        riceSection.style.display = "none";
        beverageSection.style.display = "none";
    });

    document.querySelector(".tab-btn[data-category='rice']").addEventListener("click", () => {
        mainDishesSection.style.display = "none";
        riceSection.style.display = "block";
        beverageSection.style.display = "none";
    });

    document.querySelector(".tab-btn[data-category='beverage']").addEventListener("click", () => {
        mainDishesSection.style.display = "none";
        riceSection.style.display = "none";
        beverageSection.style.display = "block";
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const orderManagementButton = document.querySelector(".tab-btn[data-category='order-packages-section']");
    const mainDishesButton = document.querySelector(".tab-btn[data-category='main-dishes']");
    const mainDishesSection = document.getElementById("main-dishes-section");
    const riceSection = document.getElementById("rice-section");
    const beverageSection = document.getElementById("beverage-section");

    orderManagementButton.addEventListener("click", () => {
        if (mainDishesSection) {
            mainDishesSection.style.display = "block";
        }
        if (riceSection) {
            riceSection.style.display = "none";
        }
        if (beverageSection) {
            beverageSection.style.display = "none";
        }

        mainDishesButton.classList.add("active");
    });

    mainDishesButton.addEventListener("click", () => {
        mainDishesSection.style.display = "block";
        riceSection.style.display = "none";
        beverageSection.style.display = "none";
    });

    document.querySelector(".tab-btn[data-category='rice']").addEventListener("click", () => {
        mainDishesSection.style.display = "none";
        riceSection.style.display = "block";
        beverageSection.style.display = "none";
    });

    document.querySelector(".tab-btn[data-category='beverage']").addEventListener("click", () => {
        mainDishesSection.style.display = "none";
        riceSection.style.display = "none";
        beverageSection.style.display = "block";
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const orderManagementButton = document.querySelector(".btn_active");
    const mainDishesSection = document.getElementById("main-dishes");
    const riceSection = document.getElementById("rice");
    const beverageSection = document.getElementById("beverages");
    const mainDishesTabButton = document.querySelector(".tab-btn[data-category='main-dishes']");

    if (orderManagementButton) {
        orderManagementButton.addEventListener("click", () => {
            if (mainDishesSection) {
                mainDishesSection.style.display = "block";
            }
            if (riceSection) {
                riceSection.style.display = "none";
            }
            if (beverageSection) {
                beverageSection.style.display = "none";
            }

            if (mainDishesTabButton) {
                mainDishesTabButton.classList.add("active");
            }
        });
    }

    mainDishesTabButton.addEventListener("click", () => {
        mainDishesSection.style.display = "block";
        riceSection.style.display = "none";
        beverageSection.style.display = "none";
    });

    document.querySelector(".tab-btn[data-category='rice']").addEventListener("click", () => {
        mainDishesSection.style.display = "none";
        riceSection.style.display = "block";
        beverageSection.style.display = "none";
    });

    document.querySelector(".tab-btn[data-category='beverages']").addEventListener("click", () => {
        mainDishesSection.style.display = "none";
        riceSection.style.display = "none";
        beverageSection.style.display = "block";
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const orderManagementTabs = document.querySelectorAll(".order-tab-btn");
    const mainDishesSection = document.getElementById("main-dishes");
    const riceSection = document.getElementById("rice");
    const beveragesSection = document.getElementById("beverages");

    if (mainDishesSection) {
        mainDishesSection.style.display = "block";
    }
    if (riceSection) {
        riceSection.style.display = "none";
    }
    if (beveragesSection) {
        beveragesSection.style.display = "none";
    }

    orderManagementTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const category = tab.getAttribute("data-category");

            if (mainDishesSection) mainDishesSection.style.display = "none";
            if (riceSection) riceSection.style.display = "none";
            if (beveragesSection) beveragesSection.style.display = "none";

            if (category === "main-dishes" && mainDishesSection) {
                mainDishesSection.style.display = "block";
            } else if (category === "rice" && riceSection) {
                riceSection.style.display = "block";
            } else if (category === "beverages" && beveragesSection) {
                beveragesSection.style.display = "block";
            }

            orderManagementTabs.forEach(btn => btn.classList.remove("active"));
            tab.classList.add("active");
        });
    });
});

const shoppingCart = {};

function modifyItemQuantity(itemId, quantityChange) {
    const quantityDisplayElement = document.getElementById(`${itemId}_quantity_display`);
    const quantityInputElement = document.getElementById(`${itemId}_quantity_input`);
    const itemUnitPrice = parseFloat(document.getElementById(`${itemId}_unit_price`).textContent);
    const itemName = document.querySelector(`#${itemId}_unit_price`).closest('.menu-item').querySelector('h3').textContent;

    if (!shoppingCart[itemId]) {
        shoppingCart[itemId] = { quantity: 0, unitPrice: itemUnitPrice, name: itemName };
    }
    shoppingCart[itemId].quantity += quantityChange;

    if (shoppingCart[itemId].quantity < 0) {
        shoppingCart[itemId].quantity = 0;
    }

    quantityDisplayElement.textContent = shoppingCart[itemId].quantity;
    quantityInputElement.value = shoppingCart[itemId].quantity;

    refreshShoppingCart();
}

function refreshShoppingCart() {
    const cartTableBody = document.querySelector('#cart-items tbody');
    const totalQuantityElement = document.getElementById('cart_total_quantity');
    const totalPriceElement = document.getElementById('cart_total_price');
    const cartItemsInputElement = document.getElementById('cart-items-input');
    const totalPriceInputElement = document.getElementById('total-price-input');

    cartTableBody.innerHTML = '';

    let totalQuantity = 0;
    let totalPrice = 0;

    for (const itemId in shoppingCart) {
        const cartItem = shoppingCart[itemId];
        if (cartItem.quantity > 0) {
            const itemSubtotal = cartItem.quantity * cartItem.unitPrice;
            totalQuantity += cartItem.quantity;
            totalPrice += itemSubtotal;

            const numericId = itemId.replace('order_', '');

            const tableRow = document.createElement('tr');
            tableRow.innerHTML = `
                <td>${numericId}</td>
                <td>${cartItem.name}</td>
                <td>${cartItem.quantity}</td>
                <td>₱${itemSubtotal.toFixed(2)}</td>
            `;
            cartTableBody.appendChild(tableRow);
        }
    }

    totalQuantityElement.textContent = totalQuantity;
    totalPriceElement.textContent = `₱${totalPrice.toFixed(2)}`;

    cartItemsInputElement.value = JSON.stringify(shoppingCart);
    totalPriceInputElement.value = totalPrice.toFixed(2);
}

function resetShoppingCart() {
    for (const itemId in shoppingCart) {
        shoppingCart[itemId].quantity = 0;
    }
    refreshShoppingCart();
    document.querySelectorAll('[id$="_quantity_display"]').forEach(el => el.textContent = '0');
    document.querySelectorAll('[id$="_quantity_input"]').forEach(el.value = '0');
}

function fetchUsers() {
    const searchQuery = document.querySelector('input[name="search"]').value.trim(); // Get the current search query
    const url = searchQuery ? `/users-json/?search=${encodeURIComponent(searchQuery)}` : "/users-json/";

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector("#users table tbody");
            tableBody.innerHTML = "";

            if (data.length === 0) {
                tableBody.innerHTML = `<tr><td colspan="4">No users found.</td></tr>`;
            } else {
                data.forEach(user => {
                    const row = `
                        <tr>
                            <td><input type="checkbox" class="user-checkbox" name="user_${user.id}" ${!user.is_superuser ? "" : "disabled"}></td>
                            <td><a href="/user/${user.id}/">${user.username}</a></td>
                            <td>${user.id}</td>
                            <td>${user.is_staff ? "Staff" : "Customer"}</td>
                        </tr>
                    `;
                    tableBody.innerHTML += row;
                });
            }
        })
        .catch(error => console.error("Error fetching users:", error));
}

setInterval(fetchUsers, 15000);

fetchUsers();

function prepareCartData() {
    const cartItems = {};
    const rows = document.querySelectorAll("#cart-items tbody tr");

    rows.forEach(row => {
        const itemId = row.querySelector(".item-id").textContent.trim();
        const packageName = row.querySelector(".package-name").textContent.trim();
        const quantity = parseInt(row.querySelector(".quantity").textContent.trim());
        const unitPrice = parseFloat(row.querySelector(".subtotal").textContent.trim().replace("₱", ""));

        cartItems[itemId] = {
            name: packageName,
            quantity: quantity,
            unit_price: unitPrice
        };
    });

    const totalPrice = parseFloat(document.getElementById("cart_total_price").textContent.replace("₱", ""));

    // Populate hidden input fields
    document.getElementById("cart-items-input").value = JSON.stringify(cartItems);
    document.getElementById("total-price-input").value = totalPrice.toFixed(2);
}

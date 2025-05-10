function clearFields() {
    document.getElementById("insertForm").reset();
}

function toggleSelectAll(source) {
    let checkboxes = document.querySelectorAll('.user-checkbox');
    checkboxes.forEach(cb => cb.checked = source.checked);
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

    const unitPrices = {
        adobo: 120,
        chicken: 110,
        sisig: 130,
        pizza: 200,
        menudo: 150,
        afritada: 130,
        kaldereta: 150,
        beefsteak: 120,
        bbq: 100,
        embutido: 130,
        lumpia: 100,
        pancit: 100,
        curry: 150,
        fillet: 130,
        spaghetti: 100,

        plain_rice: 20,
        fried_rice: 30,
        kimchi_rice: 30,

        mango: 100,
        orange: 100,
        cucumber: 100,
        melon: 100,
        buko: 100,
        iced_tea: 115,
        blue_lemonade: 115,
        pepsi: 75,
        mountaindew: 75,
        seven_up: 75,
    };

    let qty = parseInt(qtyInput.value) + change;
    if (qty < 0) qty = 0;

    qtyInput.value = qty;
    qtyDisplay.textContent = qty;    

    updateTotals(unitPrices);
}

function updateTotals(unitPrices) {
    let totalQty = 0;
    let totalPrice = 0;

    for (const id in unitPrices) {
        const qty = parseInt(document.getElementById(`${id}_qty`).value);
        totalQty += qty;
        totalPrice += qty * unitPrices[id];
    }

    document.getElementById("total_qty").textContent = totalQty;
    document.getElementById("total_price").textContent = `₱${totalPrice}`;
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    const unitPrices = {
        adobo: 120,
        chicken: 110,
        sisig: 130,
        pizza: 200,
        menudo: 150,
        afritada: 130,
        kaldereta: 150,
        beefsteak: 120,
        bbq: 100,
        embutido: 130,
        lumpia: 100,
        pancit: 100,
        curry: 150,
        fillet: 130,
        spaghetti: 100,

        plain_rice: 20,
        fried_rice: 30,
        kimchi_rice: 30,

        mango: 100,
        orange: 100,
        cucumber: 100,
        melon: 100,
        buko: 100,
        iced_tea: 115,
        blue_lemonade: 115,
        pepsi: 75,
        mountaindew: 75,
        seven_up: 75
    };

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

document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".tab-btn");
    const contents = document.querySelectorAll(".tab-content");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const target = button.getAttribute("data-category");

            buttons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            contents.forEach(content => content.classList.remove("active"));

            const targetDiv = document.getElementById(target);
            if (targetDiv) {
                targetDiv.classList.add("active");
            }
        });
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
    fetch("/users-json/")
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector("#users table tbody");
            tableBody.innerHTML = ""; // Clear existing rows

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

// Fetch users every 5 seconds
setInterval(fetchUsers, 5000);

// Initial fetch
fetchUsers();

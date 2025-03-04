document.addEventListener("DOMContentLoaded", () => {
    const productsContainer = document.getElementById("products-container");
    const adminProductsContainer = document.getElementById("admin-products");
    const productForm = document.getElementById("product-form");

    function getProducts() {
        return JSON.parse(localStorage.getItem("products")) || [];
    }

    function saveProducts(products) {
        localStorage.setItem("products", JSON.stringify(products));
    }

    function displayProducts() {
        if (productsContainer) {
            const products = getProducts();
            productsContainer.innerHTML = products.map((product, index) => `
                <div class="product">
                    <img src="${product.image}" alt="${product.name}">
                    <h2>${product.name}</h2>
                    <p>Price: ₹${product.price}</p>
                    <a href="https://wa.me/?text=I'm%20interested%20in%20${product.name}" target="_blank">
                        Buy on WhatsApp
                    </a>
                </div>
            `).join("");
        }
    }

    function displayAdminProducts() {
        if (adminProductsContainer) {
            const products = getProducts();
            adminProductsContainer.innerHTML = products.map((product, index) => `
                <div class="product">
                    <img src="${product.image}" alt="${product.name}">
                    <h2>${product.name}</h2>
                    <p>Price: ₹${product.price}</p>
                    <button onclick="deleteProduct(${index})">Delete</button>
                </div>
            `).join("");
        }
    }

    if (productForm) {
        productForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const name = document.getElementById("product-name").value;
            const price = document.getElementById("product-price").value;
            const image = document.getElementById("product-image").value;

            const products = getProducts();
            products.push({ name, price, image });
            saveProducts(products);
            displayAdminProducts();
            productForm.reset();
        });
    }

    window.deleteProduct = function(index) {
        const products = getProducts();
        products.splice(index, 1);
        saveProducts(products);
        displayAdminProducts();
    };

    displayProducts();
    displayAdminProducts();
});

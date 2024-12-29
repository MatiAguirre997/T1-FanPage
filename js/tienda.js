// Productos de la tienda
const products = [
    {
        id: 1,
        name: "Camiseta T1 2024",
        price: 89.99,
        image: "../IMG/productos/camiseta.jpg",
        description: "Camiseta oficial de T1 temporada 2024"
    },
    {
        id: 2,
        name: "Hoodie T1",
        price: 129.99,
        image: "../IMG/productos/hoodie.jpg",
        description: "Hoodie oficial de T1"
    },
    {
        id: 3,
        name: "Mouse Pad T1",
        price: 24.99,
        image: "../IMG/productos/mousepad.jpg",
        description: "Mouse pad gaming profesional T1"
    },
    {
        id: 4,
        name: "Llavero Lol",
        price: 9.99,
        image: "../IMG/productos/llavero.jpg",
        description: "Llavero metálico con logo de T1"
    },
    {
        id: 5,
        name: "Mochila Lol",
        price: 79.99,
        image: "../IMG/productos/mochila.jpg",
        description: "Mochila gaming con compartimento para laptop"
    },
];

// Carrito de compras
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Función para renderizar productos
function renderProducts() {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = products.map(product => `
        <div class="card">
            <img src="${product.image}" class="card-img-top" alt="${product.name}">
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="product-price">$${product.price}</p>
                <button class="btn btn-primary" onclick="addToCart(${product.id})">
                    Agregar al carrito
                </button>
            </div>
        </div>
    `).join('');
}

// Función para agregar al carrito
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

// Función para actualizar el carrito
function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
}

// Función para renderizar el carrito
function renderCart() {
    const cartContainer = document.getElementById('cartItems');
    cartContainer.innerHTML = cart.map(item => `
        <div class="cart-item mb-3">
            <h6>${item.name}</h6>
            <p>Precio: $${item.price}</p>
            <div class="quantity-controls">
                <button class="btn btn-sm btn-secondary" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                <span class="mx-2">${item.quantity}</span>
                <button class="btn btn-sm btn-secondary" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                <button class="btn btn-sm btn-danger ms-2" onclick="removeFromCart(${item.id})">Eliminar</button>
            </div>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cartTotal').textContent = total.toFixed(2);
}

// Función para actualizar cantidad
function updateQuantity(productId, newQuantity) {
    if (newQuantity < 1) {
        removeFromCart(productId);
        return;
    }

    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity = newQuantity;
        updateCart();
    }
}

// Función para eliminar del carrito
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Función para actualizar el contador del carrito
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
}

// Inicializar la página
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    renderCart();
    updateCartCount();
}); 
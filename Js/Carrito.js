let carrito = [];
let subtotal = 0;
let total = 0;
let iva = 0;

// Función para agregar productos al carrito
function agregarAlCarrito(producto) {
    const productoExistente = carrito.find(item => item.name === producto.name);
    
    // Si ya está en el carrito, aumenta la cantidad
    if (productoExistente) {
        productoExistente.quantity++;
    } else {
        // Agregar el producto al carrito con cantidad 1
        carrito.push({ ...producto, quantity: 1 });
    }

    actualizarTotales();
    actualizarCarrito(); // Actualizar la visualización del carrito
}

// Función para actualizar los totales
function actualizarTotales() {
    subtotal = carrito.reduce((acc, item) => acc + item.price * item.quantity, 0);
    iva = subtotal * 0.13; // 13% IVA
    total = subtotal + iva; // Total incluyendo IVA
}

// Actualizar la visualización del carrito
function actualizarCarrito() {
    const cartBtn = document.getElementById('cart-btn');
    const cartItems = document.getElementById('cart-items');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartTax = document.getElementById('cart-tax');
    const cartTotal = document.getElementById('cart-total');

    if (cartBtn) cartBtn.innerText = `Carrito (${carrito.length})`;
    if (cartItems) {
        cartItems.innerHTML = ''; // Limpiar elementos del carrito

        carrito.forEach(item => {
            let li = document.createElement('li');
            li.innerText = `${item.name} - ₡${item.price} - Cantidad: ${item.quantity}`;
            cartItems.appendChild(li);
        });
    }
    if (cartSubtotal) cartSubtotal.innerText = subtotal.toFixed(2);
    if (cartTotal) cartTotal.innerText = total.toFixed(2);
    if (cartTax) cartTax.innerText = iva.toFixed(2);
}

// Mostrar/Ocultar carrito
document.addEventListener('DOMContentLoaded', function() {
    const cartBtn = document.getElementById('cart-btn');
    if (cartBtn) {
        cartBtn.addEventListener('click', function() {
            const cart = document.getElementById('cart');
            if (cart) cart.style.display = cart.style.display === 'none' ? 'block' : 'none';
        });
    }

    // Agregar eventos a los botones "Añadir al carrito"
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const producto = {
                name: this.dataset.name,
                price: parseFloat(this.dataset.price)
            };
            agregarAlCarrito(producto);
        });
    });
});

// Función para finalizar la compra
function finalizarCompra() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (carrito.length === 0) {
        alert('El carrito está vacío');
        return;
    }

    let productos = JSON.parse(localStorage.getItem('products')) || [];
    let compraValida = true;

    // Verificar stock y descontar productos del inventario
    carrito.forEach(item => {
        let producto = productos.find(p => p.name === item.name);
        if (producto) {
            if (producto.quantity >= item.quantity) {
                producto.quantity -= item.quantity;
            } else {
                compraValida = false;
                alert(`No hay suficiente stock para ${item.name}`);
            }
        }
    });

    if (compraValida) {
        let comprasRealizadas = JSON.parse(localStorage.getItem('comprasRealizadas')) || [];
        let nuevaCompra = {
            usuario: loggedInUser,
            productos: carrito,
            total: total.toFixed(2),
            fecha: new Date().toLocaleString()
        };

        comprasRealizadas.push(nuevaCompra);
        localStorage.setItem('comprasRealizadas', JSON.stringify(comprasRealizadas));
        localStorage.setItem('products', JSON.stringify(productos));

        carrito = []; // Limpiar el carrito después de la compra
        actualizarTotales();
        actualizarCarrito(); // Actualizar visualización

        alert('Compra realizada con éxito');
    }
}

// Evento para finalizar compra
document.addEventListener('DOMContentLoaded', function() {
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            const loggedInUser = localStorage.getItem('loggedInUser');
            if (!loggedInUser) {
                alert('Debes iniciar sesión para realizar una compra');
                window.location.href = '../HTML/login.html'; // Redirigir a la página de Login
                return;
            }
            finalizarCompra();
        });
    }
});

// Manejar el menú hamburguesa
const hamburgerBtn = document.getElementById('hamburger-btn');
if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', function() {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            navbar.classList.toggle('active'); // Activa o desactiva la clase "active"
        }
    });
}
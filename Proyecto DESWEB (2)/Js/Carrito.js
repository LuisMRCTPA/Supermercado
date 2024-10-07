let carrito = [];
let subtotal = 0;
let total = 0;
let iva = 0; 
function agregarAlCarrito(producto) {
    const productoExistente = carrito.find(item => item.name === producto.name);
    if (productoExistente) {
        if(productoExistente.quantity < producto.quantity) {
            productoExistente.quantity++;
        } else {
            alert('No hay mas stock disponible para este producto');
        }
    } else {
        carrito.push({...producto, quantity: 1});
    }
    subtotal += parseFloat(producto.price);
    iva = subtotal*0.13;
    total = subtotal + (subtotal * 0.13);
    actualizarCarrito();
}
function actualizarCarrito() {
    const cartBTN = document.getElementById('cart-btn');
    const cartItems = document.getElementById('cart-items');
    const cartSubTotal = document.getElementById('cart-subtotal');
    const cartTax = document.getElementById('cart-tax');
    const cartTotal = document.getElementById('cart-total');

    if (cartBTN) cartBTN.innerText = `Carrito (${carrito.length})`;
    if (cartItems) {
        cartItems.innerHTML = '';
        carrito.forEach(item => {
            let li = document.createElement('li');
            li.innerText = `${item.name} - ${item.price} - Cantidad: ${item.quantity}`;
            cartItems.appendChild(li);
        });
    }
    if (cartSubTotal) cartSubTotal.innerText = subtotal.toFixed(2);
    if (cartTotal) cartTotal.innerText = total.toFixed(2);
    if (cartTax) cartTax.innerText = iva.toFixed(2);
}
document.addEventListener('DOMContentLoaded',function() {
    const cartBTN = this.document.getElementById('cart-btn');
    if (cartBTN) {
        cartBTN.addEventListener('click', function () {
            const cart = document.getElementById('cart');
            if (cart) cart.style.display = cart.style.display === 'none' ? 'block' : 'none';
        });
    }
});
function finalizarCompra(){
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (carrito.length === 0){
        alert('El Carrito esta vacio wey');
        return;
    }
    let Products = JSON.parse(localStorage.getItem('products')) || [];
    let compraValida = true; 
    carrito.forEach(item=> {
    let producto = productos.find(p => p.name === item.name);
    if (producto) {
        if (producto.quantity -= item.quantity) {
            producto.quantity -= item.quantity;
        } else {
            compraValida = false;
            alert(`No hay de ${item.name} Mi Rey`)
        }
    }
    });
    if(compraValida) {
        let compraRealizadas = JSON.parse(localStorage.getItem('comprasRealizadas')) || [];
        let nuevaCompra = {
            usuario: loggedInUser,
            productos: carrito,
            total: total.toFixed(2),
            fecha: new Date().toLocaleString()
        };
        compraRealizadas.push(nuevaCompra);
        localStorage.setItem('comprasRealizadas', JSON.stringify(compraRealizadas));
        localStorage.setItem('products', JSON.stringify(productos));
        carrito =[];
        subtotal = 0;
        iva = 0;
        total = 0;
        actualizarCarrito();
        alert('Compra lograda wey')
        }
}
document.addEventListener('DOMContentLoaded', function() {
    const checkoutBTN = document.getElementById('checkoutBTN');
    if (checkoutBTN) {
    checkoutBTN.addEventListener('click',function(){
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
            alert ('se requiere iniciar sesion para comprar');
            window.location.href = '../html/login.html';
            return;
        }
    })
    }
})
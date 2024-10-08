function addProduct(event) {
    event.preventDefault();
    const name = document.getElementById('product-name').value;
    const price = document.getElementById('product-price').value;
    const description = document.getElementById('product-description').value;
    const quantity = document.getElementById('product-quantity').value;
    const imageFile = document.getElementById('product-image').files[0];
    // Verificar que se haya ingresado todo
    if (!name || !price || !description || !quantity || !imageFile) {
    alert('Por favor, ingrese todos los campos');
    return;
    }
         // Convertir la imagen en base64 para guardarla
         const reader = new FileReader();
         reader.onload = function (event) {
         const imageDataUrl = event.target.result;
 // Recuperar los productos de localStorage (o un arreglo vacío si no hay productos)
    let products = JSON.parse(localStorage.getItem('products')) || [];
    // Crear el nuevo producto
 const newProduct = {
    name,
    price,
    description,
    quantity,
    image: imageDataUrl, // Guardar la imagen en base64
    };
     // Agregar el producto al arreglo y guardar en localStorage
 products.push(newProduct);
 localStorage.setItem('products', JSON.stringify(products));
 alert('Producto agregado exitosamente');
 document.getElementById('add-product-form').reset(); // Limpiar el formulario
 }; reader.readAsDataURL(imageFile); // Leer la imagen como base64
}
// Agregar el evento al formulario de productos
document.addEventListener('DOMContentLoaded', function() {
    const addProductForm = document.getElementById('add-product-form');
    if (addProductForm) {
    addProductForm.addEventListener('submit', addProduct);
    }
   });
// Función para cargar y mostrar los productos en la página principal
function loadProducts() {
    const productList = document.getElementById('product-list');
    let products = JSON.parse(localStorage.getItem('products')) || [];
      // Limpiar el contenedor de productos
 productList.innerHTML = '';
 // Crear las tarjetas de productos
 products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    productCard.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p>${product.description}</p>
    <p>Precio: $${product.price}</p>
    <p>Cantidad disponible: ${product.quantity}</p>
    ${product.quantity === '0' ? '<p class="sold-out">PRODUCTO AGOTADO</p>' : ''}
    `;productList.appendChild(productCard);
});
}
// Cargar los productos cuando se cargue la página principal
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('index.html')) {
    loadProducts();
    }
   });
// Registro de usuarios
function registerUser(event) {
    event.preventDefault(); // Evita que el formulario se recargue
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    if (!username || !password) {
    alert('Por favor, ingrese un usuario y contraseña válidos');
    return;
    }
// Recuperamos los usuarios de localStorage (o un arreglo vacío si no hay usuarios)
let users = JSON.parse(localStorage.getItem('users')) || [];
// Verificar si el usuario ya existe
const userExists = users.some(user => user.username === username);
if (userExists) {
    alert('El nombre de usuario ya está en uso, por favor elija otro.');
    return;
    }
// Agregamos el nuevo usuario al arreglo
users.push({ username, password });
localStorage.setItem('users', JSON.stringify(users)); // Guardamos en localStorage
alert('Usuario registrado exitosamente');
console.log("Usuario registrado:", username); // Mensaje en la consola
document.getElementById('register-form').reset(); // Reiniciar el formulario
// Opción: puedes redirigir al usuario al login o a la página principal después de
registrarse
// window.location.href = 'login.html';
}
// Inicio de sesión automático después del registro
function loginUserAuto(username, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
    alert(`Bienvenido, ${user.username}`);
    // Aquí podrías redirigir al usuario a la página principal
    window.location.href = 'index.html';
    } else {
    alert('Error al iniciar sesión automáticamente.');
    }
    }
// Inicio de sesión
function loginUser(event) {
    event.preventDefault(); // Evita que el formulario se recargue
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    // Recuperamos los usuarios almacenados en localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (username === 'admin' && password === '1234') {
        alert(`Bienvenido, administrador`);
        console.log("Administrador logueado");
        localStorage.setItem('loggedInUser', 'admin'); // Guardar en localStorage
        window.location.href = 'admin.html'; // Redirigir a la página de administración
        return;
        }
        // Verificación de un usuario normal
const user = users.find(u => u.username === username && u.password === password);
if (user) {
alert(`Bienvenido, ${user.username}`);
localStorage.setItem('loggedInUser', username); // Guardar el nombre de usuario
logueado
window.location.href = 'index.html'; // Redirigir a la página principal
} else {
alert('Usuario o contraseña incorrectos');
}
}
// Al cargar la página de administrador, verificamos si es el admin
function checkAdminAccess() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser !== 'admin') {
    alert('Acceso denegado. Solo el administrador puede acceder a esta página.');
    window.location.href = 'login.html'; // Redirige al login si no es el admin
    }
    }
    // Agregar los event listeners en los formularios
document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    if (registerForm) {
    registerForm.addEventListener('submit', registerUser);
    }
    if (loginForm) {
    loginForm.addEventListener('submit', loginUser);
    }
    // Si estamos en la página de administración, verificamos el acceso
    if (window.location.pathname.includes('admin.html')) {
    checkAdminAccess();
    }
    });
    // Función para verificar si hay un usuario logueado y actualizar la navegación
function updateNav() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const loginLink = document.getElementById('login-link');
    const registerLink = document.getElementById('register-link');
    const logoutLink = document.getElementById('logout-link');
    const welcomeMessage = document.getElementById('welcome-message');
    if (loggedInUser) {
    // Si hay un usuario logueado
  
    welcomeMessage.style.display = 'inline'; // Mostrar mensaje de bienvenida
    welcomeMessage.textContent = `Bienvenido, ${loggedInUser}`; // Mostrar nombre del usuario
    logoutLink.style.display = 'inline'; // Mostrar botón de cerrar sesión
} else {
// Si no hay usuario logueado
loginLink.style.display = 'inline'; // Mostrar el botón de login
registerLink.style.display = 'inline'; // Mostrar el botón de registro
welcomeMessage.style.display = 'none'; // Ocultar el mensaje de bienvenida
logoutLink.style.display = 'none'; // Ocultar el botón de cerrar sesión
}
}
// Función para cerrar sesión
function logoutUser() {
    localStorage.removeItem('loggedInUser'); // Eliminar usuario logueado de localStorage
    alert('Has cerrado sesión exitosamente.');
    updateNav(); // Actualizar la barra de navegación
    window.location.href = 'login.html'; // Redirigir a la página de login
   }
   // Evento para gestionar el cierre de sesión
document.addEventListener('DOMContentLoaded', function() {
    updateNav(); // Llamar a la función para actualizar la navegación cuando la página cargue
    const logoutLink = document.getElementById('logout-link');
    if (logoutLink) {
    logoutLink.addEventListener('click', logoutUser);
    }
});
let currentIndex = 0;
const items = document.querySelectorAll('.carousel-item');
const totalItems = items.length;

function moveToNextSlide() {
    items[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % totalItems;
    items[currentIndex].classList.add('active');
    updateCarouselPosition();
}

function updateCarouselPosition() {
    const carouselInner = document.querySelector('.carousel-inner');
    carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Automatically move to the next slide every 3 seconds
setInterval(moveToNextSlide, 3000);
function toggleMode() {
    const currentMode = localStorage.getItem('mode') || 'light'; // Por defecto es claro
    let newMode;
  
    if (currentMode === 'light') {
      newMode = 'dark';
    } else if (currentMode === 'dark') {
      newMode = 'colorblind';
    } else {
      newMode = 'light';
    }
  
    // Actualizar clase en el body
    document.body.classList.remove('light-mode', 'dark-mode', 'colorblind-mode');
    if (newMode === 'dark') {
      document.body.classList.add('dark-mode');
    } else if (newMode === 'colorblind') {
      document.body.classList.add('colorblind-mode');
    }
  
    // Guardar la preferencia del usuario en localStorage
    localStorage.setItem('mode', newMode);
  }
  
  // Cargar el modo guardado cuando se cargue la página
  document.addEventListener('DOMContentLoaded', function() {
    const savedMode = localStorage.getItem('mode') || 'light';
    document.body.classList.add(`${savedMode}-mode`);
  
    // Evento para el botón de cambiar modo
    const toggleButton = document.getElementById('toggle-mode-btn');
    toggleButton.addEventListener('click', toggleMode);
  });
        
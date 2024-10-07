//Función para agregar productos
function addProduct(event) {
    event.preventDefault();

    const category = document.getElementById('product-category').value;
    const name = document.getElementById('product-name').value;
    const price = document.getElementById('product-price').value;
    const description = document.getElementById('product-description').value;
    const quantity = document.getElementById('product-quantity').value;
    const imageFile = document.getElementById('product-image').files[0];

    //Verificar que se haya ingresado todo
    if (!category ||!name || !price || !description || !quantity || !imageFile) {
        alert('Por favor, ingrese todos los campos');
        return;
    }

    //Convertir la imagen en base64 para guardarla
    const reader = new FileReader();
    reader.onload = function (event) {
        const imageDataUrl = event.target.result;

        //Recuperar los productos de localStorage (o un arreglo vacío si no hay productos)
        let products = JSON.parse(localStorage.getItem('products')) || [];

        //Craer el nuevo producto
        const newProduct = {
            category,
            name, 
            price, 
            description,
            quantity, 
            image: imageDataUrl, //Guardar la immagen en base64
        };

        //Agregar el producto al arreglo y guardar en local storage
        products.push(newProduct); 
        localStorage.setItem('products', JSON.stringify(products));
    
         alert('Producto agregado exitosamente');
         document.getElementById('add-product-form').reset(); //Limpiar el formulario
    };

    reader.readAsDataURL(imageFile); //Leer la imagen como base64
}

    //Agregar el evento al formulario de productos
    document.addEventListener('DOMContentLoaded', function() {
        const addProductForm = document.getElementById('add-product-form' );
        if (addProductForm) {
            addProductForm.addEventListener('submit', addProduct);
        }
    });


    //Al cargar la página de administrador, verificamos si es el aadmin
    function checkaAdminAcces() {
        const loggedInUser = localStorage.getItem('loggedInUser');

        //Verificar si el usuario está logueado y si es admin
        if (!loggedInUser || loggedInUser !== 'admin') {
            alert('Acceso denegado. Solo el administrador puede acceder a esta página.');
            window.location.href = '..//HTML/index.html'; //Redirigir al index si no es admin
        }
    }

    //Agregar los event listeners en los formularios
    document.addEventListener('DOMContentLoaded', function() {
        //Si estamos en la página de administración, veríficamos el acceso
        if (window.location.pathname.includes('admin.html')) {
            checkaAdminAcces();
        }
    });

    //Función para mostrar los productos en la página
    function displayProducts() {
        const productList = document.getElementById('product-list');
        productList.innerHTML = ''; //Limpiar el contenedor anterior

        let product = JSON.parse(localStorage.getItem('products')) || [];

        if(products.length === 0) {
            productList.innerHTML = '<p>No hay productos disponibles.</p>';
            return;        
        }

        products.forEach((product, index) => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product-item');
        
        productDiv.innerHTML = `
        <h2>${product.category}</h2>
        <h3>${product.name}</h3>
        <p>Precio: $${product.price}</p>
        <p>Descripción: ${product.description}</p>
        <p>Cantidad: ${product.quantity}</p>
        <img src="${product.image}" alt="${product.name}" style="max-width: 100px;">
        <button onclick="editProduct(${index})">Editar</button>
        <button onclick="deleteProduct(${index})">Eliminar</button>
        `;
    
    productList.appendChild(productDiv);
   });
    }

    //Llamar a la función para mostrar los productos cuando la página cargue
    document.addEventListener('DOMContentLoaded', function() {
        displayProducts();
    });

    //Función para eliminar un producto
    function deleteProduct(index) {
        let products = JSON.parse(localStorage.getItem('products')) || [];

        //Eliminar el producto array
        products.splice(index, 1);

        //Guardar el nuevo array en localStorage
        localStorage.setItem('products', JSON.stringify(products));

        //Actualizar la lista de productos en pantalla
        displayProducts();

        alert('Producto eliminado correctamente.');
    }

    //Función para editar un producto
    function editProduct(index) {
        let products = JSON.parse(localStorage.getItem('products')) || [];

        //Cargar la información del producto en el formulario   
        const product = products[index];
        document.getElementById('product-category').value = product.category;
        document.getElementById('product-name').value = product.name;
        document.getElementById('product-price').value = product.price;
        document.getElementById('product-description').value = product.description;
        document.getElementById('product-quantity').value = product.quantity;

        //Cambiar el comportamiento del botón para agregar a actualizar
        const form = document.getElementById('add-product-form');
        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.textContent = 'Actualizar Producto'
      
        //Quitar el evento anterior
        form.removeEventListener('submit', addProduct);

        //Añadir un nuevo evento para actualizar el producto
        form.addEventListener('submit', function updateProduct(event) {
            event.preventDefault();

            const updateProduct = {
                category: document.getElementById('product-category').value,
                name: document.getElementById('product-name').value,
                price: document.getElementById('product-price').value,
                description: document.getElementById('product-description').value,
                quantity: document.getElementById('product-quantity').value,
                image: product.image //Mantener la imagen previa
            };

            //Actualizar el producto en el array
            products[index] = updateProduct;
            localStorage.setItem('products', JSON.stringify(products));

            alert('Producto actualizado correctamente');
            submitButton.textContent = 'Agregar Producto';

            //Limpiar el formulario
            form.reset();

            //Restaurar el comportamiento original del formulario
            form.removeEventListener('submit', updateProduct);
            form.addEventListener('submit', addProduct);

            //Actualizar la lista de productos en pantalla
            displayProducts();
        }) ;
    }

    //Función para mostrar los productos en la página como tarjeta
    function displayProducts() {
        const productList = document.getElementById('product-list');
        productList.innerHTML = ''; //Limpiar el contenido anterior

        let products = JSON.parse(localStorage.getItem('products')) || [];

        if (products.length === 0) {
            productList.innerHTML = '<p>No hay productos disponibles.</p>';
            return;
        }

        products.forEach((product, index) => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product-item');

            productDiv.innerHTML = `
            <h2>${product.category}</h2>
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Precio: $${product.price}</p>
            <p>Cantidad: ${product.quantity}</p>
            <p>${product.description}</p>
            <button onclick="editProduct(${index})">Editar</button>
            <button onclick="deleteProduct(${index})">Eliminar</button>
            `;

            productList.appendChild(productDiv);
        });
    }

    //Llamar a a la función para mostrar los productos cuando la página cargue
    document.addEventListener('DOMContentLoaded', function() {
        displayProducts();
    });


    document.getElementById('hamburger-btn').addEventListener('click', function() {
        const navbar = document.getElementById('navbar');
        navbar.classList.toggle('active'); //Activa o desactiva la clase "active" para mostrar/ocultar el ménu 
    });
function mostrarComprasRealizadas() {
    const comprasList = document.getElementById('compras-list');
    let comprasRealizadas = JSON.parse(localStorage.getItem('compras Realizadas')) || [];
    const usuarioActual = localStorage.getItem('loggedInUser'); // Obtener el usuario que está logueado

    if (comprasRealizadas.length === 0) {
        comprasList.innerHTML = '<p>No se han realizado compras.</p>';
        return;
    }

    // Limpiar el contenido previo
    comprasList.innerHTML = '';

    const comprasFiltradas = comprasRealizadas.filter(compra => compra.usuario === usuarioActual);

    // Iterar sobre las compras realizadas
    comprasFiltradas.forEach(compra => {
        const compraDiv = document.createElement('div');
        compraDiv.classList.add('compra');

        // Crear la lista de productos
        let productosHTML = '<ul>';
        compra.productos.forEach(item => {
            productosHTML += `<li>${item.name} $${item.price} Cantidad: ${item.quantity}</li>`;
        });
        productosHTML += '</ul>';

        compraDiv.innerHTML = `
            <h3>Compra realizada por ${compra.usuario} el ${compra.fecha}</h3>
            ${productosHTML}
            <p>Total: $${compra.total}</p>
        `;

        comprasList.appendChild(compraDiv);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const comprasList = document.getElementById('compras-list');
    if (comprasList) {
        mostrarComprasRealizadas();
    }
});
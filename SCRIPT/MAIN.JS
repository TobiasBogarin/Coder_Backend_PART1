const apiUrl = "http://localhost:8080/api/products";

// Función para obtener y mostrar productos
async function fetchProducts() {
    const response = await fetch(apiUrl);
    const products = await response.json();
    const tableBody = document.getElementById('product-table');
    tableBody.innerHTML = '';
    products.forEach(product => {
        tableBody.innerHTML += `
            <tr>
                <td>${product.id}</td>
                <td>${product.title}</td>
                <td>${product.description}</td>
                <td>${product.price}</td>
                <td>${product.stock}</td>
                <td>
                    <button onclick="deleteProduct(${product.id})" class="delete-btn">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

// Función para agregar un producto
document.getElementById('product-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const newProduct = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        price: Number(document.getElementById('price').value),
        stock: Number(document.getElementById('stock').value)
    };

    await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
    });

    fetchProducts(); // Actualizar la lista
    e.target.reset();
});

// Función para eliminar un producto
async function deleteProduct(productId) {
    await fetch(`${apiUrl}/${productId}`, {
        method: 'DELETE'
    });

    fetchProducts(); // Actualizar la lista
}

// Inicializar la lista de productos al cargar la página
fetchProducts();

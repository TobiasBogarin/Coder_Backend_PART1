const express = require('express');
const path = require('path');

const app = express();
const port = 8080;

// Middleware para servir archivos estáticos desde el directorio raíz
app.use(express.static(path.join(__dirname, '../')));

// Endpoint para productos
const products = [];
app.use(express.json());

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.post('/api/products', (req, res) => {
    const product = req.body;
    products.push({ id: products.length + 1, ...product });
    res.status(201).json(product);
});

app.delete('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex((p) => p.id === id);
    if (index > -1) {
        products.splice(index, 1);
        res.status(204).end();
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

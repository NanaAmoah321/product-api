const express = require('express');
const PORT = 4040;
const app = express()
const cors = require('cors')
const pool = require('./db')

app.use(express.json())
app.use(cors('*'));



app.get('/api/products', (req, res) => {
    res.send(products);
})

app.post('/api/add-products', (req,res) => {
    const newProduct = req.body;
    products.push(newProduct)
    res.json(products)

    console.log(newProduct)
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);

})

app.delete("/api/delete-product/:id", (req,res) => {
    const id = parseInt(req.params.id);
    const exists = products.find(product => product.id === id);
    if(!exists) {
        res.status(404).json({message: "Product not found"})
    }
    products = products.filter(product => product.id !== id);
    res.json(products);

})

app.post('/api/add-products', async (req, res) => {
    try {
        const { name, price } = req.body;
        
        // Validate input
        if (!name || price == undefined) {
            return res.status(400).json({ error: 'Name and price are required' });
        }
        
        // Insert product and return all products
        const insertResult = await pool.query(
            'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *',
            [name, price]
        );
        
        // Get all products to return
        const allProducts = await pool.query('SELECT * FROM products ORDER BY id');
        res.json(allProducts.rows);
        
        console.log('New product added:', insertResult.rows[0]);
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/products', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products ORDER BY id');
        res.json(result.rows);
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ error: err.message });
    }
});
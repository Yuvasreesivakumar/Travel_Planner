// server.js


/*const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Cushion@24',
    database: 'mydb'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('MySQL Connected...');
});

app.post('/api/cart', (req, res) => {
    const { userId, destination } = req.body;
    const sql = 'INSERT INTO cart (user_id, destination_id, destination_name) VALUES (?, ?, ?)';
    db.query(sql, [userId, destination.id, destination.name], (err, result) => {
        if (err) {
            console.error('Error adding item to cart:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json({ message: 'Destination added to cart' });
        }
    });
});

app.get('/api/cart/:userId', (req, res) => {
    const userId = req.params.userId;
    const sql = 'SELECT * FROM cart WHERE user_id = ?';
    db.query(sql, [userId], (err, result) => {
        if (err) {
            console.error('Error fetching cart items:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json(result);
        }
    });
});

app.delete('/api/cart/:userId/:destinationId', (req, res) => {
    const userId = req.params.userId;
    const destinationId = req.params.destinationId;
    const sql = 'DELETE FROM cart WHERE user_id = ? AND destination_id = ?';
    db.query(sql, [userId, destinationId], (err, result) => {
        if (err) {
            console.error('Error removing item from cart:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json({ message: 'Destination removed from cart' });
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});*/
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const destinations = require('./destinations.json');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/images', express.static('images'));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Cushion@24',
    database: 'mydb'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('MySQL Connected...');
});

let likes = [];
let cart = [];

app.get('/api/destinations', (req, res) => {
    const featured = destinations.filter(destination => destination.featured);
    res.json(featured);
});

app.get('/api/destination/:id', (req, res) => {
    const destinationId = parseInt(req.params.id, 10);
    const destination = destinations.find(destination => destination.id === destinationId);
    if (destination) {
        res.json(destination);
    } else {
        res.status(404).json({ error: 'Destination not found' });
    }
});

app.post('/api/likes', (req, res) => {
    const destination = req.body;
    if (likes.find(like => like.id === destination.id)) {
        return res.status(400).json({ error: 'Destination already liked' });
    }
    likes.push(destination);
    res.json({ message: 'Destination liked' });
});

app.get('/api/likes', (req, res) => {
    res.json(likes);
});

app.post('/api/cart', (req, res) => {
    const destination = req.body;
    if (cart.find(item => item.id === destination.id)) {
        return res.status(400).json({ error: 'Destination already in cart' });
    }
    cart.push(destination);
    res.json({ message: 'Destination added to cart' });
});

app.get('/api/cart', (req, res) => {
    res.json(cart);
});

app.delete('/api/cart/:id', (req, res) => {
    const destinationId = parseInt(req.params.id, 10);
    const index = cart.findIndex(item => item.id === destinationId);
    if (index !== -1) {
        cart.splice(index, 1);
        res.json({ message: 'Destination removed from cart' });
    } else {
        res.status(404).json({ error: 'Destination not found in cart' });
    }
});

app.get('/api/cart/total', (req, res) => {
    const totalExpense = cart.reduce((total, item) => total + item.expense, 0);
    res.json({ totalExpense });
});

app.post('/api/register', (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(sql, [username, hashedPassword], (err, result) => {
        if (err) throw err;
        res.json({ message: 'User registered' });
    });
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [username], (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
            return res.status(400).json({ error: 'User not found' });
        }
        const user = result[0];
        const isValidPassword = bcrypt.compareSync(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ error: 'Invalid password' });
        }
        res.json({ message: 'Login successful' });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

 // With  ES module

import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
// import productRoutes from './routes/productRoutes.js';
// import adminRoutes from './routes/adminRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(`/api/auth`, authRoutes);

app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
});
 
// import dotenv from 'dotenv';
// dotenv.config();

// import express from 'express';
// import cors from 'cors';
// import authRoutes from './routes/authRoutes.js';
// import productRoutes from './routes/productRoutes.js';
// import adminRoutes from './routes/adminRoutes.js';

// const app = express();

// app.use(express.json());
// app.use(cors());
// app.use(express.urlencoded({ extended: false }));

// app.get('/', (req, res) => {
//     res.send('Hello, World!');
// });

// app.use(`/api/auth`, authRoutes);
// app.use('/api/products', productRoutes);
// app.use(`/api/admin`, adminRoutes);

// app.listen(process.env.PORT, () => {
//     console.log(`Server is running on port ${process.env.PORT}`);
// });






// Without  ES module

// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const authRoutes = require('./routes/authRoutes');
// const adminRoutes = require('./routes/adminRoutes');
// // Optional product route
// const productRoutes = require('./routes/productRoutes');

// const app = express();

// app.use(express.json());
// app.use(cors());
// app.use(express.urlencoded({ extended: false }));

// app.get('/', (req, res) => res.send('Hello, World!'));

// app.use('/api/auth', authRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/admin', adminRoutes);

// app.listen(process.env.PORT, () => {
//     console.log(`Server running on port ${process.env.PORT}`);
// });


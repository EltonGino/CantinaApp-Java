// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { UserProvider } from './UserContext';
import { CartProvider } from './CartContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


ReactDOM.render(
    <UserProvider>
        <CartProvider>
            <App />
        </CartProvider>
    </UserProvider>,
    document.getElementById('root')
);

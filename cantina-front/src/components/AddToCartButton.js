// src/components/AddToCartButton.js
import React, { useContext } from 'react';
import { CartContext } from '../CartContext';

const AddToCartButton = ({ item }) => {
    const { addToCart } = useContext(CartContext);

    return (
        <button onClick={() => addToCart(item)}>Adicionar ao Carrinho</button>
    );
};

export default AddToCartButton;

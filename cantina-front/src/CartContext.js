import React, { createContext, useReducer, useContext, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';

const initialState = {
    cart: [],
};

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CART':
            return { ...state, cart: action.payload };
        case 'ADD_TO_CART':
            const itemIndex = state.cart.findIndex(item => item.id === action.payload.id);
            if (itemIndex >= 0) {
                const updatedCart = state.cart.map((item, index) =>
                    index === itemIndex ? { ...item, quantity: item.quantity + 1 } : item
                );
                return { ...state, cart: updatedCart };
            } else {
                return { ...state, cart: [...state.cart, { ...action.payload, quantity: 1 }] };
            }
        case 'REMOVE_FROM_CART':
            return { ...state, cart: state.cart.filter(item => item.id !== action.payload) };
        case 'REMOVE_ONE_FROM_CART':
            const indexToRemove = state.cart.findIndex(item => item.id === action.payload);
            if (indexToRemove >= 0) {
                const itemToRemove = state.cart[indexToRemove];
                if (itemToRemove.quantity > 1) {
                    const updatedCart = state.cart.map((item, index) =>
                        index === indexToRemove ? { ...item, quantity: item.quantity - 1 } : item
                    );
                    return { ...state, cart: updatedCart };
                } else {
                    return { ...state, cart: state.cart.filter(item => item.id !== action.payload) };
                }
            }
            return state;
        case 'CLEAR_CART':
            return { ...state, cart: [] };
        default:
            return state;
    }
};

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (user) {
            const savedCart = localStorage.getItem(`cart_${user.id}`);
            if (savedCart) {
                dispatch({ type: 'SET_CART', payload: JSON.parse(savedCart) });
            }
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            localStorage.setItem(`cart_${user.id}`, JSON.stringify(state.cart));
        }
    }, [state.cart, user]);

    const addToCart = (item) => {
        dispatch({ type: 'ADD_TO_CART', payload: item });
    };

    const removeFromCart = (id) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    };

    const removeOneFromCart = (id) => {
        dispatch({ type: 'REMOVE_ONE_FROM_CART', payload: id });
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    return (
        <CartContext.Provider value={{ cart: state.cart, addToCart, removeFromCart, removeOneFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

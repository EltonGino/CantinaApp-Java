import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../CartContext';
import { UserContext } from '../UserContext';

const Dashboard = () => {
    const [foodItems, setFoodItems] = useState([]);
    const { addToCart } = useContext(CartContext);
    const { user } = useContext(UserContext);

    useEffect(() => {
        axios.get('http://localhost:8080/foodItems')
            .then(response => {
                setFoodItems(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the food items!', error);
            });
    }, []);

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Olá, {user ? user.name : "Convidado"}!</h1>
            <div className="row">
                {foodItems.map(item => (
                    <div key={item.id} className="col-md-4 mb-4">
                        <div className="card" style={{ width: '18rem' }}>
                            <img
                                src={item.pictureUrl}
                                className="card-img-top"
                                alt={item.name}
                                style={{ height: '180px', objectFit: 'cover' }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <p className="card-text">{item.description}</p>
                                <p className="card-text font-weight-bold">${item.price}</p>
                                <button
                                    onClick={() => addToCart(item)}
                                    className="btn btn-primary"
                                >
                                    Adicionar ao Carrinho
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;

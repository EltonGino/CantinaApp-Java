// import React, { useContext } from 'react';
// import { useHistory } from 'react-router-dom';
// import { CartContext } from '../CartContext';
//
// const Cart = () => {
//     const { cart, addToCart, removeFromCart, removeOneFromCart } = useContext(CartContext);
//     const history = useHistory();
//
//     const calculateTotal = () => {
//         return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
//     };
//
//     const handleCheckout = () => {
//         history.push('/checkout');
//     };
//
//     return (
//         <div>
//             <h1>Cart</h1>
//             {cart.map(item => (
//                 <div key={item.id} className="cart-item">
//                     <img src={item.pictureUrl} alt={item.name} />
//                     <h2>{item.name}</h2>
//                     <p>{item.description}</p>
//                     <p>${item.price} x {item.quantity}</p>
//                     <button onClick={() => removeFromCart(item.id)}>Remove</button>
//                     <button onClick={() => addToCart(item)}>Add more</button>
//                     {item.quantity > 1 && <button onClick={() => removeOneFromCart(item.id)}>Remove one</button>}
//                 </div>
//             ))}
//             <h2>Total: ${calculateTotal()}</h2>
//             <button onClick={handleCheckout}>Checkout</button>
//         </div>
//     );
// };
//
// export default Cart;

import React, { useContext } from 'react';
import { CartContext } from '../CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cart, addToCart, removeFromCart, removeOneFromCart } = useContext(CartContext);

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Carrinho</h1>
            {cart.length > 0 ? (
                <div className="row">
                    {cart.map(item => (
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
                                    <p className="card-text font-weight-bold">${item.price} x {item.quantity}</p>
                                    <button
                                        onClick={() => addToCart(item)}
                                        className="btn btn-primary"
                                    >
                                        Adicionar mais
                                    </button>
                                    {item.quantity > 1 && (
                                        <button
                                            onClick={() => removeOneFromCart(item.id)}
                                            className="btn btn-warning ml-2"
                                        >
                                            Remover um
                                        </button>
                                    )}
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="btn btn-danger ml-2"
                                    >
                                        Remover produto
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="col-12">
                        <h2 className="mt-4">Total: R${calculateTotal()}</h2>
                        <Link to="/checkout" className="btn btn-success">Checkout</Link>
                    </div>
                </div>
            ) : (
                <h3>O seu carrinho está vazio</h3>
            )}
        </div>
    );
};

export default Cart;

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { CartContext } from '../CartContext';
import logo from './cantinaapp.jpeg';  // Make sure to replace with the actual path to your logo

const Navbar = () => {
    const { user, setUser } = useContext(UserContext);
    const { clearCart } = useContext(CartContext);

    const handleLogout = () => {
        if (user) {
            localStorage.removeItem(`cart_${user.id}`);
        }
        setUser(null);
        clearCart();
        localStorage.removeItem('user');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">
                <img src={logo} width="30" height="30" alt="Cantina App" />
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    {!user && (
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                    )}
                    {user && (
                        <li className="nav-item">
                            <Link className="nav-link" to="/dashboard">Início</Link>
                        </li>
                    )}
                    <li className="nav-item">
                        <Link className="nav-link" to="/cart">Carrinho</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/checkout">Checkout</Link>
                    </li>
                    {!user && (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">Registro</Link>
                            </li>
                        </>
                    )}
                    {user && (
                        <li className="nav-item">
                            <button onClick={handleLogout} className="btn btn-link nav-link">Logout</button>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;

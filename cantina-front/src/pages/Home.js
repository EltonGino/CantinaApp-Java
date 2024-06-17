// import React from 'react';
// import { Link } from 'react-router-dom';
//
// const Home = () => {
//     return (
//         <div>
//             <h1>Welcome to Cantina App</h1>
//             <p>Your favorite place to order food online.</p>
//             <div>
//                 <Link to="/login">Login</Link>
//                 <Link to="/register">Register</Link>
//             </div>
//         </div>
//     );
// };
//
// export default Home;

import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="container mt-5 text-center">
            <h1 className="mb-4">Bem-vindo ao Cantina App</h1>
            <p className="lead">O seu lugar para comprar on-line.</p>
            <div className="mt-4">
                <Link to="/login" className="btn btn-primary mx-2">Login</Link>
                <Link to="/register" className="btn btn-secondary mx-2">Registrar</Link>
            </div>
        </div>
    );
};

export default Home;

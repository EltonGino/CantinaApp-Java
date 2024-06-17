// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { UserProvider } from './UserContext';
// import { CartProvider } from './CartContext';
// import Navbar from './components/Navbar';
// import Home from './pages/Home';
// import Cart from './pages/Cart';
// import Checkout from './pages/Checkout';
// import Login from './pages/Login';
// import Register from './pages/Register';
//
// const App = () => {
//     const [user, setUser] = useState(null);
//
//     return (
//         <UserProvider>
//             <CartProvider>
//                 <Router>
//                     <Navbar />
//                     <Switch>
//                         <Route path="/" exact component={Home} />
//                         <Route path="/cart" component={Cart} />
//                         <Route path="/checkout" component={Checkout} />
//                         <Route path="/login">
//                             <Login setUser={setUser} />
//                         </Route>
//                         <Route path="/register">
//                             <Register setUser={setUser} />
//                         </Route>
//                     </Switch>
//                 </Router>
//             </CartProvider>
//         </UserProvider>
//     );
// };
//
// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Navbar from './components/Navbar'; // Adjust the path as necessary
import { UserProvider } from './UserContext';

const App = () => {
    return (
        <UserProvider>
            <Router>
                <Navbar />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/cart" component={Cart} />
                    <Route path="/checkout" component={Checkout} />
                </Switch>
            </Router>
        </UserProvider>
    );
};

export default App;


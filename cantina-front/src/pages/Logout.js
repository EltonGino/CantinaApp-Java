import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../UserContext';

const Logout = () => {
    const { setUser } = useContext(UserContext);
    const history = useHistory();

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
        history.push('/login');
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default Logout;

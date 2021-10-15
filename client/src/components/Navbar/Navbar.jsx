import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './Navbar.scss'
import {Link} from "react-router-dom";

const Navbar = () => {
    const { logout, isLogin } = useContext(AuthContext)
    return (
        <nav>
            <div className="nav-wrapper navbar blue">
                <div className="container">
                    <a href="/" className="logo left">TODO APP</a>
                    {isLogin
                        ? <ul id="nav-mobile" className="right">
                            <li><Link to="/login" onClick={logout}>Выйти</Link></li>
                        </ul>
                        : <ul id="nav-mobile" className="right">
                            <li><Link to="/login">Войти</Link></li>
                        </ul>}
                </div>

            </div>
        </nav>
    );
}

export default Navbar;

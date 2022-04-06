import { React } from 'react';
import s from "./Header.module.css";
import logo from '../../images/logo.svg';
import logIn from '../../images/LogIn.png';

const Header = () => {
    return (
        <header className={s.header}>
            <div>
                <img src={logo} alt="logo" />
            </div>
            <div>
                Официальный сайт города Реж
            </div>
            <div>
                <div>
                    <img src={logIn} alt="logIn" />
                </div>
                Личный кабинет
            </div>
        </header>
    );
}

export default Header
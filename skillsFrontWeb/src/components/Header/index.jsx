import React from 'react';
import styles from './styles.module.css';
import logo from '../../assets/logo.png';

const Header = () => {
    return (
        <header className={styles.header}>
            <img src={logo} alt="Logo" className={styles.logo} />
        </header>
    );
};

export default Header;

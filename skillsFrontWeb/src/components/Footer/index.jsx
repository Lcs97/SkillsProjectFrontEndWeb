import React from 'react';
import styles from './styles.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <p>&copy; {new Date().getFullYear()} SkillsProject. Todos os direitos reservados.</p>
        </footer>
    );
};

export default Footer;
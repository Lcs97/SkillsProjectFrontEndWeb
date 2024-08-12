import React from 'react';
import styles from './styles.module.css';

export const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.modalContainer}>
            <div className={styles.modal}>
                <button className={styles.botaoFechar} onClick={onClose}>×</button>
                {children}
            </div>
        </div>
    );
};

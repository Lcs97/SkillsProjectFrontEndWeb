import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import styles from './styles.module.css';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

export default function Cadastro() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            alert("As senhas não coincidem!");
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/auth/cadastrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: login,
                    senha: password,
                    username: login
                })
            });

            if (!response.ok) {
                throw new Error('Erro ao realizar o cadastro.');
            }

            setSuccessMessage("Cadastro realizado com sucesso!");

            setLogin("");
            setPassword("");
            setConfirmPassword("");

            navigate('/login');
        } catch (error) {
            setErrorMessage("Erro ao realizar o cadastro.");
            console.error("Erro ao realizar o cadastro:", error);
        }
    };

    return (
        <div className={styles.backgroundContainer}>
            <div className={styles.container}>
                <div className={styles.card}>
                    <Input
                        type="text"
                        onChange={e => setLogin(e.target.value)}
                        value={login}
                        title='Login'
                        placeholder='Digite seu login'
                    />
                    <div className={styles.passwordContainer}>
                        <Input
                            type={showPassword ? "text" : "password"}
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                            title='Senha'
                            placeholder='Digite sua senha'
                        />
                        <button
                            type="button"
                            className={styles.showPasswordButton}
                            onClick={togglePasswordVisibility}
                        >
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </button>
                    </div>
                    <div className={styles.passwordContainer}>
                        <Input
                            type={showConfirmPassword ? "text" : "password"}
                            onChange={e => setConfirmPassword(e.target.value)}
                            value={confirmPassword}
                            title='Confirmar Senha'
                            placeholder='Confirme sua senha'
                        />
                        <button
                            type="button"
                            className={styles.showPasswordButton}
                            onClick={toggleConfirmPasswordVisibility}
                        >
                            <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                        </button>
                    </div>
                    <Button
                        className={styles.saveButton}
                        title='Salvar'
                        onClick={handleRegister}
                    />
                    {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
                    {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
                </div>
            </div>
        </div>
    );
}

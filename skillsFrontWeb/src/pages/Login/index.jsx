import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import styles from './styles.module.css';

export default function Login() {
    const [email, setEmail] = useState(localStorage.getItem('email') || "");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(localStorage.getItem('rememberMe') === 'true');
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate(); // Hook para navegação

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    senha: password
                })
            });

            if (!response.ok) {
                throw new Error('Login falhou. Verifique suas credenciais.');
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);
            setSuccessMessage("Login realizado com sucesso!");

            if (rememberMe) {
                localStorage.setItem('email', email);
                localStorage.setItem('rememberMe', 'true');
            } else {
                localStorage.removeItem('email');
                localStorage.removeItem('rememberMe');
            }

            navigate('/home');
        } catch (error) {
            setErrorMessage(error.message);
            console.error("Erro ao realizar login:", error);
        }
    };

    useEffect(() => {
        if (rememberMe) {
            localStorage.setItem('email', email);
        }
    }, [email, rememberMe]);

    return (
        <div className={styles.backgroundContainer}>
            <div className={styles.container}>
                <div className={styles.card}>
                    <Input
                        type="email"
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        title='Email'
                        placeholder='Digite aqui o seu email'
                    />
                    <div className={styles.passwordContainer}>
                        <Input
                            type={showPassword ? "text" : "password"}
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                            title='Senha'
                            placeholder='******'
                        />
                        <button
                            type="button"
                            className={styles.showPasswordButton}
                            onClick={togglePasswordVisibility}
                        >
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </button>
                    </div>
                    <div className={styles.checkboxContainer}>
                        <input
                            type="checkbox"
                            id="rememberMe"
                            checked={rememberMe}
                            onChange={() => setRememberMe(!rememberMe)}
                        />
                        <label htmlFor="rememberMe">Gravar Senha</label>
                    </div>
                    <div className={styles.buttonsContainers}>
                        <Button
                            className={styles.login}
                            title='Entrar'
                            onClick={handleLogin}
                        />
                        <Button
                            className={styles.register}
                            title='Cadastrar-se'
                            onClick={() => navigate('/cadastro')}
                        />
                    </div>
                    {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
                    {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
                </div>
            </div>
        </div>
    );
}

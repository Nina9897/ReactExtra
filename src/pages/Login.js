import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/UserService';

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        padding: '20px'
    },
    card: {
        background: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px'
    },
    title: {
        textAlign: 'center',
        marginBottom: '1.5rem',
        color: '#333'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
    },
    input: {
        padding: '0.75rem',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '1rem',
        transition: 'border-color 0.3s',
        ':focus': {
            outline: 'none',
            borderColor: '#4a90e2'
        }
    },
    error: {
        color: '#e74c3c',
        margin: '0.5rem 0',
        fontSize: '0.9rem'
    },
    button: {
        backgroundColor: '#4a90e2',
        color: 'white',
        padding: '0.75rem',
        border: 'none',
        borderRadius: '4px',
        fontSize: '1rem',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        ':hover': {
            backgroundColor: '#357abd'
        }
    },
    registerButton: {
        backgroundColor: 'transparent',
        color: '#4a90e2',
        padding: '0.75rem',
        border: '1px solid #4a90e2',
        borderRadius: '4px',
        fontSize: '1rem',
        cursor: 'pointer',
        transition: 'all 0.3s',
        marginTop: '0.5rem',
        ':hover': {
            backgroundColor: '#f0f7ff'
        }
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'column'
    }
};

function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const credentials = { email, password };

        try {
            const result = await loginUser(credentials);

            if (result?.access_token && result?.user?.id) {
                login({
                    id: result.user.id,
                    name: result.user.name,
                    email: result.user.email,
                    token: result.access_token
                });
                navigate('/dashboard');
            } else {
                setErrorMessage(result.error || 'Credenciales incorrectas');
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('Error al iniciar sesión');
        }
    };

    const handleRegisterClick = () => {
        navigate('/signup');
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Iniciar sesión</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.formGroup}>
                        <input
                            type="email"
                            placeholder="Correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>
                    {errorMessage && <p style={styles.error}>{errorMessage}</p>}
                    <div style={styles.buttonContainer}>
                        <button type="submit" style={styles.button}>Entrar</button>
                        <button
                            type="button"
                            style={styles.registerButton}
                            onClick={handleRegisterClick}
                        >
                            Registrarse
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
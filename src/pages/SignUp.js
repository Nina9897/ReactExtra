import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/UserService';
import { useAuth } from '../context/AuthContext';

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
        transition: 'border-color 0.3s'
    },
    inputFocus: {
        outline: 'none',
        borderColor: '#4a90e2'
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
        transition: 'background-color 0.3s'
    },
    buttonHover: {
        backgroundColor: '#357abd'
    },
    loginButton: {
        backgroundColor: 'transparent',
        color: '#4a90e2',
        padding: '0.75rem',
        border: '1px solid #4a90e2',
        borderRadius: '4px',
        fontSize: '1rem',
        cursor: 'pointer',
        transition: 'all 0.3s',
        marginTop: '0.5rem'
    },
    loginButtonHover: {
        backgroundColor: '#f0f7ff'
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'column'
    }
};

function SignUp() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = { name, email, password };

        try {
            const result = await createUser(user);

            if (result?.id) {
                login({ name: result.name, id: result.id });
                navigate('/dashboard');
            } else {
                setErrorMessage('Error al crear usuario');
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('No se pudo registrar');
        }
    };

    const handleLoginClick = () => {
        navigate('/login');
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Registrarse</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.formGroup}>
                        <input
                            type="text"
                            placeholder="Nombre"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            style={{
                                ...styles.input,
                                ...(isFocused ? styles.inputFocus : {})
                            }}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <input
                            type="email"
                            placeholder="Correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{
                                ...styles.input,
                                ...(isFocused ? styles.inputFocus : {})
                            }}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                ...styles.input,
                                ...(isFocused ? styles.inputFocus : {})
                            }}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                        />
                    </div>
                    {errorMessage && <p style={styles.error}>{errorMessage}</p>}
                    <div style={styles.buttonContainer}>
                        <button
                            type="submit"
                            style={styles.button}
                            onMouseEnter={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
                            onMouseLeave={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
                        >
                            Registrarse
                        </button>
                        <button
                            type="button"
                            style={styles.loginButton}
                            onClick={handleLoginClick}
                            onMouseEnter={(e) => e.target.style.backgroundColor = styles.loginButtonHover.backgroundColor}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        >
                            ¿Ya tienes cuenta? Inicia sesión
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
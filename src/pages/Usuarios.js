import React, { useEffect, useState } from 'react';
import { getAllUsers, deleteUser } from '../services/UserService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const styles = {
    container: {
        padding: '2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: '#f8f9fa',
        minHeight: '100vh'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem'
    },
    title: {
        color: '#2c3e50',
        fontSize: '2rem',
        margin: 0
    },
    buttonGroup: {
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap'
    },
    primaryButton: {
        backgroundColor: '#3498db',
        color: 'white',
        padding: '0.6rem 1.2rem',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '1rem',
        transition: 'all 0.3s ease',
        ':hover': {
            backgroundColor: '#2980b9',
            transform: 'translateY(-2px)'
        }
    },
    dangerButton: {
        backgroundColor: '#e74c3c',
        color: 'white',
        padding: '0.6rem 1.2rem',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '1rem',
        transition: 'all 0.3s ease',
        ':hover': {
            backgroundColor: '#c0392b',
            transform: 'translateY(-2px)'
        }
    },
    secondaryButton: {
        backgroundColor: '#2ecc71',
        color: 'white',
        padding: '0.6rem 1.2rem',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '1rem',
        transition: 'all 0.3s ease',
        ':hover': {
            backgroundColor: '#27ae60',
            transform: 'translateY(-2px)'
        }
    },
    backButton: {
        backgroundColor: '#95a5a6',
        color: 'white',
        padding: '0.6rem 1.2rem',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '1rem',
        transition: 'all 0.3s ease',
        ':hover': {
            backgroundColor: '#7f8c8d',
            transform: 'translateY(-2px)'
        }
    },
    userList: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.5rem',
        marginTop: '2rem'
    },
    userCard: {
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '1.5rem',
        transition: 'transform 0.3s ease',
        ':hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)'
        }
    },
    userTitle: {
        color: '#2c3e50',
        marginTop: 0,
        marginBottom: '0.5rem'
    },
    userInfo: {
        color: '#7f8c8d',
        margin: '0.5rem 0'
    },
    userActions: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '1.5rem',
        gap: '0.5rem'
    },
    smallButton: {
        padding: '0.4rem 0.8rem',
        fontSize: '0.9rem',
        borderRadius: '4px',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
    },
    viewButton: {
        backgroundColor: '#3498db',
        color: 'white',
        ':hover': {
            backgroundColor: '#2980b9'
        }
    },
    editButton: {
        backgroundColor: '#f39c12',
        color: 'white',
        ':hover': {
            backgroundColor: '#d35400'
        }
    },
    deleteButton: {
        backgroundColor: '#e74c3c',
        color: 'white',
        ':hover': {
            backgroundColor: '#c0392b'
        }
    }
};

function Usuarios() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const { logout } = useAuth();

    useEffect(() => {
        async function fetchUsers() {
            const data = await getAllUsers();
            setUsers(data);
        }
        fetchUsers();
    }, []);

    const handleEdit = (id) => {
        navigate(`/usuarios/edit/${id}`);
    };

    const handleView = (id) => {
        navigate(`/usuarios/view/${id}`);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Seguro que deseas eliminar este usuario?')) {
            await deleteUser(id);
            window.location.reload();
        }
    };

    const handleCreate = () => {
        navigate('/usuarios/create');
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleBack = () => {
        navigate('/dashboard'); // Regresa a la página anterior
    };

    // Función para manejar hover
    const handleMouseEnter = (e, hoverStyle) => {
        Object.keys(hoverStyle).forEach(prop => {
            e.target.style[prop] = hoverStyle[prop];
        });
    };

    const handleMouseLeave = (e, originalStyle) => {
        Object.keys(originalStyle).forEach(prop => {
            e.target.style[prop] = originalStyle[prop];
        });
    };

    const getButtonStyle = (baseStyle, hoverStyle) => ({
        ...baseStyle,
        onMouseEnter: (e) => handleMouseEnter(e, hoverStyle),
        onMouseLeave: (e) => handleMouseLeave(e, baseStyle)
    });

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>Gestión de Usuarios</h1>
                <div style={styles.buttonGroup}>
                    <button
                        style={getButtonStyle(styles.backButton, {
                            backgroundColor: '#7f8c8d',
                            transform: 'translateY(-2px)'
                        })}
                        onClick={handleBack}
                    >
                        Inicio
                    </button>
                    <button
                        style={getButtonStyle(styles.secondaryButton, {
                            backgroundColor: '#27ae60',
                            transform: 'translateY(-2px)'
                        })}
                        onClick={handleCreate}
                    >
                        Crear Nuevo Usuario
                    </button>
                    <button
                        style={getButtonStyle(styles.dangerButton, {
                            backgroundColor: '#c0392b',
                            transform: 'translateY(-2px)'
                        })}
                        onClick={handleLogout}
                    >
                        Cerrar sesión
                    </button>
                </div>
            </div>

            <div style={styles.userList}>
                {users.map((user) => (
                    <div key={user.id} style={styles.userCard}>
                        <h3 style={styles.userTitle}>{user.name}</h3>
                        <p style={styles.userInfo}>Email: {user.email}</p>
                        <div style={styles.userActions}>
                            <button
                                style={{
                                    ...styles.smallButton,
                                    ...styles.viewButton
                                }}
                                onClick={() => handleView(user.id)}
                            >
                                Ver
                            </button>
                            <button
                                style={{
                                    ...styles.smallButton,
                                    ...styles.editButton
                                }}
                                onClick={() => handleEdit(user.id)}
                            >
                                Editar
                            </button>
                            <button
                                style={{
                                    ...styles.smallButton,
                                    ...styles.deleteButton
                                }}
                                onClick={() => handleDelete(user.id)}
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Usuarios;
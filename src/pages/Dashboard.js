import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
    maxWidth: '600px',
    textAlign: 'center'
  },
  title: {
    color: '#333',
    marginBottom: '2rem',
    fontSize: '1.8rem'
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '2rem'
  },
  primaryButton: {
    backgroundColor: '#4a90e2',
    color: 'white',
    padding: '0.75rem',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    width: '100%',
    ':hover': {
      backgroundColor: '#357abd'
    }
  },
  secondaryButton: {
    backgroundColor: '#f0f7ff',
    color: '#4a90e2',
    padding: '0.75rem',
    border: '1px solid #4a90e2',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'all 0.3s',
    width: '100%',
    ':hover': {
      backgroundColor: '#e1edfa'
    }
  },
  logoutButton: {
    backgroundColor: '#f8f9fa',
    color: '#dc3545',
    padding: '0.75rem',
    border: '1px solid #dc3545',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'all 0.3s',
    width: '100%',
    ':hover': {
      backgroundColor: '#f1e5e6'
    }
  }
};

function Dashboard() {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Función para manejar el hover (pseudo-clases no funcionan directamente en React)
    const handleMouseEnter = (e, hoverStyle) => {
        e.target.style.backgroundColor = hoverStyle.backgroundColor;
    };

    const handleMouseLeave = (e, originalStyle) => {
        e.target.style.backgroundColor = originalStyle.backgroundColor;
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>
                    Bienvenid@ {user?.name} al Panel de Control
                </h1>
                
                <div style={styles.buttonContainer}>
                    <button 
                        style={styles.primaryButton}
                        onClick={() => navigate('/productos')}
                        onMouseEnter={(e) => handleMouseEnter(e, { backgroundColor: '#357abd' })}
                        onMouseLeave={(e) => handleMouseLeave(e, styles.primaryButton)}
                    >
                        Gestionar Productos
                    </button>
                    
                    <button 
                        style={styles.secondaryButton}
                        onClick={() => navigate('/usuarios')}
                        onMouseEnter={(e) => handleMouseEnter(e, { backgroundColor: '#e1edfa' })}
                        onMouseLeave={(e) => handleMouseLeave(e, styles.secondaryButton)}
                    >
                        Gestionar Usuarios
                    </button>
                </div>
                
                <button 
                    style={styles.logoutButton}
                    onClick={handleLogout}
                    onMouseEnter={(e) => handleMouseEnter(e, { backgroundColor: '#f1e5e6' })}
                    onMouseLeave={(e) => handleMouseLeave(e, styles.logoutButton)}
                >
                    Cerrar sesión
                </button>
            </div>
        </div>
    );
}

export default Dashboard;
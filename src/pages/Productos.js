import React, { useState } from 'react';
import useProducts from '../hooks/useProducts';
import { useAuth } from '../context/AuthContext';
import { deleteProduct } from '../services/ProductService';
import { useNavigate } from 'react-router-dom';

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
  productList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1.5rem',
    marginTop: '2rem'
  },
  productCard: {
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
  productTitle: {
    color: '#2c3e50',
    marginTop: 0,
    marginBottom: '0.5rem'
  },
  productInfo: {
    color: '#7f8c8d',
    margin: '0.5rem 0'
  },
  productActions: {
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

function Productos() {
    const { logout, user } = useAuth();
    const { products, searchTerm, setSearchTerm, categoryFilter, setCategoryFilter } = useProducts();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleEdit = (id) => {
        navigate(`/productos/edit/${id}`);
    };

    const handleView = (id) => {
        navigate(`/productos/view/${id}`);
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro que quieres eliminar este producto?")) {
            await deleteProduct(id);
            window.location.reload();
        }
    };

    const handleCreate = () => {
        navigate('/productos/create');
    };

    const handleBack = () => {
        navigate('/dashboard');
    };

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
                <h1 style={styles.title}>Gestión de Productos</h1>
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
                        Crear Nuevo Producto
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

            <div style={styles.productList}>
                {products.map((product) => (
                    <div key={product.id} style={styles.productCard}>
                        <h3 style={styles.productTitle}>{product.name}</h3>
                        <p style={styles.productInfo}>Descripción: {product.description}</p>
                        <p style={styles.productInfo}>Precio: ${product.price}</p>
                        <div style={styles.productActions}>
                            <button 
                                style={{
                                    ...styles.smallButton,
                                    ...styles.viewButton
                                }}
                                onClick={() => handleView(product.id)}
                            >
                                Ver
                            </button>
                            <button 
                                style={{
                                    ...styles.smallButton,
                                    ...styles.editButton
                                }}
                                onClick={() => handleEdit(product.id)}
                            >
                                Editar
                            </button>
                            <button 
                                style={{
                                    ...styles.smallButton,
                                    ...styles.deleteButton
                                }}
                                onClick={() => handleDelete(product.id)}
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

export default Productos;
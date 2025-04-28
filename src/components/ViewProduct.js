import React, { useEffect, useState } from 'react';
import { getProductById } from '../services/ProductService';
import { useParams, useNavigate } from 'react-router-dom';

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
    margin: '0 auto'
  },
  title: {
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: '2rem',
    fontSize: '1.8rem',
    borderBottom: '2px solid #3498db',
    paddingBottom: '0.5rem'
  },
  detailContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  detailItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  label: {
    color: '#3498db',
    fontWeight: '600',
    fontSize: '1.1rem'
  },
  value: {
    color: '#2c3e50',
    fontSize: '1rem',
    padding: '0.75rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '4px',
    borderLeft: '3px solid #3498db'
  },
  button: {
    backgroundColor: '#95a5a6',
    color: 'white',
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'all 0.3s',
    marginTop: '2rem',
    alignSelf: 'flex-start'
  },
  buttonHover: {
    backgroundColor: '#7f8c8d',
    transform: 'translateY(-2px)'
  },
  loading: {
    textAlign: 'center',
    color: '#7f8c8d',
    fontSize: '1.2rem'
  }
};

function ViewProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        async function fetchProduct() {
            const data = await getProductById(id);
            setProduct(data);
        }
        fetchProduct();
    }, [id]);

    const handleBack = () => {
        navigate(-1);
    };

    const handleMouseEnter = (e) => {
        e.target.style.backgroundColor = styles.buttonHover.backgroundColor;
        e.target.style.transform = styles.buttonHover.transform;
    };

    const handleMouseLeave = (e) => {
        e.target.style.backgroundColor = styles.button.backgroundColor;
        e.target.style.transform = 'none';
    };

    if (!product) return <div style={{...styles.container, ...styles.loading}}>Cargando...</div>;

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Detalles del Producto</h2>
                
                <div style={styles.detailContainer}>
                    <div style={styles.detailItem}>
                        <span style={styles.label}>Nombre:</span>
                        <p style={styles.value}>{product.name}</p>
                    </div>
                    
                    <div style={styles.detailItem}>
                        <span style={styles.label}>Descripción:</span>
                        <p style={styles.value}>{product.description || 'No disponible'}</p>
                    </div>
                    
                    <div style={styles.detailItem}>
                        <span style={styles.label}>Precio:</span>
                        <p style={styles.value}>${product.price.toFixed(2)}</p>
                    </div>
                </div>
                
                <button 
                    style={styles.button}
                    onClick={handleBack}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    Regresar
                </button>
            </div>
        </div>
    );
}

export default ViewProduct;
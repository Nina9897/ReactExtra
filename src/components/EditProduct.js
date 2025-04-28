import React, { useEffect, useState } from 'react';
import { getProductById, updateProduct } from '../services/ProductService';
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
    maxWidth: '500px',
    margin: '0 auto'
  },
  title: {
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: '2rem',
    fontSize: '1.8rem'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  label: {
    color: '#2c3e50',
    fontWeight: '500'
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
    borderColor: '#3498db'
  },
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1rem'
  },
  primaryButton: {
    backgroundColor: '#3498db',
    color: 'white',
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'all 0.3s',
    flex: 1
  },
  primaryButtonHover: {
    backgroundColor: '#2980b9',
    transform: 'translateY(-2px)'
  },
  secondaryButton: {
    backgroundColor: '#95a5a6',
    color: 'white',
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'all 0.3s',
    flex: 1
  },
  secondaryButtonHover: {
    backgroundColor: '#7f8c8d',
    transform: 'translateY(-2px)'
  }
};

function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({ 
        name: '', 
        description: '', 
        price: '' 
    });
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        async function fetchProduct() {
            const product = await getProductById(id);
            setForm(product);
        }
        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateProduct(id, form);
        alert('Producto actualizado correctamente');
        navigate('/productos');
    };

    const handleBack = () => {
        navigate(-1);
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

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Editar Producto</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Nombre</label>
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Nombre del producto"
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
                        <label style={styles.label}>Descripción</label>
                        <input
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Descripción del producto"
                            style={{
                                ...styles.input,
                                ...(isFocused ? styles.inputFocus : {})
                            }}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                        />
                    </div>
                    
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Precio</label>
                        <input
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            type="number"
                            placeholder="Precio en $"
                            required
                            style={{
                                ...styles.input,
                                ...(isFocused ? styles.inputFocus : {})
                            }}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            min="0"
                            step="0.01"
                        />
                    </div>
                    
                    <div style={styles.buttonGroup}>
                        <button 
                            type="button"
                            style={styles.secondaryButton}
                            onClick={handleBack}
                            onMouseEnter={(e) => handleMouseEnter(e, styles.secondaryButtonHover)}
                            onMouseLeave={(e) => handleMouseLeave(e, styles.secondaryButton)}
                        >
                            Regresar
                        </button>
                        <button 
                            type="submit"
                            style={styles.primaryButton}
                            onMouseEnter={(e) => handleMouseEnter(e, styles.primaryButtonHover)}
                            onMouseLeave={(e) => handleMouseLeave(e, styles.primaryButton)}
                        >
                            Guardar Cambios
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditProduct;
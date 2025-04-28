import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById, updateUser } from "../services/UserService";

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
    backgroundColor: '#f39c12',
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
    backgroundColor: '#d35400',
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
  },
  error: {
    color: '#e74c3c',
    fontSize: '0.9rem',
    marginTop: '0.25rem'
  }
};

const EditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({ 
        name: "", 
        email: "", 
        password: "" 
    });
    const [errors, setErrors] = useState({});
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const data = await getUserById(id);
            setUser(data);
        };
        fetchUser();
    }, [id]);

    const validateForm = () => {
        const newErrors = {};
        
        if (!user.name) newErrors.name = "Nombre es obligatorio";
        if (!user.email) {
            newErrors.email = "Email es obligatorio";
        } else if (!/\S+@\S+\.\S+/.test(user.email)) {
            newErrors.email = "Email no válido";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        try {
            await updateUser(id, user);
            alert("Usuario actualizado correctamente");
            navigate("/usuarios");
        } catch (error) {
            alert("Error al actualizar usuario: " + error.message);
        }
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
                <h2 style={styles.title}>Editar Usuario</h2>
                <form onSubmit={handleUpdate} style={styles.form}>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Nombre</label>
                        <input
                            type="text"
                            placeholder="Nombre completo"
                            value={user.name}
                            onChange={(e) => setUser({ ...user, name: e.target.value })}
                            style={{
                                ...styles.input,
                                ...(isFocused ? styles.inputFocus : {})
                            }}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                        />
                        {errors.name && <span style={styles.error}>{errors.name}</span>}
                    </div>
                    
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Email</label>
                        <input
                            type="email"
                            placeholder="correo@ejemplo.com"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            style={{
                                ...styles.input,
                                ...(isFocused ? styles.inputFocus : {})
                            }}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                        />
                        {errors.email && <span style={styles.error}>{errors.email}</span>}
                    </div>
                    
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Contraseña</label>
                        <input
                            type="password"
                            placeholder="Dejar en blanco para no cambiar"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            style={{
                                ...styles.input,
                                ...(isFocused ? styles.inputFocus : {})
                            }}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
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
                            Actualizar Usuario
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditUser;
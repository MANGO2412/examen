import React, { useState } from 'react';
import { useAuth } from '../auth/UseAuth';

const LoginPage = () => {
  const loginPageStyles = {
    body: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '200%',
      backgroundColor: '#f8f9fa',
    },
    loginContainer: {
      backgroundColor: '#ffffff',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      width: '700px' // Ajustar el ancho al tamaño deseado
    },
    formControl: {
      borderRadius: '0.25rem',
    },
    btn: {
      borderRadius: '0.25rem',
    },
    h3: {
      marginBottom: '20px',
    },
  };

  const { login } = useAuth();
  const [logUser, setLogUser] = useState({});

  const handleLogInput = (e) => {
    const { name, value } = e.target;
    setLogUser({
      ...logUser,
      [name]: value.trim(),
    });
  };

  return (
    <div style={loginPageStyles.body}>
      <div className="login-container" style={loginPageStyles.loginContainer}>
        <h3 style={loginPageStyles.h3} className="text-center">Inicio de Sesión</h3>
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo Electrónico</label>
            <input type="email" className="form-control" id="email" name="email" placeholder="Ingresa tu correo electrónico" onChange={handleLogInput} required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input type="password" className="form-control" id="password" name="password" placeholder="Ingresa tu contraseña" onChange={handleLogInput} required />
          </div>
          <div className="d-grid">
            <button type="submit" onClick={() => { login(logUser) }} className="btn btn-primary">Iniciar Sesión</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

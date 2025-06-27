import React, { useState } from 'react';
import Register from './register';
import supabase from '../../src/config/supabase'

interface LoginProps {
  onLogin: (usuario: any) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const [mostrarRegistro, setMostrarRegistro] = useState(false);

  if (mostrarRegistro) {
    return (
      <Register
        onRegister={onLogin}
        onVolver={() => setMostrarRegistro(false)}
      />
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const { data, error } = await supabase.auth.signInWithPassword({
      email: correo,
      password: contrasena,
    });
    if (error) {
      setError(error.message || 'Error de autenticación');
      return;
    }
    if (data && data.user) {
      onLogin(data.user);
    } else {
      setError('No se pudo iniciar sesión');
    }
    if (!/[a-z]/.test(contrasena) || !/[A-Z]/.test(contrasena) || !/[0-9]/.test(contrasena)) {
      setError('La contraseña debe tener al menos una minúscula, una mayúscula y un número.');
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
        <h2>Iniciar sesión</h2>
        <input
            type="email"
            placeholder="Correo"
            value={correo}
            onChange={e => setCorreo(e.target.value)}
            required
            className="login-input"
        />
        <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={e => setContrasena(e.target.value)}
            required
            className="login-input"
        />
        <button type="submit" className="login-btn">
            Entrar
        </button>
        <button type="button" onClick={() => setMostrarRegistro(true)} className="login-btn-secondary">
            ¿No tienes cuenta? Regístrate
        </button>
        {error && <div className="login-error">{error}</div>}
        </form>
  );
};

export default Login;
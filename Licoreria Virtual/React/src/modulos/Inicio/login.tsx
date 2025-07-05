import React, { useState } from 'react';
import Register from './register';
import supabase from '../../config/supabase';

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
      // Verifica si el usuario existe en la tabla personalizada
      const { data: usuarioPersonalizado } = await supabase
        .from('usuarios')
        .select('id')
        .eq('id', data.user.id)
        .single();

      if (!usuarioPersonalizado) {
        // Si no existe, lo insertamos (nombre vacío porque no lo tenemos aquí)
        await supabase.from('usuarios').insert([
          {
            id: data.user.id,
            nombre: data.user.user_metadata?.nombre || 'Sin nombre',
            correo: data.user.email
          }
        ]);
      }

      onLogin(data.user);
    } else {
      setError('No se pudo iniciar sesión');
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
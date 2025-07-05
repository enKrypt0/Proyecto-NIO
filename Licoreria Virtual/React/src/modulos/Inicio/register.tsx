import React, { useState } from 'react'
import supabase from '../../config/supabase'

interface RegisterProps {
  onRegister: (usuario: any) => void;
  onVolver: () => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister, onVolver }) => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    // Validación de contraseña fuerte SOLO aquí
    if (!/[a-z]/.test(contrasena) || !/[A-Z]/.test(contrasena) || !/[0-9]/.test(contrasena)) {
      setError('La contraseña debe tener al menos una minúscula, una mayúscula y un número.');
      return;
    }
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: correo,
      password: contrasena,
    });
    if (signUpError) {
      setError(signUpError.message || 'Error al registrar');
      return;
    }

    // Si el registro fue exitoso y NO requiere confirmación de email
    if (data.user) {
      // Inserta en la tabla usuarios
      const { error: insertError } = await supabase.from('usuarios').insert([
        { id: data.user.id, nombre, correo }
      ]);
      if (insertError) {
        setError(insertError.message || 'Error al guardar usuario en la base de datos');
        return;
      }
      // Login automático
      const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
        email: correo,
        password: contrasena,
      });
      if (loginError) {
        setError(loginError.message || 'Error al iniciar sesión automáticamente');
        return;
      }
      onRegister(loginData.user);
    } else {
      setError('Revisa tu correo para confirmar la cuenta antes de continuar.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 350, margin: '2rem auto', background: '#334155', padding: 24, borderRadius: 12 }}>
      <h2>Registrarse</h2>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={e => setNombre(e.target.value)}
        required
        style={{ width: '100%', marginBottom: 12, padding: 8, borderRadius: 6 }}
      />
      <input
        type="email"
        placeholder="Correo"
        value={correo}
        onChange={e => setCorreo(e.target.value)}
        required
        style={{ width: '100%', marginBottom: 12, padding: 8, borderRadius: 6 }}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={contrasena}
        onChange={e => setContrasena(e.target.value)}
        required
        style={{ width: '100%', marginBottom: 12, padding: 8, borderRadius: 6 }}
      />
      <button type="submit" style={{ width: '100%', padding: 10, borderRadius: 6, background: '#38bdf8', color: '#fff', fontWeight: 700 }}>
        Crear cuenta
      </button>
      <button type="button" onClick={onVolver} style={{ width: '100%', marginTop: 10, padding: 10, borderRadius: 6, background: '#64748b', color: '#fff' }}>
        Volver al login
      </button>
      {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}
    </form>
  );
};

export default Register;
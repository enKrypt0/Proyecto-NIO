import { useEffect, useState } from 'react'
import Home from './modulos/Inicio/home'
import Login from './modulos/Inicio/login'
import CarritoView from './modulos/Pedidos/CarritoView'
import CocteleraVirtual from './modulos/CocteleraVirtual/CocteleraVirtual'
import supabase from './config/supabase'

interface AppProps {
  setUsuarioId: (id: string | undefined) => void;
}

function App({ setUsuarioId }: AppProps) {
  const [usuario, setUsuario] = useState<any>(null);
  const [pantalla, setPantalla] = useState<'home' | 'carrito' | 'coctelera'>('home');
  const [usuarioId, setUsuarioIdLocal] = useState<string | undefined>(undefined);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Cierra sesión automáticamente al cargar la app
    supabase.auth.signOut().then(() => {
      setUsuario(null);
      setUsuarioId(undefined);
      setUsuarioIdLocal(undefined);
      setCargando(false);
    });
  }, []);

  if (cargando) {
    return <div style={{ color: "#fff", textAlign: "center", marginTop: "3rem" }}>Cargando...</div>;
  }

  if (!usuario) {
    return <Login onLogin={u => {
      setUsuario(u);
      setPantalla('home');
      setUsuarioId(u.id);
      setUsuarioIdLocal(u.id);
    }} />
  }

  if (!usuarioId) {
    return <div style={{ color: "#fff", textAlign: "center", marginTop: "3rem" }}>Cargando usuario...</div>;
  }

  if (pantalla === 'carrito') {
    return (
      <CarritoView
        onVolver={() => setPantalla('home')}
        usuarioId={usuarioId}
      />
    )
  }

  if (pantalla === 'coctelera') {
    return (
      <CocteleraVirtual
        onVolver={() => setPantalla('home')}
      />
    )
  }

  return (
    <Home
      onLogout={() => {
        setUsuario(null);
        setPantalla('home');
        setUsuarioId(undefined);
        setUsuarioIdLocal(undefined);
      }}
      irCarrito={() => setPantalla('carrito')}
      irCoctelera={() => setPantalla('coctelera')}
    />
  )
}

export default App
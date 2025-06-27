import { useEffect, useState } from 'react'
import Home from '../modulos/Inicio/home'
import Login from '../modulos/Inicio/login'
import CarritoView from '../modulos/Pedidos/CarritoView'
import CocteleraVirtual from '../modulos/CocteleraVirtual/CocteleraVirtual'
import supabase from './config/supabase'

interface AppProps {
  setUsuarioId: (id: string | undefined) => void;
}

function App({ setUsuarioId }: AppProps) {
  const [usuario, setUsuario] = useState<any>(null);
  const [pantalla, setPantalla] = useState<'home' | 'carrito' | 'coctelera'>('home');
  const [usuarioId, setUsuarioIdLocal] = useState<string | undefined>(undefined);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUsuario(data.session?.user ?? null);
      setUsuarioId(data.session?.user?.id);
      setUsuarioIdLocal(data.session?.user?.id);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUsuario(session?.user ?? null);
      setUsuarioId(session?.user?.id);
      setUsuarioIdLocal(session?.user?.id);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [setUsuarioId]);

  if (!usuario) {
    return <Login onLogin={u => { setUsuario(u); setPantalla('home'); setUsuarioId(u.id); }} />
  }

  if (pantalla === 'carrito') {
    return (
      <CarritoView
        onVolver={() => setPantalla('home')}
        usuarioId={usuarioId !== undefined ? String(usuarioId) : ''}
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
      onLogout={() => { setUsuario(null); setPantalla('home') }}
      irCarrito={() => setPantalla('carrito')}
      irCoctelera={() => setPantalla('coctelera')}
    />
  )
}

export default App
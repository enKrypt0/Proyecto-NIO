import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { CarritoProvider } from '../modulos/Pedidos/Carrito'

function Root() {
  const [usuarioId, setUsuarioId] = useState<string | undefined>(undefined);

  return (
    <CarritoProvider usuarioId={usuarioId}>
      <App setUsuarioId={setUsuarioId} />
    </CarritoProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
)
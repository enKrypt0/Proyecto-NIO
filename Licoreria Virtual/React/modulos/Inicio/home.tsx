import { useState } from 'react'
import CocteleraVirtual from '../CocteleraVirtual/CocteleraVirtual'

function Home() {
  const [mostrarCoctelera, setMostrarCoctelera] = useState(false)

  if (!mostrarCoctelera) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
      }}>
        <button
          style={{
            fontSize: '2rem',
            padding: '1.2rem 2.5rem',
            borderRadius: '1.2rem',
            background: 'linear-gradient(90deg, #38bdf8 60%, #0ea5e9 100%)',
            color: '#fff',
            border: 'none',
            boxShadow: '0 4px 16px #0ea5e955',
            cursor: 'pointer',
            fontWeight: 700,
            letterSpacing: '1px'
          }}
          onClick={() => setMostrarCoctelera(true)}
        >
          Coctel Personalizado
        </button>
      </div>
    )
  }

  return <CocteleraVirtual onVolver={() => setMostrarCoctelera(false)} />
}

export default Home
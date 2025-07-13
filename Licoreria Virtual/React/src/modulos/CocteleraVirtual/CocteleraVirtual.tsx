import React, { useState } from 'react'
import SelectorLicor from './SelectorLicor'
import SelectorMarcaLicor from './SelectorMarcaLicor'
import SelectorIngredientes from './SelectorIngredientes'
import SelectorFrutas from './SelectorFrutas'
import VistaPrevia from '../VistaPrevia/VistaPrevia'
import { useCarrito } from '../Pedidos/Carrito'
import type { ItemCarrito } from '../Pedidos/Carrito'

interface CocteleraVirtualProps {
  onVolver: () => void;
}

const CocteleraVirtual: React.FC<CocteleraVirtualProps> = ({ onVolver }) => {
  const [licor, setLicor] = useState('')
  const [marca, setMarca] = useState('')
  const [ingredientes, setIngredientes] = useState<string[]>([])
  const [frutas, setFrutas] = useState<string[]>([])
  const [nombreCoctel, setNombreCoctel] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [notificacion, setNotificacion] = useState<string | null>(null);
  const PRECIO_COCTEL_PERSONALIZADO = 8.99;
  const { agregar } = useCarrito();
  

  const mostrarNotificacion = (mensaje: string) => {
    setNotificacion(mensaje);
    setTimeout(() => setNotificacion(null), 3000); // 3 segundos
  };

  const handleSetLicor = (nuevoLicor: string) => {
    setLicor(nuevoLicor)
    setMarca('')
    setIngredientes([])
    setFrutas([])
  }

  const handlePedirCoctel = () => {
    if (!nombreCoctel.trim()) {
      setError('El nombre del cóctel es obligatorio');
      return;
    }
    setError(null);
    const item: ItemCarrito = {
      coctel_id: crypto.randomUUID(),
      nombre: nombreCoctel,
      licor,
      marca,
      ingredientes,
      frutas,
      cantidad: 1,
      precio_unitario: PRECIO_COCTEL_PERSONALIZADO,
      imagen: '',
    };
    agregar(item);
    mostrarNotificacion(`"${nombreCoctel}" añadido como cóctel personalizado`);
    setLicor('');
    setMarca('');
    setIngredientes([]);
    setFrutas([]);
    setNombreCoctel('');
  };

  return (
    <div className="coctelera-virtual" style={{ position: 'relative' }}>
      <button
        className="btn-volver-coctelera"
        onClick={onVolver}
      >
        Volver
      </button>
      <h1>Coctelera Virtual</h1>
      <div className="coctelera-tarjetas">
        <div className="tarjeta-seleccion tarjeta-licor">
          <h3>Tipo de Licor</h3>
          <SelectorLicor licor={licor} setLicor={handleSetLicor} />
        </div>
        {notificacion && (
        <div className="notificacion-carrito">
          {notificacion}
        </div>
        )}
        {licor && (
          <div className="tarjeta-seleccion tarjeta-marca">
            <h3>Marca del Licor</h3>
            <SelectorMarcaLicor licor={licor} marca={marca} setMarca={setMarca} />
          </div>
        )}
        {licor && marca && (
          <div className="tarjetas-row">
            <div className="tarjeta-seleccion tarjeta-ingredientes">
              <h3>Ingredientes</h3>
              <SelectorIngredientes licor={licor} ingredientes={ingredientes} setIngredientes={setIngredientes} />
            </div>
            <div className="tarjeta-seleccion tarjeta-frutas">
              <h3>Frutas</h3>
              <SelectorFrutas licor={licor} frutas={frutas} setFrutas={setFrutas} />
            </div>
          </div>
        )}
      </div>
      <VistaPrevia licor={licor} marca={marca} ingredientes={ingredientes} frutas={frutas} />
      <input
        type="text"
        placeholder="Nombre del cóctel personalizado"
        value={nombreCoctel}
        onChange={e => setNombreCoctel(e.target.value)}
        style={{ width: '100%', marginBottom: 12, padding: 8, borderRadius: 6, border: '1px solid #38bdf8', fontSize: '1.1rem' }}
      />
      {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
      <button
        className="carrito-btn-finalizar"
        style={{ marginTop: 16 }}
        onClick={handlePedirCoctel}
        disabled={!licor || !marca || !nombreCoctel.trim()}
      >
        Pedir Coctel Personalizado
      </button>
    </div>
  )
}

export default CocteleraVirtual
import React, { useState } from 'react';
import { useCarrito } from './Carrito.tsx';
import HistorialPedidos from './HistorialPedidos';
import supabase from '../../src/config/supabase';

interface CarritoViewProps {
  onVolver: () => void;
  usuarioId: string;
}

const CarritoView: React.FC<CarritoViewProps> = ({ onVolver, usuarioId }) => {
  const { items, quitar, setCantidad, limpiar } = useCarrito();
  const total = items.reduce((acc, i) => acc + i.precio_unitario * i.cantidad, 0);
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);
  const [mostrarHistorial, setMostrarHistorial] = useState(false);

  const finalizarCompra = async () => {
    setCargando(true);
    setMensaje(null);
    try {
      const { data: pedido, error: errorPedido } = await supabase
        .from('pedidos')
        .insert([{ usuario_id: usuarioId }])
        .select()
        .single();

      if (errorPedido || !pedido) throw new Error('Error al crear el pedido');

      const detalles = items.map(item => ({
        pedido_id: pedido.id,
        producto_id: item.producto_id || null,
        coctel_id: item.coctel_id || null,
        cantidad: item.cantidad,
        precio_unitario: item.precio_unitario
      }));

      const { error: errorDetalles } = await supabase
        .from('detalles_pedido')
        .insert(detalles);

      if (errorDetalles) throw new Error('Error al crear detalles del pedido');

      setMensaje('¡Pedido realizado con éxito!');
      limpiar();
    } catch (e) {
      setMensaje('Hubo un error al finalizar la compra.');
    } finally {
      setCargando(false);
    }
  };

  if (mostrarHistorial) {
    return (
      <div>
        <button onClick={() => setMostrarHistorial(false)} className="btn-volver-carrito">
          Volver al carrito
        </button>
        <HistorialPedidos usuarioId={usuarioId} />
      </div>
    );
  }

  return (
    <div className="carrito-view">
      <button onClick={onVolver} className="btn-volver-carrito">Volver</button>
      <h2 className="carrito-titulo">Tu Carrito</h2>
      {mensaje && <div className="carrito-mensaje">{mensaje}</div>}
      <div className="carrito-contenido">
        <div className="carrito-productos">
          <h3 className="carrito-subtitulo">Productos seleccionados</h3>
          {items.length === 0 ? (
            <div className="carrito-vacio">El carrito está vacío.</div>
          ) : (
            <ul className="carrito-lista">
              {items.map(item => (
                <li key={item.producto_id || item.coctel_id} className="carrito-tarjeta-producto">
                  <img src={item.imagen} alt={item.nombre} className="carrito-img-producto" />
                  <div className="carrito-info-producto">
                    <span className="carrito-nombre-producto">{item.nombre}</span>
                    <span>${Number(item.precio_unitario).toFixed(2)}</span>
                    <div className="carrito-cantidad-row">
                      <label htmlFor={`cantidad-${item.producto_id || item.coctel_id}`}>Cantidad:</label>
                      <input
                        id={`cantidad-${item.producto_id || item.coctel_id}`}
                        type="number"
                        min={1}
                        value={item.cantidad}
                        className="carrito-input-cantidad"
                        onChange={e => setCantidad(item.producto_id || item.coctel_id!, Number(e.target.value))}
                      />
                    </div>
                  </div>
                  <button className="carrito-btn-quitar" onClick={() => quitar(item.producto_id || item.coctel_id!)}>Quitar</button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="carrito-resumen">
          <h3 className="carrito-subtitulo">Resumen de compra</h3>
          <div className="carrito-resumen-linea">
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="carrito-resumen-linea total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button className="carrito-btn-vaciar" onClick={limpiar} disabled={items.length === 0}>Vaciar carrito</button>
          <button
            className="carrito-btn-finalizar"
            onClick={finalizarCompra}
            disabled={items.length === 0 || cargando}
            style={{ marginTop: 8 }}
          >
            {cargando ? 'Procesando...' : 'Finalizar compra'}
          </button>
          <button
            className="carrito-btn-historial"
            onClick={() => setMostrarHistorial(true)}
            style={{ marginTop: 8 }}
          >
            Ver mis pedidos
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarritoView;
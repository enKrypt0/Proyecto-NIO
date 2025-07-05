import { useState, useEffect } from 'react'
import { useCarrito } from '../Pedidos/Carrito'
import supabase from '../../config/supabase'

interface HomeProps {
  onLogout: () => void;
  irCarrito: () => void;
  irCoctelera: () => void;
}

interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  inventario: number;
  imagen?: string;
}

const Home: React.FC<HomeProps> = ({ onLogout, irCarrito, irCoctelera }) => {
  const [productos, setProductos] = useState<Producto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [notificacion, setNotificacion] = useState<string | null>(null)
  const { agregar } = useCarrito();

  const mostrarNotificacion = (mensaje: string) => {
    setNotificacion(mensaje);
    setTimeout(() => setNotificacion(null), 3000); // 3 segundos
  };

  useEffect(() => {
    const cargarProductos = async () => {
      setLoading(true)
      const { data, error } = await supabase.from('productos').select('*')
      if (error) {
        setProductos([])
        setError('No se pudo cargar el catálogo. Intenta más tarde.')
      } else {
        setProductos(data || [])
        setError(null)
      }
      setLoading(false)
    }
    cargarProductos()
  }, [])

  return (
    <div className="home-root">
      <div className="home-header">
        <button
          className="btn-logout"
          onClick={onLogout}
        >
          Cerrar sesión
        </button>
        <button
          className="btn-mostrar-carrito"
          onClick={irCarrito}
        >
          Mostrar carrito
        </button>
      </div>
      <h1 className="home-title">Bienvenido a la Licorería Virtual</h1>
      {notificacion && (
        <div className="notificacion-carrito">
          {notificacion}
        </div>
      )}
      <section className="catalogo-section">
        <h2 className="catalogo-title">Catálogo de Productos</h2>
        {loading ? (
          <div className="catalogo-loading">Cargando catálogo...</div>
        ) : error ? (
          <div className="catalogo-error">{error}</div>
        ) : productos.length === 0 ? (
          <div className="catalogo-vacio">No hay productos disponibles.</div>
        ) : (
          <div className="catalogo-lista">
            {productos.map(prod => (
              <div key={prod.id} className="catalogo-tarjeta">
                <img
                  src={prod.imagen ? prod.imagen : "/productos/default-producto.jpeg"}
                  alt={prod.nombre}
                  className="catalogo-tarjeta-img"
                  onError={e => (e.currentTarget.src = "/productos/default-producto.jpeg")}
                />
                <h3 className="catalogo-tarjeta-titulo">{prod.nombre}</h3>
                <p className="catalogo-tarjeta-desc">{prod.descripcion}</p>
                <div className="catalogo-tarjeta-precio">
                  Precio: ${typeof prod.precio === 'number' ? prod.precio.toFixed(2) : 'N/A'}
                </div>
                <div className="catalogo-tarjeta-stock">
                  Stock: {typeof prod.inventario === 'number' ? prod.inventario : 'N/A'}
                </div>
                <button
                  className="btn-agregar-carrito"
                  onClick={() => {
                    agregar({
                      producto_id: prod.id,
                      nombre: prod.nombre,
                      cantidad: 1,
                      precio_unitario: prod.precio,
                      imagen: prod.imagen
                    });
                    mostrarNotificacion(`"${prod.nombre}" añadido al carrito`);
                  }}
                >
                  Agregar al carrito
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
      <button
        className="btn-coctel-personalizado"
        onClick={irCoctelera}
      >
        Coctel Personalizado
      </button>
    </div>
  )
}

export default Home
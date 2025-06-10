import React, { useEffect, useState } from 'react'

interface SelectorMarcaLicorProps {
  licor: string
  marca: string
  setMarca: (marca: string) => void
}

interface Marca {
  id: string
  nombre: string
  tipo_licor_id: string
  imagen: string // Nueva propiedad para la imagen
}

const SelectorMarcaLicor: React.FC<SelectorMarcaLicorProps> = ({ licor, marca, setMarca }) => {
  const [marcas, setMarcas] = useState<Marca[]>([])
  const [tiposLicor, setTiposLicor] = useState<{ id: string, nombre: string }[]>([])

  // Obtener tipos de licor para mapear nombre a id
  useEffect(() => {
    fetch('http://localhost:3001/tipos_licor')
      .then(res => res.json())
      .then(data => setTiposLicor(data))
      .catch(err => console.error('Error al obtener tipos de licor:', err))
  }, [])

  // Obtener todas las marcas
  useEffect(() => {
    fetch('http://localhost:3001/marcas')
      .then(res => res.json())
      .then(data => setMarcas(data))
      .catch(err => console.error('Error al obtener marcas:', err))
  }, [])

  // Buscar el id del tipo de licor seleccionado
  const tipoLicor = tiposLicor.find(t => t.nombre === licor)
  const marcasFiltradas = tipoLicor
    ? marcas.filter(m => m.tipo_licor_id === tipoLicor.id)
    : []

  return (
    <div className="selector-marca-licor-tarjetas">
      {marcasFiltradas.map(m => (
        <div
          key={m.id}
          className={`tarjeta-marca-licor${marca === m.nombre ? ' seleccionada' : ''}`}
          onClick={() => setMarca(m.nombre)}
        >
          <div className="marca-imagen-card">
            <div className="marca-imagen">
              <img src={m.imagen} alt={m.nombre} />
            </div>
          </div>
          <div className="marca-titulo">{m.nombre}</div>
        </div>
      ))}
    </div>
  )
}

export default SelectorMarcaLicor
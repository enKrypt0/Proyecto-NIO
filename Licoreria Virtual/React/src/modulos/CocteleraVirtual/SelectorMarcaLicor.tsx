import React, { useEffect, useState } from 'react'
import supabase from '../../config/supabase'

interface SelectorMarcaLicorProps {
  licor: string
  marca: string
  setMarca: (marca: string) => void
}

interface Marca {
  id: string
  nombre: string
  tipo_licor_id: string
  imagen: string
}

const SelectorMarcaLicor: React.FC<SelectorMarcaLicorProps> = ({ licor, marca, setMarca }) => {
  const [marcas, setMarcas] = useState<Marca[]>([])
  const [tiposLicor, setTiposLicor] = useState<{ id: string, nombre: string }[]>([])

  // Obtener tipos de licor para mapear nombre a id
  useEffect(() => {
    const fetchTiposLicor = async () => {
      const { data, error } = await supabase.from('tipos_licor').select('id, nombre')
      if (error) {
        console.error('Error al obtener tipos de licor:', error)
        return
      }
      setTiposLicor(data || [])
    }
    fetchTiposLicor()
  }, [])

  // Obtener todas las marcas
  useEffect(() => {
    const fetchMarcas = async () => {
      const { data, error } = await supabase.from('marcas').select('*')
      if (error) {
        console.error('Error al obtener marcas:', error)
        return
      }
      setMarcas(data || [])
    }
    fetchMarcas()
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
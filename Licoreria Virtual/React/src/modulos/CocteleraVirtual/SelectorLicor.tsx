import React, { useEffect, useState } from 'react'
import supabase from '../../config/supabase'

interface SelectorLicorProps {
  licor: string
  setLicor: (licor: string) => void
}

interface TipoLicor {
  id: string
  nombre: string
}

const SelectorLicor: React.FC<SelectorLicorProps> = ({ licor, setLicor }) => {
  const [licores, setLicores] = useState<string[]>([])

  useEffect(() => {
    const fetchFrutas = async () => {
      const { data, error } = await supabase.from('tipos_licor').select('*')
      if (error) {
        console.error('Error al obtener tipos de licores:', error)
        return
      }
      setLicores(data ? data.map((f: TipoLicor) => f.nombre) : [])
    }
    fetchFrutas()
  }, [])

  return (
    <div className="selector-licor">
      <h3>Selecciona el tipo de licor</h3>
      <select value={licor} onChange={e => setLicor(e.target.value)}>
        <option value="">-- Selecciona --</option>
        {licores.map(l => (
          <option key={l} value={l}>{l}</option>
        ))}
      </select>
    </div>
  )
}

export default SelectorLicor
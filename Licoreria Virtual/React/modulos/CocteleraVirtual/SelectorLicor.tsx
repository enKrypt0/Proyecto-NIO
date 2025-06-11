import React, { useEffect, useState } from 'react'

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
    fetch('http://localhost:3001/tipos_licor')
      .then(res => res.json())
      .then(data => setLicores(data.map((l: TipoLicor) => l.nombre)))
      .catch(err => console.error('Error al obtener licores:', err))
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
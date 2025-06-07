import React from 'react'

interface SelectorLicorProps {
  licor: string
  setLicor: (licor: string) => void
}

const licores = ['Tequila', 'Ron', 'Vodka', 'Whisky', 'Vodka', 'Ginebra', 'Vermouth']

const SelectorLicor: React.FC<SelectorLicorProps> = ({ licor, setLicor }) => (
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

export default SelectorLicor
import React, { useState } from 'react'
import SelectorLicor from './SelectorLicor'
import SelectorMarcaLicor from './SelectorMarcaLicor'
import SelectorIngredientes from './SelectorIngredientes'
import SelectorFrutas from './SelectorFrutas'
import VistaPrevia from '../VistaPrevia/VistaPrevia'

const CocteleraVirtual: React.FC = () => {
  const [licor, setLicor] = useState('')
  const [marca, setMarca] = useState('')
  const [ingredientes, setIngredientes] = useState<string[]>([])
  const [frutas, setFrutas] = useState<string[]>([])

  const handleSetLicor = (nuevoLicor: string) => {
    setLicor(nuevoLicor)
    setMarca('')
    setIngredientes([])
    setFrutas([])
  }

  return (
    <div className="coctelera-virtual">
      <h1>Coctelera Virtual</h1>
      <div className="coctelera-tarjetas">
        <div className="tarjeta-seleccion tarjeta-licor">
          <h3>Tipo de Licor</h3>
          <SelectorLicor licor={licor} setLicor={handleSetLicor} />
        </div>
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
    </div>
  )
}

export default CocteleraVirtual
import React, { useState } from 'react'
import SelectorLicor from './SelectorLicor'
import SelectorIngredientes from './SelectorIngredientes'
import SelectorFrutas from './SelectorFrutas'
import VistaPrevia from '../VistaPrevia/VistaPrevia'

const CocteleraVirtual: React.FC = () => {
  const [licor, setLicor] = useState('')
  const [ingredientes, setIngredientes] = useState<string[]>([])
  const [frutas, setFrutas] = useState<string[]>([])

  return (
    <div className="coctelera-virtual">
      <h1>Coctelera Virtual</h1>
      <div className="coctelera-seleccionadores">
        <SelectorLicor licor={licor} setLicor={setLicor} />
        <SelectorIngredientes licor={licor} ingredientes={ingredientes} setIngredientes={setIngredientes} />
        <SelectorFrutas licor={licor} frutas={frutas} setFrutas={setFrutas} />
      </div>
      <VistaPrevia licor={licor} ingredientes={ingredientes} frutas={frutas} />
    </div>
  )
}

export default CocteleraVirtual
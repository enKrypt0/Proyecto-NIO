import React from 'react'

interface PosiblesSaboresProps {
  licor: string
  ingredientes: string[]
  frutas: string[]
}

const obtenerSabores = (licor: string, ingredientes: string[], frutas: string[]): string[] => {
  const sabores: string[] = []

  // Tequila
  if (licor === 'Tequila') {
    if (ingredientes.includes('Jugo de limon') || ingredientes.includes('Jugo de naranja') || ingredientes.includes('Refresco de toronja')) {
      sabores.push('Cítrico')
    }
    if (ingredientes.includes('Triple sec') || ingredientes.includes('Jarabe de agave') || ingredientes.includes('Miel')) {
      sabores.push('Dulce')
    }
    if (ingredientes.includes('Sal')) {
      sabores.push('Salado')
    }
    if (frutas.includes('Jalapeño')) {
      sabores.push('Picante')
    }
  }
  // Ron
  else if (licor === 'Ron') {
    if (ingredientes.includes('Jugo de piña') || frutas.includes('Mango')) {
      sabores.push('Tropical')
    }
    if (ingredientes.includes('Menta')) {
      sabores.push('Refrescante')
    }
    if (ingredientes.includes('Azucar moreno') || ingredientes.includes('Jarabe simple')) {
      sabores.push('Dulce')
    }
    if (ingredientes.includes('Coca-Cola')) {
      sabores.push('Caramelo')
    }
    if (ingredientes.includes('Angostura')) {
      sabores.push('Aromático')
    }
  }
  // Vodka
  else if (licor === 'Vodka') {
    if (ingredientes.includes('Jugo de arándano')) {
      sabores.push('Frutal')
    }
    if (ingredientes.includes('Jugo de naranja') || ingredientes.includes('Jugo de limon')) {
      sabores.push('Cítrico')
    }
    if (frutas.includes('Frambuesa') || frutas.includes('Fresa')) {
      sabores.push('Dulce/frutal')
    }
    if (ingredientes.includes('Tónica')) {
      sabores.push('Amargo/refrescante')
    }
  }
  // Whisky
  else if (licor === 'Whisky') {
    if (ingredientes.includes('Vermouth Dulce')) {
      sabores.push('Dulce')
    }
    if (ingredientes.includes('Angostura')) {
      sabores.push('Aromático')
    }
    if (frutas.includes('Cereza')) {
      sabores.push('Frutal')
    }
    if (ingredientes.includes('Miel')) {
      sabores.push('Dulce/suave')
    }
  }
  // Ginebra
  else if (licor === 'Ginebra') {
    if (ingredientes.includes('Tónica')) {
      sabores.push('Amargo/refrescante')
    }
    if (ingredientes.includes('Jugo de limon') || ingredientes.includes('Jugo de naranja')) {
      sabores.push('Cítrico')
    }
    if (frutas.includes('Pepino') || ingredientes.includes('Romero') || ingredientes.includes('Menta') || ingredientes.includes('Lavanda')) {
      sabores.push('Herbal')
    }
    if (frutas.includes('Fresa') || ingredientes.includes('Jugo de arándano')) {
      sabores.push('Frutal')
    }
  }
  // Vermouth
  else if (licor === 'Vermouth') {
    if (ingredientes.includes('Soda') || ingredientes.includes('Agua con gas')) {
      sabores.push('Refrescante')
    }
    if (frutas.includes('Naranja') || frutas.includes('Limon')) {
      sabores.push('Cítrico')
    }
    if (frutas.includes('Aceituna')) {
      sabores.push('Salado/salmuera')
    }
  }

  if (sabores.length === 0) sabores.push('Sabor equilibrado')
  return sabores
}

const PosiblesSabores: React.FC<PosiblesSaboresProps> = ({ licor, ingredientes, frutas }) => {
  const sabores = obtenerSabores(licor, ingredientes, frutas)

  return (
    <div className="posibles-sabores">
      <h3>Posibles Sabores</h3>
      <ul>
        {sabores.map((sabor, idx) => (
          <li key={idx}>{sabor}</li>
        ))}
      </ul>
    </div>
  )
}

export default PosiblesSabores
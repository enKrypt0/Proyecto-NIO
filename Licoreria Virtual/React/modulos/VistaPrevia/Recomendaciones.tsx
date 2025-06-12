import React from 'react'

interface RecomendacionesProps {
  licor: string
  ingredientes: string[]
  frutas: string[]
}

const getRecomendacion = (licor: string, ingredientes: string[], frutas: string[]): string => {
  // Tequila
  if (licor === 'Tequila') {
    if (ingredientes.includes('Jugo de limon') && ingredientes.includes('Triple sec')) {
      return '¡Perfecto para una Margarita! Prueba añadir un poco de sal en el borde del vaso.';
    }
    if (ingredientes.includes('Jugo de naranja')) {
      return 'El tequila y el jugo de naranja combinan muy bien, prueba con un poco de sangrita.';
    }
    if (frutas.includes('Jalapeño')) {
      return '¿Te animas a un cóctel picante? El jalapeño le da un toque especial.';
    }
    return 'El tequila combina bien con cítricos y un toque de sal.';
  }
  // Ron
  if (licor === 'Ron') {
    if (ingredientes.includes('Menta') && ingredientes.includes('Jugo de limon')) {
      return '¡Tienes los ingredientes para un Mojito! Añade soda y azúcar moreno.';
    }
    if (ingredientes.includes('Jugo de piña') && frutas.includes('Mango')) {
      return '¡Prueba una Piña Colada tropical agregando agua de coco!';
    }
    if (ingredientes.includes('Coca-Cola')) {
      return 'Ron con Coca-Cola es un clásico. Añade un poco de lima para realzar el sabor.';
    }
    return 'El ron es versátil: combina bien con jugos tropicales, menta y soda.';
  }
  // Vodka
  if (licor === 'Vodka') {
    if (ingredientes.includes('Jugo de arándano')) {
      return 'Vodka con jugo de arándano es ideal para un Cosmopolitan.';
    }
    if (ingredientes.includes('Jugo de naranja')) {
      return 'Vodka y jugo de naranja: ¡un clásico Screwdriver!';
    }
    if (frutas.includes('Frambuesa')) {
      return 'Agrega frambuesa para un toque fresco y diferente.';
    }
    return 'El vodka combina con casi todo, especialmente jugos y frutas frescas.';
  }
  // Whisky
  if (licor === 'Whisky') {
    if (ingredientes.includes('Vermouth Dulce') && ingredientes.includes('Angostura')) {
      return '¡Tienes los ingredientes para un Manhattan! Añade una cereza para decorar.';
    }
    if (ingredientes.includes('Miel')) {
      return 'Whisky con miel y limón es ideal para un Hot Toddy.';
    }
    if (frutas.includes('Cereza')) {
      return 'La cereza es el toque clásico para cócteles con whisky.';
    }
    return 'El whisky va bien con vermouth, angostura y frutas como cereza o naranja.';
  }
  // Ginebra
  if (licor === 'Ginebra') {
    if (ingredientes.includes('Tónica') && frutas.includes('Pepino')) {
      return '¡Ginebra con tónica y pepino es un Gin Tonic refrescante!';
    }
    if (ingredientes.includes('Jugo de arándano')) {
      return 'Prueba un gin tonic con jugo de arándano y un toque de lavanda.';
    }
    return 'La ginebra combina muy bien con tónica, pepino, cítricos y hierbas.';
  }
  // Vermouth
  if (licor === 'Vermouth') {
    if (ingredientes.includes('Soda') && frutas.includes('Aceituna')) {
      return '¡Vermouth con soda y aceituna es un aperitivo clásico!';
    }
    if (frutas.includes('Naranja')) {
      return 'Vermouth y naranja es una combinación tradicional y refrescante.';
    }
    return 'El vermouth es ideal con soda, limón y aceituna.';
  }
  // Default
  return '¡Experimenta con diferentes combinaciones y descubre tu cóctel favorito!';
}

const Recomendaciones: React.FC<RecomendacionesProps> = ({ licor, ingredientes, frutas }) => {
  const recomendacion = getRecomendacion(licor, ingredientes, frutas)

  return (
    <div className="recomendaciones">
      <h4>Recomendaciones</h4>
      <p>{recomendacion}</p>
    </div>
  )
}

export default Recomendaciones
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import axios from 'axios';

function PokemonCard({ name, onClick }) {
  const [pokemonData, setPokemonData] = useState(null);
  
  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(response => {
        setPokemonData(response.data);
      });
  }, [name]);

  if (!pokemonData) {
    return null; 
  }

  const { sprites } = pokemonData;

  return (
    <div className="pokemon-card" onClick={onClick}>
      <img src={sprites.front_default} alt={name} />
      <h2>{name}</h2>
    </div>
  );
}

export default PokemonCard;

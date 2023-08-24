import { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard';

function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then(response => {
        setPokemonList(response.data.results);
      });
  }, []);

  const handlePokemonClick = async (pokemonName) => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      const pokemonData = response.data;

      const abilities = await Promise.all(pokemonData.abilities.map(async ability => {
        const abilityResponse = await axios.get(ability.ability.url);
        return abilityResponse.data.name;
      }));

      const types = await Promise.all(pokemonData.types.map(async type => {
        const typeResponse = await axios.get(type.type.url);
        return typeResponse.data.name;
      }));

      const hp = pokemonData.stats.find(stat => stat.stat.name === 'hp').base_stat;
      const baseExperience = pokemonData.base_experience;

      setSelectedPokemon({
        ...pokemonData,
        abilities,
        types,
        hp,
        baseExperience,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const closeModal = () => {
    setSelectedPokemon(null);
  };

  const typeColors = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC'
  };

  

  const filteredPokemon = pokemonList.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="todoTodito">
      <div className="input">
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={searchTerm}
          onChange={event => setSearchTerm(event.target.value)}
        />
      </div>
      <div className="pokemon-list">
        {filteredPokemon.map(pokemon => (
          <PokemonCard
            key={pokemon.name}
            name={pokemon.name}
            types={pokemon.types}
            onClick={() => handlePokemonClick(pokemon.name)}
          />
        ))}
        {selectedPokemon && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>{selectedPokemon.name}</h2>
              <img src={selectedPokemon.sprites.front_default} alt={selectedPokemon.name} />
              <p>HP: {selectedPokemon.hp}</p>
              <p>Height: {selectedPokemon.height}</p>
              <p>Weight: {selectedPokemon.weight}</p>
              <p>Base Experience: {selectedPokemon.baseExperience}</p>
              <p>
                Types: {selectedPokemon.types.map(type => (
                  <span
                    key={type}
                    style={{
                      backgroundColor: typeColors[type],
                      padding: '2px 6px',
                      margin: '0 2px',
                      borderRadius: '4px',
                      color: 'white',
                    }}
                  >
                    {type}
                  </span>
                ))}
              </p>
              <p>Abilities: {selectedPokemon.abilities.join(', ')}</p>
              <button onClick={closeModal}>Cerrar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PokemonList;

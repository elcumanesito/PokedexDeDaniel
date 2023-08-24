
import './App.css';
import PokemonList from './components/PokemonList';
import Pokebola from './pokebola.png';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img className='img' src={Pokebola}/>
        <h1>Pokédex del catire</h1>
        <img className='img' src={Pokebola}/>
        
      </header>
      <main>
        <PokemonList />
      </main>
    </div>
  );
}

export default App;

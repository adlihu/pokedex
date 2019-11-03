import React, { Component } from 'react'
import SearchPoke from './components/SearchPoke'
import PokemonDesc from './components/PokemonDesc'
import Evolution from './components/Evolution'
import PropTypes from 'prop-types'

import './App.css';

export class App extends Component {
  constructor () {
    super();

    this.state = {
      pokemon: null,
      pokemonGif: null,
      pokemonSpecies: null,
      evolutionChain: null,
      evolutionUrls: null,
      evolPokemon: true,
      isLoading: true,
      isError: false,
    };
  }
  
  fetchAPI = (name) => {
    this.setState({isLoading: true, isError:false})
    //Fetching API for POKEMON
    fetch('https://pokeapi.co/api/v2/pokemon-species/' + name)
    .then(res => res.json())
    .then( data => {
      const species = data;
      const gifUrl = "https://projectpokemon.org/images/normal-sprite/" + species.name + ".gif";

      //Fetching API for POKEMON 
      fetch(species.varieties[0].pokemon.url)
      .then(res => res.json())
      .then( data=> {
        const pokemon = data;

        //Fetching API for POKEMON EVOLUTION
        fetch(species.evolution_chain.url)
        .then (res => res.json())
        .then(data => {
          this.setState ({
            pokemon: pokemon,
            pokemonSpecies: species,
            pokemonGif: gifUrl,
            evolutionChain: data, 
            isLoading:false
          });
        })
      });
      }
    )
    .catch((error) =>{
      this.setState ({isError:true})
      console.log("ERROR")
    })
  }
  componentDidMount() {
    const randNum = Math.floor(Math.random() * 806);
    this.fetchAPI(randNum);
  }
  //Search pokemon name
  searchPoke = (name) => {
    this.fetchAPI(name);
  }
  
  //Renders first and then it goes to didMount
  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="content">
            <div className="row">
              <SearchPoke searchPoke={this.searchPoke} />
            </div>
            <div className="row">
              <PokemonDesc data = {this.state}/>
            </div>
            <div className="row">
              <Evolution data = {this.state} searchPoke = {this.searchPoke}/>
            </div>
          </div>
          <footer id="footer">
          <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
          </div>
          
          <div>Pokemon Gif made by <a href="https://projectpokemon.org/" title="Project Pokemon">Project Pokemon</a> from <a href="https://projectpokemon.org/" title="Project Pokemon">https://projectpokemon.org/</a>
          </div>
          <br></br>
          Adli Husain © 2019
          </footer>
          
        </div>
      </div>
    )
  }
}
App.propTypes = {
    colors: PropTypes.object,
}
export default App
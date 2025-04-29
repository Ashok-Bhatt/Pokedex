import React from 'react'
import { useState, useEffect } from 'react';
import "./MyList.css"
import PokemonCard from '../PokemonCard/PokemonCard';

function MyList() {

  const [pokemons, setPokemons] = useState([]);

  useEffect(()=>{
    
      const generatePokemons = ()=>{
        
        let pokemonList = [];
        let pokemonsSavedStatus = JSON.parse(localStorage.getItem("savedPokemons")) || {};
  
        for (let pokemon in pokemonsSavedStatus){
          let pokemonName = pokemon;
          let pokemonImageURL = pokemonsSavedStatus[pokemon]["image_url"];
          let pokemonPokedexNo = pokemonsSavedStatus["no"];
          pokemonList.push({
            "pokemonName" : pokemonName,
            "pokemonImageURL" : pokemonImageURL,
            "isPokemonSaved" : true,
            "pokedexNo" : pokemonPokedexNo
          })
        }
    
        setPokemons(pokemonList);
      }
  
      generatePokemons();
    }, [setPokemons])

  return (
    <div>
      <div className="mylist-container">
      <div className="pokemon-options">
        {
            pokemons.map((pokemon, index)=>(
              <PokemonCard pokemonName={pokemon.pokemonName} pokemonImageURL={pokemon.pokemonImageURL} pokemonSavedStatus={pokemon.isPokemonSaved} pokemonPokedexNo={pokemon.pokedexNo} key={index}/>
            ))
        }
      </div>
    </div>
    </div>
  )
}

export default MyList

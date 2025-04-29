import React, { useEffect, useState } from 'react'
import "./Home.css";
import PokemonCard from '../PokemonCard/PokemonCard';

function Home() {

  const [pokemons, setPokemons] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [isBottom, setIsBottom] = useState(false);

  const handleScroll = (event)=>{
    const scrollableElement = event.target;
    const {scrollTop, scrollHeight, clientHeight} = scrollableElement;
    if (scrollTop + clientHeight  > scrollHeight - 5){
      if (!isBottom){
        setPageNo((prev)=>prev+1);
        setIsBottom(true);
        console.log("HI");
      } else {
        setIsBottom(false);
      }
    }
  }

  useEffect(()=>{
    const scrollableElement = document.querySelector(".pokemon-options");
    scrollableElement.addEventListener("scroll", handleScroll);
    return ()=> scrollableElement.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(()=>{

    const generatePokemons = async ()=>{
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${pageNo*20}&limit=${20}`);
      const data = await response.json();
      
      let pokemonList = [];
      let pokemonsSavedStatus = JSON.parse(localStorage.getItem("savedPokemons")) || {};

      for (let i=0; i<data["results"].length; i++){
        let pokemonName = data["results"][i]["name"];
        let pokemonImageURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pageNo*20+i+1}.png`;
        pokemonList.push({
          "pokemonName" : pokemonName,
          "pokemonImageURL" : pokemonImageURL,
          "isPokemonSaved" : pokemonName in pokemonsSavedStatus
        })
      }

      setPokemons((prev)=>[...prev, ...pokemonList]);
    }

    generatePokemons();
  }, [pageNo])


  return (
    <div className="main-container">
      <div className="pokemon-options">
        {
            pokemons.map((pokemon, index)=>(
              <PokemonCard pokemonName={pokemon.pokemonName} pokemonImageURL={pokemon.pokemonImageURL} pokemonSavedStatus={pokemon.isPokemonSaved} pokemonPokedexNo={index+1} key={index}/>
            ))
        }
      </div>
    </div>
  )
}

export default Home

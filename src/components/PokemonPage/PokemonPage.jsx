import React, { useEffect, useState } from 'react'
import "./PokemonPage.css"
import { useParams } from 'react-router-dom';
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";

function PokemonPage(props) {

  const params = useParams();
  const [pokemonData, setPokemonData] = useState({});

  let pokemonJSONData = JSON.parse(localStorage.getItem("savedPokemons")) || {};
  let pokemonSavedStatus = Object.keys(pokemonJSONData).includes(params.pokemon);
  console.log(pokemonSavedStatus);
  const [savedStatus, setSavedStatus] = useState(pokemonSavedStatus);
    
  const toggleSavedStatus = ()=>{
    if (savedStatus){
      pokemonJSONData[params.pokemon] = {
        "no" : pokemonData["pokedex_no"],
        "image_url" : pokemonData["image_url"] 
      }
      localStorage.setItem("savedPokemons", JSON.stringify(pokemonJSONData));
    } else {
        delete pokemonJSONData[params.pokemon];
        localStorage.setItem("savedPokemons", JSON.stringify(pokemonJSONData));
    }
  }

  useEffect(()=>{
      toggleSavedStatus();
  }, [savedStatus])

  const getPokemonInformation = async (pokemon)=>{

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    let data = await response.json();

    let types = [data["types"][0]["type"]["name"]];
    if (data["types"].length === 2){
      types.push(data["types"][1]["type"]["name"]);
    }

    let stats = [];
    for (let i=0; i<data["stats"].length; i++){
      stats[data["stats"][i]["stat"]["name"]] = data["stats"][i]["base_stat"];
    }

    setPokemonData({
      "name" : data["name"],
      "pokedex_no" : data["id"],
      "types" : types,
      "stats" : stats,
      "image_url" : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data["id"]}.png`
    });
    toggleSavedStatus();

  }

  useEffect(()=>{
    getPokemonInformation(params.pokemon);
  }, [])

  return (
    <div className='pokemon-page'>
      <div className="image-container">
        {
          (savedStatus)?(
              <FaBookmark className="bookmark-icon" onClick={()=>{setSavedStatus((prev)=>!prev)}}/>
          ):(
              <FaRegBookmark className="add-bookmark-icon" onClick={()=>{setSavedStatus((prev)=>!prev)}}/>
          )
        }
        <div className="basic-info">
          <div className="pokemon-name-container">{pokemonData["name"]}</div>
          <div className="pokemon-pokedex_no">Pokedex No. : {pokemonData["pokedex_no"]}</div>
          <div className="pokemon-type">Types: {pokemonData["types"]}</div>
        </div>
        <img src={pokemonData["image_url"]} alt="pokemon image" />
      </div>
      <div className="information-container">
        <div className="stats-container">
          {
            (pokemonData["stats"]) ? Object.keys(pokemonData["stats"]).map((element, index)=>(
              <div className="stat" key={element}>
                <div className="stat-name">{element}</div>
                <div className="full-container">
                  <div className="stat-value" style={{width : (pokemonData["stats"][element]*100/255)+"%"}}></div>
                </div>
              </div>
            )) : null
          }
        </div>
      </div>
    </div>
  )
}

export default PokemonPage

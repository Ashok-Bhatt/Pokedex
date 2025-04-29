import "./PokemonCard.css"
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PokemonCard = (props)=>{

    const [savedStatus, setSavedStatus] = useState(props.pokemonSavedStatus);
    
    const navigate = useNavigate();
    
    useEffect(()=>{
        let pokemonSavedStatus = JSON.parse(localStorage.getItem("savedPokemons")) || {};
        if (savedStatus){
            pokemonSavedStatus[props.pokemonName] = {
                "no" : props.pokemonPokedexNo,
                "image_url" : props.pokemonImageURL
            }
            localStorage.setItem("savedPokemons", JSON.stringify(pokemonSavedStatus));
        } else {
            console.log("removed");
            delete pokemonSavedStatus[props.pokemonName];
            localStorage.setItem("savedPokemons", JSON.stringify(pokemonSavedStatus));
        }
    }, [savedStatus])

    return (
        <div className="pokemon-card" onClick={(event)=>{
            if (event.target.closest(".bookmark-icon") || event.target.closest(".add-bookmark-icon")){
                return;
            }
            navigate(`/pokemon/${props.pokemonName}`);
        }}>
            <div className="pokemon-image">
                {
                    (savedStatus)?(
                        <FaBookmark className="bookmark-icon" onClick={()=>{setSavedStatus((prev)=>!prev)}}/>
                    ):(
                        <FaRegBookmark className="add-bookmark-icon" onClick={()=>{setSavedStatus((prev)=>!prev)}}/>
                    )
                }
                <img src={props.pokemonImageURL} alt="Image for pokemon" />
            </div>
            <div className="pokemon-name">{props.pokemonName}</div>
        </div>
    )
}

export default PokemonCard
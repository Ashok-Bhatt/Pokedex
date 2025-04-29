import "./Navigation.css";
import { MdOutlineCatchingPokemon } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { NavLink} from "react-router-dom";
import { useState, useEffect } from "react";

const Navigation = ()=>{

    const [isDarkMode, setIsDarkMode] = useState(false);
    const root = document.querySelector(":root");

    const changeScreenMode = (rs)=>{
        const backgroundColors = ["--background-color-weak", "--background-color-medium", "--background-color-strong"];
        const foregroundColors = ["--foreground-color-weak", "--foreground-color-medium", "--foreground-color-strong"];

        for (let i=0; i<3; i++){
            let foreground = rs.getPropertyValue(foregroundColors[i]);
            let background = rs.getPropertyValue(backgroundColors[i]);
            root.style.setProperty(foregroundColors[i], background);
            root.style.setProperty(backgroundColors[i], foreground);
        }
    }

    useEffect(()=>{
        let rs = getComputedStyle(root);
        changeScreenMode(rs);
    }, [isDarkMode]);

    return (
        <nav className="navigation">
            <MdOutlineCatchingPokemon className="pokemon-logo"/>
            <div className="options-container">
                <ul>
                    <li>
                        <NavLink className="nav-link" to="/">
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="nav-link" to="/mylist">
                            My List
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="nav-link" to="/about">
                            About
                        </NavLink>
                    </li>
                </ul>
                {(isDarkMode)?(<CiLight className="light-mode-button" onClick={()=>setIsDarkMode(false)}/>):(<MdDarkMode className="dark-mode-button" onClick={()=>setIsDarkMode(true)}/>)}
            </div>
        </nav>
    );
}

export default Navigation;
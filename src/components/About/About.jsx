import React from 'react'
import "./About.css"

function About() {
  return (
    <div className="about-section">
      <h2 className="about-us-heading">About Us</h2>
      <div className="about-us-content">
          <p>Hello, welcome to Pokedex Lite</p>
          <p>Know anything about your favourite pokemon</p>
          <p>Why are you waiting grab your pokedex and start exploring the world of pokemons</p>
          <p style={{alignSelf : "flex-end", marginTop : "60px"}}>Developed by Ashok Bhatt</p>
      </div>
    </div>
  )
}

export default About

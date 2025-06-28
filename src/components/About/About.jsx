import React from 'react'
import "./About.css"

function About() {
  return (
    <div className="about-section">
    <h2 className="about-us-heading">About Us</h2>
    <div className="about-us-content">
        <p>Welcome to <strong>Pokédex Lite</strong> — your simplified gateway to the world of Pokémon!</p>
        <p>Discover detailed information about your favorite Pokémon, from their unique abilities to their evolutionary journeys.</p>
        <p>Why wait? Grab your Pokédex and embark on your own adventure to explore the amazing Pokémon universe.</p>
        <p style={{ alignSelf: "flex-end", marginTop: "60px" }}>Crafted with passion by Ashok Bhatt</p>
    </div>
  </div>
  )
}

export default About

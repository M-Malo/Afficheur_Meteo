import { useState } from 'react'
import React from "react";
import './App.css'

import sunLogo from './myIcons/soleil.svg'
import rainLogo from './myIcons/pluie.svg'
import cloudLogo from './myIcons/nuage.svg'
import windLogo from './myIcons/vent.svg'
import stormLogo from './myIcons/orage.svg'


let ville ="";
let temperature;
let condition = "";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const refVille = React.useRef();

  function rechercheApi(ville) {
    fetchData(ville);
  }

  const localisation = async () => {
    try {
      const response = await fetch('https://jb03dcnv74.execute-api.eu-west-1.amazonaws.com/Prod/geo?lon=1234.12&lat=221.22');
      const result = await response.json();
      setData(result);
      console.log(result)
      fetchData(result.city)

    }
    catch (error) {
      console.error('Error fetching data:', error);
    }
    finally {
      setLoading(true);
    }
  }

  const fetchData = async (maVille) => {
    try {
      const response = await fetch('https://jb03dcnv74.execute-api.eu-west-1.amazonaws.com/Prod/weather/'+maVille);
      const result = await response.json();
      setData(result);
      console.log(result)
      ville = result.city;
      ville = ville.toUpperCase();
      temperature = result.temperature;
      condition = result.condition;

      console.log(ville);

    }
    catch (error) {
      console.error('Error fetching data:', error);
    }
    finally {
      setLoading(true);
    }
  }

  const fontSize = {
    fontSize: '40px', // Modifier la taille de la police selon vos besoins
  };

  return (
    <div>
      <div>
      <span>
        <input type="text" placeholder='Saisir une ville' ref={refVille} id='inputVille' />
        <button onClick={() => rechercheApi(refVille.current.value)}>Rechercher</button>
        <button onClick={() => localisation()}>Me localiser</button>
      </span>
      </div>
      <span>
        <strong>
          {ville}
        </strong>
      </span>
      <span>{ville ? " . France" : "" }</span>
      <div>{ville ? <hr/>:""}</div>
      <span>
        <div>
          <span>
            <div style={fontSize}><strong>{temperature} {temperature ? ("°C") : ""}</strong></div>
            <div>{condition}</div>
          </span>
          <span>{condition == "sunny" ? (<img src={sunLogo} width="100" height="100" />) : ""}</span>
          <span>{condition == "cloudy" ? (<img src={cloudLogo} width="100" height="100" />) : ""}</span>
          <span>{condition == "rainy" ? (<img src={rainLogo} width="100" height="100" />) : ""}</span>
          <span>{condition == "windy" ? (<img src={windLogo} width="100" height="100" />) : ""}</span>
          <span>{condition == "stormy" ? (<img src={stormLogo} width="100" height="100" />) : ""}</span>
        </div>
        <div>{condition ? <hr /> : ""}</div>
        <div>{condition == "sunny" ? ("Prennez un short et un t-shirt") : ""}</div>
        <div>{condition == "cloudy" ? ("Prennez une veste") : ""}</div>
        <div>{condition == "rainy" ? ("Prennez un parapluie") : ""}</div>
        <div>{condition == "windy" ? ("Prennez une écharpe") : ""}</div>
        <div>{condition == "stormy" ? ("Evitez de sortir de chez vous") : ""}</div>
      </span>

    </div>
  )
}

export default App

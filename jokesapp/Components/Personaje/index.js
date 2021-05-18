import React from "react";
import { useState, useEffect } from "react";
var md5 = require('md5')

const Personaje = () => {
  const publicKey = "80a60c37df63304cfd92a4c014770367";
  const privateKey = "b9777057c639f4a530a10209b448632eb10f1cad";
  const ts = "1";
  const [personajes, setPersonajes] = useState([]);

  const url =
    "https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=" +
    publicKey +
    "&hash=" +
    md5(ts + privateKey + publicKey);

  useEffect(() => {
    if (!navigator.onLine) {
      if (localStorage.getItem("personajes") === null) setPersonajes("Loading...");
      else setPersonajes(JSON.parse(localStorage.getItem("personajes")));
    }
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data.results);
        setPersonajes(res.data.results);
        localStorage.setItem("personajes", JSON.stringify(res.data.results));
      });
  }, [url]);

  return (
    <div>
      
      {personajes.map(function name(personaje) {
        return (
          <div style={{ display: "inline-block" }}>
             <p >
              {personaje.name}
            </p>
            <img
              style={{ height: "50px", width: "50px" }}
              alt="character"
              src={personaje.thumbnail.path + "." + personaje.thumbnail.extension}
            />
           
          </div>
        );
      })}
    </div>
  );
};

export default Personaje;
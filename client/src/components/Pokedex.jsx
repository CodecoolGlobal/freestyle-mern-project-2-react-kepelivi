import React, { useEffect, useState } from "react";

export default function Pokedex() {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState("");
  const [allPokemons, setAllPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const fetchPokemons = () => {
    fetch("http://localhost:9000/api/pokemons")
      .then((res) => res.json())
      .then((pokemonsData) => {
        setAllPokemons(pokemonsData);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPokemons = allPokemons.slice(startIndex, endIndex);
    setPokemons(currentPokemons);
  }, [currentPage, allPokemons]);

  const handleSearch = (input) => {
    setSearch(input);
    setCurrentPage(1);
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    handleSearch(inputValue);
  };

  const displayPokemon = (pokemon) => {
    return (
      <div className="pokemon" key={pokemon._id}>
        <img src={pokemon.pokemonIMG_front} alt="pokemon front"></img>
        <img src={pokemon.pokemonIMG_back} alt="pokemon back"></img>
        <h3>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
        <p>HP: {pokemon.hp_stat}</p>
        <p>Attack: {pokemon.attack_stat}</p>
        <p>Defense: {pokemon.deffense_stat}</p>
      </div>
    );
  };

  const filteredPokemons = allPokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPokemons.length / itemsPerPage);

  return (
    <>
      <div className="pokedex">
        <h1>Pokédex</h1>
        <input
          className="searchbar"
          type="text"
          placeholder="Search a Pokemon"
          value={search}
          onChange={handleInputChange}
        />
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <div className="all-pokemons">
            {filteredPokemons.length === 0 ? (
              <p>No results found.</p>
            ) : (
              filteredPokemons
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((pokemon) => displayPokemon(pokemon))
            )}
          </div>
        )}

        <div className="pagination-container">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

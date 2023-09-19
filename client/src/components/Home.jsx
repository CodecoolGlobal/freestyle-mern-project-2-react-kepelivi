import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
    const [randomPokemons, setRandomPokemons] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [pokemonVisibility, setPokemonVisibility] = useState([false, false, false]);
    const randomIndexesRef = useRef([]);

    useEffect(() => {
        const fetchRandomPokemons = async () => {
            try {
                const response = await fetch(
                    'http://localhost:9000/api/pokemons'
                );
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();

                if (!randomIndexesRef.current.length) {
                    while (randomIndexesRef.current.length < 3) {
                        const randomIndex = Math.floor(Math.random() * data.length);
                        if (!randomIndexesRef.current.includes(randomIndex)) {
                            randomIndexesRef.current.push(randomIndex);
                        }
                    }

                    const randomPokemonData = randomIndexesRef.current.map((index) => data[index]);

                    setRandomPokemons(randomPokemonData);
                }

                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching random Pokémon:', error);
                setIsLoading(false);
            }
        };

        fetchRandomPokemons();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setPokemonVisibility([true, true, true]);
        }, 100);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <div className="home">
            <header>
                <h1>Welcome to the Pokémon World!</h1>
                <p>Your one-stop destination for all things Pokémon.</p>
            </header>
            <section className="explore-section">
                <h2>What are you waiting for?</h2>
                <div className="explore-options">
                    <Link to="/register">
                        <button>Join now!</button>
                    </Link>
                </div>
            </section>
            {!isLoading && randomPokemons.length > 0 && (
                <>
                    <h2 className='image-text'>NEW POKÉMONS!</h2>
                    <section className="featured-section">
                        <div className="image-container">
                        {randomPokemons.map((pokemon, index) => (
                            <div key={index} className={`pokemon-card ${pokemonVisibility[index] ? 'glide-in active' : 'glide-in'}`}>
                                <img
                                    src={pokemon.pokemonIMG_front}
                                    alt={`Random Pokémon ${index + 1}`}
                                    width={200}
                                    height={200}
                                />
                                <h2 className="featured-text">
                                    {pokemon.name.toUpperCase()}
                                </h2>
                            </div>
                        ))}
                        </div>
                    </section>
                </>
            )}
            {isLoading && <h1>Loading...</h1>}
            <section className="about-section">
                <h2>About Us</h2>
                <p>
                    Learn more about our passion for Pokémon and our mission to
                    provide you with the best Pokémon resources.
                </p>
            </section>
            <footer>
                <p>pokemon@info.com</p>
                <p>&copy; 2023 Pokémon Website</p>
            </footer>
        </div>
    );
}

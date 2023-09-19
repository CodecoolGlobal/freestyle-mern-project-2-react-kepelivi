import { useEffect, useState } from 'react';

const Battle = ({ selectedOwnPokemon, selectedOpponentPokemon, handleBack, catchPokemon }) => {
    const [showButton, setShowButton] = useState(false);
    const [pokeBattle, setPokeBattle] = useState({
        player: {
            pokemonHP: selectedOwnPokemon.stats[0].base_stat,
            pokemonDMG: getDMG(selectedOwnPokemon, selectedOpponentPokemon)
        },
        opponent: {
            pokemonHP: selectedOpponentPokemon.stats[0].base_stat,
            pokemonDMG: getDMG(selectedOpponentPokemon, selectedOwnPokemon),
        },
        whoseTurn: undefined,
        wonBy: undefined
    })

    function getDMG(attacker, defender) {
        let attackerAttack = attacker.stats[1].base_stat;
        let defenderDefence = defender.stats[2].base_stat;
        return Math.floor((((((2 / 5 + 2) * attackerAttack * 60 / defenderDefence) / 50) + 2) * (Math.floor(Math.random() * (255 - 217)) + 217) / 255));
    }

    const startBattle = () => {
        pokeBattle.whoseTurn = "player"
        setPokeBattle(structuredClone(pokeBattle));
        setShowButton(true);
    }

    const getEnemyOf = (battleParticipant) => {
        if (battleParticipant === "player") {
            return "opponent";
        } else {
            return "player"
        }
    }

    const dealDamageTo = (target) => {
        pokeBattle[target].pokemonHP = pokeBattle[target].pokemonHP - pokeBattle[getEnemyOf(target)].pokemonDMG;
    }

    useEffect(() => {
        if (pokeBattle.whoseTurn && !pokeBattle.wonBy) {
            dealDamageTo(getEnemyOf(pokeBattle.whoseTurn));
            if (pokeBattle[getEnemyOf(pokeBattle.whoseTurn)].pokemonHP <= 0) {
                pokeBattle.wonBy = pokeBattle.whoseTurn;
                if (pokeBattle.wonBy === "player") {
                    catchPokemon(selectedOpponentPokemon);
                }
                setPokeBattle(structuredClone(pokeBattle));
            } else {
                pokeBattle.whoseTurn = getEnemyOf(pokeBattle.whoseTurn);
                setTimeout(() => {
                    setPokeBattle(structuredClone(pokeBattle));
                }, 500);
            }
        }
    }, [pokeBattle]);

    return (
        <>
            {pokeBattle.wonBy === "player" ? <h1 className='win'>YOU WIN!</h1> : pokeBattle.wonBy === "opponent" ? <h1 className='loose'>YOU LOOSE!</h1> :
                <>
                    <h1 className='battletitle'>Battle!</h1>
                    <div className='battle'>
                        <div className="opponent">
                            <h3>{selectedOpponentPokemon.name.charAt(0).toUpperCase() + selectedOpponentPokemon.name.slice(1)}</h3>
                            <img src={selectedOpponentPokemon.sprites.front_default} alt='pokemon' />
                            <div>{selectedOpponentPokemon.stats[0].stat.name.toUpperCase()}: {pokeBattle.opponent.pokemonHP}</div>
                        </div>
                        <div className='own'>
                            <h3>{selectedOwnPokemon.name.charAt(0).toUpperCase() + selectedOwnPokemon.name.slice(1)}</h3>
                            <img src={selectedOwnPokemon.sprites.back_default} alt='pokemon' />
                            <div>{selectedOwnPokemon.stats[0].stat.name.toUpperCase()}: {pokeBattle.player.pokemonHP}</div>
                        </div>
                        <button onClick={startBattle} hidden={showButton} className='start'>Start battle</button>
                    </div>
                </>
            }
            <button className='backtoloc' onClick={handleBack} >Back to locations</button>
        </>
    );
}

export default Battle
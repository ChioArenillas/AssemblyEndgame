import React, { useState } from 'react'
import { languages } from '../languages'

export default function AssemblyEndgame() {

    const [currentWord, setCurrentWord] = useState("react")
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    const [guessedLetters, setGuessedLetters] = useState([])

    console.log(guessedLetters)
    function addGuessedLetter(letter){
        setGuessedLetters(prevLetters => 
            prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter])
    }

    const languageElements = languages.map(lang => {
        const styles = {
            backgroundColor: lang.backgroundColor,
            color: lang.color
        }
        return (
            <span style={styles}>{lang.name}</span>
        )
    })

    const letters = currentWord.split('').map((letter, index) => {
        return (
            <span key={index}>{letter.toUpperCase()}</span>
        )
    })

    const keyboardElements = alphabet.split('').map(letter => {
        return (
            <button key={letter} onClick={() => addGuessedLetter(letter)}>
                {letter.toUpperCase()}
            </button>
        )
    })

    return (
        <main>
            <section className='game-status'>
                <h1>You win!</h1>
                <p>Well done!</p>
            </section>
            <section className='languages'>
                {languageElements}
            </section>
            <section className='word'>
                {letters}
            </section>
            <section className='keyboard'>
                {keyboardElements}
            </section>
            <button>New Game</button>
        </main>
    )
}

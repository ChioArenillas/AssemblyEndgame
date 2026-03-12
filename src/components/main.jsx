import React, { useState } from 'react'
import { languages } from '../languages'
import { clsx } from 'clsx'
import { getFarewellText, randomWord } from '../util'
import Confetti from "react-confetti"

export default function AssemblyEndgame() {

    const [currentWord, setCurrentWord] = useState(() => randomWord())
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    const [guessedLetters, setGuessedLetters] = useState([])

    const numGuessesLeft = languages.length - 1
    const wrongGuessCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length
    const isGameWon = currentWord.split("").every(letter => guessedLetters.includes(letter))
    const isGameLost = wrongGuessCount >= numGuessesLeft
    const isGameOver = isGameWon || isGameLost
    const lastGuessedLetter = guessedLetters[guessedLetters.length - 1]
    const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter)


    function addGuessedLetter(letter) {
        setGuessedLetters(prevLetters =>
            prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter])
    }

    const languageElements = languages.map((lang, index) => {
        const styles = {
            backgroundColor: lang.backgroundColor,
            color: lang.color
        }
        const isLanguageLost = index < wrongGuessCount
        return (
            <span
                className={`chip ${isLanguageLost ? "wrong" : ""}`}
                key={index} style={styles}>{lang.name}</span>
        )
    })

    const letters = currentWord.split('').map((letter, index) => {
        const revealLetter = isGameLost || guessedLetters.includes(letter)
        const letterClassName = clsx( isGameLost && !guessedLetters.includes(letter) && "missed-letter")
        return (
            <span className={letterClassName} key={index}>
                {revealLetter ? letter.toUpperCase() : ""}</span>
        )}
    )

    const keyboardElements = alphabet.split('').map(letter => {
        const isGuessed = guessedLetters.includes(letter)
        const isCorrect = isGuessed && currentWord.includes(letter)
        const isWrong = isGuessed && !currentWord.includes(letter)
        const className = clsx({
            correct: isCorrect,
            wrong: isWrong
        })

        return (
            <button className={className}
                key={letter}
                disabled={isGameOver}
                aria-disabled={guessedLetters.includes(letter)}
                aria-label={`Letter ${letter}`}
                onClick={() => addGuessedLetter(letter)}>
                {letter.toUpperCase()}
            </button>

        )
    })

    function resetGame(){
        setCurrentWord(randomWord())
        setGuessedLetters([])
    }

    return (
        <main>
            {isGameWon && <Confetti />}
            <section aria-live='polite' role='status' className='game-status'>
                {!isGameOver && isLastGuessIncorrect &&
                    <div className='farewelText'><p>{getFarewellText(languages[wrongGuessCount - 1].name)}</p></div>}
                {isGameWon &&
                    <div className='won'><h1>You win!</h1> <p>Well done! 🎉</p></div>}
                {isGameLost &&
                    <div className='lost'><h1>Game over!</h1> <p>You lose! Better start learning Assembly 😭</p></div>}
            </section>
            <section className='language-chips'>
                {languageElements}
            </section>
            <section className='word'>
                {letters}
            </section>
            <section className='sr-only' aria-live='polite' role='status'>
                <p>
                    {currentWord.includes(lastGuessedLetter) ? `Correct! The letter ${lastGuessedLetter} is in the word. ` :
                    `Sorry, the letter ${lastGuessedLetter} is not in the word.`}
                    You have {numGuessesLeft} attempts left.
                </p>
                <p>Current word: {currentWord.split("").map(letter => 
                guessedLetters.includes(letter) ? letter + "." : "blank")
                .join(" ")} </p>
            </section>
            <section className='keyboard'>
                {keyboardElements}
            </section>
            {isGameOver && <button onClick={resetGame}>New Game</button>}
        </main>
    )
}

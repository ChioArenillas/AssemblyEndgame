# Assembly Endgame

## 🧩 Description

Assembly Endgame is an interactive game built with React where the user must guess a hidden word letter by letter before running out of attempts.

Each incorrect guess removes a "language", and the game ends when the word is completed or no attempts remain.

## 🚀 Technologies

* React
* JavaScript (ES6+)
* CSS
* clsx
* react-confetti

## 🎮 Features

* Random word generation
* Limited attempts system
* Visual feedback for correct and incorrect guesses
* Dynamic keyboard rendering
* Derived state management (win, lose, progress)
* Win animation with confetti

## 🧠 Key Logic

* Use of derived state to control game flow (`isGameWon`, `isGameLost`)
* Prevention of duplicate inputs
* Conditional rendering based on game state
* Clear separation between logic and UI

## ♿ Accessibility

* Use of `aria-live` to announce game updates
* Improved experience for screen reader users

## 📦 Installation

```bash
git clone https://github.com/ChioArenillas/AssemblyEndgame
cd AssemblyEndgame
npm install
npm run dev
```

## 📌 Project Status

Completed

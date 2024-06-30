const alphabet_buttons = document.querySelectorAll(".alphabet");
const main_hint = document.querySelector(".main_hint");
const main_word = document.querySelector(".main_word");
const incorrect_Guess = document.querySelector(".incorrect_Guess");
const corrected_words = new Set();
let hangman_image = document.querySelector("#Hangmanimage");

let incorrectGuess = 0;
let generatedWord;
let generatedHint;

async function generateRandomWords() {
    let indexNumber = Math.floor(Math.random() * wordList.length);
    generatedWord = wordList[indexNumber].word.toUpperCase();
    generatedHint = wordList[indexNumber].hint;
    incorrect_Guess.innerText = `Incorrect guesses: ${incorrectGuess}/6`;
    displayHint(generatedHint, generatedWord);
};
generateRandomWords();

function hideoverlay() {
    const overlay = document.getElementById("overlay");
    document.body.removeChild(overlay);
    incorrectGuess = 0;
    main_word.innerHTML = "";
    hangman_image.src = "images/hangman-0.svg";
    corrected_words.clear();
    generateRandomWords();
}

function showoverlay() {
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    overlay.setAttribute("id", "overlay");

    const lose_container = document.createElement("div");
    lose_container.setAttribute("class", "lose_container");
    let lose_image = document.createElement("img");
    lose_image.src = "images/lost.gif";
    lose_image.alt = "lose image";
    lose_container.appendChild(lose_image);
    const heading = document.createElement("h1");
    heading.innerText = "Game Over!";
    lose_container.appendChild(heading);
    const para = document.createElement("p");
    para.innerHTML = `The correct word was: <b>${generatedWord}</b>`;
    lose_container.appendChild(para);
    const play_again = document.createElement("button");
    play_again.innerText = "PLAY AGAIN";
    play_again.setAttribute("id", "play_again_button");
    lose_container.appendChild(play_again);

    overlay.appendChild(lose_container);
    document.body.appendChild(overlay);

    const play_again_button = document.querySelector("#play_again_button");
    play_again_button.addEventListener("click", hideoverlay);
}

function showwin() {
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    overlay.setAttribute("id", "overlay");

    const win_container = document.createElement("div");
    win_container.setAttribute("class", "lose_container");
    let win_image = document.createElement("img");
    win_image.src = "images/victory.gif";
    win_image.alt = "win image";
    win_container.appendChild(win_image);
    const heading = document.createElement("h1");
    heading.innerText = "Congrats!";
    win_container.appendChild(heading);
    const para = document.createElement("p");
    para.innerHTML = `You found the word: <b>${generatedWord}</b>`;
    win_container.appendChild(para);
    const play_again = document.createElement("button");
    play_again.innerText = "PLAY AGAIN";
    play_again.setAttribute("id", "play_again_button");
    win_container.appendChild(play_again);

    overlay.appendChild(win_container);
    document.body.appendChild(overlay);

    const play_again_button = document.querySelector("#play_again_button");
    play_again_button.addEventListener("click", hideoverlay);
}

function checkAlphabet(x) {
    let indices = [];
    for (let i = 0; i < generatedWord.length; i++) {
        if (generatedWord[i] === x) {
            indices.push(i + 1);
        }
    }
    return indices;
}

function displayHint(hint, word) {
    main_hint.innerText = hint;
    let numberOfAlpha = word.length;
    for (let i = 0; i < numberOfAlpha; i++) {
        let listElement = document.createElement("li");
        listElement.setAttribute("class", "letter");
        listElement.setAttribute("id", i + 1);
        main_word.appendChild(listElement);
    }
    console.log(word);
    console.log(word.length);
}

function checkCorrection(correct_word) {
    for (let char of generatedWord) {
        if (!correct_word.has(char)) {
            return false;
        }
    }
    return true;
}

for (let button of alphabet_buttons) {
    button.addEventListener("click", () => {
        console.log(button.innerText);
        let q = checkAlphabet(button.innerText);
        if (q.length === 0) {
            incorrectGuess++;
            incorrect_Guess.innerText = `Incorrect guesses: ${incorrectGuess}/6`;

            hangman_image.src = `images/hangman-${incorrectGuess}.svg`;
            if (incorrectGuess === 6) {
                showoverlay();
            }
        } else {
            for (let i = 0; i < q.length; i++) {
                let listContent = document.getElementById(q[i]);
                listContent.innerText = button.innerText;
            }
            corrected_words.add(button.innerText);
            let correction = checkCorrection(corrected_words);
            if (correction) {
                showwin();
            }
        }
    });
}

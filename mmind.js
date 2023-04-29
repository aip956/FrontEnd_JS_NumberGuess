
///////////// VARIABLES /////////////////
let secret = '';
let nonrept_array = [0, 0, 0, 0, 0, 0, 0, 0];
let secr_count_array = [0, 0, 0, 0, 0, 0, 0, 0];
let round_num = 1;
let you_won = 0;
let max_tries = 10;


///////////// HTML ELEMENTS /////////////////

const gridThree = document.getElementById("grid-con-3");
const gridFour = document.getElementById("grid-con-4");
const guessForm = document.getElementById("guess-form");
const roundElem = document.getElementById("round-num");
const guessInput = document.getElementById("guess");
const misPlaced = document.getElementById("mis-placed");
const wellPlaced = document.getElementById("well-placed");
// const youWon = document.getElementById("you-won");

///////////// LISTENER /////////////////
guessForm.addEventListener("submit", function(event) {
    event.preventDefault();
    if (round_num == 1) {
        play_game();
    }
    else {
        play_round();
    }
})



// Make the 4-digit non-repeating secret
function make_secret() {
    // Generate 4 characters
    let i = 0;
    while (i < 4) {
        // Prevent repeating numbers
        let randomNumber = Math.floor(Math.random() * 8);
        if (nonrept_array[randomNumber] == 0) {
            nonrept_array[randomNumber] ++
            randomChar = randomNumber.toString();
            secret = secret.concat(randomChar);
            i++
        }   
    }
}

// Create count array for secret
function secret_counts(){
    console.log("24Secret in sec_cts: ", secret);
    for (i = 0; i < 4; i++) {
        secr_count_array[secret[i]] ++
    }
    // console.log("28Sec_arr in sec_counts: ", secr_count_array);
}

// Validate guess is 4 digits between 0 -7
function validate_guess(guess) {
    console.log("35Guess in val_guess: ", guess)
    let guess_valid = 1
    if (guess.length != 4) {
        console.log("42guslen: ", guess.length);
        console.log("42Invalid; enter 4 digits");
        return guess_valid = 0
    }
    for (i = 0; i < 4; i++) {
        asc_val = guess[i].charCodeAt(0)
        console.log("i, asc_val: ", i, asc_val)
        if (asc_val > 55 || asc_val < 48) {
            console.log("49ascval: ", asc_val);
            console.log("49Invalid; enter 4 digits");
            return guess_valid = 0
        }
    }
    return guess_valid
}

// Create count array for guess
function guess_counts(guess) {
    let guess_count_array = [0, 0, 0, 0, 0, 0, 0, 0];
    console.log("60Guess in guess_cts: ", guess);
    for (i = 0; i < 4; i++) {
        guess_count_array[guess[i]] ++
    }
    // console.log("64Guess_arr in gus_counts: ", guess_count_array);
    return guess_count_array
}

// Determine number of well-placed numbers
function get_well_placed(guess) {
    let well_placed = 0;
    console.log("71secret: ", secret)
    console.log("72guess: ", guess)
    for (i = 0; i < 4; i++) {
        if (secret[i] == guess[i]) {
            well_placed ++;
        }
    }
    // console.log("82Well-placed pieces: ", well_placed)
    return well_placed
}

// Determine number of mis-placed numbers
function get_misplaced(secr_count_array, guess_count_array, well_placed) {
    let misplaced = 0;
    for (i = 0; i < 8; i++) {
        if (secr_count_array[i] > 0 && guess_count_array[i] > 0) {
            // console.log("92secvsgus: ", secr_count_array[i],guess_count_array[i])
            misplaced ++
            // console.log("94i,mispl: ", i, misplaced)
        }
    }
    console.log("97well-placed numbers: ", well_placed)
    misplaced = misplaced - well_placed
    console.log("99Mis-placed numbers: ", misplaced)
    return misplaced
}

function submit_guess(guess) {
    let is_val_guess = validate_guess(guess);
    if (is_val_guess != 1) {
        console.log("Wrong input! Guess needs to be 4 numbers between 0 - 7")
    }
    else {
        console.log("115Guess Valid")
        well_placed = get_well_placed(guess)

        if (well_placed == 4) {
            console.log("You won!")
            you_won = 1;

            const newDiv = document.createElement("div");
            newDiv.classList.add("grid-container-4");
            newDiv.id = "grid-con-4";
            const h1 = document.createElement("h1");
            h1.innerText = "You Won!";
            newDiv.appendChild(h1);
            
            // Add to document
            const gridTwo = document.querySelector("#grid-con-2");
            gridTwo.appendChild(newDiv);


            // Hide gridThree
            gridThree.style.display = "none";
            newDiv.style.display = "block";
            console.log("133: ", gridThree);
            console.log("135: ", newDiv.style.display);
            return;
        }

        // gridThree.style.display = "block";
        // console.log("139: ", gridThree);
        // gridFour.style.display = "none";
        // console.log("141: ", youWon);
        let guess_count_array = guess_counts(guess)
        misplaced = get_misplaced(secr_count_array, guess_count_array, well_placed)
        misPlaced.innerText = misplaced;
        wellPlaced.innerText = well_placed;

    }
}


// Play a game round
function play_round() {
    if (round_num <= max_tries && you_won == 0) {
        console.log("Round #", round_num)
        let guess = guessInput.value 
        console.log ("155guess from input: ", guess)
        round_complete = 0;
        while (round_complete == 0) {
            submit_guess(guess);
            round_num ++
            round_complete = 1;
            roundElem.innerText = round_num;
        }
        console.log("140Roundnum <= max: ", round_num <= max_tries);
        console.log("141You_won: ", you_won);
        guessInput.value = null // or ""
    }
    if (round_num > max_tries) {
        console.log("Sorry, too many tries. The code was ", secret)
    }

}

// Play the game
function play_game() {
    make_secret()
    secret_counts()

    play_round()
}

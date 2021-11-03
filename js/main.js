/*

L’utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range (vedi immagine allegata):
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49
Quando l’utente clicca su ogni cella, la cella cliccata si colora di azzurro.

*/

const playBtn = document.querySelector('.play');
const difficulty = document.getElementById('difficulty');
const wrapGrid = document.querySelector('.wrap-grid');

playBtn.addEventListener('click',
    () => {
        // reset content
        wrapGrid.innerHTML = '';

        // Set grid dimensions
        const gridDimension = difficulty.value;
        let cellsNumber;
        let cellsPerSide;

        switch (gridDimension) {
            case '1':
                cellsNumber = 100;
                cellsPerSide = 10;
                break;
            case '2':
                cellsNumber = 81;
                cellsPerSide = 9;
                break;
            case '3':
                cellsNumber = 49;
                cellsPerSide = 7;
        }

        // Gen grid parent
        const grid = document.createElement('div');
        grid.classList.add('grid');

        //Gen bombs
        const bombs = [];
        for (let i = 0; i < 16; i++) {
            let bomb = 0;
            do {
               bomb = genRandomNumber(1, cellsNumber);
            } while (bombs.includes(bomb))
            bombs.push(bomb);
        }

        //List atentativi 
        const attempts = [];
        const maxAttempts = cellsNumber - bombs.length;

        // Gen grid square
        for (let i = 1; i <= cellsNumber; i++) {
            //Gen square
            const square = createGridSquare (i, cellsPerSide);

            square.addEventListener('click', 
                function () {
                    handleSquareClick (square, bombs, attempts, maxAttempts );
                }
            );
                        
            //aggiungi a grid la square gen
            grid.append(square);
        }

         // Inserisci grid
         wrapGrid.append(grid);
    }
);



/*
    FUNCTIONS
*/

// Gen square
function createGridSquare (num, cells) {
    //crea nodo square
    const node = document.createElement('div');
    node.classList.add('square');
    node.style.width = `calc(100% / ${cells})`;
    node.style.height = `calc(100% / ${cells})`;

    node.append(num);

    return node;
}

function genRandomNumber (min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function handleSquareClick (square, bombs, attempts, maxAttempts ) {
    const number = parseInt(square.innerHTML);
    if (bombs.includes(number)) {
        endGame (bombs, attempts, maxAttempts)
    }
    else if (!attempts.includes(number)) {
        square.classList.add('safe');
        attempts.push(number);

        if (attempts.length === maxAttempts) {
            endGame (bombs, attempts, maxAttempts)
        }
    }
}

function endGame (bombs, attempts, maxAttempts) {
    const allSquares = document.getElementsByClassName('square');
    for (let i = 0; i < allSquares.length; i++) {
        if (bombs.includes(parseInt(allSquares[i].innerHTML)))
        {
            allSquares[i].classList.add('bomb');
        }
    }

    let message = `Complimenti hai vinto! Hai indovinato i ${maxAttempts} tentativi validi. Gioca ancora...`;

    if (attempts.length < maxAttempts) {
        message = `Peccato hai perso :(  hai indovinato ${attempts.length} tentativi. Gioca ancora...`
    }

    const messageEl = document.createElement('div');
    messageEl.classList.add('message');
    messageEl.append(message);

    document.querySelector('.wrap-grid').append(messageEl);

    document.querySelector('.grid').classList.add('end-game');
}


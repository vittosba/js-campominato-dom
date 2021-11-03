const playBtn = document.querySelector('.play');
const difficulty = document.getElementById('difficulty');
const wrapGrid = document.querySelector('.wrap-grid');

playBtn.addEventListener('click',
    () => {
        // reset content
        wrapGrid.innerHTML = '';
        wrapGrid.style.background = '#7FFFD4';
        let bombMancanti = document.createElement('h2');
        bombMancanti.classList.add('bomb-mancanti');

        // Set grid dimensions
        const gridDimension = difficulty.value;
        let cellsNumber;
        let cellsPerSide;
        let bomb;

        switch (gridDimension) {
            case '1':
                cellsNumber = 81;
                cellsPerSide = 9;
                bomb = 10;
                break;
            case '2':
                cellsNumber = 256;
                cellsPerSide = 16;
                bomb = 40;
                bomb 
                break;
            case '3':
                cellsNumber = 400;
                cellsPerSide = 20;
                bomb = 80;
        }

        //Gen list random for bombs
        bombsList = listRandom(bomb, cellsNumber);
        bombMancanti.innerHTML = `${bomb} bandiere mancanti`;
        wrapGrid.append(bombMancanti);
        // Gen grid parent
        const grid = document.createElement('div');
        grid.classList.add('grid');

        // Gen grid square
        for (let i = 1; i <= cellsNumber; i++) {
            //Gen square
            const square = createGridSquare (i, cellsPerSide, cellsNumber, bombsList);

            square.addEventListener('click', 
                function () {
                    if (square.classList.contains('active')) {
                        square.classList.toggle('flag');
                        chcekWinner (wrapGrid, bombsList);
                    }
                    else if (square.classList.contains('flag')) {
                    }
                    else {
                        square.classList.add('clicked');
                        if (square.firstChild.innerHTML === ("<i class=\"fas fa-bomb\"></i>")) {
                            gameOver(wrapGrid);
                        }
                        else {
                            clickedZero (cellsPerSide, cellsNumber);
                            chcekWinner (wrapGrid, bombsList);
                        }
                    }
                }
            );

            //aggiungi a grid la square gen
            grid.append(square);
        }

        //toggle
        const container = document.createElement('div');
        container.classList.add('container');

        const indicator = document.createElement('i');
        indicator.classList.add('indicator');
        const toggle = document.createElement('div');
        toggle.classList.add('toggle');
        toggle.append(indicator);
        
        const pBomb = document.createElement('p');
        pBomb.append('Bombe');
        const pBandiere = document.createElement('p');
        pBandiere.append('Bandiere');
        container.append(pBomb);
        container.append(toggle);
        container.append(pBandiere);
        wrapGrid.append(container);

        toggle.addEventListener('click',
            function() {
                toggle.classList.toggle('active');
                const allSquare = document.getElementsByClassName('square');
                for (let i = 0; i < allSquare.length; i++) {
                    allSquare[i].classList.toggle('active');
                }
            } 
        )
        // Inserisci grid
        wrapGrid.append(grid);
    }
)



//Gen list numb random 
function listRandom (len, range) {
    let list = [];
    let number = 0;
    for (let i = 0; i < len; i++) {
        do {
            number = Math.floor(Math.random() * range ) + 1; 
        } while ( list.includes(number) )

        list.push(number);
    }

    return list;
}

// Gen square
function createGridSquare (num, cells, totCells, listNumber) {
    //crea nodo square
    const node = document.createElement('div');
    node.classList.add('square');
    node.style.width = `calc(100% / ${cells})`;
    node.style.height = `calc(100% / ${cells})`;
    
    // Nodo span flag
    const flag = document.createElement('span');
    flag.classList.add('flag');
    flag.innerHTML = ('<i class="fas fa-flag"></i>');

    // Nodo span cell
    const cell = document.createElement('span');
    cell.classList.add('cell');

    // Nodo span bomba
    if (listNumber.includes(num)) {
        cell.innerHTML = ('<i class="fas fa-bomb"></i>');
    }
    else {
        const numBomb = bombAround(num, cells, totCells, listNumber);
        cell.innerHTML = numBomb;

        if (numBomb === 0) {
            cell.classList.add('zero-around');
            cell.innerHTML = '';
        }
    }
    //add a square il contenuto span
    node.append(cell);
    node.append(flag);

    return node;
}

// numb of bombs around
function bombAround (position, dimension, dimensionTot, list) {
    let count = 0;
    if (position % dimension === 1 && position < dimension) {
        for (let i = 0; i < 3; i++) {
            switch (i) {
                case 0:
                    if (list.includes(position + 1)) {
                        count++;
                    }
                    break;
                case 1:
                    if (list.includes(position + dimension)) {
                        count++;
                    }
                    break;
                case 2:
                    if (list.includes(position + dimension + 1)) {
                        count++;
                    }
            }
        }
    }
    else if (position % dimension === 0 && position < dimension) {
        for (let i = 0; i < 3; i++) {
            switch (i) {
                case 0:
                    if (list.includes(position - 1)) {
                        count++;
                    }
                    break;
                case 1:
                    if (list.includes(position + dimension)) {
                        count++;
                    }
                    break;
                case 2:
                    if (list.includes(position + dimension - 1)) {
                        count++;
                    }
            }
        }
    }
    else if (position % dimension === 1 && position > (dimensionTot - dimension) ) {
        for (let i = 0; i < 3; i++) {
            switch (i) {
                case 0:
                    if (list.includes(position + 1)) {
                        count++;
                    }
                    break;
                case 1:
                    if (list.includes(position - dimension)) {
                        count++;
                    }
                    break;
                case 2:
                    if (list.includes(position - dimension + 1)) {
                        count++;
                    }
            }
        }
    }
    else if (position % dimension === 0 && position > (dimensionTot - dimension) ) {
        for (let i = 0; i < 3; i++) {
            switch (i) {
                case 0:
                    if (list.includes(position - 1)) {
                        count++;
                    }
                    break;
                case 1:
                    if (list.includes(position - dimension)) {
                        count++;
                    }
                    break;
                case 2:
                    if (list.includes(position - dimension - 1)) {
                        count++;
                    }
            }
        }
    }
    else if (position % dimension === 1) {
        for (let i = 0; i < 5; i++) {
            switch (i) {
                case 0:
                    if (list.includes(position - dimension)) {
                        count++;
                    }
                    break;
                case 1:
                    if (list.includes(position - dimension + 1)) {
                        count++;
                    }
                    break;
                case 2:
                    if (list.includes(position + 1)) {
                        count++;
                    }
                    break;
                case 3:
                    if (list.includes(position + dimension)) {
                        count++;
                    }
                    break;
                case 4:
                    if (list.includes(position + dimension + 1)) {
                        count++;
                    }
            }
        }
    }
    else if (position % dimension === 0) {
        for (let i = 0; i < 5; i++) {
            switch (i) {
                case 0:
                    if (list.includes(position - dimension)) {
                        count++;
                    }
                    break;
                case 1:
                    if (list.includes(position - dimension - 1)) {
                        count++;
                    }
                    break;
                case 2:
                    if (list.includes(position - 1)) {
                        count++;
                    }
                    break;
                case 3:
                    if (list.includes(position + dimension)) {
                        count++;
                    }
                    break;
                case 4:
                    if (list.includes(position + dimension - 1)) {
                        count++;
                    }
            }
        }
    }
    else if (position < dimension) {
        for (let i = 0; i < 5; i++) {
            switch (i) {
                case 0:
                    if (list.includes(position - 1)) {
                        count++;
                    }
                    break;
                case 1:
                    if (list.includes(position + 1)) {
                        count++;
                    }
                    break;
                case 2:
                if (list.includes(position + dimension - 1)) {
                    count++;
                }
                break;
                case 3:
                    if (list.includes(position + dimension)) {
                        count++;
                    }
                    break;
                case 4:
                    if (list.includes(position + dimension + 1)) {
                        count++;
                    }
            }
        }
    }
    else if (position > (dimensionTot - dimension) ) {
        for (let i = 0; i < 5; i++) {
            switch (i) {
                case 0:
                    if (list.includes(position - 1)) {
                        count++;
                    }
                    break;
                case 1:
                    if (list.includes(position + 1)) {
                        count++;
                    }
                    break;
                case 2:
                    if (list.includes(position - dimension - 1)) {
                        count++;
                    }
                    break;
                case 3:
                    if (list.includes(position - dimension)) {
                        count++;
                    }
                    break;
                case 4:
                    if (list.includes(position - dimension + 1)) {
                        count++;
                    }
            }
        }
    }
    else {
        for (let i = 0; i < 8; i++) {
            switch (i) {
                case 0:
                    if (list.includes(position - dimension - 1)) {
                        count++;
                    }
                    break;
                case 1:
                    if (list.includes(position - dimension)) {
                        count++;
                    }
                    break;
                case 2:
                    if (list.includes(position - dimension + 1)) {
                        count++;
                    }
                    break;
                case 3:
                    if (list.includes(position - 1)) {
                        count++;
                    }
                    break;
                case 4:
                    if (list.includes(position + 1)) {
                        count++;
                    }
                    break;
                case 5:
                    if (list.includes(position + dimension - 1)) {
                        count++;
                    }
                    break;
                case 6:
                    if (list.includes(position + dimension)) {
                        count++;
                    }
                    break;
                case 7:
                    if (list.includes(position + dimension + 1)) {
                        count++;
                    }
            }
        }
    }

    return count;
}

// cells with no bomb around and near a clicked cell become clicked
function clickedZero (dimension ,dimensionTot) {
    let squareClicked = [];
    const allSquare = document.getElementsByClassName('square');
    for (let i = 0; i < allSquare.length; i++) {
        if (allSquare[i].classList.contains('clicked')) {
            squareClicked.push(i);
        }
    }
    for (let i = 0; i < squareClicked.length; i++) {
        if( allSquare[squareClicked[i]].firstChild.classList.contains('zero-around')) {
            if ( squareClicked[i] === 0 ) {
                addClickedAndPush (allSquare, squareClicked, i, 0, dimension, 0, 0);
                addClickedAndPush (allSquare, squareClicked, i, 0, dimension, 0, 1);
                addClickedAndPush (allSquare, squareClicked, i, 0, 0, 0, 1);
            }
            else if (squareClicked[i] === dimensionTot - 1) {
                addClickedAndPush (allSquare, squareClicked, i, 0, 0, 1, 0);
                addClickedAndPush (allSquare, squareClicked, i, dimension, 0, 1, 0);
                addClickedAndPush (allSquare, squareClicked, i, dimension, 0, 0, 0);
            }
            else if (squareClicked[i]  === dimension - 1 ) {
                addClickedAndPush (allSquare, squareClicked, i, 0, dimension, 0, 0);
                addClickedAndPush (allSquare, squareClicked, i, 0, dimension, 1, 0);
                addClickedAndPush (allSquare, squareClicked, i, 0, 0, 1, 0);
            }
            else if (squareClicked[i] === dimensionTot - dimension) {
                addClickedAndPush (allSquare, squareClicked, i, dimension, 0, 0, 0);
                addClickedAndPush (allSquare, squareClicked, i, dimension, 0, 0, 1);
                addClickedAndPush (allSquare, squareClicked, i, 0, 0, 0, 1);
            }
            else if (squareClicked[i] < dimension ) {
                addClickedAndPush (allSquare, squareClicked, i, 0, 0, 0, 1);
                addClickedAndPush (allSquare, squareClicked, i, 0, dimension, 0, 1);
                addClickedAndPush (allSquare, squareClicked, i, 0, dimension, 0, 0);
                addClickedAndPush (allSquare, squareClicked, i, 0, dimension, 1, 0);
                addClickedAndPush (allSquare, squareClicked, i, 0, 0, 1, 0);
            }
            else if (squareClicked[i] > dimensionTot - dimension ) {
                addClickedAndPush (allSquare, squareClicked, i, 0, 0, 1, 0);
                addClickedAndPush (allSquare, squareClicked, i, dimension, 0, 1, 0);
                addClickedAndPush (allSquare, squareClicked, i, dimension, 0, 0, 0);
                addClickedAndPush (allSquare, squareClicked, i, dimension, 0, 0, 1);
                addClickedAndPush (allSquare, squareClicked, i, 0, 0, 0, 1);
            }
            else if (squareClicked[i] % dimension === dimension - 1) {
                addClickedAndPush (allSquare, squareClicked, i, 0, dimension, 0, 0);
                addClickedAndPush (allSquare, squareClicked, i, 0, dimension, 1, 0);
                addClickedAndPush (allSquare, squareClicked, i, 0, 0, 1, 0);
                addClickedAndPush (allSquare, squareClicked, i, dimension, 0, 1, 0);
                addClickedAndPush (allSquare, squareClicked, i, dimension, 0, 0, 0);
            }
            else if (squareClicked[i] % dimension === 0) {
                addClickedAndPush (allSquare, squareClicked, i, dimension, 0, 0, 0);
                addClickedAndPush (allSquare, squareClicked, i, dimension, 0, 0, 1);
                addClickedAndPush (allSquare, squareClicked, i, 0, 0, 0, 1);
                addClickedAndPush (allSquare, squareClicked, i, 0, dimension, 0, 1);
                addClickedAndPush (allSquare, squareClicked, i, 0, dimension, 0, 0);
            }
            else {
                addClickedAndPush (allSquare, squareClicked, i, dimension, 0, 0, 0);
                addClickedAndPush (allSquare, squareClicked, i, dimension, 0, 0, 1);
                addClickedAndPush (allSquare, squareClicked, i, 0, 0, 0, 1);
                addClickedAndPush (allSquare, squareClicked, i, 0, dimension, 0, 1);
                addClickedAndPush (allSquare, squareClicked, i, 0, dimension, 0, 0);
                addClickedAndPush (allSquare, squareClicked, i, 0, dimension, 1, 0);
                addClickedAndPush (allSquare, squareClicked, i, 0, 0, 1, 0);
                addClickedAndPush (allSquare, squareClicked, i, dimension, 0, 1, 0);
            }
        }
        else {
            if ( squareClicked[i] === 0 || squareClicked[i] === dimensionTot - 1 || squareClicked[i]  === dimension - 1 || squareClicked[i] === dimensionTot - dimension) {
                
            }
            else if (squareClicked[i] < dimension ) {
                clickedAround (allSquare, squareClicked, i, 0, 0, 0, 1);
                clickedAround (allSquare, squareClicked, i, 0, dimension, 0, 1);
                clickedAround (allSquare, squareClicked, i, 0, dimension, 0, 0);
                clickedAround (allSquare, squareClicked, i, 0, dimension, 1, 0);
                clickedAround (allSquare, squareClicked, i, 0, 0, 1, 0);
            }
            else if (squareClicked[i] > dimensionTot - dimension ) {
                clickedAround (allSquare, squareClicked, i, 0, 0, 0, 1);
                clickedAround (allSquare, squareClicked, i, dimension, 0, 0, 1);
                clickedAround (allSquare, squareClicked, i, dimension, 0, 0, 0);
                clickedAround (allSquare, squareClicked, i, dimension, 0, 1, 0);
                clickedAround (allSquare, squareClicked, i, 0, 0, 1, 0);
            }
            else if (squareClicked[i] % dimension === dimension - 1) {
                clickedAround (allSquare, squareClicked, i, dimension, 0, 0, 0);
                clickedAround (allSquare, squareClicked, i, dimension, 0, 1, 0);
                clickedAround (allSquare, squareClicked, i, 0, 0, 1, 0);
                clickedAround (allSquare, squareClicked, i, 0, dimension, 1, 0);
                clickedAround (allSquare, squareClicked, i, 0, dimension, 0, 0);
            }
            else if (squareClicked[i] % dimension === 0) {
                clickedAround (allSquare, squareClicked, i, dimension, 0, 0, 0);
                clickedAround (allSquare, squareClicked, i, dimension, 0, 0, 1);
                clickedAround (allSquare, squareClicked, i, 0, 0, 0, 1);
                clickedAround (allSquare, squareClicked, i, 0, dimension, 0, 1);
                clickedAround (allSquare, squareClicked, i, 0, dimension, 0, 0);
            }
            else {
                clickedAround (allSquare, squareClicked, i, dimension, 0, 0, 0);
                clickedAround (allSquare, squareClicked, i, dimension, 0, 0, 1);
                clickedAround (allSquare, squareClicked, i, 0, 0, 0, 1);
                clickedAround (allSquare, squareClicked, i, 0, dimension, 0, 1);
                clickedAround (allSquare, squareClicked, i, 0, dimension, 0, 0);
                clickedAround (allSquare, squareClicked, i, 0, dimension, 1, 0);
                clickedAround (allSquare, squareClicked, i, 0, 0, 1, 0);
                clickedAround (allSquare, squareClicked, i, dimension, 0, 1, 0);
            }
        }
    }
}

// check if you win and if not reload bandiere
function chcekWinner (wrapGrid, bombsList) {
    let squareClicked = [];
    let squareFlag = [];
    const allSquare = document.getElementsByClassName('square');
    for (let i = 0; i < allSquare.length; i++) {
        if (allSquare[i].classList.contains('flag')) {
            squareFlag.push(i+1);
        }
        if (allSquare[i].classList.contains('clicked')) {
            squareClicked.push(i);
        }
    }
    let bombsListOrdered = bombsList.sort(function(a, b){return a - b});
    let ordered = 1;
    
    
    if (bombsListOrdered.length === squareFlag.length) {
        for (let i = 0; i < bombsListOrdered.length; i++) {
            if(bombsListOrdered[i] !== squareFlag[i]) {
                ordered++;
            }
        }
        ordered--;
    }
    
    if (allSquare.length - squareClicked.length === bombsList.length) {
        winner(wrapGrid);
    }
    else if (ordered === 0) {
        winner(wrapGrid);
    }
    const bombMancanti = document.querySelector('.bomb-mancanti');
    if (bombsList.length - squareFlag.length > 0) {
        bombMancanti.innerHTML = `${bombsList.length - squareFlag.length} bandiere mancanti`;
    }
    else if ((bombsList.length - squareFlag.length === 0 && ordered !== 0) || (bombsList.length - squareFlag.length === 0 && allSquare.length - squareClicked.length === bombsList.length)) {
        bombMancanti.innerHTML = 'Una o più bandiere posizionate male';
    }
    else if ((bombsList.length - squareFlag.length < 0)) {
        bombMancanti.innerHTML = 'Troppe bandiere posizionate';
    }
    else {
        bombMancanti.innerHTML = '';
    }
}

//overlay if you win
function winner (wrapGrid) {
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    overlay.innerHTML = '<h1>YOU WIN</h1>';
    wrapGrid.append(overlay);
    wrapGrid.style.background = 'green';
}

//overlay if you lose
function gameOver (wrapGrid) {
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    overlay.innerHTML = '<h1>GAME OVER</h1>';
    wrapGrid.append(overlay);
    wrapGrid.style.background = 'red';
    const allSquare = document.getElementsByClassName('square');
    for (let i = 0; i < allSquare.length; i++) {
        if (allSquare[i].firstChild.innerHTML === ("<i class=\"fas fa-bomb\"></i>")) {
            allSquare[i].classList.add('clicked');
            allSquare[i].classList.remove('flag');
        }
    }
}

// function for simplify clickedZero function --> select the near square
function clickedAround (allSquare, squareClicked, i, mDimension, pDimension, m1, p1) {
    if (allSquare[squareClicked[i] - mDimension - m1 + pDimension + p1].firstChild.classList.contains('zero-around') ) {
        addClickedAndPush (allSquare, squareClicked, i, mDimension, pDimension, m1, p1);
    }
}

// function for simplify clickedZero and clickedAround functions --> add classilist and push in squareClicked
function addClickedAndPush (allSquare, squareClicked, i, mDimension, pDimension, m1, p1) {
    allSquare[squareClicked[i] - mDimension - m1 + pDimension + p1].classList.add('clicked');
    allSquare[squareClicked[i] - mDimension - m1 + pDimension + p1].classList.remove('flag');
        if (!squareClicked.includes(squareClicked[i] - mDimension - m1 + pDimension + p1)) {
            squareClicked.push(squareClicked[i] - mDimension - m1 + pDimension + p1)
        }
}
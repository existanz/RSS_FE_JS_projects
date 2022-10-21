const loadOptions = () => {
    return { nFrames: 4,
             sound: true}
}

const field = document.querySelector('.field'),
    nFrames = loadOptions().nFrames,
    sound = loadOptions().sound

let gameRun = true;

console.log(loadOptions().nFrames);
//load sound
const sfxClick = new Audio('assets/sounds/click.mp3'),
      sfxLowClick = new Audio('assets/sounds/click_.mp3');
//init field

const puzzle = document.createElement('div');
puzzle.classList.add('puzzle');
field.appendChild(puzzle);

const initgame = () => {
    puzzle.style.width=`${nFrames*82+2}px`;
    puzzle.style.height=`${nFrames*82+2}px`;
    puzzle.innerHTML = '';
    for (let i = 1; i <= nFrames; i++) {
        for (let j = 1; j <= nFrames; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.id = 'cell-' + i + '-' + j;
            cell.style.left = ((j-1) * 81 + 1) + 'px';
            cell.style.top = ((i-1) * 81 + 1) + 'px';

            if (i == nFrames && j == nFrames) {
                cell.classList.add('empty');
            } else {
                cell.classList.add('number');
                cell.classList.add((i % 2 == 0 && j % 2 > 0 || i % 2 > 0 && j % 2 == 0) ? 'dark' : 'light');
                cell.innerHTML = (j + nFrames * (i - 1)).toString();
            }
            puzzle.appendChild(cell);
        }
    }
}
initgame();
puzzle.addEventListener('click', function(e){
    if(gameRun){
        shiftCell(e.target);
    }
});

function shiftCell(cell){
		console.log(cell);
        const emptyCell = getEmptyAdjacentCell(cell);
        if(emptyCell){
            const buff = {style: cell.style.cssText, id: cell.id};
            
            cell.style.cssText = emptyCell.style.cssText;
            cell.id = emptyCell.id;
            emptyCell.style.cssText = buff.style;
            emptyCell.id = buff.id;
            
            if(gameRun){
                setTimeout(checkWin, 150);
            }
            if (sound) {
                sfxClick.play();
            }
        } else if (sound) sfxLowClick.play();
}
function getEmptyAdjacentCell(cell){
		
    const adjacent = getMoveCells(cell);
    for(let i = 0; i < adjacent.length; i++){
        console.log(adjacent[i])
        if(!!adjacent[i] && adjacent[i].className == 'cell empty'){
            return adjacent[i];
        }
    }
    return false;
    
}


 function getMoveCells(cell){
		
    const row = parseInt(cell.id.split('-')[1]);
    const col = parseInt(cell.id.split('-')[2]);
    
    let moveCells = [];
    moveCells.push(getCell(row+1, col));			
    moveCells.push(getCell(row-1, col));
    moveCells.push(getCell(row, col+1));
    moveCells.push(getCell(row, col-1));
    return moveCells.filter(i => i!=null);
    
}

function getCell(row, col){
    return document.getElementById('cell-'+row+'-'+col);
}


function getEmptyCell(){
    return puzzle.querySelector('.empty');

}

function checkWin() {
    const cells = document.querySelectorAll('.cell');
    let ordered = true;
    cells.forEach(el => {
        const elRow = parseInt(el.id.split('-')[1]);
        const elCol = parseInt(el.id.split('-')[2]);
        console.log(nFrames * (elRow - 1) + elCol, el.innerHTML);
        console.log((nFrames * (elRow - 1) + elCol).toString() != el.innerHTML);
        if (el.innerHTML && el.innerHTML != (nFrames * (elRow - 1) + elCol).toString()) {
            console.log('Not match!')
            ordered = false;
            //j + nFrames * (i - 1)
        }
    })
    if (ordered) {
        if (confirm('CHooray! You solved the puzzle in ##:## and N moves!')) {
            initgame();
            shuffle();
        }
    }

}

function shuffle() {
    console.log('shuffle');
    
    let previousCell,
        i = 1;

    const interval = setInterval(function(){
        if(i <= 100){
            let adjacent = getMoveCells(getEmptyCell());
            if(previousCell){
                for(let j = adjacent.length-1; j >= 0; j--){
                    if(adjacent[j].innerHTML == previousCell.innerHTML){
                        adjacent.splice(j, 1);
                    }
                }
            }
            previousCell = adjacent[rand(0, adjacent.length-1)];
            shiftCell(previousCell);
            i++;
        } else {
            clearInterval(interval);
        }
    }, 15);

}

const rand = (from, to) => Math.floor(Math.random() * (to - from + 1)) + from;
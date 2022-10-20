const loadOptions = () => {
    return { nFrames: 4 }
}

const field = document.querySelector('.field'),
    nFrames = loadOptions().nFrames;

let gameRun = true;

console.log(loadOptions().nFrames);

//init field
puzzle = document.createElement('div');
puzzle.classList.add('puzzle');
puzzle.innerHTML = '';
field.appendChild(puzzle);

for (let i = 1; i <= nFrames; i++) {
    for (let j = 1; j <= nFrames; j++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.id = 'cell-' + i + '-' + j;
        cell.style.left = (j * 80 + 1 * j + 1) + 'px';
        cell.style.top = (i * 80 + 1 * i + 1) + 'px';

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

puzzle.addEventListener('click', function(e){
    if(gameRun){
        shiftCell(e.target);
    }
});

function shiftCell(cell){
		console.log(cell);
        const emptyCell = getEmptyAdjacentCell(cell);
        console.log(emptyCell);
        if(emptyCell){
            const buff = {style: cell.style.cssText, id: cell.id};
            
            cell.style.cssText = emptyCell.style.cssText;
            cell.id = emptyCell.id;
            emptyCell.style.cssText = buff.style;
            emptyCell.id = buff.id;
            
            if(gameRun){
                //setTimeout(checkOrder, 150);
            }
        }
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
    return moveCells;
    
}

function getCell(row, col){
    return document.getElementById('cell-'+row+'-'+col);
}

/**
 * Gets empty cell
 *
 */
function getEmptyCell(){
    return puzzle.querySelector('.empty');

}
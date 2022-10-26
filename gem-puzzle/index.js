  
const field = document.querySelector('.field');
let nFrames = 4,
    sound = true,
    scores = ['moves: 00 time: --:--:--', 'moves: 00 time: --:--:--',
    'moves: 00 time: --:--:--', 'moves: 00 time: --:--:--', 'moves: 00 time: --:--:--',
    'moves: 00 time: --:--:--', 'moves: 00 time: --:--:--', 'moves: 00 time: --:--:--',
    'moves: 00 time: --:--:--', 'moves: 00 time: --:--:--']

getLocalStorage();
console.log(sound,nFrames)
//SAVE AND LOAD
function setLocalStorage() {
    //localStorage.setItem('nFrames', nFrames);
    localStorage.setItem('sound', sound);
    localStorage.setItem('scores', scores);
  }
  window.addEventListener('beforeunload', setLocalStorage);
  
  function getLocalStorage() {
    //if (localStorage.getItem('nFrames')) nFrames = parseInt(localStorage.getItem('nFrames'));
    if (localStorage.getItem('sound')) sound = localStorage.getItem('sound')==='true';
    console.log(sound)
    if (localStorage.getItem('scores')) scores = (localStorage.getItem('scores')).split(',');
  }
  
  window.addEventListener('load', getLocalStorage);

let gameRun = false,
    cWidth = 80,
    nMoves = 0,
    nTime = 0,
    strTime = '00.00.00'

//load sound
const sfxClick = new Audio('assets/sounds/click.mp3'),
      sfxLowClick = new Audio('assets/sounds/click_.mp3');


//add comand panel
const comPanel = document.createElement('div');
comPanel.classList.add('command-panel');
field.appendChild(comPanel);
const comPanelBtn = document.createElement('div');
comPanelBtn.classList.add('command-panel-buttons');
comPanel.appendChild(comPanelBtn);

//buttons
const bShuffle = document.createElement('button');
bShuffle.innerHTML = 'Shuffle';
comPanelBtn.appendChild(bShuffle);
const bStop = document.createElement('button');
bStop.innerHTML = 'Stop'
comPanelBtn.appendChild(bStop);
const bSave = document.createElement('button');
bSave.innerHTML = 'Save'
comPanelBtn.appendChild(bSave);
const bSound = document.createElement('button');
if (sound) {bSound.innerHTML = 'Sound On'}
else {bSound.innerHTML = 'Sound Off'}
comPanelBtn.appendChild(bSound);
const bResults = document.createElement('button');
bResults.innerHTML = 'Results'
comPanelBtn.appendChild(bResults);


//second panel
const comPanelDock = document.createElement('div');
comPanelDock.classList.add('command-panel-dock');
comPanel.appendChild(comPanelDock);

const lTime = document.createElement('label');
lTime.classList.add('lTime');
lTime.innerHTML = ('--:--')
comPanelDock.appendChild(lTime);
const lMoves = document.createElement('label');
lMoves.classList.add('lMoves');
lMoves.innerHTML = ('00')
comPanelDock.appendChild(lMoves);
const selFrames = document.createElement('select');
    selFrames.options.add(new Option('3x3'));
    selFrames.options.add(new Option('4x4','', true, true));
    selFrames.options.add(new Option('5x5'));
    selFrames.options.add(new Option('6x6'));
    selFrames.options.add(new Option('7x7'));
    selFrames.options.add(new Option('8x8'));
comPanelDock.appendChild(selFrames);

selFrames.addEventListener('change', (el) => {
    console.log(el.target.options.selectedIndex);
    nFrames = 3+el.target.options.selectedIndex;
    initgame();
    shuffle();
})

bShuffle.addEventListener('click', shuffle);
bSound.addEventListener('click', () => {
    if (sound) {
        sound = false;
        bSound.innerHTML = 'Sound Off';
    } else {
        sound = true;
        bSound.innerHTML = 'Sound On';
    }
})
bResults.addEventListener('click', ()=>{
    hiPopup.classList.toggle('unvisible');
})
//cell size
if (screen.width < 701) cWidth = 40;
window.addEventListener('resize', (ev)=>{
    if (screen.width < 701) cWidth = 40;
})
//init puzzle dock
const puzzle = document.createElement('div');
puzzle.classList.add('puzzle');
field.appendChild(puzzle);

const initgame = () => {
    puzzle.style.width=`${nFrames*(cWidth+5)+2}px`;
    puzzle.style.height=`${nFrames*(cWidth+5)+2}px`;
    puzzle.innerHTML = '';
    for (let i = 1; i <= nFrames; i++) {
        for (let j = 1; j <= nFrames; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.id = 'cell-' + i + '-' + j;
            cell.style.left = ((j-1) * (cWidth+5) + 1) + 'px';
            cell.style.top = ((i-1) * (cWidth+5) + 1) + 'px';

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
shuffle();


//hiscores popup
const hiPopup = document.createElement('div');
hiPopup.classList.add('scores-popup');
hiPopup.classList.add('unvisible');
field.appendChild(hiPopup);

//refresh hiscores
const hiList = document.createElement('ol');
hiList.classList.add('scores-list')
hiPopup.appendChild(hiList);

//showHiScores();
const showHiScores = () => {
    hiList.innerHTML = '';
    scores.forEach(el => {
    const elem = document.createElement('li');
    elem.innerHTML = el;
    hiList.appendChild(elem);
})
}
showHiScores();

puzzle.addEventListener('click', (e) => {
    if(gameRun){
        shiftCell(e.target);
    }
});
const showMoves = () => {
    lMoves.innerHTML = `Moves: ${nMoves}`;
}
let intTimer;

const showTime = () => {
    const date = new Date();
    date.setTime(nTime*1000-10799999);
    strTime = date.toLocaleTimeString();
    lTime.innerHTML = `Time: ${strTime}`;
    nTime++;
  };
const stopTime = () => {
    console.log('stooop')
    clearInterval(intTimer);
    gameRun = false;
    bStop.innerHTML = 'Start'
}
const startTime = () => {
    console.log('start')
    if (!gameRun) {
        intTimer = setInterval(showTime, 1000);
        gameRun = true;
    }
    bStop.innerHTML = 'Stop'
}

bStop.addEventListener('click', () => {
    if (gameRun) {
        stopTime();
    } else {
        startTime();
    }
})
showTime();

function shiftCell(cell) {
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
            nMoves++;
            showMoves();
        } else if (sound) sfxLowClick.play();
}
function getEmptyAdjacentCell(cell){
		
    const adjacent = getMoveCells(cell);
    for(let i = 0; i < adjacent.length; i++){
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
const saveScores = (moves, time) => {
    scores[scores.indexOf('moves: 00 time: --:--:--')] = `moves: ${moves} time: ${time}`;
    showHiScores();
}
function checkWin() {
    const cells = document.querySelectorAll('.cell');
    let ordered = true;
    cells.forEach(el => {
        const elRow = parseInt(el.id.split('-')[1]);
        const elCol = parseInt(el.id.split('-')[2]);
        if (el.innerHTML && el.innerHTML != (nFrames * (elRow - 1) + elCol).toString()) {
            ordered = false;
            //j + nFrames * (i - 1)
        }
    })
    if (ordered) {
        saveScores(nMoves,strTime);
        if (confirm(`CHooray! You solved the puzzle in ${strTime} and ${nMoves} moves! \nDo you want to play one more game?`)) {
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
        if(i <= 50*nFrames){
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
            nMoves=0;
            showMoves();
            nTime=0;
            startTime();
        }
    }, 5);

}

const rand = (from, to) => Math.floor(Math.random() * (to - from + 1)) + from;
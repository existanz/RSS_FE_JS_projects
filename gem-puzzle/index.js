const loadOptions = () => {
    return { nFrames: 4 }
}

const field = document.querySelector('.field'),
    nFrames = loadOptions().nFrames;

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
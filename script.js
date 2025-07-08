function gerarGridDinamico() {
  const middleSection = document.getElementById('middle-section');
  middleSection.innerHTML = '';

  // Escolhe tamanho dependendo do dispositivo
  let targetCellSize;
  if (window.innerWidth <= 768) {
    targetCellSize = 20;
  } else {
    targetCellSize = 30;
  }
  
  const width = middleSection.clientWidth;
  const height = middleSection.clientHeight;

  const numCols = Math.floor(width / targetCellSize);
  const numRows = Math.floor(height / targetCellSize);

  console.log(`Cols: ${numCols}, Rows: ${numRows}`);

  middleSection.style.gridTemplateColumns = `repeat(${numCols}, 1fr)`;
  middleSection.style.gridTemplateRows = `repeat(${numRows}, 1fr)`;

  // Cria matriz de células
  const cellMatrix = [];
  for (let i = 0; i < numRows; i++) {
    cellMatrix[i] = [];
    for (let j = 0; j < numCols; j++) {
      const cell = document.createElement('div');
      cell.classList.add('grid-cell');
      cell.dataset.row = i;
      cell.dataset.col = j;
      middleSection.appendChild(cell);
      cellMatrix[i][j] = cell;
    }
  }

  // Define start e end
  const startRow = 0;
  const startCol = Math.floor(Math.random() * numCols);
  const endRow = numRows - 1;
  const endCol = Math.floor(Math.random() * numCols);

  cellMatrix[startRow][startCol].style.backgroundColor = 'green';
  cellMatrix[endRow][endCol].style.backgroundColor = 'red';

  // Gera labirinto a partir do start
  //gerarLabirintoDFS(startRow, startCol, cellMatrix, numRows, numCols, endRow, endCol);
  gerarLabirintoPrim(startRow, startCol, cellMatrix, numRows, numCols, endRow, endCol);

  // Adiciona loops extras para aumentar a dificuldade
  adicionarLoopsExtras(cellMatrix, numRows, numCols, 20); // número de loops extras, ajuste como quiser

  // Pinta as paredes de preto
  pintarParedesPretas(cellMatrix, numRows, numCols);
}

// Função de geração de labirinto com DFS
function gerarLabirintoDFS(startRow, startCol, cellMatrix, numRows, numCols, endRow, endCol) {
  const visited = [];
  for (let i = 0; i < numRows; i++) {
    visited[i] = new Array(numCols).fill(false);
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function dfs(r, c) {
    visited[r][c] = true;

    if (!(r === startRow && c === startCol) && !(r === endRow && c === endCol)) {
      cellMatrix[r][c].style.backgroundColor = 'yellow';
    }

    let directions = shuffle([
      [-1, 0], // cima
      [1, 0],  // baixo
      [0, -1], // esquerda
      [0, 1]   // direita
    ]);

    for (const [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;

      if (nr >= 0 && nr < numRows && nc >= 0 && nc < numCols && !visited[nr][nc]) {
        dfs(nr, nc);
      }
    }
  }

  dfs(startRow, startCol);
}

function gerarLabirintoPrim(startRow, startCol, cellMatrix, numRows, numCols, endRow, endCol) {
  const visited = [];
  for (let i = 0; i < numRows; i++) {
    visited[i] = new Array(numCols).fill(false);
  }

  function inBounds(r, c) {
    return r >= 0 && r < numRows && c >= 0 && c < numCols;
  }

  const frontier = [];
  visited[startRow][startCol] = true;
  cellMatrix[startRow][startCol].style.backgroundColor = 'green';

  // Adiciona vizinhos iniciais como fronteira
  const directions = [[-1,0],[1,0],[0,-1],[0,1]];
  for (const [dr, dc] of directions) {
    const nr = startRow + dr;
    const nc = startCol + dc;
    if (inBounds(nr, nc)) {
      frontier.push([nr, nc]);
    }
  }

  while (frontier.length > 0) {
    // Escolhe aleatório da fronteira
    const idx = Math.floor(Math.random() * frontier.length);
    const [r, c] = frontier.splice(idx, 1)[0];

    if (visited[r][c]) continue;

    // Checa vizinhos já no labirinto
    const neighbors = [];
    for (const [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;
      if (inBounds(nr, nc) && visited[nr][nc]) {
        neighbors.push([nr, nc]);
      }
    }

    if (neighbors.length === 1) {
      // Conecta célula ao labirinto
      visited[r][c] = true;
      if (!(r === startRow && c === startCol) && !(r === endRow && c === endCol)) {
        cellMatrix[r][c].style.backgroundColor = 'yellow';
      }

      // Adiciona novos fronteiras
      for (const [dr, dc] of directions) {
        const nr = r + dr;
        const nc = c + dc;
        if (inBounds(nr, nc) && !visited[nr][nc]) {
          frontier.push([nr, nc]);
        }
      }
    }
  }

  // Marca o ponto de saída
  cellMatrix[endRow][endCol].style.backgroundColor = 'red';
}

function adicionarLoopsExtras(cellMatrix, numRows, numCols, numLoopsExtras) {
  function inBounds(r, c) {
    return r >= 0 && r < numRows && c >= 0 && c < numCols;
  }

  for (let n = 0; n < numLoopsExtras; n++) {
    const r = Math.floor(Math.random() * numRows);
    const c = Math.floor(Math.random() * numCols);

    const directions = [
      [-1, 0], // cima
      [1, 0],  // baixo
      [0, -1], // esquerda
      [0, 1]   // direita
    ];

    // Escolhe direções aleatórias até achar uma válida
    const shuffled = directions.sort(() => Math.random() - 0.5);

    for (const [dr, dc] of shuffled) {
      const nr = r + dr;
      const nc = c + dc;

      if (inBounds(nr, nc)) {
        const cell = cellMatrix[r][c];
        const neighbor = cellMatrix[nr][nc];

        // Se são ambos caminhos (amarelos) separados por borda
        if (cell.style.backgroundColor === 'white' && neighbor.style.backgroundColor === 'yellow') {
          cell.style.backgroundColor = 'yellow';
          break;
        }
        if (cell.style.backgroundColor === 'yellow' && neighbor.style.backgroundColor === 'white') {
          neighbor.style.backgroundColor = 'yellow';
          break;
        }
      }
    }
  }
}

function pintarParedesPretas(cellMatrix, numRows, numCols) {
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      const cell = cellMatrix[i][j];
      if (
        cell.style.backgroundColor !== 'green' &&
        cell.style.backgroundColor !== 'red' &&
        cell.style.backgroundColor !== 'yellow'
      ) {
        cell.style.backgroundColor = 'black';
      }
    }
  }
}


// Gera ao carregar
window.addEventListener('load', gerarGridDinamico);

// Recalcula ao redimensionar
//window.addEventListener('resize', gerarGridDinamico);

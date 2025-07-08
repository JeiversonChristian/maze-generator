function gerarGridDinamico() {
  const middleSection = document.getElementById('middle-section');

  // Limpa antes
  middleSection.innerHTML = '';

  // Define tamanho desejado do quadrado (em pixels)
  const targetCellSize = 50;

  // Descobre o tamanho REAL da área de jogo
  const width = middleSection.clientWidth;
  const height = middleSection.clientHeight;

  // Calcula número de colunas e linhas como FRAÇÃO do tamanho disponível
  const numCols = Math.floor(width / targetCellSize);
  const numRows = Math.floor(height / targetCellSize);

  //console.log(`Cols: ${numCols}, Rows: ${numRows}`);

  // Define o grid com CSS
  middleSection.style.gridTemplateColumns = `repeat(${numCols}, 1fr)`;
  middleSection.style.gridTemplateRows = `repeat(${numRows}, 1fr)`;

  // Escolhe colunas aleatórias para a primeira e a última linha
  const randomStartCol = Math.floor(Math.random() * numCols);
  const randomEndCol = Math.floor(Math.random() * numCols);

  //console.log(`StartCol: ${randomStartCol}, EndCol: ${randomEndCol}`);

  // Cria as células com atributos i,j
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      const cell = document.createElement('div');
      cell.classList.add('grid-cell');

      // Atribui os dados de posição
      cell.dataset.row = i;
      cell.dataset.col = j;

      // Verifica se é a célula da primeira linha escolhida
      if (i === 0 && j === randomStartCol) {
        cell.style.backgroundColor = 'green';
      }

      // Verifica se é a célula da última linha escolhida
      if (i === numRows - 1 && j === randomEndCol) {
        cell.style.backgroundColor = 'red';
      }

      middleSection.appendChild(cell);
    }
  }
}

// Gera quando carrega
window.addEventListener('load', gerarGridDinamico);

// Recalcula quando redimensiona a janela
//window.addEventListener('resize', gerarGridDinamico);

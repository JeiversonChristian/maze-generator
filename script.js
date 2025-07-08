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

  // Cria as células com atributos i,j
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      const cell = document.createElement('div');
      cell.classList.add('grid-cell');

      // Atribui os dados de posição
      cell.dataset.row = i;
      cell.dataset.col = j;

      middleSection.appendChild(cell);
    }
  }
}

// Gera quando carrega
window.addEventListener('load', gerarGridDinamico);

// Recalcula quando redimensiona a janela
//window.addEventListener('resize', gerarGridDinamico);

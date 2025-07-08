const middleSection = document.getElementById('middle-section');

// Defina o número de linhas e colunas
const numRows = 10;
const numCols = 20;

// Configura o grid
middleSection.style.gridTemplateRows = `repeat(${numRows}, 1fr)`;
middleSection.style.gridTemplateColumns = `repeat(${numCols}, 1fr)`;

// Limpa o conteúdo anterior se precisar
middleSection.innerHTML = '';

// Cria as células
for (let i = 0; i < numRows * numCols; i++) {
  const cell = document.createElement('div');
  cell.classList.add('grid-cell');
  middleSection.appendChild(cell);
}

var score = 0
var gameOver = false

function showBoard(board){
    var toShowBoard = []
    for (row of board){
        toShowBoard.push(row)
        toShowBoard.push('\n')
    }
    return toShowBoard
}
function getZeros(board,val){ // return pos as [i][j] of matching value on board
    var zerosPos = [] 
    var j = 0
    for (row of board){
        row.forEach((item,i) => {
        var pos = []
        if (item == val){
            pos.push([i])
            pos.push([j])
            zerosPos.push([pos])
        }})
      j++
    }
    return zerosPos
    }  
function addValue(board){
    console.log(board)
    let zeros = getZeros(board,0)
    console.log(zeros)
    if (zeros.length == 0){
      return
    }
    var randomTile = Math.floor(Math.random() * zeros.length)
    var randomTilePos = zeros[randomTile]
    console.log(randomTilePos)
    var randomNumber = Math.random() < 0.9 ? 2 : 4
    console.log(randomTilePos[0][1])
    console.log(board[randomTilePos[0][1]])
    board[randomTilePos[0][1]].splice(randomTilePos[0][0],1,randomNumber)
  return board
}
function startGame (){
  var board = [[0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0]
           ]
  addValue(board)
  addValue(board)
  console.log(board)
  
}
function removeZeros(row){
    let zeroRemovedRow = row.filter((value) => value > 0)
    return zeroRemovedRow
}
function combine(row){
let result = []
for (let i = 0; i < row.length; i++){
  if (row[i] === row[i+1]){
    result.push(row[i] * 2)
    console.log(row[i])
    i++
    }
  else{
    result.push(row[i])
    }
  console.log(result)
  
  }
  return result
}
function fillZeros (row){
  while (row.length < 4){
    row.push(0)
  }
  return row
}
function moveRowLeft (row){
  let noZeros = removeZeros(row)
  let combined = combine(noZeros)
  let filled = fillZeros(combined)
  return filled
}
function moveLeft(board){
  for (let i = 0;i < board.length; i++){
    board[i] = moveRowLeft(board[i])
  }
  return board
}
function moveRight(board){
  for (let i = 0;i < board.length; i++){
    board[i].reverse()
  }
  moveLeft(board)
  
  for (let i = 0;i < board.length; i++){
    board[i].reverse()
  }
  return board
}
function columnToRow(board){
  let newBoard = []
  for(let col = 0;col < 4;col++){
    let newRow = []
    for(let row = 0;row < 4;row++){
      newRow.push(board[row][col])
    }
    newBoard.push(newRow)
  }
  return newBoard
}
function moveUp(board){
  let columnsAsRows = columnToRow(board)
  moveLeft(columnsAsRows)
  let result = columnToRow(columnsAsRows)
  for (let i = 0;i < 4; i++){
    for (let j = 0;j < 4; j++){
      board[i][j] = result[i][j]
    }
  }
  return board
}
function moveDown(board){
  let columnsAsRows = columnToRow(board)
  moveRight(columnsAsRows)
  let result = columnToRow(columnsAsRows)
  for (let i = 0;i < 4; i++){
    for (let j = 0;j < 4; j++){
      board[i][j] = result[i][j]
    }
  }
  return board
}
function cloneBoard(board){
  let newBoard = board.map((row) => [...row])
  return newBoard
}
function boardsAreEqual(board1,board2){
  let matches = 0
  for (let i = 0; i < 4; i++){
    for (let j = 0;j < 4; j++){
      if (board1[i][j] === board2[i][j]){
        matches++}
      else{
        return false
      }
    } 
  }
  if (matches == 16){
    return true
  }
}
function hasValidMoves (board){
  for (let i = 0; i < 4 ;i++){
    for (let j = 0;j < 4;j++){
      if (board[i][j] == 0){
        return true
      }
    }
  }
  for (let i = 0; i < 4; i++){
    for (let j = 0; j < 3; j++){
      if (board[i][j] == board[i][j+1]){
        return true
      }
    }
  }
  for (let j = 0; j < 4; j++){
    for (let i = 0; i < 3; i++){
      if (board[i][j] == board[i+1][j]){
        return true
      }
    }
  }
  return false
}
function makeMove (board, move){
  let oldBoard = cloneBoard(board)
  switch(move.toLowerCase()){
    case 'w':
    case 'up':
      moveUp(board)
      break;
    case 's':
    case 'down':
      moveDown(board)
      break;
    case 'a':
    case 'left':
      moveLeft(board)
      break;
    case 'd':
    case 'right':
      moveRight(board)
      break;
    default:
      console.log("Invalid Move")
      return board
  }
  if (!boardsAreEqual(oldBoard,board)){
    addValue(board)
    if (!hasValidMoves(board)){
      gameOver = true
      console.log('Game Over')
    }
  }
  else{
    console.log('Invalid Move')
  }
  return board
}
function renderBoard (board){
  let htmlBoard = document.querySelector('#board')
  htmlBoard.innerHTML = ""
  for (let i = 0; i < board.length; i++){
    for (let j = 0; j < 4; j++){
      let tile = document.createElement('div')
      tile.classList.add('tile')
      tile.textContent = board[i][j]
      htmlBoard.appendChild(tile)
    }
  }
}
let board = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]
addValue(board)
renderBoard(board);
document.addEventListener('keyup', function(event){
  switch(event.key){
    case 'ArrowLeft':
    case 'a':
    case 'A':
      makeMove(board, 'left')
      break;
    case 'ArrowUp':
    case 'w':
    case 'W':
      makeMove(board, 'up')
      break;
    case 'ArrowDown':
    case 's':
    case 'S':
      makeMove(board, 'down')
      break;
    case 'ArrowRight':
    case 'd':
    case 'D':
      makeMove(board, 'right')
      break;
    default:
      console.log('Invalid KeyPress, Use  Arrow Up/Left/Down/Right or Key W/A/S/D')
  }
  renderBoard(board)
})
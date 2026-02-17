var board = [[0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0]
           ]
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
    zeroRemovedRow = row.filter((value) => value > 0)
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
  moveLeft(board[i])
  
  for (let i = 0;i < board.length; i++){
    board[i].reverse()
  }
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
  board = columnToRow(board)
  moveLeft(board)
  board = columnToRow(board)
  return board
}
function moveDown(board){
  board = columnToRow(board)
  moveRight(board)
  board = columnToRow(board)
  return board
}
let initial = document.querySelector('.initial')
let score = document.querySelector('.score')
let settings = document.querySelector('.settings')




// initial screen (welcome to pinn... and explain the basic of the game)
function start(){
    initial.style.display = "none"
    startGame()
}


// score screen (show the score and the current settings)
function restart(){
    score.style.display = "none"
    startGame()
}


// settings (reset and specs)
/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, gamePlaying
initFunction()

document.querySelector('.btn-roll').addEventListener('click', function () {
  if (!gamePlaying) return
  // Anonymous function
  // Get a random number [1-6]
  var randomDiceNumber = Math.floor(Math.random() * 6) + 1

  // 2. Display result
  var diceDOM = document.querySelector('.dice')
  diceDOM.style.display = 'block'
  diceDOM.src = 'dice-' + randomDiceNumber + '.png'

  // 3. Update the round score if the rolled number was not a 1
  if (randomDiceNumber !== 1) {
    roundScore += randomDiceNumber
    document.querySelector('#current-' + activePlayer).textContent = roundScore
  } else {
    // NEXT Player
    nextPlayer()
  }
})

document.querySelector('.btn-hold').addEventListener('click', function () {
  if (!gamePlaying) return
  // debugger like binding.pry for debuggin

  // Add CURRENT score to GLOBAL score
  scores[activePlayer] += roundScore

  // Update the UI
  document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]

  // check if player won the game
  if (scores[activePlayer] >= 10) {
    document.getElementById('name-' + activePlayer).textContent = 'WINNER!'
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner')
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active')
    var diceDOM = document.querySelector('.dice')
    diceDOM.style.display = 'none'
    gamePlaying = false
  } else {
    nextPlayer()
  }
})

document.querySelector('.btn-new').addEventListener('click', initFunction)

function initFunction () {
  scores = [0, 0]
  roundScore = 0
  activePlayer = 0
  gamePlaying = true
  document.querySelector('.dice').style.display = 'none'
  document.getElementById('score-0').textContent = '0'
  document.getElementById('score-1').textContent = '0'
  document.getElementById('current-0').textContent = '0'
  document.getElementById('current-1').textContent = '0'
  document.getElementById('name-0').textContent = 'Player 1!'
  document.getElementById('name-1').textContent = 'Player 2!'
  document.querySelector('.player-0-panel').classList.remove('winner')
  document.querySelector('.player-1-panel').classList.remove('winner')
  document.querySelector('.player-0-panel').classList.remove('active')
  document.querySelector('.player-1-panel').classList.remove('active')
  document.querySelector('.player-0-panel').classList.add('active')
}

function nextPlayer () {
  activePlayer = activePlayer === 0 ? 1 : 0
  roundScore = 0
  document.getElementById('current-0').textContent = '0'
  document.getElementById('current-1').textContent = '0'

  // document.querySelector('.player-0-panel').classList.remove('active') // we can use classList.add('active')
  document.querySelector('.player-1-panel').classList.toggle('active')
  document.querySelector('.player-0-panel').classList.toggle('active')
  document.querySelector('.dice').style.display = 'none'
}

// dice = Math.floor(Math.random() * 6) + 1;

// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'
// document.querySelector('#current-' + activePlayer).textContent = dice

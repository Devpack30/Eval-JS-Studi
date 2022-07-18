/*
 -- Règle du jeu--

Le jeu comprend 2 joueurs sur un seul et même écran.
Chaque joueur possède un score temporaire (ROUND) et un score global (GLOBAL). 
À chaque tour, le joueur a son ROUND initialisé à 0 et peut lancer un dé autant de fois qu'il le souhaite. 
Le résultat d’un lancer est ajouté au ROUND.

Lors de son tour, le joueur peut décider à tout moment de: 

-Cliquer sur l’option “Hold”, qui permet d’envoyer les points du ROUND vers le GLOBAL. 
Ce sera alors letour de l’autre joueur.

-Lancer le dé. S’il obtient un 1, son score ROUND est perdu et c’est la fin de son tour.
Le premier joueur qui atteint les 100 points sur global gagne le jeu.

*/

let scores, roundScore, activePlayer, gamePlaying;

document.querySelector(".btn-roll").addEventListener("click", () => {
  if (gamePlaying) {
    // 1. chiffres aléatoires
    var dice = Math.floor(Math.random() * 6) + 1;

    //2. Affichage au panel du chiffre au lancé du dé
    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "dice-" + dice + ".png";

    //3. Sauvegarde du score si le lancé du dé n'est pas 1
    if (dice !== 1) {
      // Ajout du score
      roundScore += dice;
      document.querySelector("#current-" + activePlayer).textContent =
        roundScore;
    } else {
      // Joueur suivant
      nextPlayer();
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", () => {
  if (gamePlaying) {
    // Ajout du score current au score globale
    scores[activePlayer] += roundScore;

    // Enregistrement du score sur le panel du joueur actif
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    // Action si le joueur gagne la partie
    if (scores[activePlayer] >= 100) {
      document.querySelector("#name-" + activePlayer).textContent =
        "Congrats you win!";
      document.querySelector(".dice").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
    } else {
      // Joueur suivant
      nextPlayer();
    }
  }
});

function nextPlayer() {
  // Joueur suivant
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  //document.querySelector('.player-0-panel').classList.remove('active');
  //document.querySelector('.player-1-panel').classList.add('active');

  document.querySelector(".dice").style.display = "none";
}
// Action bouton New Game
document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  document.querySelector(".dice").style.display = "none";

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}

// //document.querySelector('#current-' + activePlayer).textContent = dice;
// //document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
// //var x = document.querySelector('#score-0').textContent;

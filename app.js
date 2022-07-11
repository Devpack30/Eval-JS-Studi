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
    // Chiffres aléatoires
    let dice = Math.floor(Math.random() * 6) + 1;

    let diceDom = document.getElementsByClassName("dice");
    diceDom.style.display = "block";
    diceDom.src = "dice-" + dice + ".png";

    // Sauvegarde du score si le lancé de Dé n'est pas 1
    if (dice !== 1) {
      // Ajout du score
      roundScore += dice;
      document.getElementById("current-" + activePlayer).textContent =
        roundScore;
    } else {
      // Joueur suivant
      nextPlayer();
    }
  }
});

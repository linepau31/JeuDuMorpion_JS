const info = document.querySelector('.info'); // le tour de qui, qui à gagnée....
const cellules = document.querySelectorAll('.cell');

let verouillage = true; // la partie est figé quand elle est gagné
let joueurEnCours = "X"; // le joueur qui a la x qui démarre

info.innerHTML = `Au tour de ${joueurEnCours}`;

const alignementsGagnants = [ // tous les alignement possible pour gagné
    [0, 1, 2], // les 3 colonnes
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let partieEnCours = ["","","","","","","","",""]; // tableau avec se qu'on a coché

cellules.forEach(cell => {
    cell.addEventListener('click', clicSurCase);
})

function clicSurCase(e){
    const caseClique = e.target; // la case sur celle qu'on vient de cliquer
    const caseIndex = caseClique.getAttribute('data-index');

    if(partieEnCours[caseIndex] !== "" || !verouillage){
        return; // si la case est déjà click je ne pourrais plus aprés
    }

    partieEnCours[caseIndex] = joueurEnCours;
    caseClique.innerHTML = joueurEnCours;
    console.log(partieEnCours)

    validationResultats();

}

function validationResultats(){

    let finDePartie = false; // c'est pas la fin de la partie

    for(let i = 0; i < alignementsGagnants.length; i++ ){ // itérer 8 fois, les 8 combinaisons

        const checkWin = alignementsGagnants[i];
        //  [0, 1, 2],
        let a = partieEnCours[checkWin[0]]; // égale a x ou a o
        let b = partieEnCours[checkWin[1]];
        let c = partieEnCours[checkWin[2]];

        if(a === '' || b === '' || c === ''){ // pas fini
            continue;
        }
        if( a === b && b === c){ // gagné
            finDePartie = true;
            break; // arrête de la fonction
        }
    }

    if(finDePartie){
        info.innerText = `Le joueur ${joueurEnCours} a gagné !`
        verouillage = false;
        return; // sort de la fonction
    }

    // si il n'y pas de chaine de caracteres vides dans partie en cours, match nul
    let matchNul = !partieEnCours.includes(''); // (!) l'inverse de true
    if(matchNul){
        info.innerText =  'Match nul !';
        verouillage = false;
        return; // sort de la fonction
    }

    changementDeJoueur();
}



function changementDeJoueur(){
    joueurEnCours = joueurEnCours === "X" ? "O" : "X"; // si c'est la croix qui joue, ça devient le o en suivant
    info.innerText = `Au tour de ${joueurEnCours}`;
}

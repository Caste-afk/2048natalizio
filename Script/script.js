let x=0;
let y=0;
let turno1 = true;
let punteggio =0;
let secondi =0;
let minuti =0;
let poteri= [true, true];
let gioco = true;
let t;

window.onload = function(){//funzioni da caricare al caricamento della pagina (random)
    random();
    random();
    aggiornapunteggio();
    t =setInterval(timer, 1000);
}


function cellaPresente(x,y){
    
    const selector = '[data-x="' + x+ '"][data-y="'+y+'"]';
    const div = document.querySelector(selector);
    return div;
}

function random(){
    let nx = Math.floor(Math.random()*4);
    let ny = Math.floor(Math.random()*4);
    let nval = Math.round(Math.random()) ? 2 : 4;
    
    if(turno1){//una casella deve essere costruita da qualche parte per forza

        inserisciCella(nx, ny, nval);

        turno1=false;

    }else{//da qui parte il controllo per verificare che la casella non venga costruita sopra un'altra
        
        let divcontrollo = cellaPresente(nx, ny);

        if (divcontrollo == null){
            inserisciCella(nx, ny, nval)
        }else{//rieseguo random in modo da trovare una cella vuoto ad una certa
            random();
        }
    }
}

function inserisciCella(nx, ny,nval){
    //console.log(`posizione: (${nx}, ${ny}), valore: ${nval}`);
    const div = document.createElement('div');
    let divimg = document.createElement(`img`);
    divimg.src = `img/${nval}.png`;
    div.appendChild(divimg);
    div.style.top = (ny*150) + 'px';//posizione
    div.style.left = (nx*150) + 'px';//posizione
    div.setAttribute('data-x', nx);
    div.setAttribute('data-y', ny);
    div.setAttribute('data-val', nval);
    div.setAttribute("class", "celle");
    tabella.appendChild(div); 
}

function input(input) {

    switch (input) {
        case "su":
            spostasu();
            break;
        case "giu":
            spostagiu();
            break;
        case "destra":
            spostadestra();
            break;
        case "sinistra":
            spostasinistra()
            break;
    }
    random();
}

document.addEventListener('keydown', function(event) {//tasti
    switch (event.code) {
        case "ArrowUp":
            spostasu();
            break;
        case "ArrowDown":
            spostagiu();
            break;
        case "ArrowLeft":
            spostasinistra();
            break;
        case "ArrowRight":
            spostadestra();
            break;
        default:
            return;
    }
    random();
}); 


function rimuoviCella(element){
    element.parentNode.removeChild(element);
}

function muoviCella(div,nx,ny){
    //console.log("Sposto");
    div.dataset.x=nx;
    div.dataset.y=ny;
    div.style.left = (nx*150) + 'px';
    div.style.top = (ny*150) + 'px';
}

function spostasu() {
    const celle = document.querySelectorAll('.celle'); //seleziona tutte le celle

    for (let i = 0; i < celle.length; i++) {
        const cella = celle[i];
        let x = cella.dataset.x;
        let nuovaY = cella.dataset.y;


        //trova la posizione più alta
        while (nuovaY > 0 && cellaPresente(x, nuovaY -1) == null) {
            //console.log(nuovaY-1);
            nuovaY--;
        }

        //vedo se riesco ad unire le celle
        const cellaSopra = cellaPresente(x, nuovaY -1);
        if (cellaSopra != null && cellaSopra.dataset.val == cella.dataset.val) {
            //unisci le celle
            inserisciCella(x, nuovaY -1, 2 * parseInt(cella.dataset.val));
            punteggio += parseInt(cellaPresente(x, nuovaY-1).dataset.val);
            aggiornapunteggio();
            rimuoviCella(cellaSopra);
            rimuoviCella(cella);
        } else{//altrimenti sposta fino a dove puoi
            muoviCella(cella, x, nuovaY);
            
        }
    }
}


function spostagiu() {
    const celle = document.querySelectorAll('.celle'); //seleziona tutte le celle

    for (let i = 0; i < celle.length; i++) {
        const cella = celle[i];
        let x = parseInt(cella.dataset.x);
        let nuovaY = parseInt(cella.dataset.y);


        //trova la posizione più bassa
        while (nuovaY < 3 && cellaPresente(x, nuovaY +1) == null) {
            nuovaY++;
        }

        //vedo se riesco ad unire le celle
        const cellasotto = cellaPresente(x, nuovaY +1);
        if (cellasotto != null && cellasotto.dataset.val == cella.dataset.val) {
            //unisci le celle
            inserisciCella(x, nuovaY +1, 2 * parseInt(cella.dataset.val));
            punteggio += parseInt(cellaPresente(x, nuovaY+1).dataset.val);
            aggiornapunteggio();
            rimuoviCella(cellasotto);
            rimuoviCella(cella);
        } else{//altrimenti sposta fino a dove puoi
            muoviCella(cella, x, nuovaY);
        }
    }
}


function spostadestra() {
    const celle = document.querySelectorAll('.celle'); //seleziona tutte le celle

    for (let i = 0; i < celle.length; i++) {
        const cella = celle[i];
        let y = parseInt(cella.dataset.y);
        let nuovaX = parseInt(cella.dataset.x);

        //trova la posizione più a destra
        while (nuovaX < 3 && cellaPresente(nuovaX +1, y) == null) {
            nuovaX++;
        }

        //vedo se riesco ad unire le celle
        const celladestra = cellaPresente(nuovaX+1, y);
        if (celladestra != null && celladestra.dataset.val == cella.dataset.val) {
            //unisci le celle
            inserisciCella(nuovaX +1, y, 2 * parseInt(cella.dataset.val));
            punteggio += parseInt(cellaPresente(nuovaX+1, y).dataset.val);
            aggiornapunteggio();
            rimuoviCella(celladestra);
            rimuoviCella(cella);
        } else{//altrimenti sposta fino a dove puoi
            muoviCella(cella,nuovaX, y);
        }
    }
}

function spostasinistra() {
    const celle = document.querySelectorAll('.celle'); //seleziona tutte le celle

    for (let i = 0; i < celle.length; i++) {
        const cella = celle[i];
        let y = parseInt(cella.dataset.y);
        let nuovaX = parseInt(cella.dataset.x);

        //trova la posizione più a destra
        while (nuovaX > 0  && cellaPresente(nuovaX -1, y) == null) {
            nuovaX--;
        }

        //vedo se riesco ad unire le celle
        const cellasinistra = cellaPresente(nuovaX-1, y);
        if (cellasinistra != null && cellasinistra.dataset.val == cella.dataset.val) {
            //unisci le celle
            inserisciCella(nuovaX -1, y, 2 * parseInt(cella.dataset.val));
            punteggio += parseInt(cellaPresente(nuovaX-1, y).dataset.val);
            aggiornapunteggio();
            rimuoviCella(cellasinistra);
            rimuoviCella(cella);
        } else{//altrimenti sposta fino a dove puoi
            muoviCella(cella,nuovaX, y);
        }
    }
}

function aggiornapunteggio(){
    let p = document.getElementById('punteggio');
    p.innerHTML = `punteggio: ${punteggio}`;
}

function timer(){
    secondi++;
    let p =document.getElementById('timer');

    if (secondi>60){
        minuti++;
        secondi =0;
    }

    let tempo = `${minuti} : ${secondi}`
    p.innerHTML = `tempo: ${tempo}s`;
    vs();
}

function reload(){
    x=0;
    y=0;
    minuti =0;
    secondi =0;
    direzione ="";
    punteggio=0;
    poteri= [true, true];
    turno1 = false;
    gioco = true;
    document.getElementById('punteggio').innerHTML = `punteggio: 0` 
    document.getElementById('tabella').innerHTML="";
    if(document.getElementById('vs') != null){
        rimuoviCella(document.getElementById('vs'))
    }
    t =setInterval(timer, 10000);//non so perche vada bene 10000 mentre all'inizio 1000
    random();
    random();
}

function vs(){
    let div = document.createElement('div');
    const celle = document.querySelectorAll('.celle');
    let contatore =0;
    let testo;

    for (let i =0; i<celle.length; i++){
        let cella = celle[i];
        //console.log(parseInt(cella.dataset.val))

        if(cella.dataset.val != 0){
            contatore++
        }
        if (parseInt(cella.dataset.val) == 2048){
            testo = "Hai Vintoo!!";
        }

    }
    if(minuti> 5){
        testo = 'Hai Perso';
    }
    if (contatore == 16){
        testo= 'Hai Perso';
    }
    
    let divtext = document.createTextNode(testo);
    if (gioco){
        if (testo != undefined){
            div.appendChild(divtext);
            div.setAttribute('id', 'vs');
            document.getElementById('main').prepend(div);//prepend per scriverlo sopra ad ogni cosa
            gioco = false;
            clearInterval(t);//per bloccare il tempo
        }
    }
}

function potrimuovi(){
    if (poteri[0]){
        const celle = document.querySelectorAll('.celle');

        for (let i =0; i<celle.length; i++){
            let cella = celle[i];

            if(cella.dataset.val == 2 || cella.dataset.val == 2){
                rimuoviCella(cella);
            }

        }
        poteri[0]= false;
    }
    console.log(poteri)
}
function potriordina(){

}

// aggiungere potere riordina
//sistemare bug nello scontro
//mettere righe e colonne
//sistemare immagini
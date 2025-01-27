let x=0;
let y=0;
let turno1 = true;
let punteggio =0;
let secondi =0;
let minuti =0;
let poteri= [true, true];
let gioco = true;
let t;
let tmax;
let numeropartite =0;//per mettere a posto il tempo
let scritto = false;//per testo delle impostazioni


window.onload = function(){//funzioni da caricare al caricamento della pagina (random)
    document.getElementById('main').style.display = 'none';
    legenda();
}

function partita(){
    tmax = document.getElementById('tmax').value;
    if (tmax>0){
        x=0;
        numeropartite ++;
        y=0;
        minuti =0;
        secondi =0;
        direzione ="";
        punteggio=0;
        poteri= [true, true];
        turno1 = false;
        gioco = true;
        document.getElementById('impostazioni').style.display = 'none'
        document.getElementById('punteggio').innerHTML = `punteggio: 0` ;
        document.getElementById('tabella').innerHTML="";
        document.getElementById('main').style.display = '';
        if (document.getElementById('diverr')!=null){
            rimuoviCella(document.getElementById('diverr'));
            scritto=false;
        }
        aggiornapunteggio();
        let molt;
        //serve questo for altrimenti il tempo si velocizza;
        for (let i =0; i<numeropartite; i++){
            molt = Math.pow(10, i);
        }
        t =setInterval(timer, 1000*molt);
    
        generalinee();
        if(document.getElementById('vs') != null){
            rimuoviCella(document.getElementById('vs'))
        }
    }else{
        if(!scritto){
            let div = document.createElement('div')
            div.setAttribute('id', 'diverr');
            let pmess = document.createElement('p');
            pmess.setAttribute('id', 'messerr');
            let ptext = document.createTextNode('Inserire valori validi!');
            pmess.appendChild(ptext);
            div.appendChild(pmess);
            document.getElementById('impostazioni').appendChild(div);
            scritto = true;
        }else{
        }
    }
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
            }else{//controllo tutte le celle per vedere se esiste uno spazio libero
                for(let i=0; i<4; i++){
                    for(let j=0; j<4; j++){
                        if (cellaPresente(i, j) ==null){
                            random();
                            return;
                        }
                    
                    }
                }
        }
    }
}

function inserisciCella(nx, ny,nval){
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
    div.dataset.x=nx;
    div.dataset.y=ny;
    div.style.left = (nx*150) + 'px';
    div.style.top = (ny*150) + 'px';
}

function spostasu() {

    for (let ty=1; ty<4; ty++)
    for (let tx=0; tx<4; tx++){
        const cella = cellaPresente(tx,ty); //celle[i];
        if (cella != null) {//se la cella esiste procedi spostando vale per tutti gli "sposta"
            let x = cella.dataset.x;
            let nuovaY = cella.dataset.y;


            //trova la posizione più alta
            while (nuovaY > 0 && cellaPresente(x, nuovaY -1) == null) {
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
                muoviCella(cella);
                spostasu();
            } else{//altrimenti sposta fino a dove puoi
                muoviCella(cella, x, nuovaY);
                
            }
        }
    }
}

function spostagiu() {
    for (let ty=3; ty>=0; ty--)
        for (let tx=0; tx<4; tx++){
            const cella = cellaPresente(tx,ty); //celle[i];
            if (cella != null) {
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
                    muoviCella(cella);
                    spostagiu();
                } else{//altrimenti sposta fino a dove puoi
                    muoviCella(cella, x, nuovaY);
                }
            }
    }
}
function spostadestra() {
    for (let tx = 2; tx >= 0; tx--)
        for (let ty = 0; ty < 4; ty++) {
            const cella = cellaPresente(tx, ty);
            if (cella != null) {
                let y = parseInt(cella.dataset.y);
                let nuovaX = parseInt(cella.dataset.x);

                //trova la posizione più a destra
                while (nuovaX < 3 && cellaPresente(nuovaX + 1, y) == null) {
                    nuovaX++;
                }

                //vedo se riesco ad unire le celle
                const celladestra = cellaPresente(nuovaX + 1, y);
                if (celladestra != null && celladestra.dataset.val == cella.dataset.val) {
                    //unisci le celle
                    inserisciCella(nuovaX + 1, y, 2 * parseInt(cella.dataset.val));
                    punteggio += parseInt(cellaPresente(nuovaX + 1, y).dataset.val);
                    aggiornapunteggio();
                    rimuoviCella(celladestra);
                    rimuoviCella(cella);
                    muoviCella(cella);
                    spostadestra();
                } else { //altrimenti sposta fino a dove puoi
                    muoviCella(cella, nuovaX, y);
                }
            }
        }
}

function spostasinistra() {
    for (let tx = 1; tx < 4; tx++)
        for (let ty = 0; ty < 4; ty++){
            const cella = cellaPresente(tx, ty);
            if (cella != null) {
                let y = parseInt(cella.dataset.y); 
                let nuovaX = parseInt(cella.dataset.x);

                //trova la posizione più a sinistra
                while (nuovaX > 0 && cellaPresente(nuovaX - 1, y) == null) {
                    nuovaX--;
                }

                //vedo se riesco ad unire le celle
                const cellasinistra = cellaPresente(nuovaX - 1, y);
                if (cellasinistra != null && cellasinistra.dataset.val == cella.dataset.val) {
                    //unisci le celle
                    inserisciCella(nuovaX - 1, y, 2 * parseInt(cella.dataset.val));
                    punteggio += parseInt(cellaPresente(nuovaX - 1, y).dataset.val);
                    aggiornapunteggio();
                    rimuoviCella(cellasinistra);
                    rimuoviCella(cella);
                    muoviCella(cella);
                    spostasinistra();
                } else {//altrimenti sposta fino a dove puoi
                    muoviCella(cella, nuovaX, y);
                }
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
    p.innerHTML = `tempo: ${tempo} / ${tmax} : 00`;
    vs();
}

function reload(){// per la ricarica della pagina
    document.getElementById('main').style.display = 'none'
    document.getElementById('impostazioni').style.display = '';
    document.getElementById('pot1').style.backgroundColor = 'rgb(122, 160, 52)';
    document.getElementById('pot2').style.backgroundColor = 'rgb(122, 160, 52)';
}

function generalinee(){
    let divtabella = document.getElementById('tabella')
    for(let i =0; i<16; i++){
        let div =document.createElement('div');
        div.setAttribute('class', 'linee');
        divtabella.appendChild(div);
    }
}

function vs(){//controlla se vittoria o se sconfitta
    let div = document.createElement('div');
    const celle = document.querySelectorAll('.celle');
    let contatore =0;
    let testo;

    for (let i =0; i<celle.length; i++){
        let cella = celle[i];

        if(cella.dataset.val != 0){
            contatore++
        }
        if (parseInt(cella.dataset.val) == 2048){
            testo = "Hai Vintoo!!";
            div.style.backgroundColor=`rgb(122, 160, 52)`;
        }

    }
    if(minuti> tmax){
        testo = 'Game Over';
        div.style.backgroundColor=`rgb(196, 138, 116)`;
    }
    if (contatore == 16){
        if(movdisp()){
            if(!poteri[0] && !poteri[1]){//se posso usare i poteri
                testo= 'Game Over';
                div.style.backgroundColor=`rgb(196, 138, 116)`;
            }
        }
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

function movdisp() {
    let celle = document.querySelectorAll('.celle');
    let puo = true;

    for (let i = 0; i < celle.length; i++) {
        let cella = celle[i];
        let xcella = parseInt(cella.dataset.x);
        let ycella = parseInt(cella.dataset.y);
        let valcella = parseInt(cella.dataset.val);
        let csopra = cellaPresente(xcella, ycella - 1);
        let csotto = cellaPresente(xcella, ycella + 1);
        let cdestra = cellaPresente(xcella + 1, ycella);
        let csinistra = cellaPresente(xcella - 1, ycella);
        
        csopra = csopra ? parseInt(csopra.dataset.val) : null;
        csotto = csotto ? parseInt(csotto.dataset.val) : null;
        cdestra = cdestra ? parseInt(cdestra.dataset.val) : null;
        csinistra = csinistra ? parseInt(csinistra.dataset.val) : null;
        
        //controlla celle vicine
        if (
            (csopra != null && csopra == valcella) ||
            (csotto != null && csotto == valcella) ||
            (cdestra != null && cdestra == valcella) ||
            (csinistra != null && csinistra == valcella)
        ) {
            puo = false;
            return puo;
        }
    }

    return puo;
}


//funzione per ottenere la cella specificata
function cellaPresente(x, y) {
    return document.querySelector(`.celle[data-x="${x}"][data-y="${y}"]`);
}


function potrimuovi(){
    if (poteri[0]){
        const celle = document.querySelectorAll('.celle');

        for (let i =0; i<celle.length; i++){
            let cella = celle[i];

            if(cella.dataset.val == 2 || cella.dataset.val == 4){
                rimuoviCella(cella);
            }

        }
        poteri[0]= false;
        document.getElementById('pot1').style.backgroundColor = 'rgb(167, 101, 101)';
    }
}

function potriordina(){
    if (poteri[1]){
        let celle = document.querySelectorAll('.celle');
        let valorecelle=[];

        for(let i=0; i<celle.length; i++){
            let cella = celle[i];
            if(cella.dataset.val != null){
                valorecelle.push(cella.dataset.val);
            }
        }
        valorecelle.sort((a, b) => b - a);
        let ix =0;//valore per riposizione
        let iy=0;//valore per riposizione
        let tx=0;//valore per trovare celle
        let ty=0//valore per trovare celle
        let acelle=0;
        for (let i =0; i< 16; i++){//16 numero di celle totali
            let cella = cellaPresente(tx, ty);
            if (cella != null){
                rimuoviCella(cella);
                inserisciCella(ix, iy, valorecelle[acelle]);
                acelle++;
                ix++;
                if (ix >3){
                    ix=0;
                    iy++;
                }
            }
            tx++;
            if (tx >3){
                tx=0;
                ty++;
            }
        }
    }
    poteri[1]=false;
    document.getElementById('pot2').style.backgroundColor = 'rgb(167, 101, 101)';
}

function legenda(){
    let div = document.getElementById('legenda');
    for(let i=1; i<12; i++){
        let divimg = document.createElement('div');
        divimg.setAttribute('class', 'divimg')
        let img = document.createElement('img');
        img.setAttribute('class', 'imglegg')
        img.src =`img/${Math.pow(2, i)}.png`
        let p = document.createElement('p');
        p.setAttribute('class', 'plegg');
        let ptext = document.createTextNode(`${Math.pow(2, i)} punti`)
        p.appendChild(img);
        p.appendChild(ptext);
        divimg.appendChild(img);
        divimg.appendChild(p);
        div.appendChild(divimg);
    }
}
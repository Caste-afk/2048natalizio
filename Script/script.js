let x=0;
let y=0;
let direzione ="";
let colrig;//variabile per distinguere righe o colonne, in modo da spostare solo le righe o solo le colonne(?)
window.onload = function(){//funzioni da caricare al caricamento della pagina (genera tabella)
    generaTabella();
    random();
}

function generaTabella(){
    const div= document.getElementById('tabella');
    let r=4;
    let c=4;
    
    const tabella = document.createElement('table')
    for (let i =0; i<r; i++){
        const righe = document.createElement('tr');
        for( let j=0; j<c; j++){
            const colonne = document.createElement('td');
            colonne.setAttribute('class', 'celle')
            colonne.setAttribute('data-x', x);
            colonne.setAttribute('data-y', y);
            colonne.setAttribute('data-val', 0);
            righe.appendChild(colonne);
            if(x>2){
                x=0;
                y++;
            }else{
                x++;
            }
        }
        tabella.appendChild(righe);
    }
    div.appendChild(tabella);
}

function random(){
    let nx = Math.floor(Math.random()*4);
    let ny = Math.floor(Math.random()*4);
    let nval = Math.round(Math.random()) ? 2 : 4;
    console.log(`posizione: (${nx}, ${ny}), valore: ${nval}`);
    
    let celle = document.querySelectorAll(`.celle`);

    for (let i = 0; i < celle.length; i++) {
        const cella = celle[i];
        if (cella.dataset.x == nx && cella.dataset.y == ny) {
            if(cella.dataset.val==0){
                cella.removeAttribute("data-val");
                cella.setAttribute("data-val", nval);    
                cella.style.backgroundColor = "black";//solo per capire se e` effettivamente occupata
            }else{
                random();
            }
        }
    }  
}

function input(input) {
    direzione = input;

    switch (direzione) {
        case "su":
            colrig = true;
            movimento(colrig);
            break;
        case "giu":
            colrig = true;
            movimento(colrig);
            break;
        case "destra":
            colrig = false;
            movimento(colrig);
            break;
        case "sinistra":
            colrig = false;
            movimento(colrig);
            break;
    }

    random();
}

document.addEventListener('keydown', function(event) {
    switch (event.code) {
        case "ArrowUp":
            direzione = "su";
            colrig = true;
            break;
        case "ArrowDown":
            direzione = "giu";
            colrig = true;
            break;
        case "ArrowLeft":
            direzione = "sinistra";
            colrig = false;
            break;
        case "ArrowRight":
            direzione = "destra";
            colrig = false;
            break;
        default:
            return;
    }
    movimento(colrig);
    random();
}); 

function movimento(colrig){
    let positivo;//per gli spostamenti (su e destra postivi, giu e sinistra negativi)
    if (direzione == "su" || direzione=="destra"){
        positivo=true;
    }else{
        positivo=false
    }
    if (colrig){//sposta solo le colonne
        if (positivo){//verso l'alto
            //for ()
        }
    }
    random();
}

function reload(){
    x=0;
    y=0;
    direzione ="";
    document.getElementById('tabella').innerHTML="";
    generaTabella();
    random();
}
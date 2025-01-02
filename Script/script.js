let x=0;
let y=0;
let direzione ="";
let colrig;//variabile per distinguere righe o colonne, in modo da spostare solo le righe o solo le colonne(?)

window.onload = function(){//funzioni da caricare al caricamento della pagina (genera tabella, random)
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
    //console.log(`posizione: (${nx}, ${ny}), valore: ${nval}`);
    
    let celle = document.querySelectorAll(`.celle`);

    for (let i = 0; i < celle.length; i++) {
        const cella = celle[i];
        if (cella.dataset.x == nx && cella.dataset.y == ny) {
            if(cella.dataset.val==0){//se la cella e` libera
                const pval = document.createElement('p');
                let ptext = document.createTextNode(nval);
                pval.appendChild(ptext);
                cella.removeAttribute("data-val");
                cella.setAttribute("data-val", nval);
                cella.appendChild(pval);                
            }else{
                //bisogna mettere un controllo per controllare vittoria a perdita(?)
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

document.addEventListener('keydown', function(event) {//tasti
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
            dir =1;

            for (let pos_x=0; pos_x<=3; pos_x++){// per ogni riga
                let arraytemp = [];
                //console.log(`--------riga--------`)

                for (let pos_y=0; pos_y<=3; pos_y++){//per ogni colonna

                    let celle = document.querySelectorAll(`.celle`);

                    for (let i = 0; i < celle.length; i++) {
                        const cella = celle[i];

                        if (cella.dataset.x == pos_x && cella.dataset.y == pos_y) {//controlla se la cella
                            arraytemp += cella.dataset.val;
                            
                            //console.log(`aggiunto a array, pos (${pos_x}, ${pos_y})`);
                            //console.log(`array, ${arraytemp}`);
                            sposta(arraytemp, cella, pos_x, pos_y, dir);
                            
                        }
                    }  
                }
            }
        }
    }
}

function reload(){
    x=0;
    y=0;
    direzione ="";
    document.getElementById('tabella').innerHTML="";
    generaTabella();
    random();
}

function sposta(arraytemp, cella, x, y, dir){
    let valore;
    for (let i = 1; i< arraytemp.length; i++){
        if (arraytemp[i]!= arraytemp[i-1] && arraytemp[i]!=0){//se la cella dopo e` occupata
        console.log(`stesso valore, valori: ${arraytemp[i]}, ${arraytemp[i-1]}, posizione: (${x}, ${y})`)
        }else{
            console.log('spostando');
            cella.setAttribute("data-val", `0`);
            valore = cella.dataset.val;

            let celle = document.querySelectorAll(`.celle`);
            for (let i = 0; i < celle.length; i++) {
                const cella = celle[i];
                if (cella.dataset.x == x && cella.dataset.y == y) {
                    cella.innerHTML = "";
                }
                y+1;
                console.log(y)
                if((cella.dataset.y + dir) == y){
                    const pval = document.createElement('p');
                    let ptext = document.createTextNode(valore);
                    pval.appendChild(ptext);
                    cella.setAttribute("data-val", valore);
                    cella.appendChild(pval);   
                }
            }
        }
    }
}
var deno = 23;

export let fana = [];

function day(n, e){
    this.nombre = n;
    this.edad = e;
}
function llenar(){
    for (var i = 0; i < 4; i++) {
        fana.push(new day("pedro", deno+i));
    }
}

window.addEventListener('load', llenar);
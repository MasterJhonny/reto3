export function generarTabla(filas){
    var section = document.getElementsByClassName('parte')[0];
    var tabla = document.createElement('table');
    var tdbody = document.createElement('tdbody');
    

    for(var i = 0; i < filas; i++) {
        var columna = document.createElement('tr');
        for(var j = 0; j < 5; j++) {
            var celda = document.createElement('td');
            // var entrada = document.createElement('input');
            // entrada.type = 'text';
            if(i == 0){
                switch(j){
                    case 0:
                        var textoCelda = document.createTextNode(`#`);
                    break;
                    case 1:
                        var textoCelda = document.createTextNode(`Avtividad`);
                    break;
                    case 2:
                        var textoCelda = document.createTextNode(`Predesesoras`);
                    break;
                    case 3:
                        var textoCelda = document.createTextNode(`Tiempo(días)`);
                    break;
                    case 4:
                        var textoCelda = document.createTextNode(`costo`);
                    break;
                    default:
                    break;
                }
            } else {
                switch(j){
                    case 0:
                        var textoCelda = document.createTextNode(`${i}`);
                    break;
                    case 1:
                        var textoCelda = document.createElement('input');
                        textoCelda.style.width ='50px';
                        textoCelda.id = `act${i}`;
                    break;
                    case 2:
                        var textoCelda = document.createElement('input');
                        textoCelda.style.width ='70px';
                        textoCelda.id = `pre${i}`;
                    break;
                    case 3:
                        var textoCelda = document.createElement('input');
                        textoCelda.type = 'number';
                        textoCelda.style.width ='65px';
                        textoCelda.id = `tmp${i}`;
                    break;
                    case 4:
                        var textoCelda = document.createElement('input');
                        textoCelda.type = 'number';
                        textoCelda.style.width ='70px';
                        textoCelda.id = `costo${i}`;
                    break;
                    default:
                    break;
                }
            }
            celda.appendChild(textoCelda);
            columna.appendChild(celda);
            if(i == 0){
                celda.style.border = '1px solid #822659';
                celda.style.background  = '#2b2e4a';
                celda.style.color = '#e4d3cf';
                celda.style.fontSize = '10px';
                celda.style.fontWeight = 'bold';
                celda.style.padding = '2px';   
            } else {
                celda.style.border = '1px solid #822659';
                celda.style.background  = '#e84545';
                celda.style.color = '#e4d3cf';
                celda.style.fontSize = '10px';
                celda.style.padding = '2px';
                // celda.style.width = '70px';
            }
            celda.style.fontFamily = 'Arial';
            
        }
        tdbody.appendChild(columna);
        // tdbody.style.border = '1px solid #822659';
    }
    tabla.appendChild(tdbody);
    section.appendChild(tabla);
    tabla.style.border = '2px solid #822659';
}

export class actividad {
    constructor(n, p, t, c){
        this.nombre = n;
        this.predecesora = p;
        this.tiempo = t;
        this.costo = c;
    }
}

export function crearCanvas(SELECTOR, width = 400, height = 400, border = "1px dashed black", backgroundColor = "white") {
    //Crear el canvas
    let section = document.getElementsByClassName(SELECTOR)[0];
    let canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    canvas.style.border = border;
    canvas.style.background = backgroundColor;
    section.appendChild(canvas);
  
    //Creamos el contexto como propiedad del canvas
    canvas.ctx = canvas.getContext("2d");
  
    return canvas;
}

export function sacarMayor(antecesores, act) {
    var nuevapres = [];

    function nuevapre(n, v, t, ti, tf){
        this.nombre = n;
        this.valor = v;
        this.tiempo = t;
        this.tini = ti;
        this.tfin = tf;
    }

    for(let i = 0; i < antecesores.length; i++){
        act.forEach(function(actividad){
            nuevapres.push(new nuevapre(actividad.nombre, actividad.nombre == antecesores[i], actividad.tiempo, actividad.tini, actividad.tfin));
        }); 
    }

    var definido = nuevapres.filter(function(actividad){
        return actividad.valor == true;
    });

    var final = definido.map(function(actividad){
        return actividad.tfin;
    });

    var numero = [];
    
    do{
        var nuevo = [];
        function girar(lista){
            for(let i = 0; i < lista.length; i++) {
                if(i < lista.length-1){
                    if(lista[i] >= lista[i+1]){
                        nuevo.push(lista[i]);
                    } 
                } else {
                    if(lista[i] >= lista[0]){
                        nuevo.push(lista[i]);
                    }
                }
            }
        
            if(nuevo.length == 2){
                for(let i = 0; i < nuevo.length; i++) {
                    if(i == 0){
                        if(nuevo[i] == nuevo[i+1]){
                            nuevo.pop();
                        }
                    }
                }
            }
            return nuevo;
        }

        if(numero.length > 1){
            numero = girar(numero);
        } else {
            numero = girar(final);
        }

    }while(numero.length != 1);
    return numero;
}

//funciones para detectar el primer dia de la semana.

export function primerDay(fecha) {
    var inicio = new Date(fecha);
    var numDia = inicio.getDay();
    if(numDia != 0) {
        inicio.setDate(inicio.getDate()-(numDia-1));
        return `${inicio.getFullYear()},${(inicio.getMonth() + 1)<10?`0${(inicio.getMonth() + 1)}`:(inicio.getMonth() + 1)},${inicio.getDate()<10?`0${inicio.getDate()}`:inicio.getDate()}`;
    } else {
        inicio.setDate(inicio.getDate()-6);
        return `${inicio.getFullYear()},${(inicio.getMonth() + 1)<10?`0${(inicio.getMonth() + 1)}`:(inicio.getMonth() + 1)},${inicio.getDate()<10?`0${inicio.getDate()}`:inicio.getDate()}`;
    }
}
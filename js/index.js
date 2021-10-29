import { generarTabla, actividad, crearCanvas, sacarMayor, primerDay } from './main.js';

var elegirFeriados = document.getElementById('elegirFeriados');
var diasFeriados = document.getElementById('diasFeriados');
var feriados = document.getElementById('feriados');
var borrar = document.getElementById('borrar');
var cargar = document.getElementById('cargar');
var modal = document.getElementById('modal');
var model = document.getElementById('model');
var iniciar = document.getElementById('iniciar');

let dayWeek = [];

let dayFeridos = [];

let activiades = [];

let cantidadActividades, fechaInicio;

function abrirMenu() {
    var nav = document.getElementsByClassName('iten');
    var menu = document.createElement('menu');
    console.log(nav, menu);
    for (var i = 0; i < nav.length; i++){
        nav[i].classList.toggle('desaperece');
    }
}
function cerrarMenu(){
    var nav = document.getElementsByClassName('iten');
    var x = document.getElementById('x');
    console.log(nav, menu);
    for (var i = 0; i < nav.length; i++){
        nav[i].classList.toggle('desaperece');
    }
}

function day(d, v){
    this.dia = d;
    this.valor = v;
}

function agregar(){
    if(diasFeriados.value != ""){
        feriados.innerHTML = "";
        console.log("listo");
        dayFeridos.push(diasFeriados.value);
        console.log(dayFeridos);
        for(let i = 0; i < dayFeridos.length; i++){
            feriados.innerHTML += `Se añadio el dia ${dayFeridos[i]} como feriado <br>`;
        }
        borrar.style.display = "inline";
    }
}

function borarUltimoDia(){
    if(dayFeridos.length > 0){
        feriados.innerHTML = "";
        dayFeridos.pop();
    }
    for(let i = 0; i < dayFeridos.length; i++){
        feriados.innerHTML += `Se añadio el dia ${dayFeridos[i]} como feriado <br>`;
    }
}

function generarBtn(){
    var section = document.getElementsByClassName('tabla')[0];
    var boton = document.createElement('button');
    var contenido = document.createTextNode('cargar datos');
    boton.appendChild(contenido);
    boton.type = 'button';
    boton.className = 'btn';
    boton.id = 'boton';
    section.appendChild(boton);
}
// funcion que se encarga de pedir los datos de la tabla para hacer las operaciones.
function eventoBoton(){
    var btn = document.getElementById('boton');
    btn.addEventListener('click', function(){
        // var calcularOtrosDatos = () => {

        // }
        function dibujar(total){
            var ancho = canvas.width;
            var unidad = ancho/total;
            ctx.fillStyle = "#ffaec0";
            ctx.fillRect(0,0,canvas.width,100);
            // for(let i=0; i < ancho -1; i++){
            //     ctx.strokeRect();
            // }
        }
        console.log(cantidadActiovidades.value);
        for(let i = 1; i < cantidadActiovidades.value; i++){
            var nombre  = document.getElementById(`act${i}`);
            var prede = document.getElementById(`pre${i}`);
            var tiempo = document.getElementById(`tmp${i}`);
            var costo = document.getElementById(`costo${i}`);
            activiades.push(new actividad(nombre.value, prede.value, tiempo.value, costo.value));
            
        }
        console.log(activiades);
        let canvas = crearCanvas('resul');
        let ctx = canvas.getContext('2d');
        
        for(let i = 0; i < activiades.length; i++) {
            activiades[i].predes = activiades[i].predecesora.split(',');
        }
        console.log(activiades);
        for(let i = 0; i < activiades.length; i++) {
            if(i == 0){
                activiades[i].tini = i;
                activiades[i].tfin = parseInt(activiades[i].tiempo);
                console.log(activiades[i]);
            } if(i == 1){
                if(activiades[i].predecesora == 'A'){
                    activiades[i].tini = activiades[i-1].tfin;
                    activiades[i].tfin = activiades[i].tini + parseInt(activiades[i].tiempo);
                    console.log(activiades[i]);
                } else {
                    activiades[i].tini = i-1;
                    activiades[i].tfin = parseInt(activiades[i].tiempo);
                    console.log(activiades[i]);
                }
            } else {
                if(activiades[i].predes.length === 1){
                    var pre = activiades.filter(function(act) {
                        return act.nombre < activiades[i].nombre;
                    });
                    
                    for (let j = 0; j < pre.length; j++){
                        if(activiades[i].predecesora === pre[j].nombre){
                            activiades[i].tini = pre[j].tfin;
                            activiades[i].tfin = activiades[i].tini + parseInt(activiades[i].tiempo);
                        }
                    }
                    
                    console.log(activiades[i]);     
                } else {
                    var num = sacarMayor(activiades[i].predes, activiades);
                    activiades[i].tini = num[0];
                    activiades[i].tfin = activiades[i].tini + parseInt(activiades[i].tiempo);
                    console.log(activiades[i]);
                }
            }
        }
        dibujar(50);
    });
}

iniciar.addEventListener('click', function(){
    model.style.top = "-1000px";
    modal.style.top = "1030px";
});
elegirFeriados.addEventListener('click', agregar);
borrar.addEventListener('click', borarUltimoDia);
cargar.addEventListener('click', function(){
    var demo = document.getElementById('cantidadActiovidades');
    console.log(demo.value);
    if(diasFeriados.value != "" && demo.value != ""){
        for(let i = 0; i < 7; i++){
            var dia = document.getElementById(i.toString());
            dayWeek.push(new day(dia.value, dia.checked));
        }
        
        cantidadActividades = document.getElementById('cantidadActiovidades');
        fechaInicio = (document.getElementById('fechaInicioPro')).value;
        fechaInicio = fechaInicio.replace(/-/g, ',');
        console.log(fechaInicio);
        modal.style.top = "-1000px";
        cantidadActiovidades.value++;
        generarTabla(cantidadActiovidades.value);
        generarBtn();
        eventoBoton();
    }
});


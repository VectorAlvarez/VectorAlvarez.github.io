

//NO SIRVE, TIRAR A LA  BASURA DE LOS PROGRAMAS


var desli_palitos, desli_hormigas;
var num_palitos, num_hormigas;
var array_hormigas;
var direcciones, WASD;
var w, filas, columnas;

var pasos, comhor;

function setup(){
	createCanvas(1000, 500);
	frameRate(10);
	//Deslizador para el numero de hormigas
	desli_hormigas = createSlider(1,30,20,1);
	desli_hormigas.position(10,30);
	//Array con el diccionario de las direcciones segun WSAD
	direcciones = [[0,-1],[-1,0],[0,1],[1,0]];
	
	//WASD = [W,A,S,D];
	//Deslizador para el numero de palitos
	desli_palitos = createSlider(2,30,30,1);
	desli_palitos.position(10, 10);
	//Division de las casillas y el calculo de columnas y filas
	w=15;
  	columnas = floor(width/w);
 	filas = floor(height/w);
 	tablero = new Array(columnas);
  	for (var i = 0; i < columnas; i++) {
    	tablero[i] = new Array(filas);
  	}
  	
	iniciacion();

	buttonR = createButton('Reinicio');
  	buttonR.position(10, 60);
  	buttonR.mousePressed(() => {
  		iniciacion();
  	})

	pausa = true
  	buttonP = createButton('Pausa');
  	buttonP.position(10, 90);
  	buttonP.mousePressed(() => {
    	if (pausa) {
    	  pausa = false;
    	  buttonP.html('Continuar');
    	} else {
    	  pausa = true;
    	  buttonP.html('Pausa');
    	}
 	})
}

function draw() {
	if(pausa){
		pasos=0;
		comhor=0;
		comhor2=0;
		background(255);
    	noStroke();

		for (var t = 0; t < num_hormigas; t++) {
			array_hormigas[t].mover();
			if (array_hormigas[t].aquien > 0) {
				array_hormigas[t].quitar(array_hormigas[array_hormigas[t].aquien]);
			}
		}

		fill(128,0,0);
		for (var i = 0; i < columnas; i++) {
   			for (var j = 0; j < filas; j++) {
    			if (tablero[i][j] > 0) {
    				rect(i*w, j*w, w-1, w-1);
    				pasos ++;
    				if (pasos > num_palitos){
    					text(pasos, 200, 200);
    					text(i, 200, 190);
    					text(j, 220, 190);
    					pausa = false;
    				} 
    				if (tablero[i][j] > num_palitos){
    					comhor++;
    				}
    			}
    		}
  		}
  		for (var t = 0; t < num_hormigas; t++) {
  			if (array_hormigas[t].palito > 0) fill(128,0,255); 
			else fill(0,0,255);
			rect(array_hormigas[t].x*w, array_hormigas[t].y*w, w-1, w-1);
		}
		text(pasos, 200, 200);
		text(comhor, 250, 200);
	}
}

function iniciacion(){

	num_hormigas = desli_hormigas.value();
	num_palitos = desli_palitos.value();
	
	array_hormigas = new Array();

	for (var i = 0; i < columnas; i++) {
   		for (var j = 0; j < filas; j++) {
    	  tablero[i][j] = 0;
    	}
  	}

	for (var i = 0; i < num_hormigas; i++) {
		h = new Hormiga(floor(random(columnas)),floor(random(filas)),floor(random(4)), i+1);
		array_hormigas.push(h);
	}
	for (var j = 1; j < num_palitos+1; j++) {
		tablero[floor(random(columnas))][floor(random(filas))] = j;
	}
}

function Hormiga(x,y,d,l){
	this.x = x;
	this.y = y;
	this.d = d;
	this.l = l
	this.palito = 0;
	this.aquien = 0;
	this.mover= function(){
		dm = [this.x + direcciones[this.d][0],this.y + direcciones[this.d][1]];	

		if (this.palito > 0){
			if (tablero[dm[0]][dm[1]] > 0){
				tablero[this.x][this.y] = this.palito - (this.l * num_palitos);
				this.palito = 0;
				while (tablero[dm[0]][dm[1]] > num_palitos){
					var comprobar;
					comprobar = this.d + (floor(random(3))-1);
					if (comprobar == 4) comprobar = 0;
					if (comprobar == -1) comprobar = 3;
					dm = [this.x + direcciones[comprobar][0],this.y + direcciones[comprobar][1]];
				}
			} else {
				tablero[this.x][this.y] = 0;
			}
		} else {
			if (tablero[dm[0]][dm[1]] > 0) {
				var resta = 0;
				while (tablero[dm[0]][dm[1]] > 0){
					resta ++;
					tablero[dm[0]][dm[1]] = tablero[dm[0]][dm[1]]- num_palitos;
				}
				if (resta > 1){
					this.aquien = resta-1;
				}
				this.palito = tablero[dm[0]][dm[1]];
				while (tablero[dm[0]][dm[1]] > num_palitos){
					var comprobar;
					comprobar = this.d + (floor(random(3))-1);
					if (comprobar == 4) comprobar = 0;
					if (comprobar == -1) comprobar = 3;
					dm = [this.x + direcciones[comprobar][0],this.y + direcciones[comprobar][1]];
				}
			}
		}
		this.x = dm[0];
		this.y = dm[1];
		tablero[dm[0]][dm[1]] = this.palito;
		var salir = 1;
		var comprobar;
		while (salir > 0){
			comprobar = this.d + (floor(random(3))-1);
			if (comprobar == 4) comprobar = 0;
			if (comprobar == -1) comprobar = 3;
			if (this.x == 0 || this.y == 0 || this.x == columnas-1 || this.y == filas-1) {
				dm = [this.x+direcciones[comprobar][0],this.y+direcciones[comprobar][1]];
				if (dm[0] > -1 && dm[0] < columnas && dm[1] > -1 && dm[1] < filas) {
					salir = -1;
				}
			} else {
				salir = -1;
			}
		}
		this.d = comprobar	
	}
	this.quitar = function(algo){
		algo.palito = 0;
		this.aquien = 0;
	}
}
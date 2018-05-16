var desli_palitos, desli_hormigas;
var num_palitos, num_hormigas;
var array_hormigas, array_palitos;
var direcciones;
var pausa;
var w, filas, columnas;

function setup(){
	createCanvas(1000, 500);
	//frameRate(10);
	//Deslizador para el numero de hormigas
	desli_hormigas = createSlider(20,50,30,1);
	desli_hormigas.position(10,30);
	//Array con las direcciones
	direcciones = [[0,-1],[-1,0],[0,1],[1,0]];
	//Deslizador para el numero de palitos
	desli_palitos = createSlider(20,50,30,1);
	desli_palitos.position(10, 10);
	//Division de las casillas y el calculo de columnas y filas
	w=20;
  	columnas = floor(width/w);
 	filas = floor(height/w);
  	//Inicializar el programa con la pausa desactivada
	iniciacion();
	pausa = true
	//Botones de reinicio del programa y pausa
	buttonR = createButton('Reinicio');
  	buttonR.position(10, 60);
  	buttonR.mousePressed(() => {
  		iniciacion();
  	})
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
	//Si la pausa esta desactivada
	if(pausa){
		background(255);
    	noStroke();
    	//Movemos todas las hormigas
		for (var t = 0; t < num_hormigas; t++) {
			array_hormigas[t].mover();
		}
		//Pitamos de rojo oscuro todos los palos
		fill(128,0,0);
		for (var i = 1; i < num_palitos+1; i++) {
			rect(array_palitos[i][0]*w, array_palitos[i][1]*w, w-1, w-1);
   		}
   		//Pintamos de morado las horigas con palo y azules las hormigas sin palo
  		for (var j = 0; j < num_hormigas; j++) {
  			if (array_hormigas[j].palito > 0) fill(128,0,255); 
			else fill(0,0,255);
			rect(array_hormigas[j].x*w, array_hormigas[j].y*w, w-1, w-1);
		}
		//Mostramos el numero de los deslizadores
		fill(0);
		text("Numero de palitos:", desli_hormigas.x * 2 + desli_hormigas.width, 25);
		text("Numero de hormigas:", desli_palitos.x * 2 + desli_palitos.width, 45);
		text(desli_palitos.value(), desli_palitos.x * 2 + desli_palitos.width + 115, 25);
		text(desli_hormigas.value(), desli_hormigas.x * 2 + desli_hormigas.width + 132, 45);
	}
}
//FUNCION PARA INICIAR CON POSICIONES ALEATORIAS
function iniciacion(){
	//Asignamos el valor de los deslizadores a variables
	num_hormigas = desli_hormigas.value();
	num_palitos = desli_palitos.value();
	//Creamos dos arrays, uno para las hormigas y otro para los palos
	array_hormigas = new Array();
	array_palitos = new Array();
	//Añadimos al array de los palos tantos palos como la variable num_palitos+1
	//El primer elemento del array (la posicion 0) va a ser un elemento fantasma
	for (var j = 0; j < num_palitos+1; j++) {
		p = [floor(random(columnas)),floor(random(filas))];
		array_palitos.push(p);
	}
	//Añadimos al array de las hormigas tantos objetos Hormiga como la variable num_hormigas
	for (var i = 0; i < num_hormigas; i++) {
		//Asignamos una posicion y direccion aleatoria
		h = new Hormiga(floor(random(columnas)),floor(random(filas)),floor(random(4)));
		array_hormigas.push(h);
	}
}
//OBJETO HORMIGA
function Hormiga(x,y,d){
	//Asignamos la posicion y direccion dada
	this.x = x;
	this.y = y;
	this.d = d;
	//Al inicio ninguna hormiga tiene un palito asignado
	this.palito = 0;
	//Función que moverá a las hormigas
	this.mover= function(){
		//Calculo del siguiente sitio de la hormiga
		dm = [this.x + direcciones[this.d][0],this.y + direcciones[this.d][1]];
		//Si la hormiga tiene un palito
		if (this.palito > 0){
			//Comprobamos todos los palitos que van desde la posicion 1 a la num_palitos
			for (var u = 1; u < num_palitos+1; u++){
				//Vemos si alguno está en la posicion del siguente movimiento
				if (dm[0] == array_palitos[u][0] && dm[1] == array_palitos[u][1]) {
					//Comprovamos todas las hormigas
					for (var v = 0; v < num_hormigas; v++){
						//Si alguna hormiga tiene ese palo lo suelta
						if (array_hormigas[v].palito == u) array_hormigas[v].palito = 0;
					}
					//La hormiga suelta su palo
					this.palito = 0;
				}
			}
			//Se mueve el palo cojido (que puede ser el palo fantasma)
			array_palitos[this.palito] = dm;
		} else { //Si la hormiga no tiene un palo
			//Comprobamos todos los palitos que van desde la posicion 1 a la num_palitos
			for (var u = 1; u < num_palitos+1; u++){
				//Vemos si alguno está en la posicion del siguente movimiento
				if (dm[0] == array_palitos[u][0] && dm[1] == array_palitos[u][1]){
					//Comprobamos si alguna otra hormiga tiene ese palo
					for (var v = 0; v < num_hormigas; v++){
						//Si hay alguna, lo suelta
						if (array_hormigas[v].palito == u) array_hormigas[v].palito = 0;
					}
					//La hormiga coje el palo
					this.palito = u;
				}
			}
		}
		//Movemos la hormiga al siguiente sitio
		this.x = dm[0];
		this.y = dm[1];
		//Calculamos la siguiente direccion
		//Comprobamos que no se sale la hormiga
		//Variables para verificar la no salida
		var salir = 1;
		var comprobar;
		//Mientras se salga
		while (salir > 0){
			//Comprobamos una hipotetica direccion
			comprobar = this.d + (floor(random(3))-1);
			if (comprobar == 4) comprobar = 0;
			if (comprobar == -1) comprobar = 3;
			//Si la hormiga esta en el borde
			if (this.x == 0 || this.y == 0 || this.x == columnas-1 || this.y == filas-1) {
				//Calculamos la siguiente dirección y conprobamos que no se sale
				dm = [this.x+direcciones[comprobar][0],this.y+direcciones[comprobar][1]];
				if (dm[0] > -1 && dm[0] < columnas && dm[1] > -1 && dm[1] < filas) {
					salir = -1;
				}
			} else { //Si la hormiga no esta en el borde no se sale
				salir = -1;
			}
		}
		//Asignamos la nueva direccion
		this.d = comprobar	
	}
}
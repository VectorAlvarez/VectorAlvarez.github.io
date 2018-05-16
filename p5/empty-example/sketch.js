var w;         //Variable para dividir el tablero
var columnas;  //Columnas del tablero
var filas;     //Filas del tablero
var tablero;   //Tablero
var hormiga;   //Direccion del movimiento
var lugar;     //Sitio donde estamos del tablero
var direccion; //Hacia donde gira la homiga dependiendo del lugar que este
var tamdir;    //Tamaño del array direccion
var colores;   //Colores que puede tener el tablero
var buttomD;   //Boton para añadir "Derecha" al array "direccion"
var buttonI;   //Boton para añadir "Izquierda" al array "direccion"
var buttonE;   //Boton para empezar a mover la hormiga y pausar
var buttonSN;  //Boton para determinas las impresionas de pantallas
var empezar;   //Determina si se mueve o no la hormiga
var pasos;     //Cantidad de iteraciones

function setup() {
  createCanvas(windowWidth, windowHeight);   //Tamaño del lienzo
  w = 10;                    //Division en casillas de tamaño w
  //Lista de todos los colores disponibles
  colores = ['#000000','#FFFFFF','#0000FF','#00FF00','#FF0000','#00FFFF','#FF00FF','#FFFF00'];
  empezar = false           //La hormiga no se mueve desde el principio
  // Calcular columnas y filas
  columnas = floor(width/w);
  filas = floor(height/w);
  direccion = new Array();  //Array para las direcciones
  //Boton para añadir a "direccion" "D"
  buttonD = createButton('Derecha');
  buttonD.position(10, 10); 
  buttonD.mousePressed(() => {
  	direccion.push('D');
  });
  //Boton para añadir a "direccion" "I"
  buttonI = createButton('Izquierda');
  buttonI.position(100, 10);
  buttonI.mousePressed(() => {
  	direccion.push('I');
  });
  //Boton para empezar a moverse la hormiga y pausarla
  buttonE = createButton('Empezar');
  buttonE.position(10, 43);
  buttonE.mousePressed(() => {
    if (empezar) {
      empezar = false;
      buttonE.html('Continuar');
    } else {
      empezar = true;
      buttonE.html('Pausa');
    }
  });

  // Boton de las impresionas de pantalla
  isisi = false
  buttonSN = createButton('No');
  buttonSN.position(10, 76);
  buttonSN.mousePressed(() => {
    if (isisi) {
      isisi = false;
      buttonSN.html('No');
    } else {
      isisi = true;
      buttonSN.html('Si');
    }
  });
  
  // El tablero donde se moverá la hormiga
  tablero = new Array(columnas);
  for (var i = 0; i < columnas; i++) {
    tablero[i] = new Array(filas);
  }
  //Inizializamos el tablero en blanco
  for (var i = 0; i < columnas; i++) {
    for (var j = 0; j < filas; j++) {
      tablero[i][j] = 1;
    }
  }
  //Elegimos la direccion y lugar de la hormiga inicial
  hormiga = [0,-1];
  lugar = [floor(width/(2*w)),floor(height/(2*w))];
  //Pintamos el tablero de blanco
  for ( var i = 0; i < columnas;i++) {
    for ( var j = 0; j < filas;j++) {
      fill(255); 
      stroke(255);
      rect(i*w, j*w, w-1, w-1);
    }
  }
  //Elegimos el tamaño del texto
  textSize(15);
  //Inicializamos los pasos a 0
  pasos = 0;
}

function draw() {
  //Guardamos el tamaño del array direccion
  tamdir = direccion.length;
  //Mostramos los elementos del array direccion
  fill(0);
  noStroke();
  text(direccion, 200,29);
  //fill(0);
  //rect(200,200);
  //fill(0);
  //text(pasos, 200,200);
  //Movimiento de la hormiga con la correspondiente pintada del tablero
  if (empezar) {
  	mover();
    fill(colores[tablero[lugar[0]][lugar[1]]]);
    stroke(colores[tablero[lugar[0]][lugar[1]]]);
    rect(lugar[0]*w, lugar[1]*w, w-1, w-1);
    pasos += 1
  }
  if ((pasos >= 30000) && (lugar[0] === floor(width/(2*w))) && (lugar[1] === floor(height/(2*w))) && empezar === true) {
  	saveCanvas('myCanvas', 'jpg');
  	empezar = false;
  	buttonE.html('Continuar');
  	if (isisi) pasos=15000;
  } 
}

// El movimiento de la hormiguita
function mover() {
	//Desplazamiento de la hormiga
	lugar[0] += hormiga[0];
	lugar[1] += hormiga[1];
	//El tablero se comporta como un toro
	if ((lugar[0] >= columnas)) lugar[0] = 0;
	if ((lugar[1] >= filas)) lugar[1] = 0;
	if ((lugar[0] < 0)) lugar[0] = columnas - 1;
	if ((lugar[1] < 0)) lugar[1] = filas - 1;
	//Girar a derecha o izquierda dependiendo de la casilla donde este la hormiga
	if ((direccion[tablero[lugar[0]][lugar[1]]] === 'D')) {  //Derecha
		if      ((hormiga[0] < 0)) hormiga = [0,1];
		else if ((hormiga[0] > 0)) hormiga = [0,-1];
		else if ((hormiga[1] < 0)) hormiga = [-1,0];
		else                       hormiga = [1,0];
	} else {                                                 //Izquierda
		if      ((hormiga[0] < 0)) hormiga = [0,-1];
		else if ((hormiga[0] > 0)) hormiga = [0,1];
		else if ((hormiga[1] < 0)) hormiga = [1,0];
		else                       hormiga = [-1,0];
	}
	//Cambiar el color de la casilla del tablero
	tablero[lugar[0]][lugar[1]] += 1;
	if ((tablero[lugar[0]][lugar[1]] == tamdir)) tablero[lugar[0]][lugar[1]] = 0;
}


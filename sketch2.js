var w;
var columnas;
var filas;
var tablero;
var hormiga;
var lugar;
var direccion;
var tamdir;
var coloresR;
var coloresV;
var coloresA;
var coloresAm;
var coloresRa;
var escala;
var buttomD;
var buttonI;
var buttonE;
var empezar;
var oscguapo;

function setup() {
  createCanvas(720, 400);
  frameRate(5);
  w = 5;
  coloresR = ['#FFFFFF','#FFBFBF','#FF7F7F','#FF4040','#FF0000','#BF0000','#7F0000','#400000'];
  coloresV = ['#FFFFFF','#BFFFBF','#7FFF7F','#40FF40','#00FF00','#00BF00','#007F00','#004000'];
  coloresA = ['#FFFFFF','#BFBFFF','#7F7FFF','#4040FF','#0000FF','#0000BF','#00007F','#000040'];
  coloresAm = ['#FFFFFF','#FFFFBF','#FFFF7F','#FFFF40','#FFFF00','#BFBF00','#7F7F00','#404000'];
  coloresRa = ['#FFFFFF','#FFBFFF','#FF7FFF','#FF40FF','#FF00FF','#BF00BF','#7F007F','#400040'];
  escala = [0, 110.000, 146.832, 195.998, 261.262, 349.228, 246.922, 444.000];
  empezar = false;
  // Calcular columnas y filas
  columnas = floor(width/w);
  filas = floor(height/w);
  direccion = new Array();

  buttonD = createButton('Derecha');
  buttonD.position(10, 10);
  buttonD.mousePressed(() => {
  	direccion.push('D');
  });

  buttonI = createButton('Izquierda');
  buttonI.position(100, 10);
  buttonI.mousePressed(() => {
  	direccion.push('I');
  });
  
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
  
  // El tablero donde se moverá la hormiga
  tablero = new Array(columnas);
  for (var i = 0; i < columnas; i++) {
    tablero[i] = new Array(filas);
  }
  for (var i = 0; i < columnas; i++) {
    for (var j = 0; j < filas; j++) {
      tablero[i][j] = 0;
    }
  }
  
  hormiga = [0,-1];
  lugar = [floor(width/(2*w)),floor(height/(2*w))];

  for ( var i = 0; i < columnas;i++) {
    for ( var j = 0; j < filas;j++) {
      fill(255); 
      stroke(255);
      rect(i*w, j*w, w-1, w-1);
    }
  }

  textSize(15);

  oscguapo = new p5.Oscillator();
  oscguapo.setType('sine');
  //oscguapo.amp(0.5,0.5);
  oscguapo.start();
}

function draw() {
  tamdir = direccion.length;
  fill(0);
  noStroke();
  text(direccion, 200,29);
  if (empezar) {
  	mover();
    fill(coloresV[tablero[lugar[0]][lugar[1]]]);
    stroke(coloresV[tablero[lugar[0]][lugar[1]]]);
    rect(lugar[0]*w, lugar[1]*w, w-1, w-1);
    oscguapo.freq(escala[tablero[lugar[0]][lugar[1]]]);
  } else oscguapo.freq(0);
}

// El movimiento de la hormiguita
function mover() {
	lugar[0] += hormiga[0];
	lugar[1] += hormiga[1];
	if ((lugar[0] >= columnas)) lugar[0] = 0;
	if ((lugar[1] >= filas)) lugar[1] = 0;
	if ((lugar[0] < 0)) lugar[0] = columnas - 1;
	if ((lugar[1] < 0)) lugar[1] = filas - 1;
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
	tablero[lugar[0]][lugar[1]] += 1;
	if ((tablero[lugar[0]][lugar[1]] == tamdir)) tablero[lugar[0]][lugar[1]] = 0;
}


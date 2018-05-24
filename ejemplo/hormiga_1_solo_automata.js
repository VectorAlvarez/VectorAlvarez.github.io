//Objteto Hormiga, posicion x, y - dirección x-y, ratio musical (negra, corchea...),
//escala musical, co=algoritmo, mute

function Hormiga (x,y,dx,dy,r,es,pa,co,mu){
  this.posicionX=x;
  this.posicionY=y;
  this.direccionX=dx;
  this.direccionY=dy;
  this.ratio=r;
  this.escala=es;
  this.paleta=pa;
  this.codigo=co;
  this.mute=mu 

}


//Objeto Tablero, w=ancho, h=alto y p=tamaño de paso, toto en px
function Tablero (w,h,p){
  //Calculamos columnas y filas
  this.columnas=floor(w/p);
  this.filas=floor(h/p);
   //Creamos la retícula donde se moverá la hormiga
  this.reticula = new Array(this.columnas);
  for (var i = 0; i < this.columnas; i++) {
    this.reticula[i] = new Array(this.filas);
  }
  for (var i = 0; i < this.columnas; i++) {
    for (var j = 0; j < this.filas; j++) {
      this.reticula[i][j] = 0;
    }
  }

}

//Variables Globales
var n; //número de hormigas
var frameRate; //frame por segundo del programa
var pasoPixel; //paso de pixel del tablero
var BPM; // BPM global de ejecución
var buttomD; // Botón para introducir código
var buttonI; // Botón para introducir código
var buttonE; // Botón para empezar/pausar
var oscguapo; //Oscilador
var empezar;
var ancho; //ancho de cada tablero
var alto; //alto de cada tablero

h= new Array; //array de hormigas
t= new Array; //array de tableros


//Declaraciones
n=1;
pasoPixel=5;
ancho=400;
alto=400;
empezar=false;



//Escalas
 basica = [0, 110.000, 146.832, 195.998, 261.262, 349.228, 246.922, 444.000];

 //Paleta
  coloresR = ['#FFFFFF','#FFBFBF','#FF7F7F','#FF4040','#FF0000','#BF0000','#7F0000','#400000'];
  coloresV = ['#FFFFFF','#BFFFBF','#7FFF7F','#40FF40','#00FF00','#00BF00','#007F00','#004000'];
  coloresA = ['#FFFFFF','#BFBFFF','#7F7FFF','#4040FF','#0000FF','#0000BF','#00007F','#000040'];
  coloresAm = ['#FFFFFF','#FFFFBF','#FFFF7F','#FFFF40','#FFFF00','#BFBF00','#7F7F00','#404000'];
  coloresRa = ['#FFFFFF','#FFBFFF','#FF7FFF','#FF40FF','#FF00FF','#BF00BF','#7F007F','#400040'];

 

function setup() {
  frameRate (1200);
  createCanvas(ancho,alto);
  for (var i=1; i<=n; i++){
     h[i]= new Hormiga (floor(ancho/(2*pasoPixel)),floor(alto/(2*pasoPixel)),0,-1,1,basica,coloresV);
     t[i]= new Tablero (ancho,alto,pasoPixel);
  }

  //todo esto de los botones y pintar el tablero base
  //habrá que hacerlo en loop hasta n
  h[1].codigo=new Array;
  
  buttonD = createButton('Derecha');
  buttonD.position(10, 10);
  buttonD.mousePressed(() => {
    h[1].codigo.push('D');
  });

  buttonI = createButton('Izquierda');
  buttonI.position(100, 10);
  buttonI.mousePressed(() => {
    h[1].codigo.push('I');
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
  for ( var i = 0; i < t[1].columnas;i++) {
   for ( var j = 0; j < t[1].filas;j++) {
     fill(255); 
     stroke(255);
     rect(i*pasoPixel, j*pasoPixel, pasoPixel-1, pasoPixel-1);
    }
  }

 textSize(15);
   oscguapo = new p5.Oscillator();
  oscguapo.setType('triangle');
  //oscguapo.amp(0.5,0.5);
  oscguapo.start();

}

//ojo, empezar tiene que ser de cada hormiga?

function draw() {
  for (var i=1; i<=n; i++){
  tamdir = h[i].codigo.length;
  fill(0);
  noStroke();
  text(h[i].codigo, 200,29);
  if (empezar) {
    mover();
    fill(h[i].paleta[t[i].reticula[h[i].posicionX][h[i].posicionY]]);
    stroke(h[i].paleta[t[i].reticula[h[i].posicionX][h[i].posicionY]]);
    rect(h[i].posicionX*pasoPixel, h[i].posicionY*pasoPixel, pasoPixel-1, pasoPixel-1);
    oscguapo.freq(h[i].escala[t[i].reticula[h[i].posicionX][h[i].posicionY]]);
  } else oscguapo.freq(0);
}

// El movimiento de la hormiguita
function mover() {
  //falta bucle
  for (var i=1; i<=n; i++){
  h[i].posicionX += h[i].direccionX;
  h[i].posicionY += h[i].direccionY;
  if ((h[i].posicionX >= t[i].columnas)) h[i].posicionX = 0;
  if ((h[i].posicionY >= t[i].filas)) h[i].posicionY = 0;
  if ((h[i].posicionX < 0)) h[i].posicionX = t[i].columnas - 1;
  if ((h[i].posicionY < 0)) h[i].posicionY = t[i].filas - 1;
  if ((h[i].codigo[t[i].reticula[h[i].posicionX][h[i].posicionY]] === 'D')) {  //Derecha
    if      ((h[i].direccionX < 0)) {h[i].direccionX=0; h[i].direccionY=1}
    else if ((h[i].direccionX > 0)) {h[i].direccionX=0; h[i].direccionY=-1}
    else if ((h[i].direccionY < 0)) {h[i].direccionX=-1; h[i].direccionY=0}
    else                       {h[i].direccionX=1; h[i].direccionY=0};
  }
  else {                                                 //Izquierda
    if      ((h[i].direccionX  < 0)) {h[i].direccionX=0; h[i].direccionY=-1}
    else if ((h[i].direccionX  > 0)) {h[i].direccionX=0; h[i].direccionY=1}
    else if ((h[i].direccionY < 0)) {h[i].direccionX=1; h[i].direccionY=0}
    else                       {h[i].direccionX=-1; h[i].direccionY=0};
  }
  t[i].reticula[h[i].posicionX][h[i].posicionY] += 1;
  if ((t[i].reticula[h[i].posicionX][h[i].posicionY] == tamdir)) t[i].reticula[h[i].posicionX][h[i].posicionY] = 0;
}
}
}


/*
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
  frameRate(1200);
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
  oscguapo.setType('triangle');
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

*/
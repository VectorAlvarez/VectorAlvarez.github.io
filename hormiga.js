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

var buttomD1; // Botón para introducir código
var buttonI1; // Botón para introducir código
var buttonE1; // Botón para empezar/pausar
var buttomD2; // Botón para introducir código
var buttonI2; // Botón para introducir código
var buttonE2; // Botón para empezar/pausar
var buttomD3; // Botón para introducir código
var buttonI3; // Botón para introducir código
var buttonE3; // Botón para empezar/pausar
var buttomD4; // Botón para introducir código
var buttonI4; // Botón para introducir código
var buttonE4; // Botón para empezar/pausar

var oscguapo; //Oscilador
//var empezar;
var ancho; //ancho de cada tablero
var alto; //alto de cada tablero
// var tg; //tablero gráfico, el "lienzo" de cada tablero
var FiltSlider;
var dropdownRatio1;
var ataque;



h= new Array; //array de hormigas
t= new Array; //array de tableros
tg= new Array; //array de 'lienzos'
oscguapo= new Array; //array de osciladores
empezar=new Array;
//env=new p5.Env();
//buttonD= new Array;
//buttonI= new Array;
//buttonE= new Array;

//Declaraciones
n=4;
pasoPixel=5;
ancho=400;
alto=400;
for (var i=1; i<=n; i++){
empezar[i]=false; 
}




//Escalas
 basica = [0, 110.000, 146.832, 195.998, 261.262, 349.228, 246.922, 444.000];

 //Paleta
  coloresR = ['#FFFFFF','#FFBFBF','#FF7F7F','#FF4040','#FF0000','#BF0000','#7F0000','#400000'];
  coloresV = ['#FFFFFF','#BFFFBF','#7FFF7F','#40FF40','#00FF00','#00BF00','#007F00','#004000'];
  coloresA = ['#FFFFFF','#BFBFFF','#7F7FFF','#4040FF','#0000FF','#0000BF','#00007F','#000040'];
  coloresAm = ['#FFFFFF','#FFFFBF','#FFFF7F','#FFFF40','#FFFF00','#BFBF00','#7F7F00','#404000'];
  coloresRa = ['#FFFFFF','#FFBFFF','#FF7FFF','#FF40FF','#FF00FF','#BF00BF','#7F007F','#400040'];

 

function setup() {
  frameRate (20);
  createCanvas(900,900);
  for (var i=1; i<=n; i++){
     h[i]= new Hormiga (floor(ancho/(2*pasoPixel)),floor(alto/(2*pasoPixel)),0,-1,8,basica,coloresV);
     t[i]= new Tablero (ancho,alto,pasoPixel);
     tg[i]=createGraphics(ancho,alto);
     tg[i].background(240);
  }

  //todo esto de los botones y pintar el tablero base
  //habrá que hacerlo en loop hasta n
  for (var i=1; i<=n; i++){
  h[i].codigo= new Array;
  }
  
  //Botones, lo hacemos isn loop, porque creo que con el setup no furula bien lo de los botones

  //PRIMER BOTON

  buttonD1 = createButton('Derecha');
  buttonD1.position(10, 500+10);
  buttonD1.mousePressed(() => {
    h[1].codigo.push('D');
  });

  buttonI1 = createButton('Izquierda');
  buttonI1.position(100, 500+10);
  buttonI1.mousePressed(() => {
    h[1].codigo.push('I');
  });
  
  buttonE1 = createButton('Empezar');
  buttonE1.position(10, 600 + 10);
  buttonE1.mousePressed(() => {
    if (empezar[1]) {
      empezar[1] = false;
      buttonE1.html('Continuar');
      //h[1].codigo=[];
    } else {
      empezar[1] = true;
      buttonE1.html('Pausa');
    }
  });


  //SEGUNDO BOTON

  buttonD2 = createButton('Derecha');
  buttonD2.position(10, 500+30);
  buttonD2.mousePressed(() => {
    h[2].codigo.push('D');
  });

  buttonI2 = createButton('Izquierda');
  buttonI2.position(100, 500+30);
  buttonI2.mousePressed(() => {
    h[2].codigo.push('I');
  });
  
  buttonE2 = createButton('Empezar');
  buttonE2.position(10, 600 + 30);
  buttonE2.mousePressed(() => {
    if (empezar[2]) {
      empezar[2] = false;
      buttonE2.html('Continuar');
      //h[2].codigo=[];
    } else {
      empezar[2] = true;
      buttonE2.html('Pausa');
    }
  }); 


  
  //TERCER BOTON

  buttonD3 = createButton('Derecha');
  buttonD3.position(10, 500+60);
  buttonD3.mousePressed(() => {
    h[3].codigo.push('D');
  });

  buttonI3 = createButton('Izquierda');
  buttonI3.position(100, 500+60);
  buttonI3.mousePressed(() => {
    h[3].codigo.push('I');
  });
  
  buttonE3 = createButton('Empezar');
  buttonE3.position(10, 600 + 60);
  buttonE3.mousePressed(() => {
    if (empezar[3]) {
      empezar[3] = false;
      buttonE3.html('Continuar');
      //h[3].codigo=[];
    } else {
      empezar[3] = true;
      buttonE3.html('Pausa');
    }
  });


  //CUARTO BOTON

  buttonD4 = createButton('Derecha');
  buttonD4.position(10, 500+90);
  buttonD4.mousePressed(() => {
    h[4].codigo.push('D');
  });

  buttonI4 = createButton('Izquierda');
  buttonI4.position(100, 500+90);
  buttonI4.mousePressed(() => {
    h[4].codigo.push('I');
  });
  
  buttonE4 = createButton('Empezar');
  buttonE4.position(10, 600 + 90);
  buttonE4.mousePressed(() => {
    if (empezar[4]) {
      empezar[4] = false;
      buttonE4.html('Continuar');
      //h[4].codigo=[];
    } else {
      empezar[4] = true;
      buttonE4.html('Pausa');
    }
  });


//SLIDER PARA MODULAR
//  FiltSlider=createSlider(0,255,100);
//  FiltSlider.position (10,720);
  
  
  
  

//DROPDOWN RATIO
  dropdownRatio1 = createSelect();
  dropdownRatio1.position (10,740);
  dropdownRatio1.option(1);
  dropdownRatio1.option(2);
  dropdownRatio1.option(3);
  dropdownRatio1.option(4);
  dropdownRatio1.option(6);
  dropdownRatio1.option(8);
  dropdownRatio1.option(9);
  dropdownRatio1.option(12);
  dropdownRatio1.option(15);
  dropdownRatio1.option(16);
  dropdownRatio1.option(18);
  dropdownRatio1.changed(mySelectRatio);

  function mySelectRatio () {
    h[1].ratio=dropdownRatio1.value();
  }


  //pintamos de blanco (creo) el tablero

  for ( var k = 1; k <=n; k++){
    for ( var i = 0; i < t[k].columnas;i++) {
      for ( var j = 0; j < t[k].filas;j++) {
        fill(255); 
        stroke(255);
        //tg[k].rect(i*pasoPixel, j*pasoPixel, pasoPixel-1, pasoPixel-1);
      }
    }
  }  
 textSize(15);
  
  for (var i=1;i<=n;i++){
  oscguapo[i] = new p5.Oscillator();
  oscguapo[i].setType('triangle');
  //oscguapo.amp(0.5,0.5);
  oscguapo[i].start();
  oscguapo[i].pan(-1+2*(i-1)/(n-1))
  
  }

}

//ojo, empezar tiene que ser de cada hormiga?

function draw() {
  image (tg[1],50,50);
  image (tg[2],500,50);
  image (tg[3],50,500);
  image (tg[4],500,500);


//ataque=((FiltSlider.value())/2550);
//env.setADSR(ataque,0,0,0);
//env.setRange(1,0); 
//oscguapo[1].amp(env);

  for (var i=1; i<=n; i++){
  tamdir = h[i].codigo.length;
  fill(0);
  noStroke();
  text(h[i].codigo, 200,29);
  if (empezar[i] && frameCount%h[i].ratio==0) {
    mover(i);
    tg[i].fill(h[i].paleta[t[i].reticula[h[i].posicionX][h[i].posicionY]]);
    tg[i].stroke(h[i].paleta[t[i].reticula[h[i].posicionX][h[i].posicionY]]);
    tg[i].rect(h[i].posicionX*pasoPixel, h[i].posicionY*pasoPixel, pasoPixel-1, pasoPixel-1);
   
    oscguapo[i].freq(h[i].escala[t[i].reticula[h[i].posicionX][h[i].posicionY]]);
   // env.play(oscguapo[1]);
    
  } else oscguapo[i].freq(0);
}

// El movimiento de la hormiguita
function mover(i) {
  //falta bucle

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
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
var buttonReset //Botón reset

var oscguapo; //Oscilador
//var empezar;
var ancho; //ancho de cada tablero
var alto; //alto de cada tablero
// var tg; //tablero gráfico, el "lienzo" de cada tablero
var FiltSlider;
var dropdownRatio1;
var dropdownEscala1;
var dropdownRatio2;
var dropdownEscala2;
var dropdownRatio3;
var dropdownEscala3;
var dropdownRatio4;
var dropdownEscala4;
var dropdownOCT2;
var dropdownOCT3;
var dropdowntempo;
var ataque;

var forma1;
var forma2;
var forma3;
var forma4;




h= new Array; //array de hormigas
t= new Array; //array de tableros
tg= new Array; //array de 'lienzos'
ch= new Array // array de 'lienzos' de controladores
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
 blues = [0, 220.000, 195.998, 261.626, 293.665,311.127, 329.628, 391.995];
 simetrica = [0, 220.000, 246.942, 277.183, 311.127, 349.228, 391.995, 444.000];
 exotica= [0, 293.665, 329.628, 349.228, 415.305, 444.000, 493.883, 523.251 ]
 //Paleta
  coloresR = ['#FFFFFF','#FFBFBF','#FF7F7F','#FF4040','#FF0000','#BF0000','#7F0000','#400000'];
  coloresV = ['#FFFFFF','#BFFFBF','#7FFF7F','#40FF40','#00FF00','#00BF00','#007F00','#004000'];
  coloresA = ['#FFFFFF','#BFBFFF','#7F7FFF','#4040FF','#0000FF','#0000BF','#00007F','#000040'];
  coloresAm = ['#FFFFFF','#FFFFBF','#FFFF7F','#FFFF40','#FFFF00','#BFBF00','#7F7F00','#404000'];
  coloresRa = ['#FFFFFF','#FFBFFF','#FF7FFF','#FF40FF','#FF00FF','#BF00BF','#7F007F','#400040'];

 

function setup() {
  frameRate (20);
  createCanvas(1200,1500);
  for (var i=1; i<=n; i++){
     h[i]= new Hormiga (floor(ancho/(2*pasoPixel)),floor(alto/(2*pasoPixel)),0,-1,8,basica,coloresV);
     t[i]= new Tablero (ancho,alto,pasoPixel);
     tg[i]=createGraphics(ancho,alto);
     tg[i].background(240);
     ch[i]=createGraphics(ancho/2,alto/2);
     empezar[i]=false;
  }

  //todo esto de los botones y pintar el tablero base
  //habrá que hacerlo en loop hasta n
  for (var i=1; i<=n; i++){
  h[i].codigo= new Array;
  }
  
  //Botones, lo hacemos isn loop, porque creo que con el setup no furula bien lo de los botones

  //PRIMER BOTON

  buttonD1 = createButton('DE');
  buttonD1.position(55, 855);
  buttonD1.mouseClicked(() => {
    h[1].codigo.push('D');
  });

  buttonI1 = createButton('IZ');
  buttonI1.position(105, 855);
  buttonI1.mouseClicked(() => {
    h[1].codigo.push('I');
  });
  
  buttonE1 = createButton('Empezar');
  buttonE1.position(155,855 );
  buttonE1.mouseClicked(() => {
    if (empezar[1]) {
      empezar[1] = false;
      buttonE1.html('Continuar');
      //h[1].codigo=[];
    } else {
      empezar[1] = true;
      buttonE1.html('Pausa');
    }
  });

  // PANEL CONTROL HORMIGA 1
  ch[1].background('#7FFF7F'); 
  image (ch[1],50,850); 

  //SEGUNDO BOTON

  buttonD2 = createButton('DE');
  buttonD2.position(275, 855);
  buttonD2.mouseClicked(() => {
    h[2].codigo.push('D');
  });

  buttonI2 = createButton('IZ');
  buttonI2.position(325, 855);
  buttonI2.mouseClicked(() => {
    h[2].codigo.push('I');
  });
  
  buttonE2 = createButton('Empezar');
  buttonE2.position(375, 855);
  buttonE2.mouseClicked(() => {
    if (empezar[2]) {
      empezar[2] = false;
      buttonE2.html('Continuar');
      //h[2].codigo=[];
    } else {
      empezar[2] = true;
      buttonE2.html('Pausa');
    }
  }); 

  //CONTROL HORMIGA 2
  ch[2].background('#FF7F7F'); 
  image (ch[2],270,850); 

 
  //TERCER BOTON

  buttonD3 = createButton('DE');
  buttonD3.position(495, 855);
  buttonD3.mouseClicked(() => {
    h[3].codigo.push('D');
  });

  buttonI3 = createButton('IZ');
  buttonI3.position(545, 855);
  buttonI3.mouseClicked(() => {
    h[3].codigo.push('I');
  });
  
  buttonE3 = createButton('Empezar');
  buttonE3.position(595, 855);
  buttonE3.mouseClicked(() => {
    if (empezar[3]) {
      empezar[3] = false;
      buttonE3.html('Continuar');
      //h[3].codigo=[];
    } else {
      empezar[3] = true;
      buttonE3.html('Pausa');
    }
  });


  //CONTROL HORMIGA 3
  ch[3].background('#7F7FFF'); 
  image (ch[3],490,850); 

  //CUARTO BOTON

  buttonD4 = createButton('DE');
  buttonD4.position(715, 855 );
  buttonD4.mouseClicked(() => {
    h[4].codigo.push('D');
  });

  buttonI4 = createButton('IZ');
  buttonI4.position(765, 855);
  buttonI4.mouseClicked(() => {
    h[4].codigo.push('I');
  });
  
  buttonE4 = createButton('Empezar');
  buttonE4.position(815, 855);
  buttonE4.mouseClicked(() => {
    if (empezar[4]) {
      empezar[4] = false;
      buttonE4.html('Continuar');
      //h[4].codigo=[];
    } else {
      empezar[4] = true;
      buttonE4.html('Pausa');
    }
  });

  //CONTROL HORMIGA 4
  ch[4].background('#FF7FFF'); 
  image (ch[4],710,850); 

//SLIDER PARA MODULAR
//  FiltSlider=createSlider(0,255,100);
//  FiltSlider.position (10,720);  
  
  
  

//DROPDOWN RATIO 1
  dropdownRatio1 = createSelect();
  dropdownRatio1.position (55,900);
  dropdownRatio1.option(1);
  dropdownRatio1.option(2);
  dropdownRatio1.option(3);
  dropdownRatio1.option(4);
  dropdownRatio1.option(6);
  dropdownRatio1.option(8);
  dropdownRatio1.option(9);
  dropdownRatio1.option(10);
  dropdownRatio1.option(12);
  dropdownRatio1.option(14);
  dropdownRatio1.option(15);
  dropdownRatio1.option(16);
  dropdownRatio1.option(18);
  dropdownRatio1.changed(mySelectRatio1);

  function mySelectRatio1 () {
    h[1].ratio=dropdownRatio1.value();
  }

//DROPDOWN ESCALA 1
  dropdownEscala1 = createSelect();
  dropdownEscala1.position (115,900);
  dropdownEscala1.option("basica");
  dropdownEscala1.option("blues");
  dropdownEscala1.option("simetrica");
  dropdownEscala1.option("exotica");
  dropdownEscala1.changed(mySelectEscala1);

  function mySelectEscala1 () {
    switch(dropdownEscala1.value()){
      case "basica":
      h[1].escala=basica;
      break;
      case "blues":
      h[1].escala=blues;
      break;
      case "simetrica":
      h[1].escala=simetrica;
      break;
      case "exotica":
      h[1].escala=exotica;
      break;

    }
    
  }

  //FORMA OSCILADOR 1
  dropdownOSC1 = createSelect();
  dropdownOSC1.position (55,940);
  dropdownOSC1.option("TR");
  dropdownOSC1.option("SQ");
  dropdownOSC1.option("SW");
  dropdownOSC1.option("SN");
  dropdownOSC1.changed(mySelectOSC1);  

  function mySelectOSC1 () {

    switch (dropdownOSC1.value()){
      case "TR":
      oscguapo[1].setType('triangle');
      break;
      case "SQ":
      oscguapo[1].setType('square');
      break;
      case "SW":
      oscguapo[1].setType('sawtooth');
      break;
      case "SN":
      oscguapo[1].setType('sine');
      break;


    }
  }

//DROPDOWN RATIO 2
  dropdownRatio2 = createSelect();
  dropdownRatio2.position (275,900);
  dropdownRatio2.option(1);
  dropdownRatio2.option(2);
  dropdownRatio2.option(3);
  dropdownRatio2.option(4);
  dropdownRatio2.option(6);
  dropdownRatio2.option(8);
  dropdownRatio2.option(9);
  dropdownRatio2.option(10);
  dropdownRatio2.option(12);
  dropdownRatio2.option(14);
  dropdownRatio2.option(15);
  dropdownRatio2.option(16);
  dropdownRatio2.option(18);
  dropdownRatio2.changed(mySelectRatio2);

  function mySelectRatio2 () {
    h[2].ratio=dropdownRatio2.value();
  }

//DROPDOWN ESCALA 2
  dropdownEscala2 = createSelect();
  dropdownEscala2.position (330,900);
  dropdownEscala2.option("basica");
  dropdownEscala2.option("blues");
  dropdownEscala2.option("simetrica");
  dropdownEscala2.option("exotica");
  dropdownEscala2.changed(mySelectEscala2);

  function mySelectEscala2 () {
    switch(dropdownEscala2.value()){
      case "basica":
      h[2].escala=basica;
      break;
      case "blues":
      h[2].escala=blues;
      break;
      case "simetrica":
      h[2].escala=simetrica;
      break;
      case "exotica":
      h[2].escala=exotica;
      break;

    }
    
  }

  //FORMA OSCILADOR 2
  dropdownOSC2 = createSelect();
  dropdownOSC2.position (275,940);
  dropdownOSC2.option("TR");
  dropdownOSC2.option("SQ");
  dropdownOSC2.option("SW");
  dropdownOSC2.option("SN");
  dropdownOSC2.changed(mySelectOSC2);  

  function mySelectOSC2 () {

    switch (dropdownOSC2.value()){
      case "TR":
      oscguapo[2].setType('triangle');
      break;
      case "SQ":
      oscguapo[2].setType('square');
      break;
      case "SW":
      oscguapo[2].setType('sawtooth');
      break;
      case "SN":
      oscguapo[2].setType('sine');
      break;


    }
  }
  //OCTAVA OSCILADOR 2
  dropdownOCT2 = createSelect();
  dropdownOCT2.position (335,940);
  dropdownOCT2.option(1/2);
  dropdownOCT2.option(1);
  dropdownOCT2.option(2);
  dropdownOCT2.changed(mySelectOCT2);

  function mySelectOCT2 () {
    for (i=1;i<=8;i++)
    {
      h[2].escala[i]=dropdownOCT2.value()*h[2].escala[i]
    }
  }



//DROPDOWN RATIO 3
  dropdownRatio3 = createSelect();
  dropdownRatio3.position (495,900);
  dropdownRatio3.option(1);
  dropdownRatio3.option(2);
  dropdownRatio3.option(3);
  dropdownRatio3.option(4);
  dropdownRatio3.option(6);
  dropdownRatio3.option(8);
  dropdownRatio3.option(9);
  dropdownRatio3.option(10);
  dropdownRatio3.option(12);
  dropdownRatio3.option(14);
  dropdownRatio3.option(15);
  dropdownRatio3.option(16);
  dropdownRatio3.option(18);
  dropdownRatio3.changed(mySelectRatio3);

  function mySelectRatio3 () {
    h[3].ratio=dropdownRatio3.value();
  }

//DROPDOWN ESCALA 3
  dropdownEscala3 = createSelect();
  dropdownEscala3.position (550,900);
  dropdownEscala3.option("basica");
  dropdownEscala3.option("blues");
  dropdownEscala3.option("simetrica");
  dropdownEscala3.option("exotica");
  dropdownEscala3.changed(mySelectEscala3);

  function mySelectEscala3 () {
    switch(dropdownEscala3.value()){
      case "basica":
      h[3].escala=basica;
      break;
      case "blues":
      h[3].escala=blues;
      break;
      case "simetrica":
      h[3].escala=simetrica;
      break;
      case "exotica":
      h[3].escala=exotica;
      break;

    }
    
  }

  //FORMA OSCILADOR 3
  dropdownOSC3 = createSelect();
  dropdownOSC3.position (495,940);
  dropdownOSC3.option("TR");
  dropdownOSC3.option("SQ");
  dropdownOSC3.option("SW");
  dropdownOSC3.option("SN");
  dropdownOSC3.changed(mySelectOSC3);  

  function mySelectOSC3 () {

    switch (dropdownOSC3.value()){
      case "TR":
      oscguapo[3].setType('triangle');
      break;
      case "SQ":
      oscguapo[3].setType('square');
      break;
      case "SW":
      oscguapo[3].setType('sawtooth');
      break;
      case "SN":
      oscguapo[3].setType('sine');
      break;


    }
  }

    //OCTAVA OSCILADOR 3
  dropdownOCT3 = createSelect();
  dropdownOCT3.position (555,940);
  dropdownOCT3.option(1/2);
  dropdownOCT3.option(1);
  dropdownOCT3.option(2);
  dropdownOCT3.changed(mySelectOCT3);

  function mySelectOCT3 () {
    for (i=1;i<=8;i++)
    {
      h[3].escala[i]=dropdownOCT3.value()*h[3].escala[i]
    }
  }

  //DROPDOWN RATIO 4
  dropdownRatio4 = createSelect();
  dropdownRatio4.position (715,900);
  dropdownRatio4.option(1);
  dropdownRatio4.option(2);
  dropdownRatio4.option(3);
  dropdownRatio4.option(4);
  dropdownRatio4.option(6);
  dropdownRatio4.option(8);
  dropdownRatio4.option(9);
  dropdownRatio4.option(10);
  dropdownRatio4.option(12);
  dropdownRatio4.option(14);
  dropdownRatio4.option(15);
  dropdownRatio4.option(16);
  dropdownRatio4.option(18);
  dropdownRatio4.changed(mySelectRatio4);

  function mySelectRatio4 () {
    h[4].ratio=dropdownRatio4.value();
  }

//DROPDOWN ESCALA 4
  dropdownEscala4 = createSelect();
  dropdownEscala4.position (770,900);
  dropdownEscala4.option("basica");
  dropdownEscala4.option("blues");
  dropdownEscala4.option("simetrica");
  dropdownEscala4.option("exotica");
  dropdownEscala4.changed(mySelectEscala4);

  function mySelectEscala4 () {
    switch(dropdownEscala4.value()){
      case "basica":
      h[4].escala=basica;
      break;
      case "blues":
      h[4].escala=blues;
      break;
      case "simetrica":
      h[4].escala=simetrica;
      break;
      case "exotica":
      h[4].escala=exotica;
      break;

    }
    
  }

  //FORMA OSCILADOR 4
  dropdownOSC4 = createSelect();
  dropdownOSC4.position (715,940);
  dropdownOSC4.option("TR");
  dropdownOSC4.option("SQ");
  dropdownOSC4.option("SW");
  dropdownOSC4.option("SN");
  dropdownOSC4.changed(mySelectOSC4);  

  function mySelectOSC4 () {

    switch (dropdownOSC4.value()){
      case "TR":
      oscguapo[4].setType('triangle');
      break;
      case "SQ":
      oscguapo[4].setType('square');
      break;
      case "SW":
      oscguapo[4].setType('sawtooth');
      break;
      case "SN":
      oscguapo[4].setType('sine');
      break;


    }
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

buttonReset = createButton('RESET');
buttonReset.position(270,1070);
buttonReset.mouseClicked(setup);

dropdowntempo=createSelect();
dropdowntempo.position(490,1070);
dropdowntempo.option("muy lento");
dropdowntempo.option("lento");
dropdowntempo.option("medio");
dropdowntempo.option("rapido");
dropdowntempo.option("muy rapido");
dropdowntempo.changed(mySelectTempo);


  function mySelectTempo () {

    switch (dropdowntempo.value()){
      case "muy lento":
      frameRate(2);
      break;
      case "lento":
      frameRate(8);;
      break;
      case "medio":
      frameRate(20);;
      break;
      case "rapido":
      frameRate(40);
      break;
      case "muy rapido":
      frameRate(100);
      break;


    }
  }


}

//ojo, empezar tiene que ser de cada hormiga?

function draw() {
  image (tg[1],50,20);
  image (tg[2],490,20);
  image (tg[3],50,430);
  image (tg[4],490,430);


  //controladores
 // ch[1].background(0,255,0); 
  
 


//ataque=((FiltSlider.value())/2550);
//env.setADSR(ataque,0,0,0);
//env.setRange(1,0); 
//oscguapo[1].amp(env);
  h[2].paleta=coloresR;
  h[3].paleta=coloresA;
  h[4].paleta=coloresRa;


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
  if (t[i].reticula[h[i].posicionX][h[i].posicionY] == tamdir) t[i].reticula[h[i].posicionX][h[i].posicionY] = 0;
  if (t[i].reticula[h[i].posicionX][h[i].posicionY] == 8) t[i].reticula[h[i].posicionX][h[i].posicionY] = 0;
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
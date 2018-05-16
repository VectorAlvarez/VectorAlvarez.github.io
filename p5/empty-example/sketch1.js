var w;         //Variable para dividir el tablero
var columnas;  //Columnas del tablero
var filas;     //Filas del tablero
var tablero;   //Tablero
var siguiente; //Tablero de la siguiente generacion
var nacer;     //Reglas para que una célula nazca
var vivir;     //Reglas para que una célula siga viva
var empezar;   //Determina si avanza o no las generaciones
var botonvn;   //Boton para cambiar entre nacer y vivir
var cual;      //Estado que determina si estamos en nacer o vivir
var buttonE;   //Boton para empezar las generaciones y pausarlo

function setup() {
  // Tamaño del lienzo con la division de casillas
  createCanvas(1000, 500);
  w = 20;
  // El tablero empieza pausado con la opcion de vivir seleccionada
  empezar = false;
  cual = true;
  // Creacion de los array nacer y vivir
  nacer = new Array();
  vivir = new Array();
  // Calcular columnas y filas
  columnas = floor(width/w);
  filas = floor(height/w);
  // El tablero donde se jugara
  tablero = new Array(columnas);
  for (var i = 0; i < columnas; i++) {
    tablero[i] = new Array(filas);
  } 
  // Tablero donde se pondra la siguiente generacion
  siguiente = new Array(columnas);
  for (i = 0; i < columnas; i++) {
    siguiente[i] = new Array(filas);
  }
  //Iniciamos el tablero con todo en 0, muertas
  for (var i = 0; i < columnas; i++) {
    for (var j = 0; j < filas; j++) {
      tablero[i][j] = 0;
      siguiente[i][j] = 0;
      fill(255); 
      stroke(0);
      rect(i*w, j*w, w-1, w-1);
    }
  }
  // Boton para seleccionar nacer o vivir
  buttonvn = createButton('Vivir');
  buttonvn.position(10, 10);
  buttonvn.mousePressed(() => {
    if (cual) {
      cual = false;
      buttonvn.html('Nacer');
    } else {
      cual = true;
      buttonvn.html('Vivir');
    }
  });
  //Boton para iniciar y pausar el proceso de reproduccion
  buttonE = createButton('Empezar');
  buttonE.position(85, 10);
  buttonE.mousePressed(() => {
    if (empezar) {
      empezar = false;
      buttonE.html('Continuar');
    } else {
      empezar = true;
      buttonE.html('Pausa');
    }
  });
}

function draw() {
  // 
  if (empezar) generate();
  for ( var i = 0; i < columnas;i++) {
    for ( var j = 0; j < filas;j++) {
      if ((tablero[i][j] == 1)) fill(0);
      else fill(255); 
      stroke(0);
      rect(i*w, j*w, w-1, w-1);
    }
  }
  text(nacer,10,76);
  text(vivir,10,55);
}

function keyTyped() {
  if (cual) {
    if ((key === '1')) vivir.push(1);
    else if ((key === '2')) vivir.push(2);
    else if ((key === '3')) vivir.push(3);
    else if ((key === '4')) vivir.push(4);
    else if ((key === '5')) vivir.push(5);
    else if ((key === '6')) vivir.push(6);
    else if ((key === '7')) vivir.push(7);
    else if ((key === '8')) vivir.push(8);
    else if ((key === '9')) vivir.push(9);
    // uncomment to prevent any default behavior
    // return false;
  } else {
    if ((key === '1')) nacer.push(1);
    else if ((key === '2')) nacer.push(2);
    else if ((key === '3')) nacer.push(3);
    else if ((key === '4')) nacer.push(4);
    else if ((key === '5')) nacer.push(5);
    else if ((key === '6')) nacer.push(6);
    else if ((key === '7')) nacer.push(7);
    else if ((key === '8')) nacer.push(8);
    else if ((key === '9')) nacer.push(9);
    // uncomment to prevent any default behavior
    // return false;
  }
}

function mousePressed() {
  //empezar = false;
  tablero[floor((mouseX)/w)][floor((mouseY)/w)] = 1;
}

// The process of creating the new generation
function generate() {

  //Comprobar los vecinos
  for (var x = 1; x < columnas - 1; x++) {
    for (var y = 1; y < filas - 1; y++) {
      var neighbors = 0;
      for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
          neighbors += tablero[x+i][y+j];
        }
      }
      neighbors -= tablero[x][y];
      //Reglas impuestas
      if      ((tablero[x][y] == 1) && (vivir.indexOf(neighbors) >= 0)) siguiente[x][y] = 1;
      else if ((tablero[x][y] == 0) && (nacer.indexOf(neighbors) >= 0)) siguiente[x][y] = 1;
      else                                                              siguiente[x][y] = 0;
    }
  }

  // Cambio
  var temp = tablero;
  tablero = siguiente;
  siguiente = temp;
}


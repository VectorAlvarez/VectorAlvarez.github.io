var deslizadortc, deslizadortf, deslizadornl, deslizadorfe;
var arrayluciernagas;
var tam_ciclo, tam_flasheo, num_luciernagas, emp_flasheo;
var luz;
var buttomR, buttomP;
var pausa;

function setup(){
	createCanvas(1000, 500);
	//Deslizadores para el tamaño del ciclo(tm), de flasheo(tf), numero de luciernagas(nl) y copia de flaseo(fe)
	deslizadortc = createSlider(10,30,20,1);
	deslizadortc.position(10, 10);
	deslizadortf = createSlider(1,10,5,1);
	deslizadortf.position(10,30);
	deslizadornl = createSlider(100,1000,500,1);
	deslizadornl.position(10,50);
	deslizadorfe = createSlider(1,3,1,1);
	deslizadorfe.position(10, 70);
	//El diametro de las luciernagas
	luz = 15
	iniciacion();
	//Botones de reinicio del programa y pausa
  	buttonR = createButton('Reinicio');
  	buttonR.position(10, 90);
  	buttonR.mousePressed(() => {
  		iniciacion();
  	});
  	pausa = true
  	buttonP = createButton('Pausa');
  	buttonP.position(buttonR.x * 2 + buttonR.width, 90);
  	buttonP.mousePressed(() => {
    	if (pausa) {
    	  pausa = false;
    	  buttonP.html('Continuar');
    	} else {
    	  pausa = true;
    	  buttonP.html('Pausa');
    	}
 	});
}

function draw(){
	//Si la pausa esta desactivada
	if(pausa){
		background(0)
		//Para todas las lueciernas
		for (var i = 0; i < num_luciernagas; i++) {
			//Se mueven con un angulo al azar
			var angulo = Math.round(Math.random()*360);
			arrayluciernagas[i].mover(angulo);
			//Comprobamos si la lciernagas tiene que flasear
			arrayluciernagas[i].pintar();
			noStroke();
			//Si la luciernaga flashea se pinta de amarillo
			if (arrayluciernagas[i].colorin) fill(255,255,0);
			//Si no flashea mira a ver i hay alguien flaseando y se pinta de gris
			else {
				arrayluciernagas[i].mirar(arrayluciernagas);
				fill(100);
			}
			//Dibujamos la elipse de la lueciernaga con el color asignado
			ellipse(arrayluciernagas[i].x,arrayluciernagas[i].y,luz,luz);
		}
		//Mostramos el nombre de los deslizadores
		fill(255);
		text("Tamano del ciclo", deslizadortc.x * 2 + deslizadortc.width, 25);
		text("Tamano del flash", deslizadortf.x * 2 + deslizadortf.width, 45);
		text("Numero de luciernagas", deslizadornl.x * 2 + deslizadornl.width, 65);
		text("Numero para empezar el flasheo", deslizadorfe.x * 2 + deslizadorfe.width, 85);	
	}	
}
//FUNCION PARA INICIAR CON POSICIONES ALEATORIAS
function iniciacion(){
	//Asignamos el valor de los deslizadores a variables
	tam_ciclo = deslizadortc.value();
	tam_flasheo = deslizadortf.value();
	num_luciernagas = deslizadornl.value();
	emp_flasheo = deslizadorfe.value();
	//Creamos el array de las luciernagas
	arrayluciernagas = new Array();
	//Añadimos al array de las luciernagas tantos objetos Luciernaga como la variable num_luciernagas
	for (var i = 0; i < num_luciernagas; i++) {
		//Asignamos una posicion y reloj aleatorio
		l = new Luciernaga(random(width),random(height),random(0,tam_ciclo));
		arrayluciernagas.push(l);
	}
}
//OBJETO HORMIGA
function Luciernaga(x,y,reloj) {
	//Asignamos la posicion y reloj dado
	this.x = x;
	this.y = y;
	this.reloj = reloj;
	//Empieza sin estar flasheando
	this.colorin = false;
	this.mover = function(angulo){
		this.x = this.x + Math.round(Math.cos(angulo));
		this.y = this.y + Math.round(Math.sin(angulo));
		if (this.x < 0) this.x = 0;
		if (this.x > width) this.x = width;
		if (this.y < 0) this.y = 0;
		if (this.y > height) this.y = height;
		this.reloj++;
		if (this.reloj >= tam_ciclo) this.reloj = 0;
	}
	this.mirar = function(algo){
		var encendido = 0;
		for(var j=0;j<algo.length;j++){
			if (algo[j].colorin){
				hit = collideCircleCircle(this.x, this.y, 50, algo[j].x, algo[j].y, luz);
				if (hit) encendido++;
			}
			if (encendido >= emp_flasheo) this.reloj = tam_flasheo;
		}
	}
	this.pintar = function(){
		if (this.reloj < tam_flasheo) this.colorin = true;
		else this.colorin = false;
	}
}
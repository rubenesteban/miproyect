var jugadores = [0,1];//Número de jugadores
var numTurnos = jugadores.length;
var tablero;//Asignar el canvas del html.
var contexto;//Asignar el contexto del canvas
var r ;//Casilla para la roja
var a ;//Casilla para la amarilla.
var rojaX, rojaY, amarillaX, amarillaY;//Coordenadas de las fichas.
//var dado = [1,2,3,4,5,6];
var turno;//Quien tira el dado.
var turnoRoja = false;
var turnoAmarilla = false;
var movimiento = 0;//Indica el avance o retroceso de la ficha que tiene el turno.

var turnosPerdidosRoja = 0;
var turnosPerdidosAmarilla = 0;
var turnosPerdidos = turnosPerdidosRoja + turnosPerdidosAmarilla;
/***************************************************************************/
function iniciar(){
	tablero = document.getElementById('tablero');
	tablero.width = 660;
	tablero.height = 660;
	contexto = tablero.getContext("2d");

	//Asignar las imagenes a sus objetos.
	fondo.imagen = new Image();//Una nueva imagen a la propiedad imagen del objeto fondo.
	fondo.imagen.src = fondo.imagenURL;//La dirección de la imagen.
	fondo.imagen.onload = confirmarFondo;//La carga de la imagen.
}
//Crear los objetos con las imagenes.
	var fondo = {
		imagenURL: "img/monopoly.jpg"
	};
//Confirmar la carga de las imágenes.
	function confirmarFondo(){
		fondo.imagenOK = true;
		dibujarFondo();
		dibujarFichaRoja();
		dibujarFichaAmarilla();
	}
function dibujarFondo(){
	var contexto = this.contexto;
	contexto.drawImage(fondo.imagen, 0,0);
}
function dibujarFichaRoja(){
	contexto.beginPath();
	contexto.arc(rojaX, rojaY, 15, 0, Math.PI *2, true);
	contexto.fillStyle = "#F00";
	contexto.fill();
	contexto.lineWidth = 3;
	contexto.strokeStyle = "black";
	contexto.stroke();
	contexto.closePath();
}
function dibujarFichaAmarilla(){
	contexto.beginPath();
	contexto.arc(amarillaX,amarillaY, 15, 0, Math.PI *2, true);
	contexto.fillStyle = "#FF0";
	contexto.fill();
	contexto.lineWidth = 3;
	contexto.strokeStyle = "black";
	contexto.stroke();
	contexto.closePath();
}
//Posiciones ficha roja.
var casillasRoja = [[],[550,548],[500,548],[450,548],[400,548],[350,548],[300,548],[250,548],[200,548],[150,548],[100,548],[50,548],[50,498],[50,448],[50,398],[50,348],[50,298],[50,248],[50,198],[50,148],[50,98],[50,48],[100,48],[150,48],[200,48],[250,48],[300,48],[350,48],[400,48],[450,48],[500,48],[550,48],[550,98],[550,148],[550,198],[550,248],[550,298],[550,348],[550,398],[550,448],[550,498],[585,548],[500,548],[450,548],[400,548],[350,548],[300,548],[250,548],[503,245],[503,190],[470,155],[417,155],[361,155],[305,155],[250,155],[197,155],[165,197],[165,252],[165,310],[165,365],[195,407],[250,407],[310,330],[],[],[],[],[]];
//Posiciones ficha amarilla
	var casillasAmarilla = [[],[550,583],[500,583],[450,583],[400,583],[350,583],[300,583],[250,583],[200,583],[150,583],[100,583],[50,583],[15,498],[15,448],[15,398],[15,348],[15,298],[15,248],[15,198],[15,148],[15,98],[15,48],[100,13],[150,13],[200,13],[250,13],[300,13],[350,13],[400,13],[450,13],[500,13],[550,13],[585,98],[585,148],[585,198],[585,248],[585,298],[585,348],[585,398],[585,448],[585,498],[585,583],[500,583],[450,583],[400,583],[350,583],[300,583],[250,583],[540,300],[540,245],[540,160],[500,120],[417,120],[361,120],[305,120],[250,120],[170,120],[128,170],[128,252],[128,310],[128,385],[170,442],[250,442],[350,330],[],[],[],[],[]];
function situaFichas(){
	var posicionRoja = casillasRoja[r];
	rojaX = posicionRoja[0];
	rojaY = posicionRoja[1];
	var posicionAmarilla = casillasAmarilla[a];
	amarillaX = posicionAmarilla[0];
	amarillaY = posicionAmarilla[1];
}
function moverFichaRoja(){
	situaFichas();
	dibujarFondo();
	dibujarFichaRoja();
	dibujarFichaAmarilla();
	alerta(" ");
}
function moverFichaAmarilla(){
	situaFichas();
	dibujarFondo();
	dibujarFichaRoja();
	dibujarFichaAmarilla();
	alerta(" ");
}
function sorteoInicial(){
	turno = Math.round(Math.random()*(numTurnos-1));
	// console.log(turno);
	asignarTurno();
	iniciaPartida();
}
function iniciaPartida(){
	r = 1;
	a = 1;
	situaFichas();
	dibujarFondo();
	dibujarFichaRoja();
	dibujarFichaAmarilla();
	inicioJuego();
}
//turno de juego

function asignarTurno(){
	if(turno === 0){
		turnoRoja = true;
		turnoAmarilla = false;
		alerta("la ficha Amarilla");
		cambiarCubilete();
	}
	if(turno == 1){
		turnoAmarilla = true;
		turnoRoja = false;
		alerta("la ficha Roja");
		cambiarCubilete();
	}
}
function cambiarTurno(){
	if(turnoRoja === true){
		turnoRoja = false;
		turnoAmarilla = true;
		 cambiarCubilete();
	}
	else if(turnoAmarilla === true){
		turnoAmarilla = false;
		turnoRoja = true;
		 cambiarCubilete();
	}
}
//Tirada de jugador
// & turnosPerdidosRoja>0
//& turnosPerdidosAmarilla>0
function tirada(){
	
	if(turnoRoja === true){
		turnosPerdidosRoja--;
		alerta("Turnos Perdidos Ficha Roja"+turnosPerdidosRoja);
		cambiarTurno();
		lanzarDado();
	}
	else if(turnoAmarilla === true){
		turnosPerdidosAmarilla--;
		alerta("Turnos Perdidos Ficha Amarilla"+turnosPerdidosAmarilla);
		cambiarTurno();
		lanzarDado();
	}	
	else if(turnosPerdidos ===0){
		// console.log("Turnos Perdidos"+turnosPerdidos);
		// console.log("Turnos Perdidos Ficha Roja"+turnosPerdidosRoja);
		// console.log("Turnos Perdidos Ficha Amarilla"+turnosPerdidosAmarilla);
		lanzarDado();
	}
	// console.log(dado.classList);
}
function lanzarDado(){
	movimiento = Math.round(Math.random()*(6-1)+1);
	// movimiento = 62;
	cambiarDado();
	alerta("...avanza "+ (movimiento) + " casillas");//Mostrar el movimiento que va ha realizar la ficha.
	window.setTimeout("moverFichas()",1500);//Retrasa el movimiento para que de tiempo de leer el mensaje.
}	
//Las fichas se mueven con la tirada del dado.
function moverFichas(){
		dado = document.getElementById("dadoEnJuego");
		cambiarCubilete();

	if(turnoRoja === true){
		r += movimiento;
		moverFichaRoja();
		//alert("Comprobando si es una casilla especial")
		comprobarCasilla(r);
		cambiarTurno();
	}
	else if(turnoAmarilla === true){
		a += movimiento;
		moverFichaAmarilla();
		//alert("Comprobando si es una casilla especial")
		comprobarCasilla(a);
		cambiarTurno();
	}
}
//Las fichas se mueven por haber caido en casillas especiales.
function moverFichasEspecial(){
	if(turnoRoja === true){
		r += movimiento;
		window.setTimeout("moverFichaRoja()",3500);
		//moverFichaRoja();
		cambiarTurno();
	}
	else if(turnoAmarilla === true){
		a += movimiento;
		window.setTimeout("moverFichaAmarilla()",3500);
		// moverFichaAmarilla();
		cambiarTurno();
	}
}
//Las fichas se mueven por haber caido en casillas especiales.
var e = 0;
function conetiqueta(){
	if(turnoRoja === true & r > 41 ){
		e++;
	}
	else if(turnoAmarilla === true a > 41){
		e++;
	}
}



/*************************************************************************************/
//movimiento especiales
function comprobarCasilla(casilla){
	if(casilla == 42){
		casilla_42();
	}
    else if(casilla == 2){
		casilla_2();
	}
    else if(casilla == 3){
		casilla_3();
	}
    else if(casilla == 4){
		casilla_4();
	}
	else if(casilla == 5){
		casilla_5();
	}
	else if(casilla == 6){
		casilla_6();
	}
	else if(casilla == 7){
		casilla_7();
	}
	else if(casilla == 8){
		casilla_8();
	}
	else if(casilla == 9){
		casilla_9();
	}
    else if(casilla == 10){
		casilla_10();
	}
    else if(casilla == 11){
		casilla_11();
	}
    else if(casilla == 12){
		casilla_12();
	}
    else if(casilla == 13){
		casilla_13();
	}
    else if(casilla == 14){
		casilla_14();
	}
	else if(casilla == 15){
		casilla_15();
	}
	else if(casilla == 16){
		casilla_16();
	}
	else if(casilla == 17){
		casilla_17();
	}
	else if(casilla == 18){
		casilla_18();
	}
	else if(casilla == 19){
		casilla_19();
	}
    else if(casilla == 20){
		casilla_20();
	}
    else if(casilla == 21){
		casilla_21();
	}
    else if(casilla == 22){
		casilla_22();
	}
    else if(casilla == 23){
		casilla_23();
	}
    else if(casilla == 24){
		casilla_24();
	}
	else if(casilla == 25){
		casilla_25();
	}
	else if(casilla == 26){
		casilla_26();
	}
	else if(casilla == 27){
		casilla_27();
	}
	else if(casilla == 28){
		casilla_28();
	}
	else if(casilla == 29){
		casilla_29();
	}
    else if(casilla == 30){
		casilla_30();
	}
    else if(casilla == 31){
		casilla_31();
	}
    else if(casilla == 32){
		casilla_32();
	}
    else if(casilla == 33){
		casilla_33();
	}
    else if(casilla == 34){
		casilla_34();
	}
	else if(casilla == 35){
		casilla_35();
	}
	else if(casilla == 36){
		casilla_36();
	}
	else if(casilla == 37){
		casilla_37();
	}
	else if(casilla == 38){
		casilla_38();
	}
	else if(casilla == 39){
		casilla_39();
	}
    else if(casilla == 40){
		casilla_40();
	}
     else if(casilla == 41){
		casilla_41();
	}
    /***
	else if(casilla == 9){
		casilla_9();
	}
	else if(casilla == 14){
		casilla_14();
	}
	else if(casilla == 18){
		casilla_18();
	}
	else if(casilla == 23){
		casilla_23();
	}
	else if(casilla == 27){
		casilla_27();
	}
	else if(casilla == 32){
		casilla_32();
	}
	else if(casilla == 36){
		casilla_36();
	}
    
	else if(casilla == 41){
		casilla_41();
	}
    else if(casilla == 42){
		casilla_42();
	}
    ****/
    else if(casilla == 43){
		casilla_43();
	}
     else if(casilla == 44){
		casilla_44();
	}
	else if(casilla == 45){
		casilla_45();
	}
    else if(casilla == 46){
		casilla_46();
	}
     else if(casilla == 47){
		casilla_47();
	}
    /************
	else if(casilla == 50){
		casilla_50();
	}
	else if(casilla == 54){
		casilla_54();
	}
	else if(casilla == 59){
		casilla_59();
	}
	else if(casilla == 63){
		casilla_63();
	}
	//Puentes
	else if(casilla == 6){
		casilla_6();
	}
	else if(casilla == 12){
		casilla_12();
	}
	//Dados
	else if(casilla == 26){
		casilla_26();
	}
	else if(casilla == 53){
		casilla_53();
	}
	//Calavera
	else if(casilla == 58){
		casilla_58();
	}
	//El laberinto
	else if(casilla == 42){
		casilla_42();
	}
    else if(casilla == 43){
		casilla_43();
	}
     else if(casilla == 44){
		casilla_44();
	}
	//La posada 
	else if(casilla == 19){
		casilla_19();
	}
	//El pozo
	else if(casilla == 31){
		casilla_31();
	}
	//La carcel
	else if(casilla == 52){
		casilla_52();
	}
	//Casillas superiores al final cuando el movimiento lleva la ficha más alla de la meta.
	else if(casilla == 64){
		casilla_64();
	}
	else if(casilla == 65){
		casilla_65(); 
	}
	else if(casilla == 66){
		casilla_66();
	}
	else if(casilla == 67){
		casilla_67();
	}
	else if(casilla == 68){
		casilla_68();
	}
    ***/
}
/************ Funciones para casillas con Oca *****************************************/
function alerta(mensaje){
	var alerta;
	alerta = document.getElementById("alerta");
	alerta.innerHTML = mensaje;

}
/************ Funciones para casillas con Oca *****************************
function casilla_5(){
	alerta('"De oca a oca y tiro porque me toca"');
	movimiento = 4;
	moverFichasEspecial();
}
function casilla_9(){
	alerta('"De oca a oca y tiro porque me toca"');
	movimiento = 5;
	moverFichasEspecial();
}
function casilla_14(){
	alerta('"De oca a oca y tiro porque me toca"');
	movimiento = 4;
	moverFichasEspecial();
}
function casilla_18(){
	alerta('"De oca a oca y tiro porque me toca"');
	movimiento = 5;
	moverFichasEspecial();
}
function casilla_23(){
	alerta('"De oca a oca y tiro porque me toca"');
	movimiento = 4;
	moverFichasEspecial();
}
function casilla_27(){
	alerta('"De oca a oca y tiro porque me toca"');
	movimiento = 5;
	moverFichasEspecial();
}
function casilla_32(){
	alerta('"De oca a oca y tiro porque me toca"');
	movimiento = 4;
	moverFichasEspecial();
}
function casilla_36(){
	alerta('"De oca a oca y tiro porque me toca"');
	movimiento = 5;
	moverFichasEspecial();
}
function casilla_41(){
	alerta('"De oca a oca y tiro porque me toca"');
	movimiento = 4;
	moverFichasEspecial();
}
************/
function casilla_2(){
    movimiento = 0;
    if(victory === 0){
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
	else{
    alert("Costo $60");
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
}
function casilla_3(){
    movimiento = 0;
    if(victory === 0){
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
	else{
    alert("Costo $60");
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
}
function casilla_4(){
    movimiento = 0;
    if(victory === 0){
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
	else{
    alert("Costo $60");
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
}
function casilla_5(){
    movimiento = 0;
    if(victory === 0){
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
	else{
    alert("Costo $60");
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
}
function casilla_6(){
    movimiento = 0;
    if(victory === 0){
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
	else{
    alert("Costo $60");
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
}
function casilla_7(){
    movimiento = 0;
    if(victory === 0){
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
	else{
    alert("Costo $60");
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
}
function casilla_8(){
    movimiento = 0;
    if(victory === 0){
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
	else{
    alert("Costo $60");
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
}
function casilla_9(){
    movimiento = 0;
    if(victory === 0){
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
	else{
    alert("Costo $60");
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
}
function casilla_10(){
    movimiento = 0;
    if(victory === 0){
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
	else{
    alert("Costo $60");
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
}
function casilla_11(){
    movimiento = 0;
    if(victory === 0){
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
	else{
    alert("Costo $60");
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
}
function casilla_12(){
    movimiento = 0;
    if(victory === 0){
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
	else{
    alert("Costo $60");
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
}
function casilla_13(){
    movimiento = 0;
    if(victory === 0){
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
	else{
    alert("Costo $60");
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
}
function casilla_14(){
    movimiento = 0;
    if(victory === 0){
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
	else{
    alert("Costo $60");
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
}
function casilla_15(){
    movimiento = 0;
    if(victory === 0){
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
	else{
    alert("Costo $60");
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
}
function casilla_16(){
    movimiento = 0;
    if(victory === 0){
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
	else{
    alert("Costo $60");
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
}
function casilla_17(){
    movimiento = 0;
    if(victory === 0){
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
	else{
    alert("Costo $60");
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
}
function casilla_18(){
    movimiento = 0;
    if(victory === 0){
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
	else{
    alert("Costo $60");
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
}
function casilla_19(){
    movimiento = 0;
    if(victory === 0){
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
	else{
    alert("Costo $60");
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
}
function casilla_20(){
    movimiento = 0;
    if(victory === 0){
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
	else{
    alert("Costo $60");
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
}
function casilla_21(){
    movimiento = 0;
    if(victory === 0){
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
	else{
    alert("Costo $60");
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
}
function casilla_22(){
    movimiento = 0;
    if(victory === 0){
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
	else{
    alert("Costo $60");
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
}
function casilla_23(){
    movimiento = 0;
    if(victory === 0){
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
	else{
    alert("Costo $60");
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
}
function casilla_24(){
    movimiento = 0;
    if(victory === 0){
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
	else{
    alert("Costo $60");
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
}
function casilla_25(){
    movimiento = 0;
    if(victory === 0){
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
	else{
    alert("Costo $60");
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
}
function casilla_26(){
    movimiento = 0;
    if(victory === 0){
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
	else{
    alert("Costo $60");
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
}
function casilla_27(){
    movimiento = 0;
    if(victory === 0){
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
	else{
    alert("Costo $60");
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
}
function casilla_28(){
    movimiento = 0;
    if(victory === 0){
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
	else{
    alert("Costo $60");
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
}
function casilla_29(){
    movimiento = 0;
    if(victory === 0){
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
	else{
    alert("Costo $60");
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
}
function casilla_30(){
    movimiento = 0;
    if(victory === 0){
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
	else{
    alert("Costo $60");
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
}
function casilla_31(){
    movimiento = 0;
    if(victory === 0){
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
	else{
    alert("Costo $60");
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
}
function casilla_32(){
    movimiento = 0;
    if(victory === 0){
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
	else{
    alert("Costo $60");
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
}
function casilla_33(){
    movimiento = 0;
    if(victory === 0){
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
	else{
    alert("Costo $60");
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
}
function casilla_34(){
    movimiento = 0;
    if(victory === 0){
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
	else{
    alert("Costo $60");
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
}
function casilla_35(){
    movimiento = 0;
    if(victory === 0){
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
	else{
    alert("Costo $60");
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
}
function casilla_36(){
    movimiento = 0;
    if(victory === 0){
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
	else{
    alert("Costo $60");
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
}
function casilla_37(){
    movimiento = 0;
    if(victory === 0){
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
	else{
    alert("Costo $60");
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
}
function casilla_38(){
    movimiento = 0;
    if(victory === 0){
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
	else{
    alert("Costo $60");
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
}
function casilla_39(){
    movimiento = 0;
    if(victory === 0){
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
	else{
    alert("Costo $60");
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
}
function casilla_40(){
    movimiento = 0;
    if(victory === 0){
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
	else{
    alert("Costo $40");
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
}
function casilla_41(){
    movimiento = 0;
    if(victory === 0){
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
	else{
    alert("Costo $41");
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
	}
}
function casilla_42(){
    conetiqueta();
    ganador();
	alerta('"Recibiras 200 por pasar por GO"');
	movimiento = -40;
	moverFichasEspecial();
    
}
function casilla_43(){
    conetiqueta();
    ganador();
	alerta('"De oca a oca y tiro porque me toca"');
	movimiento = -40;
	moverFichasEspecial();
    
}
function casilla_44(){
    conetiqueta();
    ganador();
	alerta('"De oca a oca y tiro porque me toca"');
	movimiento = -40;
	moverFichasEspecial();
    
}
function casilla_45(){
    conetiqueta();
    ganador();
	alerta('"De oca a oca y tiro porque me toca"');
	movimiento = -40;
	moverFichasEspecial();
    
}
function casilla_46(){
    conetiqueta();
    ganador();
	alerta('"De oca a oca y tiro porque me toca"');
	movimiento = -40;
	moverFichasEspecial();
    
}
function casilla_47(){
    conetiqueta();
    ganador();
	alerta('"De oca a oca y tiro porque me toca"');
	movimiento = -40;
	moverFichasEspecial();
    
}
/************ Funciones para casillas con Puente ************************************
function casilla_50(){
	alerta('"De oca a oca y tiro porque me toca"');
	movimiento = 4;
	moverFichasEspecial();
}
function casilla_54(){
	alerta('"De oca a oca y tiro porque me toca"');
	movimiento = 5;
	moverFichasEspecial();
}
function casilla_59(){
	alerta('"De oca a oca y gane"');
	movimiento = 4;
	moverFichasEspecial();
	casilla_63();
}
function casilla_63(){
	alerta('"Gane!!!!!!!"');
	finPartida();
	ganador();
}
/************ Funciones para casillas con Puente **************************************
function casilla_6(){
	alerta('"De puente a puente y tiro porque me lleva la corriente"');
	movimiento = 6;
	moverFichasEspecial();
}
function casilla_12(){
	alerta('"De puente a puente y tiro porque me lleva la corriente"');
	movimiento = -6;
	moverFichasEspecial();
}
/************ Funciones para casillas con Dados ***************************************
function casilla_26(){
	alerta('"De dados a dados y tiro porque me ha tocado"');
	movimiento = 27;
	moverFichasEspecial();
}
function casilla_53(){
	alerta('"De dados a dados y tiro porque me ha tocado"');
	movimiento = -27;
	moverFichasEspecial();
}
/************ Funcion para casilla Calavera ***************************************
function casilla_58(){
	alerta('"Ohhhhhhhh vuelves a empezar"');
	movimiento = -57;
	moverFichasEspecial();
	cambiarTurno();
}
/************ Funcion para casilla Laberinto **************************************
function casilla_42(){
	alerta('"Del laberinto al 30"');
	movimiento = -41;
	moverFichasEspecial();
	cambiarTurno();
}
***/

/************ Funciones de las casillas que pierden turnos ************************
function casilla_19(){
	alerta('"En la posada pierdes un turno"');
	if(turnoRoja === true){
		turnosPerdidosRoja = 1;
	}
	if(turnoAmarilla === true){
		turnosPerdidosAmarilla = 1;
	}
}
function casilla_31(){
	alerta('"En el pozo pierdes 2 turnos"');
	if(turnoRoja === true){
		turnosPerdidosRoja = 2;
	}
	if(turnoAmarilla === true){
		turnosPerdidosAmarilla = 2;
	}
}
function casilla_52(){
	alerta('"En la carcel te quedas por 3 turnos"');
	if(turnoRoja === true){
		turnosPerdidosRoja = 3;
	}
	if(turnoAmarilla === true){
		turnosPerdidosAmarilla = 3;
	}
}
/************ Funciones de las casillas más alla de la meta *********************
function casilla_64(){
	alerta('"Te pasaste retrocede una casilla"');
	movimiento = -2;
	moverFichasEspecial();
	cambiarTurno();
}
function casilla_65(){
	alerta('"Te pasaste retrocede 2 casillas"');
	movimiento = -4;
	moverFichasEspecial();
	cambiarTurno();
}
function casilla_66(){
	alerta('"Te pasaste retrocede 3 casillas"');
	movimiento = -6;
	moverFichasEspecial();
	cambiarTurno();
}
function casilla_67(){
	alerta('"Te pasaste retrocede 4 casillas"');
	movimiento = -8;
	moverFichasEspecial();
	cambiarTurno();
	casilla_59();
	alerta("Ganaste!!!");
}
function casilla_68(){
	alerta('"Te pasaste retrocede 5 casillas"');
	movimiento = -10;
	moverFichasEspecial();
	cambiarTurno();
	casilla_58();
}
*******/
//Modificar el cursor al pasar sobre elementos clickeables
function sobre(){
	var elementoDadoSorteo ;
	var elementoDado ;

	elementoDadoSorteo = document.getElementById("dadoSorteo");
	elementoDado = document.getElementById("dadoEnJuego");

	elementoDadoSorteo.style.cursor ="pointer";
	elementoDado.style.cursor ="pointer";
}
/***************************COMPORTAMIENTO DE LOS PANELES ***********************/
var panelInicio;
var panelSorteo;
var panelJuego;
var panelFinal;
function ocultarPanelInicio(){
	panelInicio = document.getElementById("panelInicio");
	panelInicio.classList.add("oculto");
	panelInicio.classList.remove("visible");
}
function mostrarPanelSorteo(){
	panelSorteo = document.getElementById("panelSorteo");
	panelSorteo.classList.remove("oculto");
	panelSorteo.classList.add("visible");
}
function ocultarPanelSorteo(){
	panelSorteo = document.getElementById("panelSorteo");
	panelSorteo.classList.remove("visible");
	panelSorteo.classList.add("oculto");
}
function mostrarPanelJuego(){
	panelJuego = document.getElementById("panelJuego");
	panelJuego.classList.remove("oculto");
	panelJuego.classList.add("visible");
}
function ocultarPanelJuego(){
	panelJuego = document.getElementById("panelJuego");
	panelJuego.classList.remove("visible");
	panelJuego.classList.add("oculto");
}
function mostrarPanelFinal(){
	panelFinal = document.getElementById("panelFinal");
	panelFinal.classList.remove("oculto");
	panelFinal.classList.add("visible");
}
function ocultarPanelFinal(){
	panelFinal = document.getElementById("panelFinal");
	panelFinal.classList.remove("visible");
	panelFinal.classList.add("oculto");
}
function jugar(){
	ocultarPanelInicio();
	ocultarPanelFinal();
	ocultarPanelJuego();
	mostrarPanelSorteo();
}
function inicioJuego(){
	ocultarPanelSorteo();
	mostrarPanelJuego();
}
function finPartida(){
	ocultarPanelJuego();
	mostrarPanelFinal();
}
/************************Ganador**************************************/
var victoriasRojo = 0;
var victoriasAmarillo = 0;
var victory = 0;
var marcadorRojo, marcadorAmarillo;
function ganador(){
	//var dadoGanador = document.getElementById("dadoGanador");
	if(r > 41){
		//dadoGanador.style.backgroundImage="url('img/campeonRojo.png')";
		victoriasRojo = victoriasRojo + 1;
	}
	if(a > 41){
		//dadoGanador.style.backgroundImage="url('img/campeonAmarillo.png')";
		victoriasAmarillo = victoriasAmarillo + 1;
	}
victory = victoriasAmarillo + victoriasRojo
actualizarMarcador();
console.log("Puntos amarillo " + victoriasAmarillo )
console.log("Puntos rojo " + victoriasRojo )
}
function actualizarMarcador(){
	marcadorAmarillo = document.getElementById("marcadorAmarillo");
	marcadorRojo = document.getElementById("marcadorRojo");
	marcadorRojo.value = victoriasRojo;
	marcadorAmarillo.value = victoriasAmarillo;
}
/*****************************Ficha en juego representada por el cubilete de su color.***********************/
	var dado ;
function cambiarCubilete(){
	dado = document.getElementById("dadoEnJuego");
	var dadoUrl;
	if(turnoRoja === true){
		// dado.classList.add("cubileteRojo");
		// dado.classList.remove("cubileteAmarillo")
		dadoUrl = "url(img/cubileteAmarillo.png)";
		dado.style.backgroundImage=dadoUrl;
	}else if(turnoAmarilla ===true){
		// dado.classList.add("cubileteAmarillo");
		// dado.classList.remove("cubileteRojo");
		dadoUrl = "url(img/cubileteRojo.png)";
		dado.style.backgroundImage=dadoUrl;
	}
}
/***************Cambiar el dado en función del  movimiento**************/
function cambiarDado(){
	dado = document.getElementById("dadoEnJuego");
	if(turnoRoja === true){
		var dadoUrl = "url(img/dadoRojo_"+movimiento+".png)";
		dado.style.backgroundImage=dadoUrl;
	}
	else if(turnoAmarilla === true){
		var dadoUrl = "url(img/dadoAmarillo_"+movimiento+".png)";
		dado.style.backgroundImage=dadoUrl;
	}
}
/*********************Jugador elige color*************************/
function seleccionarFicha(color){
	var colorJugador;
	var juegasCon;
	juegasCon = document.getElementById("colorJugador");
	if(color == "rojo"){
		colorJugador = color;
		juegasCon.innerHTML = "Juegas con la ficha roja"
		//alert("Color "+color);
	}
	else if(color == "amarillo"){
		colorJugador = color;
		juegasCon.innerHTML = "Juegas con la ficha amarilla"
		// alert("Color "+color)
	}
}
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
	}
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
	
	if(turnoRoja === true && turnosPerdidosRoja>0 ){
		turnosPerdidosRoja--;
		alerta("Turnos Perdidos Ficha Roja"+turnosPerdidosRoja);
		cambiarTurno();
        lanzarDado();
        
	}
	else if(turnoAmarilla === true && turnosPerdidosAmarilla>0 ){
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
		//cambiarTurno();
	}
	else if(turnoAmarilla === true){
		a += movimiento;
		moverFichaAmarilla();
		//alert("Comprobando si es una casilla especial")
		comprobarCasilla(a);
		//cambiarTurno();
	}
}
//Las fichas se mueven por haber caido en casillas especiales.
function moverFichasEspecial(){
	if(turnoRoja === true){
		r += movimiento;
		window.setTimeout("moverFichaRoja()",1500);
		moverFichaRoja();
		cambiarTurno();
	}
	else if(turnoAmarilla === true){
		a += movimiento;
		window.setTimeout("moverFichaAmarilla()",1500);
	    moverFichaAmarilla();
		cambiarTurno();
	}
}
//Las fichas se mueven por haber caido en casillas especiales.

function conetiqueta(){
    var e = 0;
	if(turnoRoja === true & victoriasRojo > 0 ){
		e === 1;
	}
    
	else if(turnoAmarilla === true & victoriasAmarillo > 0){
		e === 1;
	}
    return e;
}

/*************************************************************************************/




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
    
}
/************ Funciones para casillas con Oca *****************************************/
function alerta(mensaje){
	var alerta;
	alerta = document.getElementById("alerta");
	alerta.innerHTML = mensaje;

}

/************ Cargar imagenes de TurnoRojo *****************************/
 

$("#btn1").click(function(){
    if ( r == 1 ){
        Swal.fire({
            imageUrl: 'img/g1.jpg',
            imageHeight: 412,
            imageAlt: 'A tall image',
    });
    } else if ( r == 2 ){
        Swal.fire({
            imageUrl: 'img/k2.png',
            imageHeight: 412,
            imageAlt: 'A tall image'
    });
    } else if ( r == 3 ){
        Swal.fire({
            imageUrl: 'img/Arca.jpg',
            imageHeight: 412,
            imageAlt: 'A tall image'
    });
    } else if ( r == 4 ){
        Swal.fire({
            imageUrl: 'img/k4.png',
            imageHeight: 412,
            imageAlt: 'A tall image',
    });
     } else if ( r == 5 ){
        Swal.fire({
            imageUrl: 'img/tax.jpg',
            imageHeight: 412,
            imageAlt: 'A tall image',
    });
    } else if ( r == 6 ){
        Swal.fire({
            imageUrl: 'img/k6.png',
            imageHeight: 412,
            imageAlt: 'A tall image',
    });
    } else if ( r == 7 ){
        Swal.fire({
            imageUrl: 'img/k7.png',
            imageHeight: 412,
            imageAlt: 'A tall image',
    });
    } else if ( r == 8 ){
        Swal.fire({
            imageUrl: 'img/casualidad.jpg',
            imageHeight: 412,
            imageAlt: 'A tall image'
    });
    } else if ( r == 9 ){
        Swal.fire({
            imageUrl: 'img/k9.png',
            imageHeight: 412,
            imageAlt: 'A tall image',
    });
    } else if ( r == 10 ){
        Swal.fire({
            imageUrl: 'img/k10.png',
            imageHeight: 412,
            imageAlt: 'A tall image',
    });
    } else if ( a == 11 ){
        Swal.fire({
            imageUrl: 'img/in.jpg',
            imageHeight: 412,
            imageAlt: 'A tall image'
    });
    } else if ( r == 12 ){
        Swal.fire({
            imageUrl: 'img/k12.png',
            imageHeight: 412,
            imageAlt: 'A tall image',
    });
    }else if ( r == 13 ){
        Swal.fire({
            imageUrl: 'img/k13.png',
            imageHeight: 412,
            imageAlt: 'A tall image',
    });
    } else if ( r == 14 ){
        Swal.fire({
            imageUrl: 'img/k14.png',
            imageHeight: 412,
            imageAlt: 'A tall image',
    });
    } else if ( r == 15 ){
        Swal.fire({
            imageUrl: 'img/k15.png',
            imageHeight: 412,
            imageAlt: 'A tall image',
    });
    } else if ( r == 16 ){
        Swal.fire({
            imageUrl: 'img/k16.png',
            imageHeight: 412,
            imageAlt: 'A tall image',
    });
    } else if ( r == 17 ){
        Swal.fire({
            imageUrl: 'img/k17.png',
            imageHeight: 412,
            imageAlt: 'A tall image',
    });
    } else if ( r == 18 ){
        Swal.fire({
            imageUrl: 'img/Arca.jpg',
            imageHeight: 412,
            imageAlt: 'A tall image'
    });
    } else if ( r == 19 ){
        Swal.fire({
            imageUrl: 'img/k19.png',
            imageHeight: 412,
            imageAlt: 'A tall image',
    });
    }else if ( r == 20 ){
        Swal.fire({
            imageUrl: 'img/k20.png',
            imageHeight: 412,
            imageAlt: 'A tall image',
    });
    } else if ( r == 21 ){
        Swal.fire({
            imageUrl: 'img/free.jpg',
            imageHeight: 412,
            imageAlt: 'A tall image'
    });
    } else if ( r == 22 ){
        Swal.fire({
            imageUrl: 'img/k22.png',
            imageHeight: 412,
            imageAlt: 'A tall image',
    });
    } else if ( r == 23 ){
        Swal.fire({
            imageUrl: 'img/casualidad.jpg',
            imageHeight: 412,
            imageAlt: 'A tall image'
    });
    } else if ( r == 24 ){
        Swal.fire({
            imageUrl: 'img/k24.png',
            imageHeight: 412,
            imageAlt: 'A tall image',
    });
    } else if ( r == 25 ){
        Swal.fire({
            imageUrl: 'img/k25.png',
            imageHeight: 412,
            imageAlt: 'A tall image',
    });
    } else if ( r == 26 ){
        Swal.fire({
            imageUrl: 'img/k26.png',
            imageHeight: 412,
            imageAlt: 'A tall image',
    });
    } else if ( r == 27 ){
        Swal.fire({
            imageUrl: 'img/k27.png',
            imageHeight: 412,
            imageAlt: 'A tall image',
    });
    }else if ( r == 28 ){
        Swal.fire({
            imageUrl: 'img/k28.png',
            imageHeight: 412,
            imageAlt: 'A tall image',
    });
    } else if ( r == 29 ){
        Swal.fire({
            imageUrl: 'img/k29.png',
            imageHeight: 412,
            imageAlt: 'A tall image',
    });
    } else if ( r == 30 ){
        Swal.fire({
            imageUrl: 'img/k30.png',
            imageHeight: 412,
            imageAlt: 'A tall image',
    });
    } else if ( r == 31 ){
        Swal.fire({
            imageUrl: 'img/jail.jpg',
            imageHeight: 412,
            imageAlt: 'A tall image'
    });
    } else if ( r == 32 ){
        Swal.fire({
            imageUrl: 'img/k32.png',
            imageHeight: 412,
            imageAlt: 'A tall image',
    });
    } else if ( r == 33 ){
        Swal.fire({
            imageUrl: 'img/k33.png',
            imageHeight: 412,
            imageAlt: 'A tall image',
    });
    } else if ( r == 34 ){
        Swal.fire({
            imageUrl: 'img/Arca.jpg',
            imageHeight: 412,
            imageAlt: 'A tall image'
    });
    } else if ( r == 35 ){
        Swal.fire({
            imageUrl: 'img/k35.png',
            imageHeight: 412,
            imageAlt: 'A tall image',
    });
    } else if ( r == 36 ){
        Swal.fire({
            imageUrl: 'img/k36.png',
            imageHeight: 412,
            imageAlt: 'A tall image',
    });
    } else if ( r == 37 ){
        Swal.fire({
            imageUrl: 'img/casualidad.jpg',
            imageHeight: 412,
            imageAlt: 'A tall image'
    });
    } else if ( r == 38 ){
        Swal.fire({
            imageUrl: 'img/k38.png',
            imageHeight: 412,
            imageAlt: 'A tall image',
    });
     } else if ( r == 39 ){
        Swal.fire({
            imageUrl: 'img/lujo.jpg',
            imageHeight: 412,
            imageAlt: 'A tall image',
    });
    } else if ( r == 40 ){
        Swal.fire({
            imageUrl: 'img/k40.png',
            imageHeight: 412,
            imageAlt: 'A tall image',
    });
    }  else{
        Swal.fire({
            imageUrl: 'img/g1.jpg',
            imageHeight: 412,
            imageAlt: 'A tall image',
    });
    }
});	


/************ Cargar imagenes de TurnoAmarrillo *************************/

$("#btn3").click(function(){
    if ( a == 1 ){
        Swal.fire({
            imageUrl: 'img/g1.jpg',
            imageHeight: 412,
            imageAlt: 'A tall image'
    });
    } else if ( a == 2 ){
        Swal.fire({
            imageUrl: 'img/k2.png',
            imageHeight: 412,
            imageAlt: 'A tall image'
    });
    } 
    else if ( a == 3 ){
        Swal.fire({
            imageUrl: 'img/Arca.jpg',
            imageHeight: 412,
            imageAlt: 'A tall image'
    });
    } else if ( a == 4 ){
        Swal.fire({
            imageUrl: 'img/k4.png',
            imageHeight: 412,
            imageAlt: 'A tall image'
    });
    } else if ( a == 5 ){
        Swal.fire({
            imageUrl: 'img/tax.jpg',
            imageHeight: 412,
            imageAlt: 'A tall image'
    });
    } else if ( a == 6 ){
        Swal.fire({
            imageUrl: 'img/k6.png',
            imageHeight: 412,
            imageAlt: 'A tall image'
    });
    } else if ( a == 7 ){
        Swal.fire({
            imageUrl: 'img/k7.png',
            imageHeight: 412,
            imageAlt: 'A tall image'
    });
    } else if ( a == 8 ){
        Swal.fire({
            imageUrl: 'img/casualidad.jpg',
            imageHeight: 412,
            imageAlt: 'A tall image'
    });
    } else if ( a == 9 ){
        Swal.fire({
            imageUrl: 'img/k9.png',
            imageHeight: 412,
            imageAlt: 'A tall image'
    });
    } else if ( a == 10 ){
        Swal.fire({
            imageUrl: 'img/k10.png',
            imageHeight: 412,
            imageAlt: 'A tall image'
    });
    } else if ( a == 11 ){
        Swal.fire({
            imageUrl: 'img/in.jpg',
            imageHeight: 412,
            imageAlt: 'A tall image'
    });
    } else if ( a == 12 ){
        Swal.fire({
            imageUrl: 'img/k12.png',
            imageHeight: 412,
            imageAlt: 'A tall image'
    });
    } else if ( a == 13 ){
        Swal.fire({
            imageUrl: 'img/k13.png',
            imageHeight: 412,
            imageAlt: 'A tall image'
    });
    } else if ( a == 14 ){
        Swal.fire({
            imageUrl: 'img/k14.png',
            imageHeight: 412,
            imageAlt: 'A tall image'
    });
    } else if ( a == 15 ){
        Swal.fire({
            imageUrl: 'img/k15.png',
            imageHeight: 412,
            imageAlt: 'A tall image'
    });
    } else if ( a == 16 ){
        Swal.fire({
            imageUrl: 'img/k16.png',
            imageHeight: 412,
            imageAlt: 'A tall image'
    });
    } else if ( a == 17 ){
        Swal.fire({
            imageUrl: 'img/k17.png',
            imageHeight: 412,
            imageAlt: 'A tall image'
    });
    } else if ( a == 18 ){
        Swal.fire({
            imageUrl: 'img/Arca.jpg',
            imageHeight: 412,
            imageAlt: 'A tall image'
    });
    } else if ( a == 19 ){
        Swal.fire({
            imageUrl: 'img/k19.png',
            imageHeight: 412,
            imageAlt: 'A tall image'
    });
    } else if ( a == 20 ){
        Swal.fire({
            imageUrl: 'img/k20.png',
            imageHeight: 412,
            imageAlt: 'A tall image'
    });
    } else if ( a == 21 ){
        Swal.fire({
            imageUrl: 'img/free.jpg',
            imageHeight: 412,
            imageAlt: 'A tall image'
    });
    } else if ( a == 22 ){
        Swal.fire({
            imageUrl: 'img/k22.png',
            imageHeight: 412,
            imageAlt: 'A tall image'
    });
    } else if ( a == 23 ){
        Swal.fire({
            imageUrl: 'img/casualidad.jpg',
            imageHeight: 412,
            imageAlt: 'A tall image'
    });
    } else if ( a == 24 ){
        Swal.fire({
            imageUrl: 'img/k24.png',
            imageHeight: 412,
            imageAlt: 'A tall image'
    });
    } else if ( a == 25 ){
        Swal.fire({
            imageUrl: 'img/k25.png',
            imageHeight: 412,
            imageAlt: 'A tall image'
    });
    } else if ( a == 26 ){
        Swal.fire({
            imageUrl: 'img/k26.png',
            imageHeight: 412,
            imageAlt: 'A tall image'
    });
    } else if ( a == 27 ){
        Swal.fire({
            imageUrl: 'img/k27.png',
            imageHeight: 412,
            imageAlt: 'A tall image'
    });
    } else if ( a == 28 ){
        Swal.fire({
            imageUrl: 'img/k28.png',
            imageHeight: 412,
            imageAlt: 'A tall image'
    });
    } else if ( a == 29 ){
        Swal.fire({
            imageUrl: 'img/k29.png',
            imageHeight: 412,
            imageAlt: 'A tall image'
    });
    } else if ( a == 30 ){
        Swal.fire({
            imageUrl: 'img/k30.png',
            imageHeight: 412,
            imageAlt: 'A tall image'
    });
    } else if ( a == 31 ){
        Swal.fire({
            imageUrl: 'img/jail.jpg',
            imageHeight: 412,
            imageAlt: 'A tall image'
    });
    } else if ( a == 32 ){
        Swal.fire({
            imageUrl: 'img/k32.png',
            imageHeight: 412,
            imageAlt: 'A tall image'
    });
    } else if ( a == 33 ){
        Swal.fire({
            imageUrl: 'img/k33.png',
            imageHeight: 412,
            imageAlt: 'A tall image'
    });
    } else if ( a == 34){
        Swal.fire({
            imageUrl: 'img/Arca.jpg',
            imageHeight: 412,
            imageAlt: 'A tall image'
    });
    } else if ( a == 35 ){
        Swal.fire({
            imageUrl: 'img/k35.png',
            imageHeight: 412,
            imageAlt: 'A tall image'
    });
    } else if ( a == 36 ){
        Swal.fire({
            imageUrl: 'img/k36.png',
            imageHeight: 412,
            imageAlt: 'A tall image'
    });
    } else if ( a == 37 ){
        Swal.fire({
            imageUrl: 'img/casualidad.jpg',
            imageHeight: 412,
            imageAlt: 'A tall image'
    });
    } else if ( a == 38 ){
        Swal.fire({
            imageUrl: 'img/k38.png',
            imageHeight: 412,
            imageAlt: 'A tall image'
    });
    } else if ( a == 39 ){
        Swal.fire({
            imageUrl: 'img/lujo.jpg',
            imageHeight: 412,
            imageAlt: 'A tall image'
    });
    } else if ( a == 40 ){
        Swal.fire({
            imageUrl: 'img/k40.png',
            imageHeight: 412,
            imageAlt: 'A tall image'
    });
    } else{
        Swal.fire({
            imageUrl: 'img/g1.jpg',
            imageHeight: 412,
            imageAlt: 'A tall image'
    });
    }
});



/************ Cargar imagenes de Casualidad *****************************/


$("#btn5").click(function(){
    c = Math.round(Math.random()*(8-1)+1);
    if ( c == 1 ){
        Swal.fire({
            imageUrl: 'img/C1.jpg',
            imageHeight: 412,
            imageAlt: 'A tall image',
    });
    } else if ( c == 2 ){
        Swal.fire({
            imageUrl: 'img/C2.jpg',
            imageHeight: 412,
            imageAlt: 'A tall image',
    });
    } else if ( c == 3 ){
        Swal.fire({
            imageUrl: 'img/C3.jpg',
            imageHeight: 412,
            imageAlt: 'A tall image',
    });
    } else if ( c == 4 ){
        Swal.fire({
            imageUrl: 'img/C4.jpg',
            imageHeight: 412,
            imageAlt: 'A tall image',
    });
    } else if ( c == 5 ){
        Swal.fire({
            imageUrl: 'img/C5.jpg',
            imageHeight: 412,
            imageAlt: 'A tall image',
    });
    } else if ( c == 6 ){
        Swal.fire({
            imageUrl: 'img/C6.jpg',
            imageHeight: 412,
            imageAlt: 'A tall image',
    });
    } else if ( c == 7 ){
        Swal.fire({
            imageUrl: 'img/C7.jpg',
            imageHeight: 412,
            imageAlt: 'A tall image',
    });
    } else{
        Swal.fire({
            imageUrl: 'img/C8.jpg',
            imageHeight: 412,
            imageAlt: 'A tall image',
    });
    }
});	


/************ Cargar imagenes de arca comunal **************************/


$("#btn7").click(function(){
    ca = Math.round(Math.random()*(8-1)+1);
    if ( ca == 1 ){
        Swal.fire({
            imageUrl: 'img/A1.jpg',
            imageHeight: 412,
            imageAlt: 'A tall image',
    });
    } else if ( ca == 2 ){
        Swal.fire({
            imageUrl: 'img/A2.jpg',
            imageHeight: 412,
            imageAlt: 'A tall image',
    });
    } else if ( ca == 3 ){
        Swal.fire({
            imageUrl: 'img/A3.jpg',
            imageHeight: 412,
            imageAlt: 'A tall image',
    });
    } else if ( ca == 4 ){
        Swal.fire({
            imageUrl: 'img/A4.jpg',
            imageHeight: 412,
            imageAlt: 'A tall image',
    });
    } else if ( ca == 5 ){
        Swal.fire({
            imageUrl: 'img/A5.jpg',
            imageHeight: 412,
            imageAlt: 'A tall image',
    });
    } else if ( ca == 6 ){
        Swal.fire({
            imageUrl: 'img/A6.jpg',
            imageHeight: 412,
            imageAlt: 'A tall image',
    });
    } else if ( ca == 7 ){
        Swal.fire({
            imageUrl: 'img/A7.jpg',
            imageHeight: 412,
            imageAlt: 'A tall image',
    });
    } else{
        Swal.fire({
            imageUrl: 'img/A8.jpg',
            imageHeight: 412,
            imageAlt: 'A tall image',
    });
    }
});	

/************ Funciones para casillas *******************************/
var compra = function(){
    Swal.fire({        
        type: 'success',
        title: 'Éxito',
        text: '¡Perfecto!',        
    });
};


function casilla_2(){
    conetiqueta();
    movimiento = 0;
    if(e === 0){
    alerta('"Avenida 2 esta vendida"');
    
	moverFichasEspecial();
    cambiarTurno();
	}
	else{
    alert("Av. Mediteranio - Costo $60");
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
    cambiarTurno();
   
	}
    e === 0;
}
function casilla_3(){
    conetiqueta();
    movimiento = 0;
    if(e === 0){
    alerta('"Avenida 3 esta vendida"');
    
	moverFichasEspecial();
    cambiarTurno();
	}
	else{
    
    alert("Arca comunal");
	moverFichasEspecial();
    cambiarTurno();
	}
    e === 0;
}
function casilla_4(){
    conetiqueta();
    movimiento = 0;
    if(e === 0){
    alerta('"Avenida  esta vendida"');
    //Swal.fire();
	moverFichasEspecial();
    cambiarTurno();
	}
	else{
    alert("Av. Baltico - Costo $60");
    
	moverFichasEspecial();
    cambiarTurno();
	}
    e === 0;
}
function casilla_5(){
    conetiqueta();
    movimiento = 0;
    if(e === 0){
    alerta('"Avenida 5 esta vendida"');
    //Swal.fire();
	moverFichasEspecial();
    cambiarTurno();
	}
	else{
    
    alert("Impuesto Sobre la Renta - Pague $200");
	moverFichasEspecial();
    cambiarTurno();
	}
    e === 0;
}
function casilla_6(){
    conetiqueta();
    movimiento = 0;
    if(e === 0){
    alerta('"Avenida 6 esta vendida"');
    //Swal.fire();
	moverFichasEspecial();
    cambiarTurno();
	}
	else{
   
    alert("Ferrocarril de la lectura - Costo $200");
	moverFichasEspecial();
    cambiarTurno();
	}
    e === 0;
}
function casilla_7(){
    conetiqueta();
    movimiento = 0;
    if(e === 0){
    alerta('"Avenida 2 esta vendida"');
    //Swal.fire();
	moverFichasEspecial();
    cambiarTurno();
	}
	else{
    
    alert("Av. Oriental - Costo $100");
	moverFichasEspecial();
    cambiarTurno();
	}
    e === 0;
}
function casilla_8(){
    conetiqueta();
    movimiento = 0;
    if(e === 0){
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
    cambiarTurno();
	}
	else{
    alert("Casualidad");
    
	moverFichasEspecial();
    cambiarTurno();
	}
    e === 0;
}
function casilla_9(){
    conetiqueta();
    movimiento = 0;
    if( e === 0){
    alerta('"Avenida 2 esta vendida"');
	moverFichasEspecial();
    cambiarTurno();
	}
	else{
    alert("Av. Vermont- Costo $100");
	moverFichasEspecial();
    cambiarTurno();
	}
    e === 0;
}
function casilla_10(){
    conetiqueta();
    movimiento = 0;
    if(e === 0){
    alerta('"Avenida 2 esta vendida"');
    moverFichasEspecial();
    cambiarTurno();
    }
    else{
    alert("Av. Connecticut - Costo $120");
    moverFichasEspecial();
    cambiarTurno();
    }
    e === 0;
}
function casilla_11(){
    conetiqueta();
    movimiento = 0;
    if(e === 0){
    alerta('"Avenida 2 esta vendida"');
    moverFichasEspecial();
    cambiarTurno();
    }
    else{
    alert("En la carcel de visita no mas");
    moverFichasEspecial();
    cambiarTurno();
    }
    e === 0;
}
function casilla_12(){
    conetiqueta();
    movimiento = 0;
    if(e === 0){
    alerta('"Avenida 2 esta vendida"');
    moverFichasEspecial();
    cambiarTurno();
    }
    else{
    alert("Av. Charles - Costo $140");
    moverFichasEspecial();
    cambiarTurno();
    }
    e === 0;
}
function casilla_13(){
    conetiqueta();
    movimiento = 0;
    if(e === 0){
    alerta('"Avenida 2 esta vendida"');
    moverFichasEspecial();
    cambiarTurno();
    }
    else{
    alert("Empresa Electrica - Costo $150");
    moverFichasEspecial();
    cambiarTurno();
    }
    e === 0;
}
function casilla_14(){
    conetiqueta();
    movimiento = 0;
    if(e === 0){
    alerta('"Avenida 2 esta vendida"');
    moverFichasEspecial();
    cambiarTurno();
    }
    else{
    alert("Av. Unidos - Costo $140");
    moverFichasEspecial();
    cambiarTurno();
    }
    e === 0;
}
function casilla_15(){
    conetiqueta();
    movimiento = 0;
    if(e === 0){
    alerta('"Avenida 2 esta vendida"');
    moverFichasEspecial();
    cambiarTurno();
    }
    else{
    alert("Av. Virginia - Costo $160");
    moverFichasEspecial();
    cambiarTurno();
    }
    e === 0;
}
function casilla_16(){
    conetiqueta();
    movimiento = 0;
    if(e === 0){
    alerta('"Avenida 2 esta vendida"');
    moverFichasEspecial();
    cambiarTurno();
    }
    else{
    alert("Ferrocarril de  Pennsylvania - Costo $200");
    moverFichasEspecial();
    cambiarTurno();
    }
    e === 0;
}
function casilla_17(){
    conetiqueta();
   movimiento = 0;
    if(e === 0){
    alerta('"Avenida 2 esta vendida"');
    moverFichasEspecial();
    cambiarTurno();
    }
    else{
    alert("St James Place - Costo $180");
    moverFichasEspecial();
    cambiarTurno();
    }
    e === 0;
}
function casilla_18(){
    conetiqueta();
    movimiento = 0;
    if(e === 0){
    alerta('"Avenida 2 esta vendida"');
    moverFichasEspecial();
    cambiarTurno();
    }
    else{
    alert("Arca comunal");
    moverFichasEspecial();
    cambiarTurno();
    }
    e === 0;
}
function casilla_19(){
    conetiqueta();
    movimiento = 0;
    if(e === 0){
    alerta('"Avenida 2 esta vendida"');
    moverFichasEspecial();
    cambiarTurno();
    }
    else{
    alert("Av. Tennessee - Costo $180");
    moverFichasEspecial();
    cambiarTurno();
    }
    e === 0;
}
function casilla_20(){
    conetiqueta();
    movimiento = 0;
    if(e === 0){
    alerta('"Avenida 2 esta vendida"');
    moverFichasEspecial();
    cambiarTurno();
    }
    else{
    alert("Av. New York - Costo $200");
    moverFichasEspecial();
    }
    e === 0;
}
function casilla_21(){
    conetiqueta();
    movimiento = 0;
    if(e === 0){
    alerta('"Avenida 2 esta vendida"');
    moverFichasEspecial();
    cambiarTurno();
    }
    else{
    alert("Estacionamiento Gratis");
    moverFichasEspecial();
    cambiarTurno();
    }
    e === 0;
}
function casilla_22(){
    conetiqueta();
    movimiento = 0;
    if(e === 0){
    alerta('"Avenida 2 esta vendida"');
    moverFichasEspecial();
    cambiarTurno();
    }
    else{
    
    alert("Av. Kentucky - Costo $220");
    moverFichasEspecial();
    cambiarTurno();
    }
    e === 0;
}
function casilla_23(){
    conetiqueta();
    movimiento = 0;
    if(e === 0){
    alerta('"Avenida 2 esta vendida"');
    moverFichasEspecial();
    cambiarTurno();
    }
    else{
    alert("Casualidad");
    moverFichasEspecial();
    cambiarTurno();
    }
    e === 0;
}
function casilla_24(){
    conetiqueta();
    movimiento = 0;
    if(e === 0){
    alerta('"Avenida 2 esta vendida"');
    moverFichasEspecial();
    cambiarTurno();
    }
    else{
    alert("Av. Indiana - Costo $220");
    moverFichasEspecial();
    cambiarTurno();
    }
    e === 0;
}
function casilla_25(){
    conetiqueta();
    movimiento = 0;
    if(e === 0){
    alerta('"Avenida 2 esta vendida"');
    moverFichasEspecial();
    cambiarTurno();
    }
    else{
    alert("Av. Illinois - Costo $240");
    moverFichasEspecial();
    cambiarTurno();
    }
    e === 0;
}
function casilla_26(){
    conetiqueta();
    movimiento = 0;
    if(e === 0){
    alerta('"Avenida 2 esta vendida"');
    moverFichasEspecial();
    cambiarTurno();
    }
    else{
    alert("Ferrocarril B & O - Costo $200");
    moverFichasEspecial();
    cambiarTurno();
    }
    e === 0;
}
function casilla_27(){
    conetiqueta();
    movimiento = 0;
    if(e === 0){
    alerta('"Avenida 2 esta vendida"');
    moverFichasEspecial();
    cambiarTurno();
    }
    else{
    alert("Av. Atlantic - Costo $260");
    moverFichasEspecial();
    cambiarTurno();
    }
    e === 0;
}
function casilla_28(){
    conetiqueta();
    movimiento = 0;
    if(e === 0){
    alerta('"Avenida 2 esta vendida"');
    moverFichasEspecial();
    cambiarTurno();
    }
    else{
    alert("Av. Vermont - Costo $60");
    moverFichasEspecial();
    cambiarTurno();
    }
    e === 0;
}
function casilla_29(){
    conetiqueta();
    mmovimiento = 0;
    if(e === 0){
    alerta('"Avenida 2 esta vendida"');
    moverFichasEspecial();
    cambiarTurno();
    }
   
    else{
    alert("Water Works - Costo $150");
    moverFichasEspecial();
    cambiarTurno();
    }
    e === 0;
}
function casilla_30(){
    conetiqueta();
    movimiento = 0;
    if(e === 0){
    alerta('"Avenida 2 esta vendida"');
    moverFichasEspecial();
    cambiarTurno();
    }
    else{
    alert("Av. Marvin Garden - Costo $280");
    
    moverFichasEspecial();
    cambiarTurno();
    }
    e === 0;
}

function casilla_31(){
    movimiento = -20;
    alerta('"En la carcel te quedas por 3 turnos"');
    if(turnoRoja === true){
        turnosPerdidosRoja = 3;
        moverFichasEspecial();
    }
    if(turnoAmarilla === true){
        turnosPerdidosAmarilla = 3;
        moverFichasEspecial();
    }
}


function casilla_32(){
    conetiqueta();
    movimiento = 0;
    if(e === 0){
    alerta('"Avenida 2 esta vendida"');
    moverFichasEspecial();
    cambiarTurno();
    }
    else{
    alert("Av. Pacific - Costo $300");
    moverFichasEspecial();
    cambiarTurno();
    }
    e === 0;
}
function casilla_33(){
    conetiqueta();
    movimiento = 0;
    if(e === 0){
    alerta('"Avenida 2 esta vendida"');
    moverFichasEspecial();
    cambiarTurno();
    }
    else{
    alert("Av. Carolina del Norte - Costo $300");
    moverFichasEspecial();
    cambiarTurno();
    }
    e === 0;
}
function casilla_34(){
    conetiqueta();
    movimiento = 0;
    if(e === 0){
    alerta('"Avenida 2 esta vendida"');
    moverFichasEspecial();
    cambiarTurno();
    }
    else{
    alert("Arca Comunal");
    moverFichasEspecial();
    cambiarTurno();
    }
    e === 0;
}
function casilla_35(){
    conetiqueta();
    movimiento = 0;
    if(e === 0){
    alerta('"Avenida 2 esta vendida"');
    moverFichasEspecial();
    cambiarTurno();
    }
    else{
    alert("Av. Pennsylvania - Costo $320");
    moverFichasEspecial();
    cambiarTurno();
    }
    e === 0;
}
function casilla_36(){
    conetiqueta();
    movimiento = 0;
    if(e === 0){
    alerta('"Avenida 2 esta vendida"');
    moverFichasEspecial();
    cambiarTurno();
    }
    else{
    alert("Ferrocarril de Liverpool");
    moverFichasEspecial();
    cambiarTurno();
    }
    e === 0;
}
function casilla_37(){
    conetiqueta();
    movimiento = 0;
    if(e === 0){
    alerta('"Avenida 2 esta vendida"');
    moverFichasEspecial();
    cambiarTurno();
    }
    else{
    alert("Casualidad");
    moverFichasEspecial();
    cambiarTurno();
    }
    e === 0;
}
function casilla_38(){
    conetiqueta();
    movimiento = 0;
    if(e === 0){
    alerta('"Avenida 2 esta vendida"');
    moverFichasEspecial();
    cambiarTurno();
    }
    else{
    alert("Av. Park Lane - Costo $350");
    moverFichasEspecial();
    cambiarTurno();
    }
    e === 0;
}
function casilla_39(){
    conetiqueta();
    movimiento = 0;
    if(e === 0){
    alerta('"Avenida 2 esta vendida"');
    moverFichasEspecial();
    cambiarTurno();
    }
    else{
    alert("Impuesto de Lujo - Costo $100");
    moverFichasEspecial();
    cambiarTurno();
    }
    e === 0;
}
function casilla_40(){
    conetiqueta();
    movimiento = 0;
    if(e === 0){
    alerta('"Avenida 2 esta vendida"');
    moverFichasEspecial();
    cambiarTurno();
    }
    else{
    alert("Boardwalk");
    moverFichasEspecial();
    cambiarTurno();
    }
    e === 0;
}
function casilla_41(){
    conetiqueta();
    movimiento = 0;
    if(e === 0){
    alerta('"Avenida 2 esta vendida"');
    moverFichasEspecial();
    cambiarTurno();
    }
    else{
    alert("Si pasa por Go cobre - $200");
    moverFichasEspecial();
    cambiarTurno();
    }
    e === 0;
}
function casilla_42(){
    e === 1;
    conetiqueta();
    console.log(e);
     ganador();
	alerta('"De oca a oca y tiro porque me toca"');
	movimiento = -40;
	moverFichas();
    
}
function casilla_43(){
    e === 1;
    conetiqueta();
    console.log(e);
    ganador();
	alerta('"De oca a oca y tiro porque me toca"');
	movimiento = -40;
	moverFichas();
    
}
function casilla_44(){
    e === 1;
    conetiqueta();
    console.log(e);
    ganador();
	alerta('"De oca a oca y tiro porque me toca"');
	movimiento = -40;
	moverFichas();
    
}
function casilla_45(){
    e === 1;
    conetiqueta();
    console.log(e);
    ganador();
	alerta('"De oca a oca y tiro porque me toca"');
	movimiento = -40;
	moverFichas();
    
}
function casilla_46(){
    e === 1;
    conetiqueta();
    console.log(e);
    ganador();
	alerta('"De oca a oca y tiro porque me toca"');
	movimiento = -40;
	moverFichas();
    
}
function casilla_47(){
    e === 1;
    conetiqueta();
    console.log(e);
    ganador();
	alerta('"De oca a oca y tiro porque me toca"');
	movimiento = -40;
	moverFichas();
    
}
/************ Funciones para casillas con Puente ************************************

*******/
//Modificar el cursor al pasar sobre elementos clickeables

function sobre(){
	var elementoDadoSorteo ;
	var elementoDado ;

	elementoDadoSorteo = document.getElementById("dadoSorteo");

    elementoDadoSorteo.style.backgroundImage="url('img/dadora.png')";
    
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
		dadoUrl = "url(img/cubileteRojo.png)";
		dado.style.backgroundImage=dadoUrl;
	}else if(turnoAmarilla ===true){
		// dado.classList.add("cubileteAmarillo");
		// dado.classList.remove("cubileteRojo");
		dadoUrl = "url(img/cubileteAmarillo.png)";
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

//function sleep(ms) {
//  return new Promise(resolve => setTimeout(resolve, ms));
//}
//
//async function ycargando() {
//  $.loader({
//	  className: "blue-with-image-2",
//	  content: ''
//	 });
//  await sleep(2000);
//  $.loader("close");
//}
//
$.ajaxSetup({
    timeout: 1, // Microseconds, for the laughs.  Guaranteed timeout.
    error: function(request, status, maybe_an_exception_object) {
        if(status == 'timeout')
            alert("Comprueba tu acceso internet - recuerde que debe conectarse a la red WIFI del Hotel.");
    }
});

function xcargando()
{
	$.loader("close");
}

function cargando()
{
	$.loader({
	  className: "blue-with-image-2",
	  content: ''
	 });
}

function saliendos()
{
alert ("Estas accediendo a un sitio externo a SmartHotel, para volver tendrás que reiniciar la aplicación, de acuerdo ?");
}


$(document).on("pageshow",function(){
		xcargando();
		});	 


function externo(url)
{
// open win and turn off location 
var ref = window.open(url, '_blank', 'location=no');

// attach listener to loadstart
ref.addEventListener('loadstart', function(event) { 
    var urlSuccessPage = "http://volvera/smart/";
    if (event.url == urlSuccessPage) {
    ref.close();
	xcargando();   
    }
});
}

function controlsesion()
//controla el nivel de acceso a cada pag asi como la existencia de la informac necesaria para imprimirla.
{
 var control_licencia = localStorage.getItem("mem_licencia");	
 var control_room = localStorage.getItem("roomdb");

				if (control_licencia != null) {
                        console.log("Acceso a Pagina con licencia de hotel " + control_licencia);
                    
					if (control_room != null) {
                        console.log("Acceso a Pagina con habitacion " + control_room);
						
                    } 
					else{
						console.log("Acceso a Pagina sin habitacion " + control_room);
						document.location.href = "log.html";
					}
					
					} 
					else{
						console.log("Acceso a Pagina sin licencia de hotel " + control_room);
						document.location.href = "index.html";
					}
			    
	

}

function accesoRequest()
{
var control_request = localStorage.getItem("mem_request");
	if (control_request != '1') {
		alert ("Este Servicio no se encuentra disponible en este hotel. Gracias.");
		document.location.href = "hotelLog.html";
	}
}

function accesoTools()
{
var control_tools = localStorage.getItem("mem_tools");
	if (control_tools != '1') {
		alert ("Este servicio no se encuentra disponible en este hotel. Gracias.");
		document.location.href = "hotelLog.html";
	}
}

function accesoRemote()
{
var control_remote = localStorage.getItem("mem_remote");
	if (control_remote != '1') {
		alert ("Este servicio no se encuentra disponible en este hotel. Gracias.");
		document.location.href = "hotelLog.html";
	}
}

function accesoAccount()
{
var control_account = localStorage.getItem("mem_account");
	if (control_account != '1') {
		alert ("Este servicio no se encuentra disponible en este hotel. Gracias.");
		document.location.href = "hotelLog.html";
	}
}


function print_lavanderia()
{
var control_lavanderiacodigo = localStorage.getItem("mem_lavanderiacodigo");
console.log("ocontrol lavanderia " +control_lavanderiacodigo);
if (control_lavanderiacodigo == null){document.location.href = "#lavanderia";}	
$.get("http://190.145.24.146/app/lavanderia_busqueda.php",{codigo: control_lavanderiacodigo}, lavanderiacodigorespuesta, "jsonp");
function lavanderiacodigorespuesta(respuestalav){
				        var estadolavanderia = respuestalav.estado;
						var tiempoestimadolavanderia = respuestalav.tiempo;
						console.log("res lavanderia print" +estadolavanderia+tiempoestimadolavanderia);
						localStorage.setItem("mem_lavanderiatiempo", tiempoestimadolavanderia);
												if(estadolavanderia == 'enespera'){
												document.location.href = "respuestas.html#lavanderiaenespera";
														}
						if(estadolavanderia == 'enproceso'){
												document.location.href = "respuestas.html#lavanderiaenproceso";
														}
						if(estadolavanderia == 'finalizado'){
												document.location.href = "respuestas.html#lavanderiafinalizada";
														}
						
						}}


function not_lavanderia()
{
var control_lavanderiacodigo = localStorage.getItem("mem_lavanderiacodigo");
console.log("not control lavanderia " +control_lavanderiacodigo);
if (control_lavanderiacodigo == null){document.location.href = "#lavanderia";}	
$.get("http://190.145.24.146/app/lavanderia_busqueda.php",{codigo: control_lavanderiacodigo}, lavanderiacodigorespuesta, "jsonp");
function lavanderiacodigorespuesta(respuestalav){
				        var estadolavanderia = respuestalav.estado;
						var tiempoestimadolavanderia = respuestalav.tiempo;
						console.log("res lavanderia print" +estadolavanderia+tiempoestimadolavanderia);
						localStorage.setItem("mem_lavanderiatiempo", tiempoestimadolavanderia);
												
						if(estadolavanderia == 'enproceso'){
												schedule("Estado de sus Prendas","Sus prendas estan ahora en proceso de lavado.","4");
														}
						if(estadolavanderia == 'finalizado'){
												schedule("Estado de sus Prendas","El Lavado de sus prendas ha finalizado.","4");
														}
						
						}}


function checknot_lavanderia() {
	console.log("intervalo de notlavanderia");
  deamonnotla = setInterval(notMessages, 60000);
}

function handle_lavanderia()
{
 var nombre_lavanderia = localStorage.getItem("nombredb");
 var room_lavanderia = localStorage.getItem("roomdb");
 var lavanderia_pantalones = $("#lavanderia_pantalones").val();
 var lavanderia_camisa = $("#lavanderia_camisa").val();
 var lavanderia_chaqueta = $("#lavanderia_chaqueta").val();
 var lavanderia_op1 = $("#lavanderia_op1").prop("checked");
 var lavanderia_op2 = $("#lavanderia_op2").prop("checked");
 var lavanderia_op3 = $("#lavanderia_op3").prop("checked");
 console.log("ops de lavanderia " + lavanderia_op1 + lavanderia_op2);

 	
 $.get("http://190.145.24.146/app/lavanderia.php",{room: room_lavanderia, nombre: nombre_lavanderia, pantalones: lavanderia_pantalones, camisa: lavanderia_camisa, chaqueta: lavanderia_chaqueta, op1: lavanderia_op1, op2: lavanderia_op2, op3: lavanderia_op3}, lavanderiares, "jsonp");

 function lavanderiares(respuesta){
				        var lavanderia_codigosolicitud = respuesta.codigosolicitud;
                                              localStorage.setItem("mem_lavanderiacodigo", lavanderia_codigosolicitud);
						console.log("Se envio solicitud de lavanderia: " + lavanderia_codigosolicitud);

						}
						//location.href = "respuestas.html#lavanderiaenespera";
				
				   
}

function handle_amadellaves()
{
 var nombre_amadellaves = localStorage.getItem("nombredb");
 var room_amadellaves = localStorage.getItem("roomdb");
 var amadellaves_llamar = $("#checkboxamadellaves").prop("checked");
 var amadellaves_limpieza = $("#flip-1").val();
 var amadellaves_nomolestar = $("#flip-2").val();
 var amadellaves_snacks = $("#flip-3").val();
 var amadellaves_toallas = $("#amadellaves_toallas").val(); 	
 var amadellaves_almohadas = $("#amadellaves_almohadas").val();
  
 $.get("http://190.145.24.146/app/amadellaves.php",{room: room_amadellaves, nombre: nombre_amadellaves, llamar: amadellaves_llamar, limpieza: amadellaves_limpieza, nomolestar: amadellaves_nomolestar, snacks: amadellaves_snacks, toallas: amadellaves_toallas, almohadas: amadellaves_almohadas}, amadellavesres, "jsonp");

 function amadellavesres(respuestaama){
				        var amadellaves_codigosolicitud = respuestaama.codigosolicitud;
                                              localStorage.setItem("mem_amadellavescodigo", amadellaves_codigosolicitud);
						console.log("Se envio solicitud de ama de llaves: " + amadellaves_codigosolicitud);
						location.href = "respuestas.html#res_amadellaves";
						}
						
				
				   
}

function handle_mantenimiento()
{
 var nombre_mantenimiento = localStorage.getItem("nombredb");
 var room_mantenimiento = localStorage.getItem("roomdb");
 var mantenimiento_bano = $("#bano").prop("checked");
 var mantenimiento_ducha = $("#ducha").prop("checked");
 var mantenimiento_ventanas = $("#ventanas").prop("checked");
 var mantenimiento_puerta = $("#puerta").prop("checked");
 var mantenimiento_luces = $("#luces").prop("checked");
 var mantenimiento_otros = $("#otros").prop("checked");
 var mantenimiento_comentariostxt = $("#comentariostxt").val();
 console.log("man coments: " + mantenimiento_comentariostxt);
 	
 $.get("http://190.145.24.146/app/mantenimiento.php",{room: room_mantenimiento, nombre: nombre_mantenimiento, bano: mantenimiento_bano, ducha: mantenimiento_ducha, ventanas: mantenimiento_ventanas, puerta: mantenimiento_puerta, luces: mantenimiento_luces, otros: mantenimiento_otros, comentariostxt: mantenimiento_comentariostxt}, manres, "jsonp");
 console.log("Envieget Man: " + mantenimiento_puerta);

 function manres(respuesta){
				        var man_codigosolicitud = respuesta.codigosolicitud;
                                              localStorage.setItem("mem_mantenimiento", man_codigosolicitud);
						console.log("Se envio solicitud de mantenimiento: " + man_codigosolicitud);
						location.href = "respuestas.html#res_mantenimiento";
						}
						
				
				   
}


function clearall(){
	console.log("vamos a limpiar datos");
	localStorage.clear();
	window.localStorage.clear();
	console.log("datos limpiados");
	location.href = "index.html";
}



function print_chat()
{
	var control_chatcodigo = localStorage.getItem("mem_chatcodigo");
	if (control_chatcodigo) {
                        location.href = "chat.html";											
						}
						
						else{
							document.location.href = "request.html#chat";
							console.log("Chat no iniciado " + control_chatcodigo);
						}
						
                          
}

function handle_chat()
{
 var nombre_chat = localStorage.getItem("nombredb");
 var room_chat = localStorage.getItem("roomdb");
 var chat_enviomensaje = $("#envio_chat").val();
 var chata_enviomensaje = $("#leo_chat").val();
 
var currentdate = new Date(); 
var chat_time = currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
var control_chatcodigo1 = localStorage.getItem("mem_chatcodigo");	
 					
        var storedMessagesJSON = localStorage.displayMessages || '[]',
            storedMessages = JSON.parse(storedMessagesJSON),
		    displayMessage = chat_time+'<b>-> Hab '+room_chat+':</b> '+chat_enviomensaje;

        storedMessages.push(displayMessage);
        localStorage.displayMessages = JSON.stringify(storedMessages);
        
 $.get("http://190.145.24.146/app/chat.php",{room: room_chat, nombre: nombre_chat, mensaje: chat_enviomensaje, mensajea: chata_enviomensaje, codigo: control_chatcodigo1}, chatres, "jsonp");
 
 function chatres(respuesta){
	var control_chatcodigo = localStorage.getItem("mem_chatcodigo");
	if (!control_chatcodigo) {
						var chat_codigosolicitud = respuesta.codigosolicitud;
                        localStorage.setItem("mem_chatcodigo", chat_codigosolicitud);
						console.log("Se envio solicitud de Chat: " + chat_codigosolicitud);
						location.href = "chat.html";
						}}
		 document.getElementById('envio_chat').value = "";
         showMessages();
		 localStorage.setItem("not_chat", "si");
    
}

function showMessages() {
	
  var control_chatcodigo = localStorage.getItem("mem_chatcodigo");
  var room_chat = localStorage.getItem("roomdb");
  var chat_leomensaje = $("#leo_chat").val();
  localStorage.setItem("chat_leomensaje", chat_leomensaje);
  

$.get("http://190.145.24.146/app/recchat.php",{room: room_chat, codigo: control_chatcodigo, leomensaje: chat_leomensaje}, chatrec, "jsonp");
 
 function chatrec(respuesta){
				        var chat_recroom = respuesta.recroom;
						var chat_recmensaje = respuesta.recmensaje;
						var chat_rechora = respuesta.hora;
                        if (chat_recroom) {
						console.log("Obtengo de: " + chat_recroom + "msg: " + chat_rechora);
						//alertar("Nuevo mensaje de"+chat_recroom,chat_rechora,"chat.html");
						
						    var recMessagesJSON = localStorage.displayMessages || '[]',
                            recMessages = JSON.parse(storedMessagesJSON),
		                    displayRecMessage = chat_rechora+'<b><-'+chat_recroom+':</b> '+chat_recmensaje;

                            recMessages.push(displayRecMessage);
                            localStorage.displayMessages = JSON.stringify(recMessages);}
						
						}
	
        
		var storedMessagesJSON = localStorage.displayMessages || '[]',
        storedMessages = JSON.parse(storedMessagesJSON);
        $('#chatArea').html(storedMessages.join('<br>'));
		
    
   
}


function notMessages() {
	
  var control_chatcodigo = localStorage.getItem("mem_chatcodigo");
  var room_chat = localStorage.getItem("roomdb");
  var chat_leomensaje = localStorage.getItem("chat_leomensaje");
  	//console.log("checo msg por intervalo");

$.get("http://190.145.24.146/app/recchat.php",{room: room_chat, codigo: control_chatcodigo, leomensaje: chat_leomensaje}, chatrec, "jsonp");
 
 function chatrec(respuesta){
				        var chat_recroom = respuesta.recroom;
						var chat_recmensaje = respuesta.recmensaje;
						var chat_rechora = respuesta.hora;
                        if (chat_recroom) {
						schedule("Tienes un nuevo Mensaje", chat_rechora+"- Recibiste nuevo mensaje de: "+chat_recroom, "1");
						console.log("Notifico mensaje de: " + chat_recroom + "msg: " + chat_rechora);
						//alertar("Nuevo mensaje de"+chat_recroom,chat_rechora,"chat.html");
						
						   //displayRecMessage = chat_rechora+'<b><-'+chat_recroom+':</b> '+chat_recmensaje;
							
                            }
						
						}
	
        
		  
   
}



function actualizarchat() {
  deamon = setInterval(showMessages, 2000);
}

function checknot_chat() {
	console.log("intervalo de notmessages");
  deamonnot = setInterval(notMessages, 10000);
}


function print_vuelos()
{
	var control_vuelosnum = localStorage.getItem("mem_vuelosnum");
	if (control_vuelosnum) {
		handle_vuelos();
							console.log("Vuelo ya establecido lo consulto " + control_vuelosnum);
		
		}
						
						else{
						console.log("Vuelo No establecido " + control_vuelosnum);	
						}
						
                          
}

function print_vuelos2()
{
	var control_name_vuelos = localStorage.getItem("nombredb");
                        
						$.get("http://190.145.24.146/app/vuelos2.php",{nombre: control_name_vuelos}, vuelosres, "jsonp");
 function vuelosres(respuesta){
	 
	 console.log("parseo respuesta vuelos solos: " + respuesta);
	 html ='';
	 $.each(respuesta, function() {
	 html +='<div id="infoVuelo">';
	 html += '<div class="aerolinea">'+this['aerolinea'];
						if(this['delays']){
						html += '<span id="vuelo" class="pull-right">Vuelo Retrasado '+this['delays']+' Minutos</span></div>';
						}else{
							html += '<span id="vuelo" class="pull-right">Estado: '+this['estado']+'</span></div>';
						}
						html += '<div class="destino">BOG - '+this['avion_destino']+' Tiempo: '+this['minutosalaire'];
                        html += '<span id="vuelo" class="pull-right">Flight '+this['avion_numero']+'</span>';
                        html += '</div>';
                        html += '<div class="salida">Salida <span class="pull-right">Llegada</span></div>';
                        html += '<div class="hora">';
                        html += '<span class="fa fa-clock-o"></span> '+this['salida'];
                        html += '<div id="horaLegada" class="pull-right"><span class="fa fa-clock-o"></span> '+this['llegada']+'</div>';
                        html += '</div>'
                    	html += '</div>'
	 
	 });
	 $('#infoxvuelo2').html(html);
	 }

						
                          
}

function handle_vuelos()
{
	var control_name_vuelos = localStorage.getItem("nombredb");
	var control_estadovuelos = localStorage.getItem("mem_estadovuelos");
	var control_salidavuelos = localStorage.getItem("mem_salidavuelos");
	var control_vuelosnumh = localStorage.getItem("mem_vuelosnum");	
	if(control_vuelosnumh){
		var vuelos_num = control_vuelosnumh;}else{
		var vuelos_num = $("#vuelos_num").val();}
		
                       
						$.get("http://190.145.24.146/app/vuelos.php",{nombre: control_name_vuelos, vuelo: vuelos_num}, vuelosres, "jsonp");
 function vuelosres(respuesta){
	 var startTime = new Date();
	 console.log("parseo respuesta: " + respuesta);
	 html ='';
	 var thisavion = "";
	 var thissalida = "";
	 $.each(respuesta, function() {
	 html +='<div id="infoVuelo">';
	 html += '<div class="aerolinea">'+this['aerolinea'];
						if(this['delays']){
						html += '<span id="vuelo" class="pull-right">Vuelo Retrasado '+this['delays']+' Minutos</span></div>';
						}else{
							html += '<span id="vuelo" class="pull-right">Estado: '+this['estado']+'</span></div>';
						}
						html += '<div class="destino">Bogota - '+this['avion_destino']+' / '+this['minutosalaire'];
                        html += '<span id="vuelo" class="pull-right">Flight '+this['avion_numero']+' - Seguimiento: '+this['avionid']+'</span>';
                        html += '</div>';
                        html += '<div class="salida">Salida <span class="pull-right">Llegada</span></div>';
                        html += '<div class="hora">';
                        html += '<span class="fa fa-clock-o"></span> '+this['salida'];
                        html += '<div id="horaLegada" class="pull-right"><span class="fa fa-clock-o"></span> '+this['llegada']+'</div>';
                        html += '</div>'
                    	html += '</div>'
						thisavion = this['avion_aerocod']+this['avion_numero'];
						thissalida = this['salidae'];
				
						if(control_salidavuelos){
						if(this['salidae'] != control_salidavuelos){
							schedule("Cambio en Intinerario de Su Vuelo","Nueva salida estimada: "+this['salidae'],"2");
							localStorage.setItem("mem_salidavuelos", this['salidae']);
						}}else{localStorage.setItem("mem_salidavuelos", this['salidae']);}
						console.log("SALIDA E " + this['salidae']);
						if(control_estadovuelos){
						if(this['estado'] != control_estadovuelos){schedule("Cambio de estado de su Vuelo","Nuevo estado de su vuelo: "+this['estado'],"3");
						localStorage.setItem("mem_estadovuelos", this['estado']);
						}}else{localStorage.setItem("mem_estadovuelos", this['estado']);}
	 
	 var control_vuelosseg = localStorage.getItem("mem_vuelosseg");	
			console.log("control de inicio: " + control_vuelosseg);
	if(control_vuelosseg){
		var vuelos_seg = control_vuelosseg;}else{
		var vuelos_seg = $("#v_flip").val();}	
		localStorage.setItem("mem_vuelosseg", vuelos_seg);
		console.log("control de seg: " + vuelos_seg);
		if($("#v_flip").val() == "si"){	
		seguimientovuelos();}
	 
	 });
	 					if(thisavion){
						localStorage.setItem("mem_vuelosnum", thisavion);}else{
							html = '';
							html += '</br><div class="introForm" style=" allign:center; width: 90%;"">';
							html += '<p>Ops! No hemos podido encontrar tu vuelo, quizas no colocaste el codigo de la aerol&iacute;nea (las primeras dos letras del # de vuelo.) o el vuelo ya ha salido, recuerda que solo monitoreamos salidas del Aeropuerto Internacional el Dorado de Bogota del Dia en Curso (Hoy).</p></div>';}
							html += '</br></br><button type="submit" onClick="tryagvuelos()" class="btnCheckIn"><span class="checkIn">Buscar otro Vuelo</span></button>';
	 $('#infoxvuelo').html(html);
	 
	 var thisnow = new Date();
	 var thissalidad = new Date(thissalida);
	 var thisdifference = thissalidad.getTime() - thisnow.getTime();
	 var thisresultInMinutes = Math.round(thisdifference / 60000);
	 if(thisresultInMinutes <= 0){return true;}
	 console.log('Parar Info: '+thisresultInMinutes+thissalidad+thisnow);
	 }
}

		

function pollFunc(fn, timeout, interval) {
    var startTime = (new Date()).getTime();
    interval = interval || 1000,
    canPoll = true;

    (function p() {
        canPoll = ((new Date).getTime() - startTime ) <= timeout;
        if (!fn() && canPoll)  { // ensures the function exucutes
            setTimeout(p, interval);
        }
    })();
}



function seguimientovuelos(){

	var control_salidavuelos = localStorage.getItem("mem_salidavuelos");
	var control_vuelosseg = localStorage.getItem("mem_vuelosseg");
console.log('seg fechae del vuelo '+control_salidavuelos +' sEG ? '+control_vuelosseg);
if(control_vuelosseg == 'si'){

var startTime = new Date(); 
var endTime = new Date(control_salidavuelos);
console.log(endTime+' menos '+startTime);
//console.log(endTime.getTime()+' menos '+startTime.getTime());
var difference = endTime.getTime() - startTime.getTime(); // milisegundos
var resultInMinutes = Math.round(difference / 60000);
console.log('seg diffmins: '+resultInMinutes);

endTime.setMinutes(endTime.getMinutes() - 720);

if(resultInMinutes < 720 && resultInMinutes > 0){
 pollFunc(handle_vuelos, 43200000, 60000);console.log('Mandande seg handle');localStorage.setItem("mem_resultInMinutes",resultInMinutes);}else{
	  console.log('Usted solo puede ser alertado sobre cambios en su vuelo desde: '+ endTime +', es decir 12 Horas antes de su vuelo.'); localStorage.setItem("mem_vuelosseg", "no");}

}

} 


function minimoparaseg(){
	
	var control_salidavuelos = localStorage.getItem("mem_salidavuelos");
	var control_vuelosseg = localStorage.getItem("mem_vuelosseg");
console.log('min seg fechae del vuelo '+control_salidavuelos +' sEG ? '+control_vuelosseg);
if(control_vuelosseg == 'si'){

var startTime = new Date(); 
var endTime = new Date(control_salidavuelos);
console.log(endTime+' menos '+startTime);
//console.log(endTime.getTime()+' menos '+startTime.getTime());
var difference = endTime.getTime() - startTime.getTime(); // This will give difference in milliseconds
var resultInMinutes = Math.round(difference / 60000);
console.log('min seg diffmins: '+resultInMinutes);

		var minimoparaseg = localStorage.getItem("mem_resultInMinutes") - resultInMinutes;
	console.log("diferencia para continuar seg "+ minimoparaseg);		
		if(minimoparaseg > 1){
			seguimientovuelos();
		}
}
}



function tryagvuelos() {localStorage.setItem("mem_vuelosnum", "");localStorage.setItem("mem_estadovuelos", "");localStorage.setItem("mem_salidavuelos", "");localStorage.setItem("mem_vuelosseg", "");document.location.href = "tools.html";}



 function print_cuenta()
{
	var control_room_cuenta = localStorage.getItem("roomdb");
	var control_nombre_cuenta = localStorage.getItem("nombredb");
	var control_folio_cuenta = localStorage.getItem("foliodb");
	var control_llegada_cuenta = localStorage.getItem("llegadadb");
		                        
						$.get("http://190.145.24.146/app/cuenta.php",{nombre: control_nombre_cuenta,room: control_room_cuenta, folio: control_folio_cuenta, llegada: control_llegada_cuenta}, cuentares, "jsonp");
 function cuentares(respuesta){
	 
	 
	 html ='';
var myarr = control_nombre_cuenta.split(" ");
var saludacion = 'Sr(a) '+myarr[0] + " " + myarr[1];
						
						console.log("parseo respuesta cuenta: " + saludacion);
						html +='<div class="nombreUsuario">'+saludacion+'</div>';	 	 
		 if(respuesta){

						html += '<div class="roomUsuario">Room: '+control_room_cuenta+'</div>';

						}else{
						html +='<div class="roomUsuario"> No Registra Cargos a su Cuenta en el Momento </div>';
						}
											
						html +='<table class="table table-condensed">';
						html += '<tr class="headCuenta">';
						html += '<td>Servicio</td>';
						html += '<td>Fecha</td>';
						html += '<td>Cant.</td>';
						html += '<td>Total</td>';
						html += '</tr>';
	 $.each(respuesta, function() {

						html += '<tr class="datosCuenta">';
						html += '<td>'+this['cargo']+'</td>';
                        html += '<td>'+this['fecha']+'</td>';
                        html += '<td>1</td>';
                        html += '<td>$ '+this['precio']+'</td>';
						html += '</tr>';
                                            
                     
                        
                            
	 
	 });
	                    
						html += '</table>';
	 $('#print_cuenta').html(html);
	 }
}

function print_encuestas()
{
	var control_encuestascodigo = localStorage.getItem("mem_encuestascodigo");
	if (control_encuestascodigo) {
		location.href = "respuestas.html#encuestas";
							console.log("encuesta ya enviada " + control_encuestascodigo);
		
		}
						
						else{
						document.location.href = "request.html#encuestas";	
						}
						
                          
}

function handle_encuestas()
{
	

 var nombre_encuestas = localStorage.getItem("nombredb");
 var room_encuestas = localStorage.getItem("roomdb");
 var en1 = $("input[name=en1]:checked").val();
 var en2 = $("input[name=en2]:checked").val();
 var en3 = $("input[name=en3]:checked").val();
 var en4 = $("input[name=en4]:checked").val();
 var en5 = $("input[name=en5]:checked").val();
 var en6 = $("input[name=en6]:checked").val();
 var en7 = $("input[name=en7]:checked").val();
 var en8 = $("input[name=en8]:checked").val();
 var en9 = $("input[name=en9]:checked").val();
 var en10 = $("input[name=en10]:checked").val();
 var en11 = $("input[name=en11]:checked").val();
 var en12 = $("input[name=en12]:checked").val();
 var en13 = $("input[name=en13]:checked").val();
 var en14 = $("input[name=en14]:checked").val();
 var en15 = $("input[name=en15]:checked").val();
 var en16 = $("input[name=en16]:checked").val();
 var en17 = $("input[name=en17]:checked").val();
 var en18 = $("input[name=en18]:checked").val();
 var en19 = $("input[name=en19]:checked").val();
  
 var encuestas_comentarios = $('[name=comentariosen]').serialize();
 
 
 $.get("http://190.145.24.146/app/encuestas.php",{room: room_encuestas, nombre: nombre_encuestas, en1: en1, en2: en2, en3: en3, en4: en4, en5: en5, en6: en6, en7: en7, en8: en8, en9: en9, en10: en10, en11: en11, en12: en12, en13: en13, en14: en14, en15: en15, en16: en16, en17: en17, en18: en18, en19: en19, comentarios: encuestas_comentarios}, encuestassres, "jsonp");

 function encuestassres(respuesta){
				        var encuestas_codigosolicitud = respuesta.codigosolicitud;
                                              localStorage.setItem("mem_encuestascodigo", encuestas_codigosolicitud);
						console.log("Se envio solicitud de encuestas: " + encuestas_codigosolicitud);
						location.href = "respuestas.html#encuestas";
						}
 						
 
	   
}						

function handle_reserva()
{
	var control_encuestascodigo = localStorage.getItem("mem_encuestascodigo");
	var reserva_llegada = $("#llegada_reserva").val();
	var reserva_salida = $("#salida_reserva").val();
	
	
	window.open('https://gc.synxis.com/rez.aspx?Hotel=58762&Chain=10237&shell=BOGLS2&locale=es-es&arrive='+reserva_llegada+'&depart='+reserva_salida+'&adult=1&child=0', '_system');
	
	                     
}                       

function handle_reservas_serv()
{
	 var nombre_res_serv = localStorage.getItem("nombredb");
 var room_res_serv = localStorage.getItem("roomdb");
 var taxi = $("input[name=taxi]:checked").val();
 var res_res = $("input[name=res_res]:checked").val();
 var res_salon = $("input[name=res_salon]:checked").val();
 var res_spa = $("input[name=res_spa]:checked").val();
 var res_serv_comentarios1 = $("#res_taxi_comentarios").val();
 var res_serv_comentarios2 = $("#res_salon_comentarios").val();
 var res_serv_comentarios3 = $("#res_spa_comentarios").val();
 var res_serv_comentarios4 = $("#res_res_comentarios").val();
 var res_serv_hora1 = $("#res_taxi_hora").val();
 var res_serv_hora2 = $("#res_salon_hora").val();
 var res_serv_hora3 = $("#res_spa_hora").val();
 var res_serv_hora4 = $("#res_res_hora").val();
	
$.get("http://190.145.24.146/app/res_serv.php",{room: room_res_serv, nombre: nombre_res_serv, taxi: taxi, res: res_res, salon: res_salon, spa: res_spa, comentarios: res_serv_comentarios1+res_serv_comentarios2+res_serv_comentarios3+res_serv_comentarios4 , hora: res_serv_hora1+res_serv_hora2+res_serv_hora2+res_serv_hora4}, res_serv_res, "jsonp");

 function res_serv_res(respuesta){
				        var resserv_codigosolicitud = respuesta.codigosolicitud;
                                              localStorage.setItem("mem_resservcodigo", resserv_codigosolicitud);
						console.log("Se envio solicitud reserva cod: " + resserv_codigosolicitud);
						location.href = "respuestas.html#res_reservasserv";
						}
}       

function pre_login()
{
	 
 var pre_reserv = $("#pre_reserv").val();
 var pre_identi = $("#pre_identi").val();
 var pre_expedi = $("#pre_expedi").val();
 var pre_nombre = $("#pre_nombre").val();
 var pre_direcc = $("#pre_dire").val();
 var pre_ciudad = $("#pre_ciudad").val();
 var pre_nacion = $("#pre_nacionalidad").val();
 var pre_telefo = $("#pre_tel").val();
 var pre_empres = $("#pre_empresa").val();
 var pre_oficio = $("#pre_oficio").val();
 var pre_email = $("#pre_email").val();
 var pre_nacimi = $("#pre_nacimiento").val();
 var pre_llegad = $("#pre_llegada").val(); 
 var pre_salida = $("#pre_salida").val();
 var pre_famili = $("#pre_familiar").val();
 var res_credit = $("#pre_credito").val();
 var pre_coment = $("#pre_comentarios").val();
	
$.get("http://190.145.24.146/app/pre_checkin.php",{reserv: pre_reserv, identi: pre_identi, expedi: pre_expedi, nombre: pre_nombre, direcc: pre_direcc, cuidad: pre_cuidad, nacion: pre_nacion, telefo: pre_telefo, empres: pre_empres, oficio: pre_oficio, email: pre_email, nacimi: pre_nacimi, llegad: pre_llegad, salida: pre_salida, famili: pre_famili, credit: pre_credit, coment: pre_coment}, pre_checkin, "jsonp");

 function pre_checkin(respuesta){
				        var precheckin_codigosolicitud = respuesta.codigosolicitud;
                                              
						console.log("Se envio precheckin cod: " + precheckin_codigosolicitud);
						location.href = "log.html#res_pre";
						}
}       




   
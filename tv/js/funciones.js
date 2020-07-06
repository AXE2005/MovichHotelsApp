
function print_vuelos()
{
	$.showLoading({name: 'circle-fade',allowHide: true}); 
//	alert ("inicio vuelos");
	var control_name_vuelos = localStorage.getItem("nombredb");
	var registro = localStorage.getItem("mem_registro");


	
						$.get("http://"+registro+"/servicios/vuelos.php",{nombre: control_name_vuelos}, vuelosres, "jsonp");
 function vuelosres(respuesta){
	 
	 console.log("parseo respuesta vuelos solos: " + respuesta);
	 html ='';
	 html +='<div class="introForm" style=" allign:center; width: 90%;"><p>Mostrando los vuelos salientes del aeropuerto local en la pr&oacute;xima hora:</p><br></div>';
	 $.each(respuesta, function() {
	 html +='<div id="infoVuelo">';
	 html += '<div class="aerolinea">'+this['aerolinea'];
						if(this['delays']){
						html += '<span id="vuelo" class="pull-right">Vuelo Retrasado '+this['delays']+' Minutos</span></div>';
						}else{
							html += '<span id="vuelo" class="pull-right">Estado: '+this['estado']+'</span></div>';
						}
						html += '<div class="destino">'+this['avion_salida']+' - '+this['avion_destino']+' / '+this['minutosalaire'];
                        html += '<span id="vuelo" class="pull-right">Flight '+this['avion_numero']+'</span>';
                        html += '</div>';
                        html += '<div class="salida">Salida <span class="pull-right">Llegada</span></div>';
                        html += '<div class="hora">';
                        html += '<img src="imagesjv/icon_horario_vuelos.svg" width="20px"></img> '+this['salida'];
                        html += '<div id="horaLegada" class="pull-right"><span class="fa fa-clock-o"></span> '+this['llegada']+'</div>';
                        html += '</div>'
                    	html += '</div>'
	 
	 });
	 
	 //localStorage.setItem("mem_vueloshtml", html);
	 
	 
  		var animation="slideInRight";
  		$("#variableContent").hide();
		$("#mainContent").hide();
  		$("#varTitle").html("Salidas de Vuelos");

		//$("#varImage").hide();
		$("#varText").html(html);
					
  		if(!$('#variableContent').is(':visible')){
  			$("#variableContent").addClass('animated '+animation);
  			$("#variableContent").show();	       
            //wait for animation to finish before removing classes
            window.setTimeout( function(){
                $("#variableContent").removeClass('animated '+animation);
            }, 1000);
        }
		$.hideLoading();
  	
	 
	 
	 
	 //}
	}
}


function print_cuenta(){
	$.showLoading({name: 'circle-fade',allowHide: true});
var control_reserva = localStorage.getItem("mem_reserva");
var control_room = localStorage.getItem("mem_room");
	var registro = localStorage.getItem("mem_registro");
console.log("pido cuenta datos: " +control_reserva +" hab: "+ control_room);

						$.get("http://"+registro+"/servicios/cuenta.php",{reserva: control_reserva,room: control_room}, cuentares, "jsonp");
 function cuentares(respuesta){
	 html ='';
	 var totalc = 0;
	 html +='<div class="col-md-12">Estado de cuenta para reserva  # '+control_reserva+':</div>';
	 $.each(respuesta, function() {
	 html += '<div class="row border-bottom"> <div class="col-md-7">'+this['cargo']+'</div> <div class="price col-md-5 float-right">'+this['precio']+'</div> </div>';
	 var totaltempnum = this['precio'].replace(/\D/g, '');
	 var totaltempint = parseInt(totaltempnum);
 	 var totalc = totalc + totaltempint;
	 });
	 if (totalc > 0){
	 	html += '<div class="row total"> <div class="col-md-7 text-shadow-large"><strong>Total:</strong></div> <div class="price col-md-5 float-right">$'+totalc+'</div> </div>';
	}else{
		html += '<br><div class="col-md-12 text-center"></div>';
	}

	 $("#cuenta").html(html);
	 $.hideLoading();
	 
 }
	
}

function goservicios(servicio) {
  //console.log("goservicios");
  var control_room = localStorage.getItem("mem_room");
  var control_nombre = localStorage.getItem("mem_nombre");
  var opcion = $( "#serv_opcion option:selected" ).text();
  var com = $( "#serv_commentarios").val();
  var registro = localStorage.getItem("mem_registro");
  
  console.log("opcion "+opcion+" com "+com);
  if (servicio == "Ama de llaves") {
  $.get("http://"+registro+"/controller/crear_mucama.php",{opcion: opcion,com: com,room: control_room, nombre: control_nombre}, res, "jsonp");
	function res(respuesta){var cod = respuesta.codigosolicitud;console.log(cod);};
  }
  if (servicio == "Conserjeria") {
  $.get("http://"+registro+"/controller/crear_conserje.php",{opcion: opcion,com: com,room: control_room, nombre: control_nombre}, res, "jsonp");
	function res(respuesta){var cod = respuesta.codigosolicitud;console.log(cod);};
  }
  if (servicio == "Mantenimiento") {
  $.get("http://"+registro+"/controller/crear_mantenimiento.php",{opcion: opcion,com: com,room: control_room, nombre: control_nombre}, res, "jsonp");
	function res(respuesta){var cod = respuesta.codigosolicitud;console.log(cod);};
  }
  
  
  
  var msg="<p>Se ha realizado su solicitud de "+servicio+" para "+opcion+" con &eacute;xito.</p><p>Estamos procesandola y enviandola al departamento adecuado. Recibir&aacute; un mensaje de notificaci&oacute;n cuando &eacute;esta sea aceptada y se encuentre en proceso.</p>";
  
  showMessage(msg,true);
  var animation="slideInRight";
  $("#variableContent").hide();
  $("#mainContent").hide();
  if(!$('#mainContent').is(':visible')){
  			$("#mainContent").addClass('animated '+animation);
  			$("#mainContent").show();	       
            //wait for animation to finish before removing classes
            window.setTimeout( function(){
                $("#mainContent").removeClass('animated '+animation);
            }, 1000);
    }

}

function showMessage(message,autoclose){
  $('#messageTitle').html("Resumen de orden");
  $('#messageBody').html("<p>"+message+"</p>");
  $('#myModal').modal('show');
  if(autoclose){
    window.setTimeout( function(){
        $('#myModal').modal('hide');
    }, 6000);
  }
}




function ajustes(){
			localStorage.setItem("conf",(parseInt(localStorage.getItem("conf","1")+1)));
			if (localStorage.getItem("conf") == "11111") {location.href="./apps.html";} 
}

function abrir_loader(){
	$('.page-change-preloader').addClass('show-change-preloader');
}

function cerrar_loader(){
	$('.page-change-preloader').removeClass('show-change-preloader');
}

function salir(){

localStorage.removeItem('mem_reserva');
location.href = "index.html";
	
}

setTimeout(cerrar_loader, 1000);
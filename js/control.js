// controlador de qr

function handleQR(data){
	
	var datos = data;
	console.log("Esto es loq ue bota esa vaina: "+datos);

//{"smartqr" : [{"hotel" : "10010","hab" : "211"}]}

var obj = jQuery.parseJSON(datos);
var hotelqr = obj.smartqr[0].hotel;
var habqr = obj.smartqr[0].hab;
console.log("hab y hotel: "+habqr+hotelqr);

	function loginh()
{
         localStorage.setItem("roomdb", habqr);	
		 console.log("hotel: "+hotelqr);
		 
 $.get("http://190.145.24.146/app/hotel_login.php",{id_hotel: hotelqr}, loginresx, "jsonp");
 
 function loginresx(respuesta){
				if (respuesta.licencia != "" && respuesta.licencia != "no") {
                        var licencia = respuesta.licencia;
                        var alias = respuesta.alias;						
					                            localStorage.setItem("mem_licencia", licencia);
												localStorage.setItem("mem_alias", alias);
						console.log("Acceso a hotel" + alias);
		
						//document.location.href = "hotel.html";
                    } else {
						console.log("Acceso denegado" + respuesta);
                        alert("Hotel no encontrado, porfavor solicita el código de tu hotel en recepción... Gracias!");
						document.location.href = "index.html#page2";
                           }
				
				    }

}

 	   	function loginr()
{                     
						$.get("http://190.145.24.146/app/busquedaqr.php",{room: habqr}, loginres2, "jsonp");
 function loginres2(respuesta){
	 
	var largo = respuesta.length;
	console.log("# de huespedes: " + largo);
	 html ='';
				var nombreloop = "'"+this['nombre']+"'";
		
						console.log("parseo respuesta loginr: " + respuesta);
		 if(respuesta){

						html += '<div class="roomUsuario">Habitaci&oacute;n registrada y ocupada.</div>';

						}else{
						html +='<div class="roomUsuario"> Habitaci&oacute;n no Ocupada. </div>';
						}
											
						html +='<table class="table table-condensed">';
						html += '<tr class="headCuenta">';
						html += '<td>Porfavor haga click en su nombre para seguir:</td>';
						html += '</tr>';
	 $.each(respuesta, function() {
						

						html += '<tr class="datosCuenta">';
						html += '<td>'+this['nombre']+'<button class="btnIntro btn-sm" data-theme="a" style=" color:#FFF;" onClick="loginqr('+nombreloop+')">Soy Yo.</button></td>';
						html += '</tr>';
                                  
                     
                        
                            
	 
	 });
	                    
						html += '</table>';
	 $('#print_qr').html(html);
	 document.location.href = "index.html#qr";
	 }}



	function loginhotelonly()
{
		 console.log("hotel: "+hotelqr);
		 
 $.get("http://190.145.24.146/app/hotel_login.php",{id_hotel: hotelqr}, loginresy, "jsonp");
 
 function loginresy(respuesta){
				if (respuesta.licencia != "" && respuesta.licencia != "no") {
                        var licencia = respuesta.licencia;
                        var alias = respuesta.alias;						
					                            localStorage.setItem("mem_licencia", licencia);
												localStorage.setItem("mem_alias", alias);
						console.log("Acceso a hotel" + alias);
		
						document.location.href = "hotel.html";
                    } else {
						console.log("Acceso denegado" + respuesta);
                        alert("Hotel no encontrado, porfavor solicita el código de tu hotel en recepción... Gracias!");
						document.location.href = "index.html#page2";
                           }
				
				    }

}


function loginqr(nombreqr)
{
           var pass = nombreqr;
		   var user = localStorage.getItem("roomdb");		
 $.get("http://190.145.24.146/app/testoi.php",{username: user, password: pass }, loginres2, "jsonp");
 
 function loginres2(respuesta){
				if (respuesta.room != "no") {
						var nom_db = respuesta.nombre;
						var fol_db = respuesta.folio;
						var sal_db = respuesta.salida;
						var lle_db = respuesta.llegada;	

												localStorage.setItem("nombredb", nom_db);
												localStorage.setItem("foliodb", fol_db);
												localStorage.setItem("salidadb", sal_db);
												localStorage.setItem("llegadadb", lle_db);					
						console.log("logeado QR Sr" + nom_db);
						document.location.href = "hotelLog.html";
                    } else {
						console.log("Acceso denegado QR" + respuesta);
                        document.location.href = "hotel.html";
                           }
				
				    }
}


if(hotelqr){
if(habqr){loginh();loginr();}else{loginhotelonly();}}
				
}






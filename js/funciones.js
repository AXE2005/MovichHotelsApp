//Vamo q vamo papu


function controlIntro(){

		var intro = localStorage.getItem("mem_intro");
		var huesped = localStorage.getItem("mem_reserva");
		
		if (intro == null){
			localStorage.setItem("mem_intro","bienvenido");
			location.href = "./intro.html";
		}
		
		if (huesped != null){
			location.href = "./index_huesped.html";
		}

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

function huesped(){
		
		var room_form = $("#room").val();
		var nombre_form = $("#nombre").val();
		var registro = $('#select-beast').val();
		localStorage.setItem("mem_registro",registro);
		
		$.get("http://"+registro+"/servicios/room.php",{room: room_form, nombre: nombre_form}, tvres, "jsonp");
 
		function tvres(respuesta){
	 
			console.log("parseo respuesta header y contenido ");
			
			var room = respuesta.room;
			if (room != "no"){
			
			var contenido = respuesta.contenido;
			var reserva = respuesta.reserva;
			var nombre = respuesta.nombre;
			var mensajes = respuesta.mensajes;
			var salida = respuesta.salida;
			var llegada = respuesta.llegada;
			var idioma = respuesta.idioma;
			
			localStorage.setItem("mem_contenido", contenido);
			localStorage.setItem("mem_romm", room);
			localStorage.setItem("mem_reserva", reserva);
			localStorage.setItem("mem_nombre", nombre);
			localStorage.setItem("mem_llegada", llegada);
			localStorage.setItem("mem_salida", salida);
			localStorage.setItem("mem_mensajes","[]");

			if (idioma == "es"){localStorage.setItem("mem_lenguaje", idioma)}else{localStorage.setItem("mem_lenguaje", null)};

			$('.menu-header').html(contenido);
			location.href = "./index_huesped.html";
			
			} else {
				$("#war").click();
			}
		
		}
	}
	
	function ir(donde){
		window.location.href = donde;
	}
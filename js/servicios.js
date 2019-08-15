// JavaScript Servicios
document.addEventListener('deviceready', function () {				
			
			var control_notificar = localStorage.getItem("notificaciones");
			
			if(!control_notificar){
			localStorage.setItem("notificaciones", "si");
			control_notificar = "si";
			}
			
			if(control_notificar == "si"){
			minimoparaseg();
			console.log("mande minimo seg");
			var not_chat = localStorage.getItem("not_chat");
			
			if(not_chat == "si"){
				checknot_chat();
				}
							console.log("pregunte si esta el chat o no "+not_chat); 
										
			var controln_lavanderiacodigo = localStorage.getItem("mem_lavanderiacodigo");
			if(controln_lavanderiacodigo){
				checknot_lavanderia();}
			
			
			
			}
			
		//$("a[href]").attr("onClick", "cargando()");
				

	}, false);
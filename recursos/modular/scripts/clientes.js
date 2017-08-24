//Las validaciones de aqui las quité del archivo validation.js y las puse aca pa que no se carguen a cada rato en todos lados

FuncionesClientes = {}

//funcion pensada como funcion para el modulo de clientes el cual muestra un formulario en un modal
//para editar los datos de un cliente
FuncionesClientes["editClient"] = function () {
	var divpadre = this.parentNode
	var divButton = divpadre.parentNode
	var datos = divButton.parentNode.getElementsByTagName("td")
	var formhtml = '<form id="editForm" action="/admin/editClient" method="post" style="text-align: left;">'+
	'<label style="text-align: left;">Ruc/Cédula: </label>'+
	'<input class="mdl-textfield__input" name="Ced_Clien" id="Ced_Clien" type="text" value="'+datos[0].innerHTML+'" readonly="true"><br>'+
	'<label>Nombres</label>'+
	'<input class="mdl-textfield__input" name="Nomb_Clien" id="Nomb_Clien" type="text" value="'+datos[1].innerHTML+'"><br>'+
	'<label>Direccion</label>'+
	'<input class="mdl-textfield__input" name="DirCiud_Clien" id="DirCiud_Clien" type="text" value="'+datos[2].innerHTML+'"><br>'+
	'<label>Numero Convencional</label>'+
	'<input class="mdl-textfield__input" name="Telf_Clien" id="Telf_Clien" type="text" value="'+datos[3].innerHTML+'"><br>'+
	'<label>Correo Electronico</label>'+
	'<input class="mdl-textfield__input" name="CorElec_Clien" id="CorElec_Clien" type="text" value="'+datos[4].innerHTML+'"><br>'+
	'<label>Tipo Cliente</label>'+
	'<select class="mdl-textfield__input" name="Tipo_Clien" id="Tipo_Clien" value="'+datos[5].innerHTML+'">'+
		'<option value="Ocasional">Ocasional</option>'+
		'<option value="Premium">Premium</option>'+
	'</select><br>'+
	'<label>Porcentaje Descuento</label>'+
	'<select class="mdl-textfield__input" name="PorcDesc_Clienvalue" id="PorcDesc_Clienvalue"  value="'+datos[6].innerHTML+'">'+
	'<option value="0">0</option>'+
	'<option value="5">5</option>'+
	'</select>'+
	'</form>'
	swal({
		  	title: 'Datos Cliente',
		 	html: formhtml,
		  	showCancelButton: true,
		  	confirmButtonText: 'Guardar',
		  	closeOnConfirm: false
		},
		function(isConfirm) {
		  	if (isConfirm) {
		  		var divs = document.getElementsByTagName("div")
		  		var form;
		  		for (var i = 0; i < divs.length; i++) {
		  			if (divs[i].className=="sweet-content") {
		  				if (divs[i].firstChild.id=="editForm") {
		  					form=divs[i].firstChild;
		  					break;
		  				};
		  			};
		  		};
		  		console.log(form)
		  		var bool;
		  		if (form) {bool = ValidarDatosFormulario(form,true)}
		  		if (form && !bool) {
		  			document.getElementById("labelFormModal").style.display="block";
		  			return false;
		  		};
		    	swal({
			  	title: '¿Seguro que desea modificar los datos del Cliente?',
			  	type: 'warning',
			  	showCancelButton: true,
			  	confirmButtonText: 'Si',
			  	cancelButtonText:'No'

				},
				function(isConfirm) {
				  	if (isConfirm) {
		  				document.body.appendChild(form);
		  				form.submit();
				  	}
				}); 
		  	}
		});
}

//funcion pensada como funcion para el modulo de clientes el cual muestra un formulario en un modal
//para borrar los datos de un cliente
FuncionesClientes["deleteClient"] = function () {

	var divpadre = this.parentNode
	var divButton = divpadre.parentNode
	var datos = divButton.parentNode.getElementsByTagName("td")
	var infoHTML = '<form id="deleteForm" action="/admin/deleteClient" method="post">'+
	'<label>Cedula: '+datos[0].innerHTML+'</label><br><label>Nombre: '+datos[1].innerHTML+'</label>'+
	'<input type="hidden" name="Ced_Clien" id="Ced_Clien" type="number" value="'+datos[0].innerHTML+'" >'+
	'</form>'
	swal({
	  	title: '¿Seguro que desea eliminar los datos del cliente?',
	  	html: infoHTML,
	  	type: 'warning',
	  	showCancelButton: true,
	  	confirmButtonText: 'Si'

	},
	function(isConfirm) {
	  	if (isConfirm) {
	  		var divs = document.getElementsByTagName("div")
		  		var form;
		  		for (var i = 0; i < divs.length; i++) {
		  			if (divs[i].className=="sweet-content") {
		  				if (divs[i].firstChild.id=="deleteForm") {
		  					form=divs[i].firstChild;
		  					break;
		  				};
		  			};
		  		};
		  	if (form) {
		  		document.body.appendChild(form);
		  		form.submit()
		  	};
	  	}
	}); 
}

FuncionesClientes["saveClient"] = function (e){
	e.preventDefault();
	var form = this.form
	if (!form) {return false}
	var bool = ValidarDatosFormulario(form);
	if (bool){ 
	swal({
		  	title: 'Formulario Válido',
		  	type: 'success',
		  	text:"Se guardarán los datos correctamente",
		  	showCancelButton: true,
		  	confirmButtonText: 'Ok',
		  	closeOnConfirm: true
		},
		function(isConfirm) {
		  	if (isConfirm) {
		  		form.submit();
		  	}
		  	else{
		  		return false;
		  	}
		});
	}
}

FuncionesClientes["init"] = function (argument) {
	var elements=[]
	var inputs = document.getElementsByTagName("input");
	var button = document.getElementsByTagName("button");
	var divs = document.getElementsByTagName("div");
	for (var i = 0; i < inputs.length; i++) {elements.push(inputs[i])};
	for (var i = 0; i < button.length; i++) {elements.push(button[i])};
	for (var i = 0; i < divs.length; i++) {elements.push(divs[i])};
	for (var i = 0; i < elements.length; i++) {
			var atributo = elements[i].getAttribute("validation") || false;
			if ( atributo && FuncionesClientes[atributo] ){
			var evento = elements[i].getAttribute("event") || false;
			if (evento) {
				var arrayEvent = evento.split(",")
				if (arrayEvent.length > 1) {
					for (var i = 0; i < arrayEvent.length; i++) {
						elements[i].addEventListener(arrayEvent[i],FuncionesClientes[atributo]);
					};
				}
				else{
					elements[i].addEventListener(evento,FuncionesClientes[atributo]);
				}
			}
			elements[i].addEventListener("change",FuncionesClientes[atributo]);
		}
	}
}	
FuncionesClientes.init();
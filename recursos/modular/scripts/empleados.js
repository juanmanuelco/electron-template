function alertaOferta(input, val) {
	var imagenAnterior = document.getElementById('img_destino').src;
	if ((val / 1024) > 300) {
		document.getElementById('centralMensajes').innerHTML = '<div class="alert alert-danger">Esta imágen pesa mas de 300kb</div>';
		document.getElementById('file_url').value = ''
		$('#esconder').css("display", "none")
		document.getElementById('img_destino').src = imagenAnterior;
	} else {
		$('#esconder').css("display", "block")
		if (input.files && input.files[0]) {
			var reader = new FileReader();
			reader.onload = function (e) {
				$('#img_destino').attr('src', e.target.result);
				document.getElementById('poder').style.display = 'block';
			}
			reader.readAsDataURL(input.files[0]);
		}
	}
}

FuncionesEmpleados={}

//funcion unicamente llamada en el modulo de empleado
//para editar datos del empleado se activa con el event click
FuncionesEmpleados["editEmpleado"] = function () {
	var divpadre = this.parentNode
	var divButton = divpadre.parentNode.parentNode
	var datos = divButton.parentNode.getElementsByTagName("td")
	var formhtml = '<form id="editForm" style="text-align: left;" action="/admin/empleados" method="post">'+
	'<div class="mdl-grid">'+
			'<div class="mdl-cell mdl-cell--4-col-phone mdl-cell--8-col-tablet mdl-cell--6-col-desktop">'+
				'<label class="text-condensedLight" style="font-size:20px;">Foto del empleado</label>'+
				'<div class="div_file btn">'+
					'<p class="texto">Escoger imágen (102x102) </p>'+
					'<input type="file" class="btn_enviar mdl-textfield__input" id="file_url" accept=".jpg,.png," name="image_producto" onchange="alertaOferta(this,this.files[0].size)" required/>'+
				'</div>'+
			'</div>'+
			'<div class="mdl-cell mdl-cell--4-col-phone mdl-cell--8-col-tablet mdl-cell--6-col-desktop">'+
				'<div id="poder" style="display: none;margin:0 auto; border:solid #000000; height:108px; width:108px;">'+
					'<img style="" src="" height="102px" width="102px" id="img_destino">'+
				'</div>'+
			'</div>'+
	'</div>'+
	'<label style="text-align: left;">Cédula: </label>'+
	'<input class="mdl-textfield__input"  name="Ced_Emp" id="Ced_Emp" type="number" value="'+datos[0].innerHTML+'" readonly="readonly"><br>'+
	'<label>Nombres</label>'+
	'<input class="mdl-textfield__input"  name="Nomb_Emp" id="Nomb_Emp" type="text" value="'+datos[1].innerHTML+'"><br>'+
	'<label>Telefono</label>'+
	'<input class="mdl-textfield__input" name="Telf_Emp" id="Telf_Emp" type="number" value="'+datos[2].innerHTML+'"><br>'+
	'<label>Turno</label>'+
	'<select class="mdl-textfield__input" name="Tur_Emp" id="Tur_Emp" value="'+datos[3].innerHTML+'">'+
		'<option>Matutino</option>'+
		'<option>Vespertino</option>'+
		'<option>Nocturno</option>'+
	'</select><br>'+
	'<label>Estado</label>'+
	'<select class="mdl-textfield__input" name="Estd_Emp" id="Estd_Emp"  value="'+datos[3].innerHTML+'">'+
		'<option>Disponible</option>'+
		'<option>No Disponible</option>'+
	'</select><br>'+
	'<label id="labelFormModal" style="display:none">Por favor asegurese que todos los datos del formulario son correctos </label>'+
	'<input type="hidden" value="Actualizar" name="accion" id="accion">'+
	'</form>'
	swal({
		  	title: 'Datos Empleados',
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
		  		var bool;
		  		if (form) {bool = ValidarDatosFormulario(form,true)}
		  		if (form && !bool) {
		  			document.getElementById("labelFormModal").style.display="block";
		  			return false;
		  		};
		    	swal({
			  	title: '¿Seguro que desea modificar los datos del Empleado?',
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

FuncionesEmpleados["saveEmpleado"] = function (e){
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

//funcion unicamente llamada en el modulo de empleado
//para editar datos del empleado se usa unicamente con el event click
FuncionesEmpleados["deleteEmpleado"] = function () {

	var divpadre = this.parentNode
	var divButton = divpadre.parentNode
	var datos = divButton.parentNode.getElementsByTagName("td")
	var infoHTML = '<form id="deleteForm" action="/admin/empleados" method="post"><label>Cedula: '+datos[0].innerHTML+
	'</label><br><label>Nombre: '+datos[1].innerHTML+'</label>';
	infoHTML+='<input type="hidden" name="Ced_Emp" id="Ced_Emp" type="number" value="'+
	datos[0].innerHTML+'" readonly="readonly"><input type="hidden" value="Eliminar" name="accion" id="accion"></form>';
	swal({
	  	title: '¿Seguro que desea eliminar los datos de este Empleado?',
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

/*
	PD: las FuncionesEmpleados de edit,delete fueron echas para crear formularios en modales de esos modulos
	por lo cual no es recomendable intentar usarlas en cosas que no sean tablas
*/

FuncionesEmpleados["init"] = function (argument) {
	var elements=[]
	var inputs = document.getElementsByTagName("input");
	var button = document.getElementsByTagName("button");
	var divs = document.getElementsByTagName("div");
	for (var i = 0; i < inputs.length; i++) {elements.push(inputs[i])};
	for (var i = 0; i < button.length; i++) {elements.push(button[i])};
	for (var i = 0; i < divs.length; i++) {elements.push(divs[i])};
	for (var i = 0; i < elements.length; i++) {
			var atributo = elements[i].getAttribute("validation") || false;
			if ( atributo && FuncionesEmpleados[atributo] ){
			var evento = elements[i].getAttribute("event") || false;
			if (evento) {
				var arrayEvent = evento.split(",")
				if (arrayEvent.length > 1) {
					for (var i = 0; i < arrayEvent.length; i++) {
						elements[i].addEventListener(arrayEvent[i],FuncionesEmpleados[atributo]);
					};
				}
				else{
					elements[i].addEventListener(evento,FuncionesEmpleados[atributo]);
				}
			}
			elements[i].addEventListener("change",FuncionesEmpleados[atributo]);
		}
	}
}	
FuncionesEmpleados.init();
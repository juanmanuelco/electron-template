/*
	Este script se ha construido para poder realizar funciones "globales" (en lo posible)
	en las cuales hallaremos validaciones echas para elementos html
	la forma de llamar estas funciones es simple, en el objeto html deberemos poner las siguientes
	etiquetas validation="nombre de funcion",event="nombre del evento con el cual se activara la funcion" 
	y otros atributos dependiendo las funciones ejemplo:
	input validacion cedula y ruc
	<input type="number" validation="cedruc" event="keyup">
	input validacion cedula 
	<input type="number" validation="cedula" event="keyup">
	input validacion ruc
	<input type="number" validation="ruc" event="keyup">
	busqueda de tablas con datos estaticos
	en este caso tabla ID es el id de la tabla donde se realizara la busqueda y datos son las columnas en las cuales 
	interacuta la busqueda
	<input type="text" class="search" validation="buscarTabla" event="keyup" TablaID="tablaProducts" datos="0,1,2">
	cada funcion tendrá un comentario para saber con que elementos han sido pensadas

	PD: a los que metan funciones nuevas aqui, sea para uso de modulo o que estén pensadas para todos, por favor,
	comentar las funciones así como lo he echo yo, para saber con que se puede usar y con que eventos

	PD2: las funciones echas para verificacion de cedula y ruc están con funciones de identificacion.js
	por lo cual se debe llamar a ese script antes de este si se van a usar estas validaciones
*/

Funciones = {};

Timers={};

spansTextBefore={}
//funcion cedruc pensada para usarla con inputs y con los eventos keyup, keypress
Funciones["cedruc"] = function (e) {
	var ekey="";
	if (e && e.key && (e.type=="change" || e.key == "e") ) { ekey=(e.key||"") };
	var span = this.parentNode.getElementsByTagName("span")[0]
	var cedula = this.value+""+ekey;
	if (cedula == "") {this.parentNode.classList.remove("is-invalid"); return false;};
	spansTextBefore[span] = span.innerHTML;
	span.innerHTML="Cedula/Ruc no valida/o";
	if (Timers[this]) {
		clearTimeout(Timers[this]);
	};
	if (!ident.validarCedula(cedula) && !ident.validarRuc(cedula)) {
		Timers[this] = setTimeout(function (a){
			a.parentNode.classList.add("is-invalid");
		},200,this);
	}
}


//funcion cedula pensada para usarla con inputs y con los eventos keyup, keypress
Funciones["cedula"] = function (e) {
	var ekey="";
	if (e && e.key && (e.type=="change" || e.key == "e") ) { ekey=(e.key||"") };
	var span = this.parentNode.getElementsByTagName("span")[0]
	var cedula = this.value+""+ekey;
	if (cedula == "") {this.parentNode.classList.remove("is-invalid"); return false;};
	spansTextBefore[span] = span.innerHTML;
	span.innerHTML= "Cedula no válida";
	if (Timers[this]) {
	clearTimeout(Timers[this]);};
	if (!ident.validarCedula(cedula)) {
		Timers[this] = setTimeout(function (a){
			a.parentNode.classList.add("is-invalid");
		},200,this);
	}
}


//funcion cedula pensada para usarla con inputs y con los eventos keyup, keypress
Funciones["ruc"] = function (e) {
	var ekey="";
	if (e && e.key && (e.type=="change" || e.key == "e") ) { ekey=(e.key||"") };
	var span = this.parentNode.getElementsByTagName("span")[0]
	var ruc = this.value+""+ekey;
	if (ruc == "") {this.parentNode.classList.remove("is-invalid"); return false;};
	spansTextBefore[span] = span.innerHTML;
	span.innerHTML= "Ruc no válido";
	if (Timers[this]) {
	clearTimeout(Timers[this]);};
	if (!ident.validarRuc(ruc)) {
		Timers[this] = setTimeout(function (a){
			a.parentNode.classList.add("is-invalid");
		},200,this);
	}
}

//funcion cedula pensada para usarla con inputs y con los eventos keyup, keypress
Funciones["email"] = function(e){	
	var ekey="";
	if (e && e.key && e.type=="change") { ekey=(e.key||"") };
	if (this.value+""+ekey =="") {this.parentNode.classList.remove("is-invalid"); return false;};
	var patt = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
	var res = patt.test(this.value+""+ekey);
	if (Timers[this]) {
	clearTimeout(Timers[this]);};
	if (!res) {
		Timers[this] = setTimeout(function (a){
			a.parentNode.classList.add("is-invalid");
		},200,this);
	};
}

//funcion inicializacion pensada para poder ser llamada en el caso de que se genere nuevos elementos html 
//desde javascript
Funciones["init"] = function (argument) {
	var elements = document.querySelectorAll( 'body *' );
	for (var i = 0; i < elements.length; i++) {
	var atributo = elements[i].getAttribute("validation") || false;
		if ( atributo && Funciones[atributo] ){
			var evento = elements[i].getAttribute("event") || false;
			//modificacion del codigo para poder agregar más de 1 evento a las funciones
			if (evento) {
				var arrayEvent = evento.split(",")
				if (arrayEvent.length > 1) {
					for (var i = 0; i < arrayEvent.length; i++) {
						elements[i].addEventListener(arrayEvent[i],Funciones[atributo]);
					};
				}
				else{
					elements[i].addEventListener(evento,Funciones[atributo]);
				}
			}
			elements[i].addEventListener("change",Funciones[atributo]);
			/*elements[i].addEventListener("paste", function (e) {
				e.preventDefault();
				return false;
			});*/
		}
		//Validacion de atributos solonum y solodecimal, por si se quiere usar estas 2 
		//funciones mientras se usa otra como por ejemplo cedula
		var solonum = elements[i].getAttribute("solonum") || false;
		if (solonum) {elements[i].addEventListener("keypress",Funciones["NumeroEntero"])};
		var solodecimal = elements[i].getAttribute("solodecimal") || false;
		if (solodecimal) {elements[i].addEventListener("keypress",Funciones["NumeroEntero"])};
	}
}

//funcion ocultar mostrar pensada para usarla con cualquier elemento usando el metodo click 
//la funcion oculta elementos con el atributo ocultarID="id1,id2,...,idn" para ocultar secciones enteras
// y la funcion mostrarID="id1,id2,id3,...,idn" hace lo mismo para mostrar secciones
Funciones["ocultarmostrar"] = function (e) {
	e.preventDefault();
	var mostrarID = this.getAttribute("mostrarID")||false;
	if (mostrarID) {
	var arrayMID = mostrarID.split(",")
		if (arrayMID.length > 1) {
			for (var i = 0; i < arrayMID.length; i++) {
				document.getElementById(arrayMID[i]).style.display="block";
			};
		}
		else{
			document.getElementById(mostrarID).style.display="block";
		}
	}

	var ocultarID = this.getAttribute("ocultarID")||false;
	if (ocultarID) {
		var ocultarMID = ocultarID.split(",")
		if (ocultarMID.length>1) {
			for (var i = 0; i < ocultarMID.length; i++) {
				document.getElementById(ocultarMID[i]).style.display="none";
			};
		}
		else{
			document.getElementById(ocultarID).style.display="none"
		}
	};
}

//funcion pensada como funcion para el modulo de clientes el cual muestra un formulario en un modal
//para editar los datos de un cliente
Funciones["editClient"] = function () {
	var divpadre = this.parentNode
	var divButton = divpadre.parentNode
	var datos = divButton.parentNode.getElementsByTagName("td")
	var formhtml = '<form style="text-align: left;">'+
	'<label style="text-align: left;">Ruc/Cédula: </label>'+
	'<input class="mdl-textfield__input" type="number" value="'+datos[0].innerHTML+'" disabled="true"><br>'+
	'<label>Nombres</label>'+
	'<input class="mdl-textfield__input" type="text" value="'+datos[1].innerHTML+'"><br>'+
	'<label>Direccion</label>'+
	'<input class="mdl-textfield__input" type="text" value="'+datos[2].innerHTML+'"><br>'+
	'<label>Numero Convencional</label>'+
	'<input class="mdl-textfield__input" type="text" value="'+datos[3].innerHTML+'"><br>'+
	'<label>Correo Electronico</label>'+
	'<input class="mdl-textfield__input" type="text" value="'+datos[4].innerHTML+'"><br>'+
	'<label>Tipo Cliente</label>'+
	'<select class="mdl-textfield__input" value="'+datos[5].innerHTML+'">'+
		'<option>Ocasional</option>'+
		'<option>Premium</option>'+
	'</select><br>'+
	'<label>Porcentaje Descuento</label>'+
	'<select class="mdl-textfield__input" value="'+datos[6].innerHTML+'">'+
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
		    	swal({
			  	title: '¿Seguro que desea modificar los datos del cliente?',
			  	type: 'warning',
			  	showCancelButton: true,
			  	confirmButtonText: 'Si',
			  	cancelButtonText:'No'

			},
			function(isConfirm) {
			  	if (isConfirm) {
			    	location.reload(); 
			  	}
			}); 
		  	}
		});
}

//funcion pensada como funcion para el modulo de clientes el cual muestra un formulario en un modal
//para borrar los datos de un cliente
Funciones["deleteClient"] = function () {

	var divpadre = this.parentNode
	var divButton = divpadre.parentNode
	var datos = divButton.parentNode.getElementsByTagName("td")
	var infoHTML = '<label>Cedula: '+datos[0].innerHTML+'</label><br><label>Nombre: '+datos[1].innerHTML+'</label>';
	swal({
	  	title: '¿Seguro que desea eliminar los datos del cliente?',
	  	html: infoHTML,
	  	type: 'warning',
	  	showCancelButton: true,
	  	confirmButtonText: 'Si'

	},
	function(isConfirm) {
	  	if (isConfirm) {
	    	location.reload(); 
	  	}
	}); 
}


/*funcion pensada para ser usada con un input y unicamente con la funcion keyup para poder hacer
busqueda dinamica en una tabla estatica sin conexion a base de datos, que se busca en el atributo 
TablaID="id" o por defecto buscara una tablacon la id "table", con el atributo datos="0,1,2,...,n"
definimos las columnas en el que la busqueda tendrá efecto por defecto busca en las columnas 0,1,5
por que fue pensada para el modulo de cliente y despues se hizo pensando en los demás
*/
Funciones["buscarTabla"] = function (e) {
	var id = this.getAttribute("TablaID") || "table"
	var tabla = document.getElementById(id);
	if(!tabla){console.log("no se encontró la tabla referida"); return false};
	var array = [0,1,5]
	if (this.getAttribute("datos")) {
		array = this.getAttribute("datos").split(",")
	};
    var busqueda = this.value;
    busqueda = busqueda.toLowerCase()
    var cellsOfRow="";
    var found=false;
    var compareWith="";
    busqueda = busqueda.trim(busqueda)
    if (busqueda.trim()=="") {
    	for (var i = 1; i < tabla.rows.length; i++) {
            tabla.rows[i].style.display = '';
   		 }
    	return false;
    };

    for (var i = 1; i < tabla.rows.length; i++) {
        cellsOfRow = tabla.rows[i].getElementsByTagName('td');
        found = false;
        for (var j = 0; j < cellsOfRow.length; j++)
        {
        	if (dataTable(j,array)) {
                compareWith = cellsOfRow[j].innerHTML.toLowerCase();
                if (busqueda.length == 0 || (compareWith.indexOf(busqueda) > -1))
                {
                    found = true;
                }
            };
        }
        if(found)
        {
            tabla.rows[i].style.display = '';
        } else {
            tabla.rows[i].style.display = 'none';
        }
    }
}
//funcion que forma parte de la funcion anterior para buscar los datos segun su id de columna
function dataTable(j,array){
	for (var i = 0; i < array.length; i++) {
		if (j==array[i]) {return true;};
	};
	return false;
}

//funcion unicamente llamada en el modulo de productos en la parte de inventario
//para editar datos del inv se activa con el event click
Funciones["editProduct"] = function () {
	var divpadre = this.parentNode
	var divButton = divpadre.parentNode
	var datos = divButton.parentNode.getElementsByTagName("td")
	var formhtml = '<form style="text-align: left;">'+
	'<label>Codigo de Producto</label>'+
	'<input class="mdl-textfield__input" type="text" value="'+datos[1].innerHTML+'" disabled="true"><br>'+
	'<label style="text-align: left;">Nombre de Producto: </label>'+
	'<input class="mdl-textfield__input" type="text" value="'+datos[0].innerHTML+'" ><br>'+
	'<label>Stock</label>'+
	'<input class="mdl-textfield__input" type="text" value="'+datos[2].innerHTML+'"><br>'+
	'<label>Precio</label>'+
	'<input class="mdl-textfield__input" type="text" value="'+datos[3].innerHTML+'"><br>'+
	'</form>'
	swal({
		  	title: 'Datos Producto',
		 	html: formhtml,
		  	showCancelButton: true,
		  	confirmButtonText: 'Guardar',
		  	closeOnConfirm: false
		},
		function(isConfirm) {
		  	if (isConfirm) {
		    	swal({
			  	title: '¿Seguro que desea modificar los datos del producto?',
			  	type: 'warning',
			  	showCancelButton: true,
			  	confirmButtonText: 'Si',
			  	cancelButtonText:'No'

			},
			function(isConfirm) {
			  	if (isConfirm) {
			    	location.reload(); 
			  	}
			}); 
		  	}
		});
}

//funcion unicamente llamada en el modulo de productos en la parte de inventario
//para borrar datos del inv se activa con el event click
Funciones["deleteProduct"] = function () {

	var divpadre = this.parentNode
	var divButton = divpadre.parentNode
	var datos = divButton.parentNode.getElementsByTagName("td")
	var infoHTML = '<label>Nombre: '+datos[0].innerHTML+'</label><br><label>Codigo: '+datos[1].innerHTML+'</label>';
	swal({
	  	title: '¿Seguro que desea eliminar los datos del producto?',
	  	html: infoHTML,
	  	type: 'warning',
	  	showCancelButton: true,
	  	confirmButtonText: 'Si'

	},
	function(isConfirm) {
	  	if (isConfirm) {
	    	location.reload(); 
	  	}
	}); 
}

//funcion unicamente llamada en el modulo de empleado
//para editar datos del empleado se activa con el event click
Funciones["editEmpleado"] = function () {
	var divpadre = this.parentNode
	var divButton = divpadre.parentNode
	var datos = divButton.parentNode.getElementsByTagName("td")
	var formhtml = '<form style="text-align: left;">'+
	'<label style="text-align: left;">Cédula: </label>'+
	'<input class="mdl-textfield__input" type="number" value="'+datos[0].innerHTML+'" disabled="true"><br>'+
	'<label>Nombres</label>'+
	'<input class="mdl-textfield__input" type="text" value="'+datos[1].innerHTML+'"><br>'+
	'<label>Telefono</label>'+
	'<input class="mdl-textfield__input" type="number" value="'+datos[2].innerHTML+'"><br>'+
	'<select class="mdl-textfield__input" value="'+datos[3].innerHTML+'">'+
		'<option>Matutino</option>'+
		'<option>Vespertino</option>'+
		'<option>Nocturno</option>'+
	'</select><br>'+
	'<label>Direccion</label>'+
	'<input class="mdl-textfield__input" type="text" value="'+datos[4].innerHTML+'"><br>'+
	'</form>'
	swal({
		  	title: 'Datos Producto',
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
		  				form=divs[i].firstChild
		  				break;
		  			};
		  		};
		  		var bool = ValidarDatosFormulario(form)
		  		if (form && !bool) {
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
						location.reload(); 
				  	}
				}); 
		  	}
		});
}

Funciones["saveEmpleado"] = function(e){
	e.preventDefault();
	ValidarDatosFormulario(this.form);
}

//funcion unicamente llamada en el modulo de empleado
//para editar datos del empleado se usa unicamente con el event click
Funciones["deleteEmpleado"] = function () {

	var divpadre = this.parentNode
	var divButton = divpadre.parentNode
	var datos = divButton.parentNode.getElementsByTagName("td")
	var infoHTML = '<label>Cedula: '+datos[0].innerHTML+'</label><br><label>Nombre: '+datos[1].innerHTML+'</label>';
	swal({
	  	title: '¿Seguro que desea eliminar los datos de este Empleado?',
	  	html: infoHTML,
	  	type: 'warning',
	  	showCancelButton: true,
	  	confirmButtonText: 'Si'

	},
	function(isConfirm) {
	  	if (isConfirm) {
	    	location.reload(); 
	  	}
	}); 
}

/*
	PD: las funciones de edit,delete fueron echas para crear formularios en modales de esos modulos
	por lo cual no es recomendable intentar usarlas en cosas que no sean tablas
*/

//funcion echa por paz para permitir decimales en inputs unicamente con coma (,) y 2 decimales maximo 
//esta se usa unicamente con el evento keypress aunqueda algo que validar no recuerdo bien que era

Funciones["NumDecimal"] = function(e){
	var key = window.Event ? e.which : e.keyCode
    if((key >= 48 && key <= 57) || key==44){
		var ekey=String.fromCharCode(key)|| "";
		if(key==44){ekey=","}
		var numero = this.value + "" + ekey;
		var span = this.parentNode.getElementsByTagName("span")[0]
		if (Timers[this]) {
			clearTimeout(Timers[this]);}
		;
		if(validarnum(numero,span)){
			Timers[this] = setTimeout(function (a){
				a.parentNode.classList.remove("is-invalid");
			},1,this);
		}
		else{
			Timers[this] = setTimeout(function (a){
				a.parentNode.classList.add("is-invalid");
			},1,this);
		}
        return true;
    }
    else{
		e.preventDefault();
        return false;
    }
}

//esta funcion al parecer hace lo mismo que la anterior permitiendo unicamente numeros enteros
//tambien pensada para usarse con event="keypress"
Funciones["NumeroEntero"] = function(e){
	var key = window.Event ? e.which : e.keyCode
    if((key >= 48 && key <= 57)){
		var ekey=String.fromCharCode(key)|| "";
		
		var numero = this.value + "" + ekey;
		var span = this.parentNode.getElementsByTagName("span")[0]
		if (Timers[this]) {
			clearTimeout(Timers[this]);}
		;
		if(validarnum(numero,span)){
			Timers[this] = setTimeout(function (a){
				a.parentNode.classList.remove("is-invalid");
			},1,this);
		}
		else{
			Timers[this] = setTimeout(function (a){
				a.parentNode.classList.add("is-invalid");
			},1,this);
		}
        return true;
    }
    else{
		e.preventDefault();
        return false;
    }
}

//funcion para abrir un modal en la asignacion de empleados
Funciones["AsignacionTarea"] = function (e) {
	var formhtml = '<label>Contador de Servicio</label> <input class="mdl-textfield__input" type="number" readonly><br>'+
	'<label>Cédula del Empleado</label> <input  class="mdl-textfield__input" type="number" ><br>'+
	'<label>Fecha de asignación del servicio</label> <input  class="mdl-textfield__input" type="date" step="1" min="2017-08-01" max="2030-12-31"><br>'+
	'<label>Hora de asignación del servicio</label> <input  class="mdl-textfield__input" type="time"><br>'+
	'<label>Hora de Finalización del servicio</label> <input   class="mdl-textfield__input"type="time"><br>'+
	'<label>RUC/Cédula Cliente</label> <input   class="mdl-textfield__input" type="number" ><br>'+
	'<label>Descripción del servicio </label><br><textarea  cols="60" rows="10"></textarea>';
	swal({
		  	title: 'Tarea Empleado',
		 	html: formhtml,
		  	showCancelButton: true,
		  	confirmButtonText: 'Asignar',
		  	cancelButtonText: 'Atrás',
		  	closeOnConfirm: false
		},
		function(isConfirm) {
		  	if (isConfirm) {
		    	swal({
			  	title: '¿Seguro que desea asignar una tarea al Empleado?',
			  	type: 'warning',
			  	showCancelButton: true,
			  	confirmButtonText: 'Si',
			  	cancelButtonText:'No'

			},
			function(isConfirm) {
			  	if (isConfirm) {
			    	location.reload(); 
			  	}
			}); 
		  	}
		});
}

//función para liberar tarea
Funciones["LibrarTarea"] = function(){
	swal({
		title: 'Desocupar Empleado',
		text: "¿Estás Seguro de hacer esto?",
		type: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Estoy de acuerdo'
	},
	function(isConfirm) {
		if (isConfirm) {
		  location.reload(); 
		}
  	});
}

//inicializa la funcion que recorre el html en busca de los elementos con los atributos explicados
Funciones.init();
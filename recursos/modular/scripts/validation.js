Funciones = {};

Timers={};

spansTextBefore={}

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

Funciones["init"] = function (argument) {
	var elements = document.querySelectorAll( 'body *' );
	for (var i = 0; i < elements.length; i++) {
	var atributo = elements[i].getAttribute("validation") || false;
		if ( atributo && Funciones[atributo] ){
			var evento = elements[i].getAttribute("event") || false;
			if (evento) {
				elements[i].addEventListener(evento,Funciones[atributo]);
			}
			elements[i].addEventListener("change",Funciones[atributo]);
			/*elements[i].addEventListener("paste", function (e) {
				e.preventDefault();
				return false;
			});*/
		}
	}
}


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

//0,1,5
Funciones["buscarTabla"] = function (e) {
	var id = this.getAttribute("TablaID") || "table"
	var array = [0,1,5]
	if (this.getAttribute("datos")) {
		array = this.getAttribute("datos").split(",")
	};
	var tabla = document.getElementById(id);
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
function dataTable(j,array){
	for (var i = 0; i < array.length; i++) {
		if (j==array[i]) {return true;};
	};
	return false;
}


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

Funciones.init();
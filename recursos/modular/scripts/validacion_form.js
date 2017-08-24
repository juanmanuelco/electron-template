//si se va a usar esta funcion para validar formularios en lo posible
// se recomienda cargar el script antes de los scripts siguientes:
//indentificaciones.js
//validation.js
ValorOriginal={}
function ValidarDatosFormulario(formulario,formModal) {
	var inputs = formulario.getElementsByTagName("input");
	mensaje="";
	formNoValido=false;
	for (var i = 0; i < inputs.length; i++) {
		if(inputs[i].value.trim() == "" && inputs[i].type != "file"){
			var span = inputs[i].parentNode.getElementsByTagName("span");
			if (span.length>=1) {
				span=span[0]
				ValorOriginal[inputs[i]] = span.innerHTML;
				span.innerHTML="Campo Vacío"
			};
			inputs[i].addEventListener("focus", function(){
				var span = this.parentNode.getElementsByTagName("span");
				if (span) {span[0].innerHTML=ValorOriginal[this]};
				this.parentNode.classList.remove("is-invalid");
			 })
			inputs[i].parentNode.classList.add("is-invalid");
			formNoValido=true;
			mensaje="Por favor asegurese que no haya campos vacios";
		}
	};	
<<<<<<< HEAD
=======
	/* Habia un error aqui hay que evitar preguntar de esta forma por el input type file
>>>>>>> 3afe0fe18e41d70f447a2f03364d0f77a25e7b3f
	if (!formNoValido) {
		var divs = formulario.getElementsByTagName("div")
		for (var i = 0; i < divs.length; i++) {
			if(divs[i].classList.contains("is-invalid")){
				mensaje="Por favor asegurese que todos los datos estén correctos";
				formNoValido=true;
			}
		};
	};
<<<<<<< HEAD
=======
	*/
>>>>>>> 3afe0fe18e41d70f447a2f03364d0f77a25e7b3f
	
	if (formNoValido) {
		if (!formModal) {
			swal({
			  	title: 'Formulario No Válido',
			  	type: 'warning',
			  	text:mensaje,
			  	confirmButtonText: 'Ok',
			  	closeOnConfirm: false
			})
		}
		return false;
	};
	return true;
}
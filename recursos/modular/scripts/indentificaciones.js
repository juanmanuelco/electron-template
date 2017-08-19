ident={};
nProvincia = 24;

ident["validarCedula"] = function (cedula) {
	if (cedula.length != 10  ) { return false;};
	if (!validarCodProv(cedula.substr(0, 2))) {return false;};
	if (!tipoRuc(cedula[2])) {return false;};
	if (!validarCedula(cedula)) {return false;};
	return true;
}

ident["validarRuc"] = function (ruc){
	if (ruc.length != 13  ) { return false;};
	if (!validarCodProv(ruc.substr(0, 2))) {return false;};
	if (!tipoRuc(ruc[2])) {return false;};
	if (!codigoEstablecimiento(ruc.substr(10, 3))) {return false;};
	if (!validarRuc(ruc)) {return false};
	return true;
}



var validarCedula = function(num){
	var calc, i, check, checksum = 0, r = [2,1]; 
	for( i=num.length-1; i--; ){
		calc = num.charAt(i) * r[i % r.length];
		calc = ((calc/10)|0) + (calc % 10);
		checksum += calc;
	}
	check = (10-(checksum % 10)) % 10;
	checkDigit = num % 10;
	return check == checkDigit;
}

var validarCodProv = function (num) {
	num = parseInt(num);
	if (num <= 0 || num > nProvincia) {
        return false;
    }
    return true;
}

var tipoRuc = function(tercerDigito){
	tercerDigito = parseInt(tercerDigito);
	if (tercerDigito >= 0 && tercerDigito < 6) {
		//si el tercer digito del ruc es mayor o igual a 0 y menor a 6 entonces es un ruc persona natural
		return true;
	}
	else{
		if (tercerDigito==9) {
			//si el tercer digito es 9 entonces el ruc es privado
			return true;
		}
		else{
			if (tercerDigito==6) {
				//si el tercer digito es 9 entonces el ruc es publico
				return true;
			}
		}
	}
	//si nada se cumple el ruc no es valido
	return false;
}

var codigoEstablecimiento = function (num){
	num = parseInt(num);
	if (num<1) {return false};
	return true;
}

var validarRuc = function (numero) {
	var veri = 0;
	var array;
	if (numero[2] == 9){
		array = [4, 3, 2, 7, 6, 5, 4, 3, 2];
		max = 9;
		veri = parseInt(numero[9]);
	}
	else{
		if (numero[2] == 6) {
			array = [3, 2, 7, 6, 5, 4, 3, 2];
			max = 8;
			veri = parseInt(numero[8]);
		}
		else{
			if (numero[2] >= 0 && numero[2] < 6) {
				return validarCedula(numero.substr(0, 10));
			}
		}
	}
    var suma =0, cadena =0, residuo = 0;
    for (var i = 0; i < max; i++) {
    	cadena = parseInt(numero.charAt(i))*(array[i]||0);
    	suma +=  parseInt(cadena);
    };
    residuo = 11 - (suma%11);
    if (residuo!=veri) {return false;};
    return true;
}
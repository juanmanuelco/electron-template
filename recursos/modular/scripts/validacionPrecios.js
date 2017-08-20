
function validarnum(numero,span){
    numero = numero.replace(",", ".")
    if (!isNaN(numero)){
        var array = numero.split(".")
            if(array[1] && array[1].length > 2){
                if(span){
                    span.innerHTML="Solo se acepta 2 decimales";
                }
                return false;
            }
        return true;
    }
    if (span) {
        span.innerHTML="Ingrese solo valores numericos";
    };
    return false
}
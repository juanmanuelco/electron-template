//Es necesario siempre hacer referencia al API de mongodb
var mongoose = require('mongoose');

//Se crea el esquema necesario_______________________________________________________________________________________________________________
var E_DBF_PRODUCTO_OBJ = mongoose.Schema({
    /**
   * Defina en estas líneas los datos que se necesitan salvar del producto
   * Use formato JSON
   */
});

//Exporta el esquema para poder ser usado en cada ruta que sea  necesario____________________________________________________________________
var E_DBF_PRODUCTO=module.exports=mongoose.model('E_DBF_PRODUCTO',E_DBF_PRODUCTO_OBJ);

//Guardar productos
module.exports.createUser = function(newUser, callback){
    //Establece el modo de encriptación
	bcrypt.genSalt(10, function(err, salt) {
        //Encripta los datos
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
            //Devuelve una nueva contraseña (la misma ingresada pero encriptada)
            newUser.password = hash;
            //Genera un registro
	        newUser.save(callback);
	    });
	});
}

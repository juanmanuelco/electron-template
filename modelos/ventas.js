//Usa la libreria de la base de datos
var mongoose = require('mongoose');

//Usa un alto nivel de encriptación para las contraseñas
var bcrypt = require('bcryptjs');

//Se define un esquema de como iran los datos guardados_______________________________________________________________________________________
var EMAEVENTINV_OBJ  = mongoose.Schema({
	CodVen_Vent: Number,
	Ced_Vent: String,//referencia a otro esquema
	Fech_Vent: Date,
	CodPro_Vent: Array,//referencia a otro esquema
	Desc_Vent:Number // Total a pagar de la venta
});

//Exporta el esquema para poder ser usado en cada ruta que sea  necesario____________________________________________________________________
var EMAEVENTINV = module.exports = mongoose.model('EMAEVENTINV', EMAEVENTINV_OBJ );

//Crea un nuevo usuario para que use el sistema_______________________________________________________________________________________________
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

//Para poder usar la encriptación es necesario usar estas líneas______________________________________________________________________________
module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	EMAEVENTINV.findOne(query, callback);
}

//MONGODB usa su propia indexación por lo que es necesario obtener el id del registro_________________________________________________________
module.exports.getUserById = function(id, callback){
	EMAEVENTINV.findById(id, callback);
}

//Esto es para el login, sirve para comparar la contraseña ingresada con la que esta en el sistema____________________________________________
//No se usa If(){}else{} por motivo de que siempre dira que es false
module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}

//Usa la libreria de la base de datos
var mongoose = require('mongoose');
//Usa un alto nivel de encriptación para las contraseñas
var bcrypt = require('bcryptjs');

//Se define un esquema de como iran los datos guardados_______________________________________________________________________________________
var E_DBF_EMPLEADO_OBJ  = mongoose.Schema({
    Ced_Emp: { type: String, required: true, unique: true },
    Nomb_Emp: String,
    Telf_Emp:Number,
    Tur_Emp: String,
    Estd_Emp: String,
    Img_Emp:String
});

//Exporta el esquema para poder ser usado en cada ruta que sea  necesario____________________________________________________________________
var E_DBF_EMPLEADO = module.exports = mongoose.model('E_DBF_EMPLEADO', E_DBF_EMPLEADO_OBJ );

//Crea un nuevo usuario para que use el sistema_______________________________________________________________________________________________
module.exports.createEmpleado = function(newUser, callback){
    //Establece el modo de encriptación
    bcrypt.genSalt(10, function(err, salt) {
            newUser.save(callback);
    });
}

//Para poder usar la encriptación es necesario usar estas líneas______________________________________________________________________________
module.exports.getEmpleadoByName = function(Name, callback){
    var query = {Nomb_Emp: Name};
    EMAEVENTINV.findOne(query, callback);
}

module.exports.getEmpleadoByCedula = function(Cedula, callback){
    var query = {Ced_Emp: Cedula};
    EMAEVENTINV.findOne(query, callback);
}

module.exports.getEmpleadoByTruno = function(Turno, callback){
    var query = {Tur_Emp: Turno};
    EMAEVENTINV.findOne(query, callback);
}


//MONGODB usa su propia indexación por lo que es necesario obtener el id del registro_________________________________________________________
module.exports.getUserById = function(id, callback){
    EMAEVENTINV.findById(id, callback);
}
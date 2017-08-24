//Usa la libreria de la base de datos
var mongoose = require('mongoose');
//Usa un alto nivel de encriptación para las contraseñas
var bcrypt = require('bcryptjs');

//Se define un esquema de como iran los datos guardados_______________________________________________________________________________________
var E_DBF_CLIENT_OBJ  = mongoose.Schema({
    Ced_Clien: { type: String, required: true, unique: true },
    Nomb_Clien: String,
    Telf_Clien:Number,
    DirCiud_Clien: String,
    CorElec_Clien: String,
    Tipo_Clien:String,
    PorcDesc_Clien:Number
});

//Exporta el esquema para poder ser usado en cada ruta que sea  necesario____________________________________________________________________
var E_DBF_CLIENT = module.exports = mongoose.model('E_DBF_CLIENT', E_DBF_CLIENT_OBJ );
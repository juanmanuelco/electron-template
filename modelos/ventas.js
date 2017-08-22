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
	/*
	nombre:{type:String},
	tipo:{type:String}*/
});

//Exporta el esquema para poder ser usado en cada ruta que sea  necesario____________________________________________________________________
var EMAEVENTINV = module.exports = mongoose.model('EMAEVENTINV', EMAEVENTINV_OBJ );

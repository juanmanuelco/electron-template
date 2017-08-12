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
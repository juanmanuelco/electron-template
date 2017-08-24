//Es necesario siempre hacer referencia al API de mongodb
var mongoose = require('mongoose');

//Se crea el esquema necesario_______________________________________________________________________________________________________________
var E_DBF_PRODUCTO_OBJ = mongoose.Schema({
    Cod_Prod:{type: Number},
    Descripcion:{type:String},
    Existencia:{type:Number},
    PrecComp_Pro:{type:String},
    PrecVen_Pro: {type:String}
});

//Exporta el esquema para poder ser usado en cada ruta que sea  necesario____________________________________________________________________
var E_DBF_PRODUCTO=module.exports=mongoose.model('E_DBF_PRODUCTO',E_DBF_PRODUCTO_OBJ);

//Guardar productos

//Esto no se hace ._. 
//Gracias por tu grosera.. ayuda :v
/*
module.exports.createProductos = function(req,res){
    var parametros= req.body
    //json de producto
    newProducto={
        E_DBF_PRODUCTO.Cod_Prod:parametros.Cod_Prod,
        E_DBF_PRODUCTO.Des_Prod: parametros.Des_Prod,
        E_DBF_PRODUCTO.Exis_Prod: parametros.Exis_Prod,
        E_DBF_PRODUCTO.PrecComp_Pro: parametros.PrecComp_Pro,
        E_DBF_PRODUCTO.PrecVen_Pro: parametros.PrecVen_Pro

    };
    //Genera un registro
    newProducto.save(callback);
	    
	//});
}
*/
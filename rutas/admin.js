var express = require('express'),
	venta_model = require("../modelos/ventas");
	E_DBF_PRODUCTO_OBJ = require('../modelos/productos')
E_DBF_EMPLEADO_OBJ=require('../modelos/empleados')
router = express.Router();

function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated())
		return next();
	else
		res.redirect('/users/login');
}

router.get('/ventas', function (req, res) {
	//res.render('ventas');
	res.render('ventas',{incrementar:"00001"})	
});

router.post('/ventas', function (req, res) {
	var params = req.body;
	var nuevaVenta = new venta_model({
		CodVen_Vent: params.codigo_venta,
		Ced_Vent: params.cedula,
		Fech_Vent: params.fecha,
		CodPro_Vent: params.codigo_producto,
		Desc_Vent: params.descuento
	})
	nuevaVenta.save(function (error, resp) {
		if (error) {
			res.render('500', { error: error })
			console.log("Error");
		} else {
			res.render('ventas', { success_msg: 'Guardado' })
			console.log("Guardado");
		}
	})
})


router.get('/control-actividades', function (req, res) {
	res.render('Control_Actividades')
});
//===================Productos===============================================//

//renderiza en la ruta /productos la vista productos 
router.get('/productos', function (req, res) {
	res.render('productos')
});
//Obtener los valores de los input para guardarlos en el esquema o eso se supone..
router.post('/productos', function (req, res) {
	var nuevoP = new E_DBF_PRODUCTO_OBJ({
		CodigoProducto:req.body.Cod_Prod,
		Descripcion:req.body.Des_Prod,
		Existencia:req.body.Exis_Prod,
		PrecComp_Pro:req.body.PrecComp_Pro,
		PrecVen_Pro:req.body.PrecVen_Pro
	})
	nuevoP.save(function (error, resp) {
		if (error) {
			res.render('500', { error: error })
			console.log(error);
		} else {
			res.render('productos', { success_msg: 'Guardado' })
			console.log("Guardado");
			console.log(nuevoP);
		}
	})
})
// router.post('/productos',function(req,res){
	
// 	var nuevoProducto=new E_DBF_PRODUCTO_OBJ({
// 		CodigoProducto:req.body.Cod_Prod,
// 		Descripcion:req.body.Des_Prod,
// 		Existencia:req.body.Exis_Prod,
// 		PrecComp_Pro:req.body.PrecComp_Pro,
// 		PrecVen_Pro:req.body.PrecVen_Pro
// 	})
// 	nuevoProducto.save(function (error, resp) {
// 		if (error) {
// 			res.render('500', { error: error })
// 			console.log("Errorcito");
// 		} else {
// 			res.render('productos', { success_msg: 'Guardado' })
// 			console.log("hola joven");
// 		}
// 	})
// });
//renderiza en la ruta inventario la vista inventario
router.get('/inventario', function (req, res) {
	res.render('inventario')
});

//===================Productos fin===============================================//

router.get('/cliente', function (req, res) {
	res.render('cliente')
});

router.get('/registro_empleado', function (req, res) {
	res.render('registro_empleado')
});

//por ahora estoy haciendo esta parte así quizas no se deba hacer pero por ahora funciona
//by JUNIORCEDE(Francisco Bermello)
router.get('/getEmpleados',function (req,res) {
	E_DBF_EMPLEADO_OBJ.find({}, function(err, users) {
        var userMap = {};

        users.forEach(function(user) {
          userMap[user._id] = user;
        });
        res.send(userMap);  
      });
})

//por ahora estoy haciendo esto para guardar los datos del empleado aun no implemento lo de la foto
//by JUNIORCEDE(Francisco Bermello)
router.post('/empleados',function(req,res){
	var objeto = {
		Ced_Emp: req.body.Ced_Emp,
	    Nomb_Emp: req.body.Nomb_Emp,
	    Telf_Emp: req.body.Telf_Emp,
	    Tur_Emp: req.body.Tur_Emp,
	    Estd_Emp: req.body.Estd_Emp
	}
	var nuevoEmpleado = new E_DBF_EMPLEADO_OBJ(objeto)
	nuevoEmpleado.save(function(error,resp){
		if(error){
			res.render('500',{error:error})
			console.log(error);
		}else{
			res.render('empleados',{success_msg:'Guardado'})
			console.log("Guardado");
		}
	})
})

module.exports = router;

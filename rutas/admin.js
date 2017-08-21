var express = require('express'),
	venta_model = require("../modelos/ventas");
EMAEVENTINV_OBJ = require('../modelos/productos')
E_DBF_EMPLEADO_OBJ=require('../modelos/empleados')
router = express.Router();

function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated())
		return next();
	else
		res.redirect('/users/login');
}

router.get('/ventas', function (req, res) {
	res.render('ventas');
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
router.post('/productos',function(req,res){
	
	var nuevoProducto=new EMAEVENTINV_OBJ({
		CodigoProducto:req.body.Cod_Prod,
		Descripcion:req.body.Des_Prod,
		Existencia:req.body.Exis_Prod,
		PrecComp_Pro:req.body.PrecComp_Pro,
		PrecVen_Pro:req.body.PrecVen_Pro
<<<<<<< HEAD
	});
	
	nuevoProducto.save(function(error,resp){
		if(error){
			console.log('sdsadda');
			res.render('500',{error:error})
		}else{
			res.render('/admin/productos',{success_msg:'Guardado'})
			console.log(nuevoProducto);
=======
	})
	nuevoProducto.save(function (error, resp) {
		if (error) {
			res.render('500', { error: error })
		} else {
			res.render('productos', { success_msg: 'Guardado' })
>>>>>>> 2e61bc09905d9a83fe8326740786978dfd26997b
		}
	})
});
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
			console.log("Error");
		}else{
			res.render('empleados',{success_msg:'Guardado'})
			console.log("Guardado");
		}
	})
})

module.exports = router;

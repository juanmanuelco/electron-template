var express = require('express'),
	venta_model = require("../modelos/ventas");
EMAEVENTINV_OBJ = require('../modelos/productos')
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
router.post('/productos', function (req, res) {

	var nuevoProducto = new EMAEVENTINV_OBJ({
	})
	nuevoProducto.save(function (error, resp) {
		if (error) {
			res.render('500', { error: error })
		} else {
			res.render('productos', { success_msg: 'Guardado' })
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

module.exports = router;

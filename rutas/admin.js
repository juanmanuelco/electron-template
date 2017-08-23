var express = require('express'),
	venta_model = require("../modelos/ventas");
	E_DBF_PRODUCTO_OBJ = require('../modelos/productos')
	E_DBF_EMPLEADO_OBJ=require('../modelos/empleados')
	router = express.Router(),
	multer = require('multer');

function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated())
		return next();
	else
		res.redirect('/users/login');
}

router.get('/ventas', ensureAuthenticated,function (req, res) {
	//res.render('ventas');
	res.render('ventas',{incrementar:"00001"})	
});

router.post('/ventas', ensureAuthenticated,function (req, res) {
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

//===================Productos===============================================//

//renderiza en la ruta /productos la vista productos 
router.get('/productos', ensureAuthenticated,function (req, res) {
	res.render('productos')
});
//Obtener los valores de los input para guardarlos en el esquema o eso se supone..
router.post('/productos', function (req, res) {
	//esta línea obtiene el Cod_Prod y valida que solo se repida una vez
	E_DBF_PRODUCTO_OBJ.findOne().where({ Cod_Prod: req.body.Cod_Prod }).exec(function (err, respu) {
		if (respu == null) {
			var nuevoP = new E_DBF_PRODUCTO_OBJ({
				Cod_Prod: req.body.Cod_Prod,
				Descripcion: req.body.Des_Prod,
				Existencia: req.body.Exis_Prod,
				PrecComp_Pro: req.body.PrecComp_Pro,
				PrecVen_Pro: req.body.PrecVen_Pro
			})
			nuevoP.save(function (erro, resp) {
				if (erro) {
					res.render('500', { error: erro })
				} else {
					res.render('productos', { success_msg: 'Producto guardado correctamente.' })
				}
			})
		} else {
			res.render('productos', {error: 'Ya existe un producto con este código, por favor intente con otro "Código de Producto" consulte el inventario' })		
		}
	})
})
router.get('/inventario', ensureAuthenticated,function (req, res) {
	res.render('inventario')
});

//===================Productos fin===============================================//

router.get('/cliente', ensureAuthenticated,function (req, res) {
	res.render('cliente')
});
router.get('/administracion',ensureAuthenticated,function(req,res){
	res.render('administracion')
})

router.get('/registro_empleado',ensureAuthenticated, function (req, res) {
	res.render('registro_empleado')
});

//por ahora estoy haciendo esta parte así quizas no se deba hacer pero por ahora funciona
//by JUNIORCEDE(Francisco Bermello)
router.get('/getEmpleados',ensureAuthenticated,function (req,res) {
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
router.post('/empleados',ensureAuthenticated,function(req,res){
	var storage = multer.diskStorage({
		destination: function (req, file, cb) {cb(null, 'recursos/general/imagenes/empleados')},
			filename: function (req, file, cb) {cb(null, 'empleado'+(req.body.Ced_Emp)+'.png')}
		});
	var upload = multer({ storage: storage,fileFilter:function(req,file,cb){
		if(file.mimetype=='image/png'|| file.mimetype=='image/jpg' || file.mimetype=='image/jpeg'){cb(null, true);}else{cb(null, false);}
	}}).single('image_producto');
	upload(req, res, function (err) {
		if(err){res.render('500',{error:'Error al cargar la imágen'})}else{
			var objeto = {
				Ced_Emp: req.body.Ced_Emp,
				Nomb_Emp: req.body.Nomb_Emp,
				Telf_Emp: req.body.Telf_Emp,
				Img_Emp:"../general/imagenes/empleados/empleado"+(req.body.Ced_Emp)+".png",
				Tur_Emp: req.body.Tur_Emp,
				Estd_Emp: req.body.Estd_Emp
			}
			var nuevoEmpleado = new E_DBF_EMPLEADO_OBJ(objeto)
			nuevoEmpleado.save(function(error,resp){
				if(error){
					res.render('500',{error:error})
				}else{
					res.render('empleados',{success_msg:'Guardado'})
				}
			})
		}
	});
})

router.get('/asignar_empleados',ensureAuthenticated,function(req,res){
	var empleadosDisponibles=new Array(), 
		empleadoNoDisponibles=new Array();
		E_DBF_EMPLEADO_OBJ.find().where({Estd_Emp:'Disponible'}).exec(function(error,disponibles){
			empleadosDisponibles=disponibles;
			E_DBF_EMPLEADO_OBJ.find().where({Estd_Emp:'No Disponible'}).exec(function(error,Nodisponibles){
				empleadoNoDisponibles=Nodisponibles;
				res.render('Control_Actividades',{disponibles:empleadosDisponibles,noDisponibles:empleadoNoDisponibles});
			});
	});
});
module.exports = router;

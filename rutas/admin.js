var express = require('express'),
	venta_model = require("../modelos/ventas");
	E_DBF_PRODUCTO_OBJ = require('../modelos/productos')
	E_DBF_EMPLEADO_OBJ=require('../modelos/empleados')
	E_DBF_CLIENT_OBJ=require('../modelos/clientes')
	router = express.Router(),
	multer = require('multer');

function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated())
		return next();
	else
		res.redirect('/users/login');
}

router.get('/ventas', ensureAuthenticated, function (req, res) {
	//res.render('ventas');
	res.render('ventas', { incrementar: "00001" })
});

router.post('/ventas', ensureAuthenticated, function (req, res) {
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
router.get('/productos', ensureAuthenticated, function (req, res) {
	res.render('productos')
});
//Obtener los valores de los input para guardarlos en el esquema o eso se supone..
router.post('/productos', function (req, res) {
	//esta línea obtiene el Cod_Prod y valida que solo se repida una vez
	E_DBF_PRODUCTO_OBJ.findOne().where({ Cod_Prod: req.body.Cod_Prod }).exec(function (err, respu) {
		if (respu == null) {
			var nuevoP = new E_DBF_PRODUCTO_OBJ({
				
				Descripcion: req.body.Des_Prod,
				Cod_Prod: req.body.Cod_Prod,
				Existencia: req.body.Exis_Prod,
				PrecComp_Pro: req.body.PrecComp_Pro,
				PrecVen_Pro: req.body.PrecVen_Pro
			})
			nuevoP.save(function (erro, resp) {
				if (erro) {
					console.log(erro)
					res.render('productos', { error: erro})
				} else {
					res.render('productos', { success_msg: 'Producto guardado correctamente.' })
				}
			})
		} else {
			res.render('productos', {error: 'Ya existe un producto con este código, por favor intente con otro "Código de Producto" consulte el inventario' })		
	var accion = req.body.accion;
	console.log(accion)
	if (accion) {
		if (accion == "Eliminar") {
			console.log("Eliminar")

			var codigoP = req.body.Cod_Prod;
			var query = { 'Cod_Prod': codigoP };
			E_DBF_PRODUCTO_OBJ.findOneAndRemove(query, function (err, userUpdated) {
				if (err) {
					res.status(500).send({ message: "Error al borrar el producto" });
				} else {
					if (!userUpdated) {
						res.status(404).send({ message: "No se ha podido borrar el producto" });
					} else {
						res.render('productos', { success_msg: 'El producto fue borrado correctamente' })
					}
				}
			});
		}
		else {
			if (accion == "Actualizar") {
				console.log("Actualizar")
				var codigoP = req.body.Cod_Prod;
				var objeto = {
					Descripcion: req.body.Descripcion,
					Existencia: req.body.Exis_Prod,
					PrecComp_Pro: req.body.PrecComp_Pro,
					PrecVen_Pro: req.body.PrecVen_Pro
				}
				var query = { 'Cod_Prod': codigoP };
				E_DBF_PRODUCTO_OBJ.findOneAndUpdate(query, objeto, { new: false }, function (err, userUpdated) {

					if (err) {
						res.status(500).send({ message: "Error al actualizar el producto" });
					} else {
						if (!userUpdated) {
							res.status(404).send({ message: "No se ha podido actualizar el producto" });
						} else {
							res.render('producto', { success_msg: 'Editado correctamente' })
						}
					}
				});
			}
		}
	} else {
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
						console.log(erro)
						res.render('productos', { error: erro })
					} else {
						res.render('productos', { success_msg: 'Producto guardado correctamente.' })
					}
				})
			} else {
				res.render('productos', { error: 'Ya existe un producto con este código, por favor intente con otro "Código de Producto" consulte el inventario' })
			}
		})
	}
	}
})
})
router.get('/inventario', ensureAuthenticated, function (req, res) {
	E_DBF_PRODUCTO_OBJ.find({}, function (err, users) {
		res.render('inventario', { producto: users });
	});
});


// router.get('/inventario', ensureAuthenticated,function (req, res) {
// 	var empleadosDisponibles=new Array(), 
// 	empleadoNoDisponibles=new Array();
// 	E_DBF_EMPLEADO_OBJ.find().where({Estd_Emp:'Disponible'}).exec(function(error,disponibles){
// 		empleadosDisponibles=disponibles;
// 		E_DBF_EMPLEADO_OBJ.find().where({Estd_Emp:'No Disponible'}).exec(function(error,Nodisponibles){
// 			empleadoNoDisponibles=Nodisponibles;
// 			res.render('inventario',{disponibles:empleadosDisponibles,noDisponibles:empleadoNoDisponibles});
// 		});
// });
// });

//===================Productos fin===============================================//
//Client
router.get('/cliente', ensureAuthenticated,function (req, res) {
	E_DBF_CLIENT_OBJ.find({}, function(err, clients) {
		res.render('cliente',{clientes:clients});
  	});
});

router.post('/saveClient', ensureAuthenticated,function (req, res) {
	var objeto = {
			Ced_Clien: req.body.Ced_Clien,
			Nomb_Clien: req.body.Nomb_Clien,
			DirCiud_Clien: req.body.DirCiud_Clien,
			Telf_Clien: req.body.Telf_Clien,
			CorElec_Clien: req.body.CorElec_Clien,
			PorcDesc_Clien: 0,
			Tipo_Clien: req.body.Tipo_Clien
		}
		var nuevoCliente = new E_DBF_CLIENT_OBJ(objeto)
		nuevoCliente.save(function(error,resp){
			if(error){
				console.log(error)
				res.render('500',{error:error})
			}else{
				console.log("guardado")
				res.redirect('cliente')
			}
		})
});

router.post('/editClient',ensureAuthenticated,function (req,res) {
	console.log(req.body)
	var cedula = req.body.Ced_Clien;
	console.log(cedula)
	var objeto = {
		Nomb_Clien: req.body.Nomb_Clien,
		Telf_Clien: req.body.Telf_Clien,
		DirCiud_Clien: req.body.DirCiud_Clien,
		CorElec_Clien: req.body.CorElec_Clien,
		PorcDesc_Clien: req.body.PorcDesc_Clien
	}
	var query = {'Ced_Clien': cedula};
	E_DBF_CLIENT_OBJ.findOneAndUpdate(query, objeto, {new: false}, function(err, userUpdated){
		
		if (err) {
			res.status(500).send({message:"Error al actualizar el usuario"});
		}else{
			console.log(userUpdated)
			if (!userUpdated) {
				res.status(404).send({message:"No se ha podido actualizar el usuario"});
			}else{
				res.redirect('client')
			}
		}
	})
})

router.post('/deleteClient',ensureAuthenticated,function (req,res) {
	console.log(req.body)
	var cedula = req.body.Ced_Clien;
	var query = {'Ced_Clien': cedula};
	E_DBF_CLIENT_OBJ.findOneAndRemove(query,function(err, userUpdated){
		if (err) {
			res.status(500).send({message:"Error al borrar el usuario"});
		}else{
			if (!userUpdated) {
				res.status(404).send({message:"No se ha podido borrar el usuario"});
			}else{
				res.render('cliente')
			}
		}
	});
})

//Fin client

router.get('/administracion',ensureAuthenticated,function(req,res){
	res.render('administracion')
})

router.get('/registro_empleado',ensureAuthenticated, function (req, res) {
	E_DBF_EMPLEADO_OBJ.find({}, function(err, users) {
		res.render('registro_empleado',{usuarios:users});
  	});
});


//por ahora estoy haciendo esto para guardar los datos del empleado aun no implemento lo de la foto
//by JUNIORCEDE(Francisco Bermello)
router.post('/empleados',ensureAuthenticated,function(req,res){
	var accion = req.body.accion;
	if (accion) {
		if (accion=="Eliminar") {
			console.log("Eliminar")

			var cedula = req.body.Ced_Emp;
			var query = {'Ced_Emp': cedula};
			E_DBF_EMPLEADO_OBJ.findOneAndRemove(query,function(err, userUpdated){
				if (err) {
					res.status(500).send({message:"Error al borrar el usuario"});
				}else{
					if (!userUpdated) {
						res.status(404).send({message:"No se ha podido borrar el usuario"});
					}else{
						res.render('empleados',{success_msg:'Borrado'})
					}
				}
			});
		}
		else{
			if (accion=="Actualizar") {
				console.log("Actualizar")
				var cedula = req.body.Ced_Emp;
				var objeto = {
				    Nomb_Emp: req.body.Nomb_Emp,
				    Telf_Emp: req.body.Telf_Emp,
				    Tur_Emp: req.body.Tur_Emp
				}
				var query = {'Ced_Emp': cedula};
				E_DBF_EMPLEADO_OBJ.findOneAndUpdate(query, objeto,{new: false},function(err, userUpdated){
					
					if (err) {
						res.status(500).send({message:"Error al actualizar el usuario"});
					}else{
						if (!userUpdated) {
							res.status(404).send({message:"No se ha podido actualizar el usuario"});
						}else{
							res.render('empleados',{success_msg:'Editado'})
						}
					}
				});
			}
		}
	}
	else{
		var storage = multer.diskStorage({
			destination: function (req, file, cb) {cb(null, 'recursos/general/imagenes/empleados')},
				filename: function (req, file, cb) {cb(null, 'empleado'+(req.body.Ced_Emp)+'.png')}
			});
		var upload = multer({ storage: storage,fileFilter:function(req,file,cb){
			if(file.mimetype=='image/png'|| file.mimetype=='image/jpg' || file.mimetype=='image/jpeg'){cb(null, true);}else{cb(null, false);}
		}}).single('image_producto');
		upload(req, res, function (err) {
			console.log(err)
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
	}
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

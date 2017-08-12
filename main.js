//Establecemos la crecaión del servidor de elementos__________________________________________________________________________________________
const cookieParser = require('cookie-parser'),
      bodyParser = require('body-parser'),
      exphbs = require('express-handlebars'),
      expressValidator = require('express-validator'),
      flash = require('connect-flash'),
      session = require('express-session'),
      path = require('path');
      passport = require('passport'),
      LocalStrategy = require('passport-local').Strategy,
      mongoose = require('mongoose'),
      express = require('express'),
      servidor = express();

var http = require('http').Server(servidor),
    port = process.env.PORT || 3000;

//mongoose.connect('mongodb://Admin:abc123.....@ds127963.mlab.com:27963/prueba',{ server: { reconnectTries: Number.MAX_VALUE } });
//Estas rutas dependen de la carpeta rutas___________________________________________________________________________________________________
//Si se incrementa una nueva ruta deberá ser referenciada en esta parte
var routes = require('./rutas/index'),
    users = require('./rutas/users'),
    admin =require('./rutas/admin');

//Definimos que se usará tecnología hbs para modificar la vista de una página
servidor.set('views', path.join(__dirname, 'views'));
servidor.engine('handlebars', exphbs({defaultLayout:'estatico'}));
servidor.set('view engine', 'handlebars');

//Permitimos el reconocimiento de JSON en el sistema 
servidor.use(bodyParser.json());
servidor.use(bodyParser.urlencoded({ extended: false }));
servidor.use(cookieParser());

//Aqui se define donde estarán los estilos y scripts tanto globales como modulares
servidor.use(express.static(path.join(__dirname, 'recursos')));

//Con esto nos aseguramos que se usen sesiones e inicios de sesión con encriptación
servidor.use(session({secret: 'secret',saveUninitialized: true,resave: true}));
servidor.use(passport.initialize());
servidor.use(passport.session());

//Usando esta API se puede validar campos desde ambos lados (Cliente- Servidor)
servidor.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;
    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

//Es necesario el poder enviar mensajes automáticos desde el servidor
servidor.use(flash());

//Establecemos variables globales para el envío de datos
servidor.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

//usamos las rutas creadas anteriormente
servidor.use('/', routes);
servidor.use('/users', users);
servidor.use('/admin',admin);

//Controlamos el error de página no encontrada
servidor.use(function(req,res){
  res.status('404');
  res.render('404')
});

//Controlamos el error de fallos en el servidor
servidor.use(function(err,req,res,next){
  res.status(500);
  res.render('500',{error:err});
});

//Inicializamos el servidor
http.listen(port);

//Usa el api de electron____________________________________________________________________________________________________________________
const { app, BrowserWindow, Menu, dialog,nativeImage} = require('electron'); 

//Definimos que la aplicación usará electron para iniciarse___________________________________________________________________________________


let mainWindow,
    icono=nativeImage.createFromPath(path.join(__dirname,'recursos/general/imagenes/icono.png'));

//Se define el menu principal independiente del HTML________________________________________________________________________________________
var menu= Menu.buildFromTemplate(
	[
		{
			label: 'Opcion 1', /*Se colocan elementos desplegable del menú principal */
			submenu: [
				{label: 'Sub menu 1'}, /*Se colocan sub opciones desde aqui */
				{label: 'Sub menu 2'}
			]
		},
		{
      label:'Mostrar advertencia',
      click () {
        addAdvertencia(
          mainWindow,
          'Advertencia', 
          'Esto es un simulacro',
          ['aceptar','cancelar'],
          'warning',
          'El error es'
        ) 
      } 
		}
	]
)

//Crea la ventana principal________________________________________________________________________________________________
//Crea la ventana principal asignándole los valores necesarios
//Cargamos la información procedente de nuestro html, js y css
//Cuando se cierra reseteamos la ventana
//Asignamos el menú personalizado
function ventanaPrincipal () { 
  mainWindow = new BrowserWindow({ width: 1000, height: 860, icon:icono,  minWidth:1000, title:"Car de lujo" });
  mainWindow.loadURL('http://127.0.0.1:3000/');
  mainWindow.on('closed', ()=> {mainWindow = null });
	Menu.setApplicationMenu(menu)
}

//La aplicación se inicia__________________________________________________________________________________________________
app.on('ready', ventanaPrincipal);

//Se cierran todas las ventanas de la aplicación___________________________________________________________________________
//app.on('window-all-closed', ()=>{ app.quit()});

//La aplicación se activa__________________________________________________________________________________________________
app.on('activate', ()=>{ if (mainWindow === null){ventanaPrincipal()}});

app.on('window-all-closed',function(event){
  event.preventDefault();
})


//Mensajes__________________________________________________________________________________________________________________

function addAdvertencia(ventana, titulo, mensaje, botones,tipo,detalle,funcion){
  dialog.showMessageBox(ventana,{
    title:titulo,
    message:mensaje,
    noLink:true,
    type:"warning",
    detail:detalle,
    buttons:botones
  },funcion)
}
function addError(titulo, mensaje){
  dialog.showErrorBox(titulo,mensaje);
}
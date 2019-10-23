//importo modulos
const mysql = require('mysql');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');

//decirle a express que use ejs
app.set('view engine', 'ejs');
//configurar la ruta donde ser deben buscar las vistas
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
//decirle a express que use body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//configurar multer
const upload = multer({ dest: 'uploads/' })


//establesco parametros de coneccion con mi base de datos
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'propiedaddeluis',
    database: 'senpai',
});

//conecto mi base de batos
connection.connect(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('DB Conected');
    }
});

//cuando entre a localhost con get muestro formulario para agregar tarea
app.get('/', function (req, res) {
    res.render('formulario')
})

// Agrego una tarea a la base de datos
app.post('/tareas', function (req, res) {
    connection.query('INSERT INTO tareas VALUES (? , ?, null)', [req.body.id, req.body.name], (err, resp, fields) => {
        if (err) {
            console.log(err);
        } else {
            //Consultamos el listado total de tareas de la base de datos
            connection.query('SELECT * FROM tareas', (err, rows, fields) => {
                if (!err) {
                    // hago el render de el archivo respuesta-agregar y le paso 2 variables lista y text
                    res.render('respuesta-agregar', {
                        lista: rows,
                        text: `Has agregado la tarea ${req.body.id}`
                    });
                } else {
                    console.log(err);
                }
            });
        }
    });
});

//obtengo todas las tareas en localhost:3000/tareas
app.get('/tareas', function (req, res) {
    connection.query('SELECT * FROM tareas', (err, rows, fields) => {
        if (!err) {
            res.render('tareas', {
                lista: rows
            });
        } else {
            console.log(err);
        }
    });
});

//obtengo una tarea en especifico localhost:3000/tareas/id
app.get('/tareas/:id', function (req, res) {
    connection.query('SELECT * FROM tareas WHERE id = ?', req.params.id, (err, rows, fields) => {
        if (!err) {
            res.send(JSON.stringify(rows));
        } else {
            console.log(err);
        }
    });
});

// borrar una tarea localhost:3000/tareas/id
app.delete('/tareas/:id', function (req, res) {
    connection.query('DELETE FROM tareas WHERE id = ?', req.params.id, (err, rows, fields) => {
        if (!err) {
            res.send(`Has borrado la tarea ${req.params.id}`);
        } else {
            console.log(err);
        }
    });
});


//modifico una tarea localhost:3000/tareas/id
app.put('/tareas/:id', function (req, res) {
    connection.query('UPDATE tareas SET descripcion = ?, avatar = null WHERE id = ?', [req.body.name, req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send(`Has modificado la tarea ${req.params.id}`);
        } else {
            console.log(err);
        }
    });
});

//Levanto la aplicación en localhost:3000
app.listen(3000, function () {
    console.log("App corriendo en el puerto 3000");
});
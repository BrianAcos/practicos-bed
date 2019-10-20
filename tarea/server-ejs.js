//importo modulos
const mysql = require('mysql');
const express = require('express')
const app = express();

//decirle a express que use ejs
app.set('view engine', 'ejs');
//configurar la ruta donde ser deben buscar las vistas
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

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

//obtengo todas las tareas
app.get('/index', function (req, res) {
    connection.query('SELECT * FROM tareas', (err, rows, fields) => {
        if (!err) {
            console.log(rows.id);
            res.render('index', {
                obj: rows
            });
        } else {
            console.log(err);
        }
    });
});

//Levanto la aplicación
app.listen(3003, function () {
    console.log("App corriendo en el puerto 3000");
});
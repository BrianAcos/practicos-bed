//importo modulos
const mysql = require('mysql');
const express = require('express')
const app = express();

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
app.get('/tareas', function (req, res) {
    connection.query('SELECT * FROM tareas', (err, rows, fields) => {
        if (!err) {
            res.send(JSON.stringify(rows));
        } else {
            console.log(err);
        }
    });
});

//obtengo una tarea en especifico
app.get('/tareas/:id', function (req, res) {
    connection.query('SELECT * FROM tareas WHERE id = ?', req.params.id, (err, rows, fields) => {
        if (!err) {
            res.send(JSON.stringify(rows));
        } else {
            console.log(err);
        }
    });
});

// borrar una tarea
app.delete('/tareas/:id', function (req, res) {
    connection.query('DELETE FROM tareas WHERE id = ?', req.params.id, (err, rows, fields) => {
        if (!err) {
            res.send(`Has borrado la tarea ${req.params.id}`);
        } else {
            console.log(err);
        }
    });
});

//agrego una tarea
app.post('/tareas/:id', function (req, res) {
    connection.query('INSERT INTO tareas VALUES (? , ?)', [req.params.id, req.params.id] , (err, rows, fields) => {
        if (!err) {
            res.send(`Has agregado la tarea ${req.params.id}`);
        } else {
            console.log(err);
        }
    });
});

//modifico una tarea
app.put('/tareas/:id', function (req, res) {
    connection.query('INSERT INTO tareas VALUES (? , ?)', [req.params.id, req.params.id] , (err, rows, fields) => {
        if (!err) {
            res.send(`Has agregado la tarea ${req.params.id}`);
        } else {
            console.log(err);
        }
    });
});

//Levanto la aplicación
app.listen(3000, function () {
    console.log("App corriendo en el puerto 3000");
});

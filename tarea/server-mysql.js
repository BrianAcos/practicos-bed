//importo modulos
const http = require('http');
const mysql = require('mysql');

//establesco parametros de coneccion con mi base de datos
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'password',
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

//crear el servidor
const server = http.createServer((request, response) => {
    //pedir la lista de tareas DB
    if (request.url == '/tareas' && request.method == 'GET') {
        connection.query('SELECT * FROM tareas', (err, rows, fields) => {
            if (!err) {
                response.end(JSON.stringify(rows));
            } else {
                console.log(err);
            }
        });

        // pedir una tarea en especifico
    } else if (request.url.startsWith('/tareas/') && request.method == 'GET') {
        var id = request.url.substring(8);
        connection.query('SELECT * FROM tareas WHERE id = ?', [id], (err, rows, fields) => {
            if (!err) {
                response.end(JSON.stringify(rows));
            } else {
                console.log(err);
            }
        });

        // borrar una tarea
    } else if (request.url.startsWith('/tareas/') && request.method == 'DELETE') {
        var id = request.url.substring(8);
        connection.query('DELETE FROM tareas WHERE id = ?', [id], (err, rows, fields) => {
            if (!err) {
                response.end(JSON.stringify(rows));
            } else {
                console.log(err);
            }
        });

        // insertar una tarea
    } else if (request.url.startsWith('/tareas/') && request.method == 'POST') {
        var id = request.url.substring(8);
        connection.query('INSERT INTO tareas VALUES (? , ?)', [id], (err, rows, fields) => {
            if (!err) {
                response.end(JSON.stringify(rows));
            } else {
                console.log(err);
            }
        });

        // modificar una tarea UPDATE tareas SET 
    } else if (request.url.startsWith('/tareas/') && request.method == 'POST') {
        var id = request.url.substring(8);
        connection.query('INSERT INTO tareas VALUES (? , ?)', [id], (err, rows, fields) => {
            if (!err) {
                response.end(JSON.stringify(rows));
            } else {
                console.log(err);
            }
        });

        // error de direccion
    } else {
        response.writeHead(404, { 'Content-type': 'application/javascript' })
        response.end('ruta desconocida 404 not found')
    }
});

server.listen(3000, () => {
    console.log("Server listening on port 3000.");
});
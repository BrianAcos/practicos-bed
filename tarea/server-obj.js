//importo modulos
const http = require('http');

//crear el servidor
const server = http.createServer((request, response) => {

    //pedir la lista de tareas
    if (request.url == '/tareas' && request.method == 'GET') {
        response.writeHead(200, { 'Content-type': 'application/javascript' });
        response.end(JSON.stringify(tareas));

        //pedir una tarea en especifico
    } else if (request.url.startsWith('/tareas/') && request.method == 'GET') {
        var id = request.url.substring(8);

        //si la tarea existe se muestra sino no existe
        if (tareas[id]) { // tambien sirve(typeof tareas[id] == 'object') || (typeof tareas[id] !== 'undefined')
            response.end(JSON.stringify(tareas[id].name));
            response.writeHead(200, { 'Content-type': 'application/javascript' });
        } else {
            response.writeHead(400, { 'Content-type': 'application/javascript' });
            response.end(`La tarea ${id} no existe bad request 400`)
        }

        //agregar una tarea
    } else if (request.url.startsWith('/tareas/') && request.method == 'POST') {
        var id = request.url.substring(8)

        // agregando a la veriable data la informacion
        let data = '';
        request.on('data', (chunk) => {
            data += chunk;
        });

        //aprolijar el data
        request.on('end', () => {
            data = data.replace('=', '":"');
            data = `{"${data}"}`;
            var regex = /%20/gi;
            data = data.replace(regex, ' ')
            const obj = JSON.parse(data);
            // si existe la tarea error sino agrega la tarea
            if (tareas[id]) {
                response.end(`La tarea ${id} ya existe bad request 400`);
            } else {
                tareas[id] = obj;
                response.end(`Has agregado ${data}`);
            }

        });

        //modificar una tarea
    } else if (request.url.startsWith('/tareas/') && request.method == 'PUT') {
        var id = request.url.substring(8)

        // agregando a la veriable data la informacion
        let data = '';
        request.on('data', (chunk) => {
            data += chunk;
        });

        //aprolijar el data
        request.on('end', () => {
            data = data.replace('=', '":"');
            data = `{"${data}"}`;
            var regex = /%20/gi;
            data = data.replace(regex, ' ')
            const obj = JSON.parse(data);

            // si existe la tarea la modifica sino error
            if (tareas[id]) {
                tareas[id] = obj;
                response.end(`Has modificado la tarea ${id} a ${data}`);
            } else {
                response.end(`La tarea ${id} no existe bad request 400`);
            }
        });


        //borar una tarea
    } else if (request.url.startsWith('/tareas/') && request.method == 'DELETE') {
        var id = request.url.substring(8)

        //si la tarea existe borrarla sino error
        if (tareas[id]) {
            delete tareas[id]
            response.end(`Has borrado la tarea ${id}`)
        } else { response.end(`La tarea ${id} no se puede borrar porque no existe 400 bad request`) }

        //error de direccion
    } else {
        response.writeHead(404, { 'Content-type': 'application/javascript' })
        response.end('ruta desconocida 404 not found')
    }
});

server.listen(3000, () => {
    console.log("Server listening on port 3000.");
});
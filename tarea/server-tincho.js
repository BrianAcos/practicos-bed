const http = require('http');


const tareas = {'1': 'Hacer la cama'};

const server = http.createServer((request, res) => {
    var json;
    var url;
    var query;
    var fullUrl = request.url.split('/')
    var lastElement = fullUrl.pop()
    if (lastElement === 'tarea' || lastElement === 'tareas') {
        url = request.url;
        query = '';
    } else {
        url = fullUrl.join('/');
        query = lastElement;
    }

    // Me traigo todas las tareas
    if (url == '/api/tareas' && request.method === 'GET') {
        res.writeHead(200, {"Content-Type": "application/json"});
        json = JSON.stringify(tareas);
        res.end(json);
    } 
    // Me traigo una tarea en especifico
    else if (url == '/api/tarea' && request.method === 'GET') {
        try {
            res.writeHead(200, {"Content-Type": "application/json"});
            if (!tareas[query]) {
                throw Error('TODO ROTO');
            }
            json = JSON.stringify({'response':tareas[query]});
        } catch {
            res.writeHead(400, {"Content-Type": "application/json"});
            json = JSON.stringify({'Bad-Request':'400'});
        }
        res.end(json);
    // Creo una tarea
    } else if (url = '/api/tarea' && request.method === 'POST') {
        try {
            res.writeHead(200, {"Content-Type": "application/json"});
            var todo = '';
            request.on('data', (data) => {
                todo += data;
            })
            request.on('end', () => {
                res = JSON.parse(cleanUp(todo));
                tareas[query] = res.tarea
                json = JSON.stringify(tareas);
            })
            console.log(todo);
        } catch {
            res.writeHead(400, {"Content-Type": "application/json"});
            json = JSON.stringify({'Bad-Request':'400'});
        }
        res.end(json);
    // Modifico una tarea
    } else if (url = '/api/tarea' && request.method === 'PUT') {
        try {
            res.writeHead(200, {"Content-Type": "application/json"});
            if (tareas[query]) {
                var todo = '';
                request.on('data', (data) => {
                    todo += data;
                })
                request.on('end', () => {
                    res = JSON.parse(cleanUp(todo));
                    tareas[query] = res.tarea
                    json = JSON.stringify(tareas);
                })
            } else {
                res.writeHead(400, {"Content-Type": "application/json"});
                json = JSON.stringify({'Bad-Request':'400'});
            }
        } catch {   
            res.writeHead(400, {"Content-Type": "application/json"});
            json = JSON.stringify({'Bad-Request':'400'});
        }
        res.end(json);
    // Borro una tarea
    } else if (url = '/api/tarea' && request.method === 'DELETE') {
        try {
            res.writeHead(200, {"Content-Type": "application/json"});
            if (!tareas[query]) {
                throw Error('TODO ROTO');
            }
            delete tareas[query]
            json = JSON.stringify(tareas);
        } catch {
            res.writeHead(400, {"Content-Type": "application/json"});
            json = JSON.stringify({'Bad-Request':'400'});
        }
        res.end(json);
    // Fallback
    } else {
        res.writeHead(200, {"Content-Type": "application/json"});
        var json = JSON.stringify({'200':'Ruta no reconocida'});
        res.end(json);
    }

});

server.listen(3002, () => {
    console.log("Server listening on port 3002.");
});

function send404(response) {
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.write('Error 404: resource not found.');
    response.end();
}

const cleanUp = (str) => {
    cleaned = str.replace('=', '\":\"').trim()
    return "{\"" + cleaned + "\"}"
}
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const saltRounds = 10;

let con = null;

function initRouter(connection) {
    con = connection;
    return router
}

router.get('/', (req, res) => {
    res.render('register');
});

router.post('/', (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        if (err) {
            console.log(err);
            res.render('error', {
                error: 'ocurrio un error al insertar un usuario en la base de datos'
            });
        } else {
            con.query('INSERT INTO users VALUES (?, ?)', [req.body.username, hash], (err, resp) => {
                if (err) {
                    console.log(err);
                    res.render('error', {
                        error: 'ocurrio un error al insertar un usuario en la base de datos'
                    });
                } else { res.render('congrats') }
            });
        }
    });
});

module.exports = initRouter;
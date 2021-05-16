const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../models/User');
const validaciones = require('../middlewares/validaciones')

console.log("cargando auth-router.js");

router.post('/login', validaciones.validarLogin, async (req, res) => {
    //buscar alumno con ese correo
    let user = await User.getUser(req.body.correo)
    console.log(bcrypt.compareSync(req.body.password, user.password));
    if (user) {
        //comparar el password con el hash de la base de datos
        if (bcrypt.compareSync(req.body.password, user.password)) {
            //generación del token
            let token = jwt.sign({
                correo: user.correo
            }, 'Jeopardy', {
                expiresIn: 60 * 180
            })
            res.send({
                token: token
            })
        } else {
            res.status(401).send({
                error: "password incorrecto"
            })
        }
    } else {
        res.status(404).send({
            error: "No existe ese alumno"
        })
    }

})

router.get('/logout', (req, res) => {})

module.exports = router;
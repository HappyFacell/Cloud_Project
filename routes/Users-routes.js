const router = require('express').Router()
const bcrypt = require('bcryptjs')
const validaciones = require('../middlewares/validaciones')
const moment = require('moment')
const User = require('../models/User');




router.get('/', validaciones.estaAutenticado, async (req, res) => {
    let lista = await User.getUsers();

    res.send(lista)
})

// /alumnos

router.get('/:email', validaciones.estaAutenticado, async (req, res) => {
    let doc = await User.getUser(req.params.email)
    res.send(doc)
})

router.get('/nombre/:nombre', validaciones.estaAutenticado, (req, res) => {
    let nom = req.params.nombre;
    res.send(User.filter(a => a.nombre.toLowerCase() == nom.toLowerCase()))

})


//asegurar que tenga el header xauth
router.post('/', async (req, res) => {
    console.log(req.body);
    let {
        nombre,
        apellido,
        correo,
        Edad,
        password,
        url
    } = req.body;
    if (nombre && apellido && correo && Edad && password && url) {

        let hash = bcrypt.hashSync(password, 8);

        let doc = await User.guardarDatos({
            nombre,
            apellido,
            correo,
            Edad,
            password: hash,
            fecha: moment().format('DD/MM/YYYY'),
            url
        })
        console.log(doc);
        if (doc && !doc.error) {
            res.status(201).send(doc)
        } else {
            res.status(400).send(doc)
        }
        return;
    }

    res.status(400).send({
        error: "faltan datos"
    })
})

router.put('/:email', validaciones.estaAutenticado, async (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, 8);
    let doc = await User.updateDatos(req.params.email, req.body);
    res.send(doc)
})

router.delete('/:email', validaciones.estaAutenticado, async (req, res) => {
    let doc = await User.deleteUser(req.params.email)
    res.send(doc)
})


module.exports = router;
const router = require('express').Router()
const fs = require('fs')
const path = require('path')

const Matrix = require('../models/Matrix');




router.get('/', async (req, res) => {

    // {prop1:asdfsdf, pro2: sfd , nombre:'test'}   

    // let filtro = {}
    // if (nombre)
    //     filtro.nombre = new RegExp(nombre, 'i')
    // if (descripcion)
    //     filtro.descripcion = descripcion;
    // if (correo)
    //     filtro.correo = new RegExp(correo, 'i')


    let lista = await Matrix.getMatrices();
    res.send(lista)
})

// /alumnos

router.get('/:id', async (req, res) => {
    let doc = await User.getMatrix(req.params.id)
    res.send(doc)
})


//asegurar que tenga el header xauth
router.post('/', async (req, res) => {
    console.log(req.body);
    let {
        id,
        nombre,
        url,
        descripcion,
        fecha,
        categoria1,
        categoria2,
        categoria3,
        categoria4,
        categoria5
    } = req.body;
    if (id && nombre && url && descripcion && fecha && categoria1 && categoria2 && categoria3 && categoria4 && categoria5) {

        // alumnos.push({nombre, calificacion})
        // fs.writeFileSync(path.join(__dirname,'../alumnos.json'), JSON.stringify(alumnos))
        // res.status(201).send()
        // return;
        // let hash = bcrypt.hashSync(password, 8);

        let doc = await Matrix.guardarDatos({
            id,
            nombre,
            url,
            descripcion,
            fecha,
            categoria1,
            categoria2,
            categoria3,
            categoria4,
            categoria5
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

router.put('/:id', async (req, res) => {
    let doc = await Matrix.updateDatos(req.params.id, req.body);
    res.send(doc)
})

router.delete('/:id', async (req, res) => {
    let doc = await Matrix.deleteMatrix(req.params.id)
    res.send(doc)
})


module.exports = router;
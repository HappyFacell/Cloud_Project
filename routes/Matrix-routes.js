const router = require('express').Router();
const shortid = require('shortid');
const moment = require('moment')
const Matrix = require('../models/Matrix');
const validaciones = require('../middlewares/validaciones')




router.get('/', validaciones.estaAutenticado, async (req, res) => {

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

router.get('/:id', validaciones.estaAutenticado, async (req, res) => {
    let doc = await Matrix.getMatrix(req.params.id)
    res.send(doc)
})


//asegurar que tenga el header xauth
router.post('/', async (req, res) => {
    console.log(req.body);
    let {
        nombre,
        url,
        descripcion,
        categoria1,
        categoria2,
        categoria3,
        categoria4,
        categoria5,
        rol,
        autor
    } = req.body;


    if (nombre && url && descripcion && categoria1 && categoria2 && categoria3 && categoria4 && categoria5 && rol && autor) {

        // alumnos.push({nombre, calificacion})
        // fs.writeFileSync(path.join(__dirname,'../alumnos.json'), JSON.stringify(alumnos))
        // res.status(201).send()
        // return;
        // let hash = bcrypt.hashSync(password, 8);

        let doc = await Matrix.guardarDatos({
            id: shortid.generate(),
            nombre,
            url,
            descripcion,
            fecha: moment().format('DD/MM/YYYY'),
            categoria1,
            categoria2,
            categoria3,
            categoria4,
            categoria5,
            rol,
            autor
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

router.put('/:id', validaciones.estaAutenticado, async (req, res) => {
    let doc = await Matrix.updateDatos(req.params.id, req.body);
    res.send(doc)
})

router.delete('/:id', validaciones.estaAutenticado, async (req, res) => {
    let doc = await Matrix.deleteMatrix(req.params.id)
    res.send(doc)
})


module.exports = router;
const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const shortid = require("shortid");
let users = require("../users.json");

router.post('/', (req, res) => {
    let errors = [];

    let objFields = ["correo", "password"]


    objFields.forEach(k => {
        if (!(k in req.body)) {
            errors.push(k);
        }
    });

    if (errors.length != 0) {
        res.status(400).send(`Faltan campos: ${errors}`);
        return;
    }

    let user = users.find(usuario => {

        let correo = usuario.correo;
        let password = usuario.password;

        return correo.toUpperCase() === req.body.correo.toUpperCase() &&
            password.toUpperCase() === req.body.password.toUpperCase()
    });

    if (user) {
        let token = req.header("x-auth");
        if (!token) {
            token = shortid.generate() + "-" + user.uid;
        }
        user.token = token;
        fs.writeFileSync(path.join(__dirname, '../users.json'), JSON.stringify(users));
        res.status(201).send(token);
        return;
    } 
    res.status(406).send("Datos no validos, usuario no encontrado");
});

module.exports = router;
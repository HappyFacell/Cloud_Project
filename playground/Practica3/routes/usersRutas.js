const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const shortid = require("shortid");
let users = require("../users.json");

// router.route("/").get((req, res) => {
//     res.send("Users app práctica 3");
// })

router.post('/', (req, res) => {
    let errors = [];
    let id = shortid.generate();
    let randomImg = Math.floor(Math.random() * (100 - 1)) % 100;

    let objFields = ["nombre", "apellido", "correo", "password", "fecha", "sexo"]


    objFields.forEach(k => {
        if (!(k in req.body)) {
            errors.push(k);
        }
    });

    if (!("imagen" in req.body)) {
        req.body.imagen = req.body.sexo.toUpperCase() === "H" ? `https://randomuser.me/api/portraits/men/${randomImg}.jpg` :
         `https://randomuser.me/api/portraits/women/${randomImg}.jpg`;
    }

    if (errors.length != 0) {
        res.status(400).send(`Faltan campos: ${errors.join(",  ")}`);
        return;
    }

    if (users.find(usuario => (
                usuario.nombre.toUpperCase() === req.body.nombre.toUpperCase() &&
                usuario.apellido.toUpperCase() === req.body.apellido.toUpperCase()) ||
            usuario.correo.toUpperCase() === req.body.correo.toUpperCase())) {
        res.status(400).send("Usuario repetido");
        return;
    }

    req.body.uid = id;
    users.push(req.body);
    fs.writeFileSync(path.join(__dirname, '../users.json'), JSON.stringify(users));
    console.log("Creado");
    res.status(201).send(req.body);

})




router.get('/', estaAutenticado, (req, res) => {
    let newusers = users.map(user => {
        return {
            nombre: user.nombre,
            apellido: user.apellido,
            correo: user.correo,
            imagen: user.imagen
        }
    });
    let result = newusers.slice()
    if (req.query.nombre) {
        result = result.filter(user => {
            return user.nombre.toLowerCase().includes(req.query.nombre.toLowerCase())
        });
    }
    if (req.query.apellido) {
        result = result.filter(user => {
            return user.apellido.toLowerCase().includes(req.query.apellido.toLowerCase())
        });
    }
    if (req.query.year) {
        result = users.filter(user => {
            let year = user.fecha.split("-");
            return Number(year[0]) == req.query.year;
        }).map(user => {
            return {
                nombre: user.nombre,
                apellido: user.apellido,
                correo: user.correo,
                imagen: user.imagen
            }
        })
    }
    if (req.query.page) {
        if (req.query.limit) {
            result = result.slice((Number(req.query.page) * Number(req.query.limit)) - Number(req.query.limit), (Number(req.query.page) * Number(req.query.limit)))
        } else {
            result = result.slice((Number(req.query.page) * 5) - 5, (Number(req.query.page) * 5))
        }
    }
    res.send(result);
})

router.route('/:email')
    .get(estaAutenticado, (req, res) => {
        let cor = req.params.email;
        if (users.find(user => user.correo === cor)) {
            res.status(302).send(users.filter(user => user.correo.toLowerCase() === cor.toLowerCase()));
            return;
        }
        res.status(404).send({
            error: `El siguiente correo no fue encontrado: ${cor}`
        })
    })
    .put(estaAutenticado, (req, res) => {
        let cor = req.params.email;
        if (users.find(user => user.correo === req.params.email)) {
            let errors = [];
            let objFields = ["nombre", "apellido", "correo", "password", "fecha", "sexo"]
            objFields.forEach(k => {
                if (!(k in req.body)) {
                    errors.push(k);
                }
            });
            if (errors.length != 0) {
                res.status(400).send(`Faltan campos: ${errors.join(", ")}`);
                return;
            }
            let index = users.findIndex(user => user.correo === cor);

            if (("imagen" in req.body)) {
                users[index].imagen = req.body.imagen;
            }
            users[index].nombre = req.body.nombre;
            users[index].apellido = req.body.apellido;
            users[index].password = req.body.password;
            users[index].fecha = req.body.fecha;
            users[index].sexo = req.body.sexo;

            fs.writeFileSync(path.join(__dirname, '../users.json'), JSON.stringify(users));
            res.status(302).send(users[index]);
            return;
        }
        res.status(404).send({
            error: `El siguiente correo no fue encontrado: ${cor}`
        })
    }).delete(estaAutenticado, (req, res) => {
        let cor = req.params.email;
        if (users.find(user => user.correo === req.params.email)) {
            let index = users.findIndex(user => user.correo === cor);
            users.splice(index, 1);
            fs.writeFileSync(path.join(__dirname, '../users.json'), JSON.stringify(users));
            res.status(302).send(`Usuario eliminado`);
            return;
        }
        res.status(404).send({
            error: `El siguiente correo no fue encontrado: ${cor}`
        })
    });


function estaAutenticado(req, res, next) {
    let token = req.header("x-auth");
    if (token) {
        let id = token.split("-").pop();
        if (users.find(user => user.uid == id && user.token == token)) {
            req.uid = id
            next()
            return;
        } else {
            res.status(404).send({
                error: "Id o token no coinciden"
            });
            return;
        }

    }

    res.status(401).send({
        error: "Usuario sin token"
    })
}

module.exports = router;
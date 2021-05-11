const mongoose = require('../db/mongodb_connect')

let UserSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        // unique: true
    },
    apellido: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true,
        unique: true

    },
    Edad: {
        type: Number,
        required: true
    },
    matrices: {
        type: Array
    },
    password:{
        type: String,
        required: true
    },
    fecha:{
        type: String,
        required: true
    },
    url:{
        type:String,
        required:true
    }
})



UserSchema.statics.getUsers = async () => {
    let docs = await User.find({})
    // console.log(docs);
    return docs;
}


UserSchema.statics.guardarDatos = async function (newUser) {
    let user = new User(newUser);
    try {
        let doc = await user.save();
        console.log(doc, "Paso al modelo");
        return doc;
    } catch (e) {
        console.log("Error al guardar", e.code);
        // throw e;
        return {
            error: 'Usuario repetido'
        };
    }
}

UserSchema.statics.updateDatos = async function (correo, datos) {
    let doc = await User.findOneAndUpdate({
        correo
    }, {
        $set: datos
    }, {
        new: true,
        useFindAndModify: false
    });
    return doc;
}

UserSchema.statics.getUser = async correo => {
    let doc = await User.findOne({
        correo
    })
    //let doc = await Alumno.findById(id)
    return doc;
}

UserSchema.statics.deleteUser = async function (correo) {
    let doc = await User.findOneAndDelete({
        correo
    });
    return doc;
}


let User = mongoose.model('User', UserSchema);

//guardarDatos({nombre: 'test', calificacion: 8.5, carreras: ['ISC','ISI'], correo:'t@t', password:'test', rol:'ADMIN'})
module.exports = User;


async function updateAlumno() {
    let doc = await User.updateDatos('t4@t', {
        nombre: 'Juan'
    })
    console.log(doc);
}

//updateAlumno()

async function getAlumno() {
    console.log(await User.find({}));
}
// getAlumno();
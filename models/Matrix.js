const mongoose = require('../db/mongodb_connect')

let MatrixSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    url: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true,
    },
    fecha: {
        type: String,
        required: true
    },
    categoria1: {
        type: Object,
        required: true
    },
    categoria2: {
        type: Object,
        required: true
    },
    categoria3: {
        type: Object,
        required: true
    },
    categoria4: {
        type: Object,
        required: true
    },
    categoria5: {
        type: Object,
        required: true
    },
})



MatrixSchema.statics.getMatrices = async () => {
    let docs = await Matrix.find({})
    console.log(docs);
    return docs;
}


MatrixSchema.statics.guardarDatos = async function (newMatrix) {
    let matrix = new Matrix(newMatrix);
    console.log(matrix);
    try {
        let doc = await matrix.save();
        console.log(doc, "Paso al modelo");
        return doc;
    } catch (e) {
        console.log("Error al guardar", e.code);
        // throw e;
        return {
            error: 'Matriz repetida'
        };
    }
}

MatrixSchema.statics.updateDatos = async function (id, datos) {
    let doc = await Matrix.findOneAndUpdate({
        id
    }, {
        $set: datos
    }, {
        new: true,
        useFindAndModify: false
    });
    return doc;
}

MatrixSchema.statics.getMatrix = async id => {
    let doc = await Matrix.findOne({
        id
    })
    //let doc = await Alumno.findById(id)
    return doc;
}
MatrixSchema.statics.deleteMatrix = async function (id) {
    let doc = await Matrix.findOneAndDelete({
        id
    });
    return doc;
}


let Matrix = mongoose.model('Matrices', MatrixSchema);

//guardarDatos({nombre: 'test', calificacion: 8.5, carreras: ['ISC','ISI'], correo:'t@t', password:'test', rol:'ADMIN'})
module.exports = Matrix;
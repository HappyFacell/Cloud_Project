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
        titulo: {
            type: String,
            required: true,
            unique: true
        },
        pregunta1: {
            type: String,
            required: true
        },
        respuesta1: {
            type: String,
            required: true
        },
        valor1: {
            type: Number,
            required: true,
        },
        pregunta2: {
            type: String,
            required: true
        },
        respuesta2: {
            type: String,
            required: true
        },
        valor2: {
            type: Number,
            required: true,
        },
        pregunta3: {
            type: String,
            required: true
        },
        respuesta3: {
            type: String,
            required: true
        },
        valor3: {
            type: Number,
            required: true,
        },
        pregunta4: {
            type: String,
            required: true
        },
        respuesta4: {
            type: String,
            required: true,
        },
        valor4: {
            type: Number,
            required: true,
        },
        pregunta5: {
            type: String,
            required: true,
        },
        respuesta5: {
            type: String,
            required: true,
        },
        valor5: {
            type: Number,
            required: true,
        },
        required: true
    },
    categoria2: {
        titulo: {
            type: String,
            required: true,
            unique: true
        },
        pregunta1: {
            type: String,
            required: true
        },
        respuesta1: {
            type: String,
            required: true
        },
        valor1: {
            type: Number,
            required: true,
        },
        pregunta2: {
            type: String,
            required: true
        },
        respuesta2: {
            type: String,
            required: true
        },
        valor2: {
            type: Number,
            required: true,
        },
        pregunta3: {
            type: String,
            required: true
        },
        respuesta3: {
            type: String,
            required: true
        },
        valor3: {
            type: Number,
            required: true,
        },
        pregunta4: {
            type: String,
            required: true
        },
        respuesta4: {
            type: String,
            required: true,
        },
        valor4: {
            type: Number,
            required: true,
        },
        pregunta5: {
            type: String,
            required: true,
        },
        respuesta5: {
            type: String,
            required: true,
        },
        valor5: {
            type: Number,
            required: true,
        },
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
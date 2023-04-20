const express = require("express");
const cors = require('cors')
const userRouter = require("./routes/Users-routes")
const matrixRouter = require("./routes/Matrix-routes")
const loginRouter = require('./routes/Login-routes')
const {
    log,
    test
} = require('./middlewares/logs')


const app = express();
const port = process.env.PORT || 3000;


app.use(cors())
app.use(express.json());
app.use(log, test);


app.use(express.static(__dirname + "/public"))


app.use('/api/user', userRouter);
app.use('/api/matrix', matrixRouter);
app.use('/api/auth', loginRouter);

app.listen(port, () => console.log("Ejecutando en puerto " + port))
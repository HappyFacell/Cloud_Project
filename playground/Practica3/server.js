const express = require("express");
const app = express();
const port = 3000
const usersRutas = require("./routes/usersRutas");
const loginRutas = require("./routes/loginRutas");

app.use(express.json());
app.use('/api/users',usersRutas);
app.use('/api/login',loginRutas);


app.listen(port, () => console.log("Ejecutando en puerto " + port));
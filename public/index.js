var userToken;
let RF = document.querySelector("#RF");
let RB = document.querySelector("#RB");
let LF = document.querySelector("#LF");
let LB = document.querySelector("#LB");


RF.addEventListener("change",function (e){
    let checks = document.querySelectorAll("#ModalRegistro input:invalid");
    if (checks.length <=0 ){
        document.querySelector("#RB").removeAttribute("disabled");
    }
})


LF.addEventListener("change",function (e){
    let checks = document.querySelectorAll("#ModalLogin input:invalid");
    if (checks.length <=0 ){
        document.querySelector("#LB").removeAttribute("disabled");
    }
})


async function postData(datos) {
    let url = "https://proyectojeopardy2021.herokuapp.com/api/user"
    let resp = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type':'application/json+'
        },
        body: JSON.stringify(datos)
    })
    if (resp.ok) {
        sendOK("Usuario Registrado")
        $('#ModalRegistro').modal('hide');
        RF.reset();
    } else {
        sendError("Usuario repetido o invalido")
    }
}

function cbSometerForm() {
    event.preventDefault();
    let data = new FormData(event.target);
    let user = Object.fromEntries(data.entries());
    if(document.getElementById("password1").value == document.getElementById("password2").value){
        postData(user);
    } 
    else
        sendError("Las contraseñas no coinciden")
}


function login() {
    event.preventDefault();
    const login = {
        correo: document.getElementById("LoginCorreo").value,
        password: document.getElementById("LoginPassword").value
    }
    postToken(login);
};

async function postToken(datos) {
    let url = "https://proyectojeopardy2021.herokuapp.com/api/auth/login"
    let resp = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
    if (resp.ok) {
        userToken = await resp.json();
        sessionStorage.userToken = userToken.token;
        sessionStorage.login = datos.correo;
        window.location.href = "Create_Edit.html";
    } else {
        sendError("Usuario no encontrado")
        $('#ModalLogin').modal('hide');
        LF.reset();
    }
}

function sendError(mensaje){
    document.getElementById("errores").innerHTML = `
    <div class="alert alert-danger" role="alert">
    ${mensaje}
    </div>
    `;
  }

function sendOK(mensaje){
    document.getElementById("errores").innerHTML = `
    <div class="alert alert-success" role="alert">
    ${mensaje}
    </div>
    `;
}
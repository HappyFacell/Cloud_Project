var user;

function usertoHTML(user) {
    document.getElementById("mini").innerHTML = `
    <img src="${user.url}" alt="imagen de usuario" style="width: 5rem;">
    <h3>Nombre: ${user.nombre}</h3>
    <h3>Apellido: ${user.apellido}</h3>
    <h3>Correo: ${user.correo}</h3>
    <h3>Fecha: ${user.fecha}</h3>
    <h3>Sexo: ${user.sexo}</h3>
    <h3>Edad: ${user.Edad} años</h3>
    `;
    document.getElementById("content").innerHTML = `
    <div class="container mt-5">

    <img src="${user.url}" alt="imagen de usuario" style="width: 10rem;">
    <h3>Nombre: ${user.nombre}</h3>
    <h3>Apellido: ${user.apellido}</h3>
    <h3>Correo: ${user.correo}</h3>
    <h3>Fecha: ${user.fecha}</h3>
    <h3>Sexo: ${user.sexo}</h3>
    <h3>Edad: ${user.Edad} años</h3>
            <a class="btn btn-danger" style="margin-bottom: 1rem;" data-toggle="modal" data-target="#Delete">Eliminar usuario</a>
        </div>
        <div class="modal-footer">
            <a href="./Create_Edit.html" class="btn btn-primary">Regresar</a>
        </div>
    </form>
</div>
    `;
}

async function loadUser(datos) {
    let url = "https://proyectojeopardy2021.herokuapp.com/api/user/" + sessionStorage.login;
    let resp = await fetch(url, {
        method: "GET",
        headers: {
            "x-auth": sessionStorage.userToken,
            'Content-Type': 'application/json'
        },
    })
    if (resp.ok) {
        user = await resp.json();
        usertoHTML(user);
        setTimeout(() => {
            console.log("fuera de tiempo")
        }, 5000);
    } else {
        console.log("valio madre")
        setTimeout(() => {
            console.log("En la torre")
        }, 5000);
    }
}

async function deletedUser() {
    let url = "https://proyectojeopardy2021.herokuapp.com/api/user/" + user.correo;
    console.log(url);
    let resp = await fetch(url, {
        method: "DELETE",
        headers: {
            "x-auth": sessionStorage.userToken
        }
    })
    if (resp.ok) {
        sessionStorage.userToken = undefined;
        window.location.href = "index.html";
    } else {
        sendError("No se pudo eliminar la matríz, vuelva a cargar la pagina e intente de nuevo")
    }
}

loadUser();
var user;
function usertoHTML(user){
    let sexo = user.sexo.toUpperCase() === "H" ?"Hombre" : "Mujer";
    document.getElementById("content").innerHTML = `
    <div class="container mt-5">
        
    <form class="was-validated">
    
    <div class="text-center">
    <img src="${user.url}"></div>
    <br>
            <div class="form-row">
            
                <div class="form-group col-md-6">
                    <b>Nombre:</b>
                    <div class="input-group is-valid">
                        <input type="text" class="form-control is-valid" aria-describedby="validatedInputGroupPrepend"
                            required pattern="[a-zA-Z\s]+" value="${user.nombre}">
                        <div class="invalid-feedback">
                            Falta llenar campo
                        </div>
                    </div>
                </div>
                <div class="form-group col-md-6">
                    <b>Apellido:</b>
                    <div class="input-group is-valid">
                        <input type="text" class="form-control is-valid" aria-describedby="validatedInputGroupPrepend"
                            required pattern="[a-zA-Z\s]+" value="${user.apellido}">
                        <div class="invalid-feedback">
                            Falta llenar campo
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <b>Correo:</b>
                <div class="input-group is-valid">
                    <input type="email" class="form-control is-valid" aria-describedby="validatedInputGroupPrepend"
                        required value="${user.correo}">
                    <div class="invalid-feedback">
                        Falta llenar campo
                    </div>
                </div>
            </div>
            <div class="form-group">
                <b>Fecha de registro:</b>
                <div class="input-group is-valid">
                    <input type="text" class="form-control is-valid" aria-describedby="validatedInputGroupPrepend"
                        required placeholder="01/01/2021" value="${user.fecha}">
                    <div class="invalid-feedback">
                        Falta llenar campo
                    </div>
                </div>
            </div>
            <div class="form-group">
                <b>Sexo:</b>
                <div class="input-group is-valid">
                    <input type="text" class="form-control is-valid" aria-describedby="validatedInputGroupPrepend"
                        required value="${sexo}">
                    <div class="invalid-feedback">
                        Falta llenar campo
                    </div>
                </div>
            </div>
            <div class="form-group">
            <b>Edad:</b>
            <div class="input-group is-valid">
                <input type="text" class="form-control is-valid" aria-describedby="validatedInputGroupPrepend"
                    required value="${user.Edad}">
                <div class="invalid-feedback">
                    Falta llenar campo
                </div>
            </div>
            <div class="form-group">
            <b>Imagen:</b>
            <div class="input-group is-valid">
                <input type="url" class="form-control is-valid" aria-describedby="validatedInputGroupPrepend"
                    required placeholder="Url de imagen de perfil"
                    value="${user.url}">
                <div class="invalid-feedback">
                    Falta llenar campo
                
                </div>
            </div>

            </div>
            </div>

            <div class="modal-footer">
                <a href="./Create_Edit.html" class="btn btn-primary">Regresar</a>
            </div>
        </form>
    </div>
    `;
}

async function loadUser(datos) {
    let url = "https://proyectojeopardy2021.herokuapp.com/api/user/"+sessionStorage.login;
    let resp = await fetch(url, {
        method: "GET",
        headers: {
            "x-auth": sessionStorage.userToken,
            'Content-Type':'application/json'
        },
    })
    if (resp.ok) {
        user = await resp.json();
        console.log(user)
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

loadUser();
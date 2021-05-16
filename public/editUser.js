var user;

function usertoHTML(user) {
  user.sexo = user.sexo.toUpperCase() === "H" ? "Hombre" : "Mujer";
  document.getElementById("EF").innerHTML = `
    
    
    <div class="text-center">
    <img src="${user.url}"></div>
    <br>
            <div class="form-row">
            
                <div class="form-group col-md-6">
                    <b>Nombre:</b>
                    <div class="input-group is-valid">
                        <input type="text" class="form-control is-valid" aria-describedby="validatedInputGroupPrepend"
                            required name="nombre" value="${user.nombre}">
                        <div class="invalid-feedback">
                            Falta llenar campo
                        </div>
                    </div>
                </div>
                <div class="form-group col-md-6">
                    <b>Apellido:</b>
                    <div class="input-group is-valid">
                        <input type="text" class="form-control is-valid" aria-describedby="validatedInputGroupPrepend"
                            required name="apellido" value="${user.apellido}">
                        <div class="invalid-feedback">
                            Falta llenar campo
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group border rounded-left">
            <div class="form-check ml-3">
              <input type="radio" class="form-check-input" id="Mujer" name="sexo" required value="Mujer">
              <label class="form-check-label" for="Mujer">Mujer</label>
            </div>
            <div class="form-check ml-3">
              <input type="radio" class="form-check-input" id="Hombre" name="sexo" required value="Hombre">
              <label class="form-check-label" for="Hombre">Hombre</label>
              <div class="invalid-feedback">
                Falta llenar campo
              </div>
            </div>
          </div>
            <div class="form-group">
            <b>Edad:</b>
            <div class="input-group is-valid">
                <input type="text" class="form-control is-valid" name="Edad" aria-describedby="validatedInputGroupPrepend"
                    required value="${user.Edad}">
                <div class="invalid-feedback">
                    Falta llenar campo
                </div>
            </div>
            <div class="form-group">
            <b>Contraseña:</b>
            <div class="input-group is-valid">
                <input type="password" class="form-control is-valid" aria-describedby="validatedInputGroupPrepend"
                    required placeholder="contraseña" id= "password1" name ="password">
                <div class="invalid-feedback">
                    Falta llenar campo
                </div>
            </div>
            <div class="form-group">
            <b>Confirmar contraseña:</b>
            <div class="input-group is-valid">
                <input type="password" class="form-control is-valid" aria-describedby="validatedInputGroupPrepend"
                    required placeholder="contraseña" id ="password2">
                <div class="invalid-feedback">
                    Falta llenar campo
                </div>
            </div>
            <div class="form-group">
            <b>Imagen:</b>
            <div class="input-group is-valid">
                <input type="url" class="form-control is-valid" aria-describedby="validatedInputGroupPrepend"
                    placeholder="Url de imagen de perfil" name="url" value="${user.url}">
                <div class="invalid-feedback">
                    Falta llenar campo
                
                </div>
            </div>

            </div>
            </div>

            <div class="modal-footer">
            <button type="submit" class="btn btn-success" id="RB">Editar</button>
                <a href="./Create_Edit.html" class="btn btn-danger">Cancelar</a>
            </div>
    `;
}

async function loadUser(datos) {
  let url =
    "https://proyectojeopardy2021.herokuapp.com/api/user/" +
    sessionStorage.login;
  let resp = await fetch(url, {
    method: "GET",
    headers: {
      "x-auth": sessionStorage.userToken,
      "Content-Type": "application/json",
    },
  });
  if (resp.ok) {
    user = await resp.json();
    console.log(user);
    usertoHTML(user);
  } else {
    console.log("valio madre");
    setTimeout(() => {
      console.log("En la torre");
    }, 5000);
  }
}

async function editUser(datos) {
  let url =
    "https://proyectojeopardy2021.herokuapp.com/api/user/" + sessionStorage.login;
  let resp = await fetch(url, {
    method: "PUT",
    headers: {
      "x-auth": sessionStorage.userToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  });
  if (resp.ok) {
    window.location.href = "Create_Edit.html";
  } else {
    console.log("valio madre");
    setTimeout(() => {
      console.log("En la torre");
    }, 5000);
  }
}

loadUser();

let form = document.getElementById("EF");

function cbSometerForm() {
  event.preventDefault();
  let data = new FormData(event.target);
  let edited_user = Object.fromEntries(data.entries());
  if (document.getElementById("password1").value == document.getElementById("password2").value) {
    editUser(edited_user);
  }
}
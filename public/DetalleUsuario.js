function loadUser(Nombre, Apellido, Email, Password, Fecha, Sexo){
    document.getElementById("content").innerHTML = `
    <div class="container mt-5">
        <form class="was-validated">
            <div class="form-row">
                <div class="form-group col-md-6">
                    <b>Nombre</b>
                    <div class="input-group is-valid">
                        <input type="text" class="form-control is-valid" aria-describedby="validatedInputGroupPrepend"
                            required pattern="[a-zA-Z\s]+" value="${Nombre}">
                        <div class="invalid-feedback">
                            Falta llenar campo
                        </div>
                    </div>
                </div>
                <div class="form-group col-md-6">
                    <b>Apellido</b>
                    <div class="input-group is-valid">
                        <input type="text" class="form-control is-valid" aria-describedby="validatedInputGroupPrepend"
                            required pattern="[a-zA-Z\s]+" value="${Apellido}">
                        <div class="invalid-feedback">
                            Falta llenar campo
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <b>Correo</b>
                <div class="input-group is-valid">
                    <input type="email" class="form-control is-valid" aria-describedby="validatedInputGroupPrepend"
                        required value="${Email}">
                    <div class="invalid-feedback">
                        Falta llenar campo
                    </div>
                </div>
            </div>
            <div class="form-group">
                <b>Password</b>
                <div class="input-group is-valid">
                    <input type="text" class="form-control is-valid" aria-describedby="validatedInputGroupPrepend"
                        required value="${Password}">
                    <div class="invalid-feedback">
                        Falta llenar campo
                    </div>
                </div>
            </div>
            <div class="form-group">
                <b>Fecha</b>
                <div class="input-group is-valid">
                    <input type="datetime" class="form-control is-valid" aria-describedby="validatedInputGroupPrepend"
                        required placeholder="01/01/2021" value="${Fecha}">
                    <div class="invalid-feedback">
                        Falta llenar campo
                    </div>
                </div>
            </div>
            <div class="form-group">
                <b>Sexo</b>
                <div class="input-group is-valid">
                    <input type="text" class="form-control is-valid" aria-describedby="validatedInputGroupPrepend"
                        required value="${Sexo}">
                    <div class="invalid-feedback">
                        Falta llenar campo
                    </div>
                </div>
            </div>
            <div class="form-group">
                <b>Imagen</b>
                <div class="input-group is-valid">
                    <img src="https://randomuser.me/api/portraits/men/0.jpg">
                    <input type="url" class="form-control is-valid" aria-describedby="validatedInputGroupPrepend"
                        required placeholder="Url de imagen de perfil"
                        value="https://randomuser.me/api/portraits/men/0.jpg">
                    <div class="invalid-feedback">
                        Falta llenar campo
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

loadUser("Diego", "Ferreira", "d@test.com", "1234", "11/05/2021", "Hombre");
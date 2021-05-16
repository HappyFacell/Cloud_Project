let bc1,bc2,bc3,bc4,bc5,bc6,bt1,bt2,bt3,bt4,bt5,bt6;
bc1=bc2=bc3=bc4=bc5=bc6=bt1=bt2=bt3=bt4=bt5=bt6=be=false;

let matrix_global= {
url: String,
nombre: String,
descripcion: String,
rol: Boolean,
autor: String,
categoria1: {
  titulo : String,
  pregunta1 :String,
  respuesta1 :String,
  valor1 : Number,
  pregunta2 :String,
  respuesta2 :String,
  valor2 : Number,
  pregunta3 :String,
  respuesta3 :String,
  valor3 : Number,
  pregunta4 :String,
  respuesta4 :String,
  valor4 : Number,
  pregunta5  :String,
  respuesta5 : String,
  valor5 : Number
},
categoria2: {
  titulo : String,
  pregunta1 :String,
  respuesta1 :String,
  valor1 : Number,
  pregunta2 :String,
  respuesta2 :String,
  valor2 : Number,
  pregunta3 :String,
  respuesta3 :String,
  valor3 : Number,
  pregunta4 :String,
  respuesta4 :String,
  valor4 :Number,
  pregunta5  :String,
  respuesta5 : String,
  valor5 : Number
},
categoria3: {
  titulo : String,
  pregunta1 :String,
  respuesta1 :String,
  valor1 : Number,
  pregunta2 :String,
  respuesta2 :String,
  valor2 : Number,
  pregunta3 :String,
  respuesta3 :String,
  valor3 : Number,
  pregunta4 :String,
  respuesta4 :String,
  valor4 :Number,
  pregunta5  :String,
  respuesta5 : String,
  valor5 : Number
},
categoria4: {
  titulo : String,
  pregunta1 :String,
  respuesta1 :String,
  valor1 : Number,
  pregunta2 :String,
  respuesta2 :String,
  valor2 : Number,
  pregunta3 :String,
  respuesta3 :String,
  valor3 : Number,
  pregunta4 :String,
  respuesta4 :String,
  valor4 :Number,
  pregunta5  :String,
  respuesta5 : String,
  valor5 : Number
},
categoria5: {
  titulo : String,
  pregunta1 :String,
  respuesta1 :String,
  valor1 : Number,
  pregunta2 :String,
  respuesta2 :String,
  valor2 : Number,
  pregunta3 :String,
  respuesta3 :String,
  valor3 : Number,
  pregunta4 :String,
  respuesta4 :String,
  valor4 :Number,
  pregunta5  :String,
  respuesta5 : String,
  valor5 : Number
}
};

function categoriaToHTML(categoria) {
  let string = "";
  let ftitle = categoria.replace(/ /g, "-");
  for (let x = 1; x < 6; x++) {
    string +=
      `          
        <div class="form-group">
        <div>
          <input type="text" class="form-control"  required placeholder="${"Pregunta " + x}" />
        </div>
      </div>
      <div class="form-group">
        <div>
          <input type="text" class="form-control" required placeholder="${"Respuesta " + x}" />
        </div>
      </div>
      <div class="form-group">
        <div>
          <input type="number" class="form-control" required placeholder="${"Valor de la pregunta " + x}"  />
        </div>
      </div>
      `;
  }
  return (`
    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
    <div class="card text-center" style="width: 18rem;">
    <h5 class="card-title"><input type="text" pattern="[a-zA-Z\s]+"    class="form-control" required placeholder="${categoria}" id= "Tema${ftitle}" />
      <div class="card-body">
      <form id="${ftitle}">
          <div class="container-fluid">
            ${string}
          </div>
        </form>
      </div>
    </div>
  </div>
    `);
}

function cargarMatrices() {
  let string = "";
  string +=`  
  <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
    <div class="card text-center" style="width: 18rem; height: 56rem;">
      <h5 class="card-title"><input type="text" id="nombre_juego" class="form-control" required
          placeholder="Nombre de tu juego:" id="nombre" />
        <div class="card-body">
          <form id="main">
            <div class="container-fluid">
              <div class="form-group">
                <div>
                  <input type="text" class="form-control" id="descripcion_juego" required
                    placeholder="Descripción de tu juego:" id="descripcion" />
                </div>
              </div>
              <div class="form-group">
                <div>
                  <input type="url" class="form-control" required id="url_imagen"
                    placeholder="Url de imagen de portada:" id="url" />
                </div>
              </div>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="flexRadioDefault" id="privada">
              <label class="form-check-label" for="flexRadioDefault1">
                Juego privado (solo podrás verlo tú).
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="flexRadioDefault" id="publica" checked>
              <label class="form-check-label" for="flexRadioDefault2">
                Juego público (pueden jugarlo otros usuarios).
              </label>
            </div>
          </form>
        </div>
        <button class="btn btn-primary" id="RM" style="width: 15rem; height: 15rem; margin-top: 22rem;"
          onclick="actualizarDatos()" disabled>
          <h3 style="margin-top: 3rem;">Subir nuevo juego</h3>
          <h1><i class="fas fa-cloud-upload-alt"></i></h1>
        </button>
    </div>
  </div>`;
  string += categoriaToHTML("Categoría 1");
  string += categoriaToHTML("Categoría 2");
  string += categoriaToHTML("Categoría 3");
  string += categoriaToHTML("Categoría 4");
  string += categoriaToHTML("Categoría 5");
  document.getElementById("info").innerHTML = string;
}

async function actualizarDatos(){
  let nj = document.getElementById("nombre_juego");
  matrix_global.nombre = nj.value;
  let dj = document.getElementById("descripcion_juego");
  matrix_global.descripcion = dj.value;
  let ui = document.getElementById("url_imagen");
  matrix_global.url = ui.value;

  let titulo1 = String("Categoría 1").replace(/ /g, "-"); ;
  let cat_1 = document.querySelectorAll("#"+titulo1+" input");
  let Mtitle1 = document.getElementById("Tema"+titulo1);


  let titulo2 = String("Categoría 2").replace(/ /g, "-"); ;
  let cat_2 = document.querySelectorAll("#"+titulo2+" input");
  let Mtitle2 = document.getElementById("Tema"+titulo2);

  let titulo3 = String("Categoría 3").replace(/ /g, "-"); ;
  let cat_3 = document.querySelectorAll("#"+titulo3+" input");
  let Mtitle3 = document.getElementById("Tema"+titulo3);
  
  let titulo4 = String("Categoría 4").replace(/ /g, "-"); ;
  let cat_4 = document.querySelectorAll("#"+titulo4+" input");
  let Mtitle4 = document.getElementById("Tema"+titulo4);

  let titulo5 = String("Categoría 5").replace(/ /g, "-"); ;
  let cat_5 = document.querySelectorAll("#"+titulo5+" input");
  let Mtitle5 = document.getElementById("Tema"+titulo5);

  
  if(hasNumber(Mtitle1.value[0]) || hasNumber(Mtitle2.value[0]) || hasNumber(Mtitle3.value[0]) || hasNumber(Mtitle4.value[0]) || hasNumber(Mtitle5.value[0])){
    sendError("Las categorias no pueden empezar con numeros");
    return;
  }

  //Asignación de Titulos:
  matrix_global.categoria1.titulo = Mtitle1.value;
  matrix_global.categoria2.titulo = Mtitle2.value;
  matrix_global.categoria3.titulo = Mtitle3.value;
  matrix_global.categoria4.titulo = Mtitle4.value;
  matrix_global.categoria5.titulo = Mtitle5.value;


  //Asignación de preguntas:
  matrix_global.categoria1.pregunta1 = cat_1[0].value;
  matrix_global.categoria1.pregunta2 = cat_1[3].value;
  matrix_global.categoria1.pregunta3 = cat_1[6].value;
  matrix_global.categoria1.pregunta4 = cat_1[9].value;
  matrix_global.categoria1.pregunta5 = cat_1[12].value;

  matrix_global.categoria2.pregunta1 = cat_2[0].value;
  matrix_global.categoria2.pregunta2 = cat_2[3].value;
  matrix_global.categoria2.pregunta3 = cat_2[6].value;
  matrix_global.categoria2.pregunta4 = cat_2[9].value;
  matrix_global.categoria2.pregunta5 = cat_2[12].value;

  matrix_global.categoria3.pregunta1 = cat_3[0].value;
  matrix_global.categoria3.pregunta2 = cat_3[3].value;
  matrix_global.categoria3.pregunta3 = cat_3[6].value;
  matrix_global.categoria3.pregunta4 = cat_3[9].value;
  matrix_global.categoria3.pregunta5 = cat_3[12].value;

  matrix_global.categoria4.pregunta1 = cat_4[0].value;
  matrix_global.categoria4.pregunta2 = cat_4[3].value;
  matrix_global.categoria4.pregunta3 = cat_4[6].value;
  matrix_global.categoria4.pregunta4 = cat_4[9].value;
  matrix_global.categoria4.pregunta5 = cat_4[12].value;

  matrix_global.categoria5.pregunta1 = cat_5[0].value;
  matrix_global.categoria5.pregunta2 = cat_5[3].value;
  matrix_global.categoria5.pregunta3 = cat_5[6].value;
  matrix_global.categoria5.pregunta4 = cat_5[9].value;
  matrix_global.categoria5.pregunta5 = cat_5[12].value;

  
  //Asignación de respuestas:
  matrix_global.categoria1.respuesta1 = cat_1[1].value;
  matrix_global.categoria1.respuesta2 = cat_1[4].value;
  matrix_global.categoria1.respuesta3 = cat_1[7].value;
  matrix_global.categoria1.respuesta4 = cat_1[10].value;
  matrix_global.categoria1.respuesta5 = cat_1[13].value;

  matrix_global.categoria2.respuesta1 = cat_2[1].value;
  matrix_global.categoria2.respuesta2 = cat_2[4].value;
  matrix_global.categoria2.respuesta3 = cat_2[7].value;
  matrix_global.categoria2.respuesta4 = cat_2[10].value;
  matrix_global.categoria2.respuesta5 = cat_2[13].value;

  matrix_global.categoria3.respuesta1 = cat_3[1].value;
  matrix_global.categoria3.respuesta2 = cat_3[4].value;
  matrix_global.categoria3.respuesta3 = cat_3[7].value;
  matrix_global.categoria3.respuesta4 = cat_3[10].value;
  matrix_global.categoria3.respuesta5 = cat_3[13].value;

  matrix_global.categoria4.respuesta1 = cat_4[1].value;
  matrix_global.categoria4.respuesta2 = cat_4[4].value;
  matrix_global.categoria4.respuesta3 = cat_4[7].value;
  matrix_global.categoria4.respuesta4 = cat_4[10].value;
  matrix_global.categoria4.respuesta5 = cat_4[13].value;

  matrix_global.categoria5.respuesta1 = cat_5[1].value;
  matrix_global.categoria5.respuesta2 = cat_5[4].value;
  matrix_global.categoria5.respuesta3 = cat_5[7].value;
  matrix_global.categoria5.respuesta4 = cat_5[10].value;
  matrix_global.categoria5.respuesta5 = cat_5[13].value;

  //Asignación de valores:
  matrix_global.categoria1.valor1 = cat_1[2].value;
  matrix_global.categoria1.valor2 = cat_1[5].value;
  matrix_global.categoria1.valor3 = cat_1[8].value;
  matrix_global.categoria1.valor4 = cat_1[11].value;
  matrix_global.categoria1.valor5 = cat_1[14].value;

  matrix_global.categoria2.valor1 = cat_2[2].value;
  matrix_global.categoria2.valor2 = cat_2[5].value;
  matrix_global.categoria2.valor3 = cat_2[8].value;
  matrix_global.categoria2.valor4 = cat_2[11].value;
  matrix_global.categoria2.valor5 = cat_2[14].value;

  matrix_global.categoria3.valor1 = cat_3[2].value;
  matrix_global.categoria3.valor2 = cat_3[5].value;
  matrix_global.categoria3.valor3 = cat_3[8].value;
  matrix_global.categoria3.valor4 = cat_3[11].value;
  matrix_global.categoria3.valor5 = cat_3[14].value;

  matrix_global.categoria4.valor1 = cat_4[2].value;
  matrix_global.categoria4.valor2 = cat_4[5].value;
  matrix_global.categoria4.valor3 = cat_4[8].value;
  matrix_global.categoria4.valor4 = cat_4[11].value;
  matrix_global.categoria4.valor5 = cat_4[14].value;

  matrix_global.categoria5.valor1 = cat_5[2].value;
  matrix_global.categoria5.valor2 = cat_5[5].value;
  matrix_global.categoria5.valor3 = cat_5[8].value;
  matrix_global.categoria5.valor4 = cat_5[11].value;
  matrix_global.categoria5.valor5 = cat_5[14].value;
  
  if(Mtitle1.value == Mtitle2.value || Mtitle1.value == Mtitle3.value || Mtitle1.value == Mtitle4.value || Mtitle1.value == Mtitle5.value ||
    Mtitle2.value == Mtitle3.value || Mtitle2.value == Mtitle4.value || Mtitle2.value == Mtitle5.value || Mtitle3.value == Mtitle4.value || Mtitle3.value == Mtitle5.value ||
    Mtitle4.value == Mtitle5.value){
        sendError("Los titulos de las categorias no deben repetirse")
      return;
  } 

  let user = await loadUser();
  matrix_global.autor = user.nombre + " " + user.apellido;

  if(document.getElementById("publica").checked){
    matrix_global.rol = true;
    guardarMatriz();
  }else{
    matrix_global.rol = false;
    let newMatriz = await guardarMatriz();
    user.matrices.push(newMatriz.id);
    editUser(user);
  }
}

cargarMatrices();

let F1 = document.querySelector("#Categoría-1");
F1.addEventListener("change",function (e){
  let checks = document.querySelectorAll("#Categoría-1 input:invalid");
  if (checks.length <=0 ){
      bc1 = true;
  }
  if(bc1 && bc2 && bc3 && bc4 && bc5 && bc6 && bt1 && bt2 && bt3 && bt4 && bt5 && bt6){
    document.querySelector("#RM").removeAttribute("disabled");
  }
})

let F2 = document.querySelector("#Categoría-2");
F2.addEventListener("change",function (e){
  let checks = document.querySelectorAll("#Categoría-2 input:invalid");
  if (checks.length <=0 ){
      bc2 = true;
  }
  if(bc1 && bc2 && bc3 && bc4 && bc5 && bc6 && bt1 && bt2 && bt3 && bt4 && bt5 && bt6){
    document.querySelector("#RM").removeAttribute("disabled");
  }
})

let F3 = document.querySelector("#Categoría-3");
F3.addEventListener("change",function (e){
  let checks = document.querySelectorAll("#Categoría-3 input:invalid");
  if (checks.length <=0 ){
      bc3 = true;
  }
  if(bc1 && bc2 && bc3 && bc4 && bc5 && bc6 && bt1 && bt2 && bt3 && bt4 && bt5 && bt6){
    document.querySelector("#RM").removeAttribute("disabled");
  }
})



let F4 = document.querySelector("#Categoría-4");
F4.addEventListener("change",function (e){
  let checks = document.querySelectorAll("#Categoría-4 input:invalid");
  if (checks.length <=0 ){
      bc4 = true;
  }
  if(bc1 && bc2 && bc3 && bc4 && bc5 && bc6 && bt1 && bt2 && bt3 && bt4 && bt5 && bt6){
    document.querySelector("#RM").removeAttribute("disabled");
  }
})

let F5 = document.querySelector("#Categoría-5");
F5.addEventListener("change",function (e){
  let checks = document.querySelectorAll("#Categoría-5 input:invalid");
  if (checks.length <=0 ){
      bc5 = true;
  }
  if(bc1 && bc2 && bc3 && bc4 && bc5 && bc6 && bt1 && bt2 && bt3 && bt4 && bt5 && bt6){
    document.querySelector("#RM").removeAttribute("disabled");
  }
})    

let F6 = document.querySelector("#main");
F6.addEventListener("change",function (e){
  let checks = document.querySelectorAll("#main input:invalid");
  if (checks.length <=0 ){
      bc6 = true;
  }
  if(bc1 && bc2 && bc3 && bc4 && bc5 && bc6 && bt1 && bt2 && bt3 && bt4 && bt5 && bt6){
    document.querySelector("#RM").removeAttribute("disabled");
  }
})    

let T1 = document.querySelector("#TemaCategoría-1");
T1.addEventListener("change",function (e){
  let checks = document.querySelectorAll("#TemaCategoría-1 input:invalid");
  if (checks.length <=0 ){
      bt1 = true;
  }
  if(bc1 && bc2 && bc3 && bc4 && bc5 && bc6 && bt1 && bt2 && bt3 && bt4 && bt5 && bt6){
    document.querySelector("#RM").removeAttribute("disabled");
  }
})    

let T2 = document.querySelector("#TemaCategoría-2");
T2.addEventListener("change",function (e){
  let checks = document.querySelectorAll("#TemaCategoría-2 input:invalid");
  if (checks.length <=0 ){
      bt2 = true;
  }
  if(bc1 && bc2 && bc3 && bc4 && bc5 && bc6 && bt1 && bt2 && bt3 && bt4 && bt5 && bt6){
    document.querySelector("#RM").removeAttribute("disabled");
  }
})    

let T3 = document.querySelector("#TemaCategoría-3");
T3.addEventListener("change",function (e){
  let checks = document.querySelectorAll("#TemaCategoría-3 input:invalid");
  if (checks.length <=0 ){
      bt3 = true;
  }
  if(bc1 && bc2 && bc3 && bc4 && bc5 && bc6 && bt1 && bt2 && bt3 && bt4 && bt5 && bt6){
    document.querySelector("#RM").removeAttribute("disabled");
  }
})    

let T4 = document.querySelector("#TemaCategoría-4");
T4.addEventListener("change",function (e){
  let checks = document.querySelectorAll("#TemaCategoría-4 input:invalid");
  if (checks.length <=0 ){
      bt4 = true;
  }
  if(bc1 && bc2 && bc3 && bc4 && bc5 && bc6 && bt1 && bt2 && bt3 && bt4 && bt5 && bt6){
    document.querySelector("#RM").removeAttribute("disabled");
  }
})    

let T5 = document.querySelector("#TemaCategoría-5");
T5.addEventListener("change",function (e){
  let checks = document.querySelectorAll("#TemaCategoría-5 input:invalid");
  if (checks.length <=0 ){
      bt5 = true;
  }
  if(bc1 && bc2 && bc3 && bc4 && bc5 && bc6 && bt1 && bt2 && bt3 && bt4 && bt5 && bt6){
    document.querySelector("#RM").removeAttribute("disabled");
  }
})    

let T6 = document.querySelector("#nombre_juego");
T6.addEventListener("change",function (e){
  let checks = document.querySelectorAll("#nombre_juego input:invalid");
  if (checks.length <=0 ){
      bt6 = true;
  }
  if(bc1 && bc2 && bc3 && bc4 && bc5 && bc6 && bt1 && bt2 && bt3 && bt4 && bt5 && bt6){
    document.querySelector("#RM").removeAttribute("disabled");
  }
})    

async function loadUser() {
  let url = "https://proyectojeopardy2021.herokuapp.com/api/user/" + sessionStorage.login;
  let resp = await fetch(url, {
      method: "GET",
      headers: {
          "x-auth": sessionStorage.userToken,
          'Content-Type': 'application/json'
      },
  })
  if (resp.ok) {
      return await resp.json();
  } else {
      console.log(resp.json());
  }
}

async function guardarMatriz() {
  let url = "https://proyectojeopardy2021.herokuapp.com/api/matrix";
  let resp = await fetch(url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(matrix_global)
  })
  if (resp.ok) {
    if(matrix_global.rol){
      window.location.href = "Create_Edit.html";
    }else{
      return await resp.json();
    }
  } else {
      console.log(await resp.json());
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
  }
}

function hasNumber(myString) {
  return /\d/.test(myString);
}

function sendError(mensaje){
  document.getElementById("errores").innerHTML = `
  <div class="alert alert-danger" role="alert">
  ${mensaje}
  </div>
  `;
}

function logOut(){
  sessionStorage.userToken = "";
  sessionStorage.matriz ="";
}

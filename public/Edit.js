let matrix_global;

function categoriaToHTML(categoria) {
  //console.log(categoria.titulo);
  let ftitle = categoria.titulo.replace(/ /g, "-");
  let string = "";
  for (let x = 1; x < 6; x++){
    string +=
      `          
      <div class="form-group">
      <div>
        <input type="text"  class="form-control"  value="${eval("categoria.pregunta" + x)}"/>
      </div>
    </div>
    <div class="form-group">
      <div>
        <input type="text" class="form-control"  value="${eval("categoria.respuesta" + x)}"/>
      </div>
    </div>
    <div class="form-group">
      <div>
        <input type="number" class="form-control" value="${eval("categoria.valor" + x)}"/>
      </div>
    </div>
    `;
  }
  console.log("Tema"+ftitle);
  return (`
  <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
  <div class="card text-center" style="width: 18rem;">
    <h5 class="card-title"><input type="text" pattern="[a-zA-Z\s]+"    class="form-control" value="${categoria.titulo}" id= "Tema${ftitle}" />
    </h5>
    <div class="card-body">
      <form id="${ftitle}">
        <div class="container-fluid" >
          ${string}
        </div>
      </form>
    </div>
  </div>
</div>
  `);
}

async function cargarMatrices(matriz) {
  let string = "";
  string += `  
  <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
  <div class="card text-center" style="width: 18rem; height: 56rem;">
    <h5 class="card-title"><input type="text" class="form-control" value="${matriz.nombre}" id="nombre"/>
      <div class="card-body">
        <form>
          <div class="container-fluid">
            <div class="form-group">
              <div>
                <input type="text" class="form-control" value="${matriz.descripcion}" id="descripcion"/>
              </div>
            </div>
            <div class="form-group">
              <div>
                <input type="text" class="form-control" value="${matriz.url}" id="url"/>
              </div>
            </div>
          </div>
        </form>
      </div>
      <a href="#" class="btn btn-success" style="width: 15rem; height: 15rem; margin-top: 28rem;" onclick="actualizarDatos()">
      <h3 style="margin-top: 3rem;">Actualizar juego</h3>
      <h1><i class="fas fa-cloud-upload-alt"></i></h1>
    </a>
  </div>
</div>
  `;
  string += categoriaToHTML(matriz.categoria1);
  string += categoriaToHTML(matriz.categoria2);
  string += categoriaToHTML(matriz.categoria3);
  string += categoriaToHTML(matriz.categoria4);
  string += categoriaToHTML(matriz.categoria5);
  string += `  
  `;
  document.getElementById("info").innerHTML = string;
}

function actualizarDatos(){
  let titulo1 = String(matrix_global.categoria1.titulo).replace(/ /g, "-"); ;
  let cat_1 = document.querySelectorAll("#"+titulo1+" input");
  let Mtitle1 = document.getElementById("Tema"+titulo1);

  let titulo2 = String(matrix_global.categoria2.titulo).replace(/ /g, "-"); ;
  let cat_2 = document.querySelectorAll("#"+titulo2+" input");
  let Mtitle2 = document.getElementById("Tema"+titulo2);

  let titulo3 = String(matrix_global.categoria3.titulo).replace(/ /g, "-"); ;
  let cat_3 = document.querySelectorAll("#"+titulo3+" input");
  let Mtitle3 = document.getElementById("Tema"+titulo3);
  
  let titulo4 = String(matrix_global.categoria4.titulo).replace(/ /g, "-"); ;
  let cat_4 = document.querySelectorAll("#"+titulo4+" input");
  let Mtitle4 = document.getElementById("Tema"+titulo4);

  let titulo5 = String(matrix_global.categoria5.titulo).replace(/ /g, "-"); ;
  let cat_5 = document.querySelectorAll("#"+titulo5+" input");
  let Mtitle5 = document.getElementById("Tema"+titulo5);

  
  let nj = document.getElementById("nombre");
  matrix_global.nombre = nj.value;
  let dj = document.getElementById("descripcion");
  matrix_global.descripcion = dj.value;
  let ui = document.getElementById("url");
  matrix_global.url = ui.value;

  //Asignación de Titulos:

  if(hasNumber(Mtitle1.value[0]) || hasNumber(Mtitle2.value[0]) || hasNumber(Mtitle3.value[0]) || hasNumber(Mtitle4.value[0]) || hasNumber(Mtitle5.value[0])){
    sendError("Las categorias no pueden empezar con numeros");
    return;
  }


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
   ActualizarDatos();  
  
}

async function getData() {
  let id = sessionStorage.matriz;
  let url = "https://proyectojeopardy2021.herokuapp.com/api/matrix/"+id;
  let resp = await fetch(url, {
    method: "GET",
    headers: {
      "x-auth": sessionStorage.userToken
    }
  })
  if (resp.ok) {
    matrix_global = await resp.json();
    cargarMatrices(matrix_global);
  } else {
      sendError("Error 404, no se pudo encontrar la matríz a editar, intente de nuevo");
      window.location.href = "Create_Edit.html";
  }
}

async function ActualizarDatos() {
  event.preventDefault();
  let id = sessionStorage.matriz;
  let url = "https://proyectojeopardy2021.herokuapp.com/api/matrix/"+id;

  let resp = await fetch(url, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
      "x-auth": sessionStorage.userToken
    },
    body: JSON.stringify(matrix_global)
  })
  if (resp.ok) {
    window.location.href = "Create_Edit.html";
  } else {
      sendError("Error, no se pudo actualizar")
  }
}
getData();

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
function matrizToHTML(matriz){
    return (`
    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
    <div class="card text-center" style="width: 18rem;">
    <img class="card-img-top"
        src=${(matriz.url)}
        alt="JEOPARDY"  style="width: 286px; height: 150px;">
    <div class="card-body">
        <h5 class="card-title">${(matriz.nombre)}</h5>
        <p class="card-text">${(matriz.descripcion)}</p>
        <a  href="./Edit.html" class="btn btn-primary" onclick="sendMatrix('${matriz.id}')">Editar</a>
        <a  href="./Juego.html" class="btn btn-primary" onclick="sendMatrix('${matriz.id}')"><i class="fas fa-play-circle"></i></a>
        <a href="#" class="btn btn-danger" onclick="cargarMini('${matriz.id}', '${matriz.url}', '${matriz.nombre}', '${matriz.descripcion}')" data-toggle="modal" data-target="#modelDelete" ><i class="fas fa-trash-alt"></i></a>
    </div>
    </div>
    </div>`);    
} 

function sendMatrix(id){
  sessionStorage.matriz = id;
}

function miniToHTML(url, nombre, descripcion){
  return (`
  <div class="row justify-content-center">
    <div class="card" style="width: 18rem;">
      <img class="card-img-top"
        src=${(url)}
        alt="JEOPARDY" style="width: 286px; height: 150px;">
      <div class="card-body">
        <h5 class="card-title">${(nombre)}</h5>
        <p class="card-text">${(descripcion)}</p>
      </div>
    </div>
  </div>
  `);
}

function cargarMini(id,url, nombre, descripcion){
  sessionStorage.matriz = id;
  document.getElementById("modalDelete").innerHTML = miniToHTML(url, nombre, descripcion);
}

async function cargarMatrices(data){
    let string="";
    for(matriz in data){
        string +=matrizToHTML(data[matriz]);
    }
    document.getElementById("info").innerHTML=string;
    document.getElementById("info").innerHTML+= 
    `        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
    <div class="add" style="width: 18rem;">
      <a href="./NuevoJuego.html" class="btn btn-primary" style="height: 330px;">
        <h3>Crear un nuevo juego</h3>
        <h1><i class="fas fa-plus-circle"></i></h1>
      </a>
    </div>
  </div>`;
}

async function getData() {
  let url = "https://proyectojeopardy2021.herokuapp.com/api/matrix"
  let resp = await fetch(url, {
      method: "GET",
    headers: {
        "x-auth": sessionStorage.userToken
    }
  })
  if (resp.ok) {
      cargarMatrices(await resp.json());
  } else {
      sendError("El token expiró, vuelva a hacer Log in")
  }
}

async function deleteMatrix(){
    let url = "https://proyectojeopardy2021.herokuapp.com/api/matrix/"+sessionStorage.matriz;
    let resp = await fetch(url, {
      method: "DELETE",
      headers: {
        "x-auth": sessionStorage.userToken
      }
    })
    if (resp.ok) {
      window.location.href = "Create_Edit.html";
    } else {
        sendError("No se pudo eliminar la matríz, vuelva a cargar la pagina e intente de nuevo")
    }
}

getData();

function logOut(){
  sessionStorage.userToken = "";
  sessionStorage.matriz ="";
}

function sendError(mensaje){
  document.getElementById("errores").innerHTML = `
  <div class="alert alert-danger" role="alert">
  ${mensaje}
  </div>
  `;
}

let pos = 0;
let len = 0;
let data;
let user;

async function matrizToHTML(matriz) {
  if (typeof (user.matrices[0]) != "undefined") {
    for (matrices in user.matrices) {
      userMatriz = await getMatrix(user.matrices[matrices]);
      if (userMatriz.nombre.split(",")[0] == matriz.nombre) {
        return (`
        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
        <div class="card text-center" style="width: 18rem;">
        <img class="card-img-top"
            src=${(matriz.url)}
            alt="JEOPARDY"  style="width: 286px; height: 150px;">
        <div class="card-body">
            <h5 class="card-title">${(matriz.nombre)}</h5>
            <p class="card-text">${(matriz.descripcion)}</p>
            <p class="btn btn-success" onclick="sendOK()"><i class="fas fa-check"></i></p>
        </div>
        </div>
        </div>`);
      }
    }return (`
    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
    <div class="card text-center" style="width: 18rem;">
    <img class="card-img-top"
        src=${(matriz.url)}
        alt="JEOPARDY"  style="width: 286px; height: 150px;">
    <div class="card-body">
        <h5 class="card-title">${(matriz.nombre)}</h5>
        <p class="card-text">${(matriz.descripcion)}</p>
        <button class="btn btn-primary" onclick="downloadMatrix('${matriz.id}')"><i class="fas fa-arrow-circle-down"></i></button>
    </div>
    </div>
    </div>`);
  } else {
    return (`
    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
    <div class="card text-center" style="width: 18rem;">
    <img class="card-img-top"
        src=${(matriz.url)}
        alt="JEOPARDY"  style="width: 286px; height: 150px;">
    <div class="card-body">
        <h5 class="card-title">${(matriz.nombre)}</h5>
        <p class="card-text">${(matriz.descripcion)}</p>
        <button class="btn btn-primary" onclick="downloadMatrix('${matriz.id}')"><i class="fas fa-arrow-circle-down"></i></button>
    </div>
    </div>
    </div>`);
  }
}

async function downloadMatrix(id) {
  let dupedMatriz;
  for(matriz in data){
    if(data[matriz].id == id){
      dupedMatriz = Object.assign({}, data[matriz]);
      dupedMatriz.nombre += "," + sessionStorage.login;
      dupedMatriz._id = undefined;
      dupedMatriz.id = undefined;
      dupedMatriz.rol = false;
    }
  }
  newid = await guardarMatriz(dupedMatriz);
  newid = newid.id;
  user.matrices.push(newid);
  console.log(user);
  editUser(user);
}

function miniToHTML(url, nombre, descripcion) {
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

function cargarMini(id, url, nombre, descripcion) {
  sessionStorage.matriz = id;
  document.getElementById("modalDelete").innerHTML = miniToHTML(url, nombre, descripcion);
}

async function cargarMatrices(data) {
  len = Math.round((data.length) / 5);
  let string = "";
  let paginacion = "";
  let contador = 0;
  paginacion += `
  <li class="page-item"><a class="page-link" onclick="previous()">Previous</a></li>
      <li class="page-item"><a class="page-link" onclick="jump(${contador / 5})">` + Number(contador / 5 + 1) + `</a></li>
      `;
  for (matriz in data) {
    contador++;
    if (contador % 5 == 0) {
      paginacion += `
      <li class="page-item"><a class="page-link" onclick="jump(${contador / 5})">` + Number(contador / 5 + 1) + `</a></li>
      `;
    }
  }
  for (let x = pos * 5; x < pos * 5 + 5; x++) {
    if (x < data.length) {
      string += await matrizToHTML(data[x]);
    }
  }
  paginacion += `<li class="page-item"><a class="page-link" onclick="next()">Next</a></li>`;
  document.getElementById("pagination").innerHTML = paginacion;
  document.getElementById("info").innerHTML = string;
  document.getElementById("info").innerHTML += `
          <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
    <div class="add" style="width: 18rem;">
      <a href="./NuevoJuego.html" class="btn btn-primary" style="height: 330px;">
        <h3>Crear un nuevo juego</h3>
        <h1><i class="fas fa-plus-circle"></i></h1>
      </a>
    </div>
  </div>`;
}

function busqueda() {
  let Nombre = document.getElementById("NB").value;
  let filteredMatrix = data.filter((function (element) { return element.nombre.toUpperCase().includes(Nombre.toUpperCase()) }));
  cargarMatrices(filteredMatrix);
}

function previous() {
  if (pos > 0) {
    pos--;
  }
  cargarMatrices(data);
}

function next() {
  if (pos < len) {
    pos++;
  }
  cargarMatrices(data);
}

function jump(position) {
  pos = position;
  if (document.getElementById("NB").value != null) {
    busqueda();
  } else {
    cargarMatrices(data);
  }
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
    await loadUser();
    data = await resp.json();
    for (matriz in data){
      if (!data[matriz].rol){
        data.splice(matriz);
      }
    }
    cargarMatrices(data);
  } else {
    sendError("El token expiró, vuelva a hacer Log in");
  }
}

async function deleteMatrix() {
  let url = "https://proyectojeopardy2021.herokuapp.com/api/matrix/" + sessionStorage.matriz;
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
    user = await resp.json();
  } else {
    console.log("valio madre")
  }
}

function logOut() {
  sessionStorage.userToken = "";
  sessionStorage.matriz = "";
}

function sendError(mensaje) {

  document.getElementById("errores").innerHTML = `
    <div class="alert alert-danger" role="alert">
    ${mensaje}
    </div>
    `;
}

function sendOK() {
  document.getElementById("errores").innerHTML = `
  <div class="alert alert-success" role="alert">
  Esa matriz ya está asignada a su usuario.
  </div>
  `;
}

async function guardarMatriz(matrix) {
  let url = "https://proyectojeopardy2021.herokuapp.com/api/matrix";
  let resp = await fetch(url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(matrix)
  })
  if (resp.ok) {
    return (await resp.json());
  } else {
    console.log("hubo un problema cargando las matrices");
  }
}

async function editUser(datos) {
  console.log(datos);
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

async function getMatrix(id) {
  let url = "https://proyectojeopardy2021.herokuapp.com/api/matrix/"+id;
  let resp = await fetch(url, {
    method: "GET",
    headers: {
      "x-auth": sessionStorage.userToken
    }
  })
  if (resp.ok) {
    return await resp.json();
  } else {
      sendError("Error 404, no se pudo encontrar la matríz a editar, intente de nuevo");
      window.location.href = "Create_Edit.html";
  }
}

getData();
let pos = 0;
let len = 0;
let data;
let user;

function matrizToHTML(matriz) {
  return (`
    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
    <div class="card text-center" style="width: 18rem;">
    <img class="card-img-top"
        src=${(matriz.url)}
        alt="JEOPARDY"  style="width: 286px; height: 150px;">
    <div class="card-body">
        <h5 class="card-title">${(matriz.nombre.split(",")[0])}</h5>
        <p class="card-text">${(matriz.descripcion)}</p>
        <a  href="./Edit.html" class="btn btn-primary" onclick="sendMatrix('${matriz.id}')">Editar</a>
        <a  href="./Juego.html" class="btn btn-primary" onclick="sendMatrix('${matriz.id}')"><i class="fas fa-play-circle"></i></a>
        <a href="#" class="btn btn-danger" onclick="cargarMini('${matriz.id}', '${matriz.url}', '${matriz.nombre}', '${matriz.descripcion}')" data-toggle="modal" data-target="#modelDelete" ><i class="fas fa-trash-alt"></i></a>
    </div>
    </div>
    </div>`);
}

function sendMatrix(id) {
  sessionStorage.matriz = id;
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
  let filteredMatrix = data.filter((function (element) {
    return element.nombre.toUpperCase().includes(Nombre.toUpperCase())
  }));
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

async function getMatrizData(id) {
  let url = "https://proyectojeopardy2021.herokuapp.com/api/matrix/" + id;
  let resp = await fetch(url, {
    method: "GET",
    headers: {
      "x-auth": sessionStorage.userToken
    }
  })
  if (resp.ok) {
    return await resp.json();
  } else {
    sendError("El token expiró, vuelva a hacer Log in");
  }
}

async function getData() {
  let url = "https://proyectojeopardy2021.herokuapp.com/api/user/" + sessionStorage.login;
  let resp = await fetch(url, {
    method: "GET",
    headers: {
      "x-auth": sessionStorage.userToken,
      'Content-Type': 'application/json'
    },
  })
  if (resp.ok) {
    let arrayMatrices = [];
    user = await resp.json();
    for (matrices in user.matrices) {
      arrayMatrices.push(await getMatrizData(user.matrices[matrices]));
      console.log(arrayMatrices);
    }
    data = arrayMatrices;
    cargarMatrices(arrayMatrices);
  } else {
    console.log("valio madre")
  }
}

async function deleteMatrix() {
  let index = user.matrices.findIndex(i => i == sessionStorage.matriz);
  user.matrices.splice(index, 1)
  console.log(user.matrices);
  let url = "https://proyectojeopardy2021.herokuapp.com/api/matrix/" + sessionStorage.matriz;
  let resp = await fetch(url, {
    method: "DELETE",
    headers: {
      "x-auth": sessionStorage.userToken
    }
  })
  if (resp.ok) {
    await editUser(user);
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

async function editUser(datos) {
  console.log(datos);
  let url = "https://proyectojeopardy2021.herokuapp.com/api/user/" + sessionStorage.login;
  let resp = await fetch(url, {
    method: "PUT",
    headers: {
      "x-auth": sessionStorage.userToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  });
  if (resp.ok) {
    console.log(await resp.json());
    window.location.href = "Create_Edit.html";
  } else {
    console.log("valio madre");
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

loadUser();
getData();
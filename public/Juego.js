function loadInfo(matriz) {
  document.getElementById("tituloMatriz").innerText = matriz.nombre.split(",")[0];
  document.getElementById("primeraColumna").innerText = matriz.categoria1.titulo;
  document.getElementById("segundaColumna").innerText = matriz.categoria2.titulo;
  document.getElementById("terceraColumna").innerText = matriz.categoria3.titulo;
  document.getElementById("cuartaColumna").innerText = matriz.categoria4.titulo;
  document.getElementById("quintaColumna").innerText = matriz.categoria5.titulo;
  llenarFilas(matriz);
}

function llenarFilas(matriz) {
  let cont = 0;
  for (let x = 1; x < 6; x++) {
    for (let y = 1; y < 6; y++) {
      cont++;
      document.getElementById(cont.toString()).innerHTML =
        `
            <div class="cell-inner">${(eval("matriz.categoria"+y+".valor"+x))}</div>
            <div class="front answer" tabindex="0">${(eval("matriz.categoria"+y+".pregunta"+x))}</div>
            <div class="back question" tabindex="0">${(eval("matriz.categoria"+y+".respuesta"+x))}</div>
            `;
    }
  }
}

async function getData() {
  let id = sessionStorage.matriz;
  let url = "https://proyectojeopardy2021.herokuapp.com/api/matrix/" + id;
  let resp = await fetch(url, {
    method: "GET",
    headers: {
      "x-auth": sessionStorage.userToken
    }
  })
  if (resp.ok) {
    loadInfo(await resp.json());
  } else {
    document.getElementById("modalalerts").innerHTML = `<div class="alert alert-danger" style="text-align: center;">
     <strong>Error!</strong> Surgio un error al momento de cargar los dartos.
   </div>`;
    setTimeout(() => {
      document.getElementById("modalalerts").innerHTML = ``
    }, 5000);
  }
}
getData();
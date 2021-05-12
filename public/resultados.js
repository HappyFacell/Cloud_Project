function compareTeam(a, b) {
    if (Number(a.points) > Number(b.points)) {
        return -1;
    }
    if (Number(a.points) < Number(b.points)) {
        return 1;
    }
    if (Number(a.points) == Number(b.points)) {
        return 0;
    }
}

function puntuacionToHTML(array) {
    array.sort(compareTeam);
    console.log(array);
    let string = "<br>";
    document.getElementById("info").innerHTML = `
    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
    <div class="card text-center" style="width: 18rem;">
    <img class="card-img-top"
        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fbuilder.crownawards.com%2FStoreFront%2FImageCompositionServlet%3Ffiles%3Djsp%2Fimages%2Fproducts%2FSTCBG2ND.gif%2C%2C%26width%3D800%26height%3D800%26trim%3Dtrue&f=1&nofb=1"
        alt="JEOPARDY"  style="width: 286px; height: 150px;">
    <div class="card-body">
        <h5 class="card-title">${array[1].name}</h5>
        <p class="card-text">${"Con "+array[1].points+" puntos en segundo" }</p>
    </div>
    </div>
    </div>
    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
    <div class="card text-center" style="width: 18rem;">
    <img class="card-img-top"
        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.netclipart.com%2Fpp%2Fm%2F278-2785455_printable-blue-ribbon-first-place.png&f=1&nofb=1"
        alt="JEOPARDY"  style="width: 286px; height: 150px;">
    <div class="card-body">
        <h5 class="card-title">${array[0].name}</h5>
        <p class="card-text">${"Con "+array[0].points+" puntos en primer lugar" }</p>
    </div>
    </div>
    </div>
    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
    <div class="card text-center" style="width: 18rem;">
    <img class="card-img-top"
        src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwallpaperheart.com%2Fwp-content%2Fuploads%2F2018%2F02%2Fsad-boy-wallpapers-sad-boy-image.jpg&f=1&nofb=1"
        alt="JEOPARDY"  style="width: 286px; height: 150px;">
    <div class="card-body">
        <h5 class="card-title">${array[2].name}</h5>
        <p class="card-text">${"Con "+array[2].points+" puntos en tercero" }</p>
    </div>
    </div>
    </div>`;
    for (let x = 3; x < array.length; x++) {
        string += `<p>Lugar: ${x+1}. ${array[x].name} con ${array[x].points} puntos</p>`;
    }
    document.getElementById("perdedores").innerHTML += string;
    sessionStorage.equipos = undefined;
}

puntuacionToHTML(JSON.parse(sessionStorage.equipos));
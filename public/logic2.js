sessionStorage.equipos = [];
var modal = function () {}

var game = {}
var mode = "play"
var grid = null;
var current_cell = null;

function getCurrentState() {

    var teams = [];
    var teams_dom = document.querySelectorAll(".team");
    for (var i = 0; i < teams_dom.length; i++) {
        var t = teams_dom[i];
        var name = t.querySelectorAll(".name")[0].textContent;
        var points = t.querySelectorAll(".points")[0].textContent;
        teams[i] = {
            name: name,
            points: points
        }
    }
    if (document.querySelectorAll(".inert").length == 25) {
        sessionStorage.equipos = JSON.stringify(teams);
        clearState();
        game.init(true);
        window.location.href = "resultados.html";
    }

    var inerts = {};
    var inert_dom = document.querySelectorAll(".grid-row-questions .inert");
    for (var i = 0; i < inert_dom.length; i++) {
        var id = inert_dom[i].getAttribute("id");
        inerts[id] = true;
    }

    return {
        "teams": teams,
        "inerts": inerts,
    }
}

function getOldState() {
    try {
        var old_state = localStorage.getItem("game-4137080")
    } catch (e) {
        return null;

    }
    if (old_state) {
        return JSON.parse(old_state);
    }
    return null;
}

function clearState() {
    try {
        localStorage.removeItem("game-4137080");
    } catch (e) {

    }
}

function resize() {
    var bbox_teams = getBoundingClientRect(document.getElementById("teams"))
    var rows = document.querySelectorAll(".grid-row").length;
    if (bbox_teams.height == 0) {
        var h = window.innerHeight;
    } else {
        var h = bbox_teams.top + ((window.innerHeight - bbox_teams.height) / (rows)) / 4
    }

    grid.style.height = h + "px";
    minirender(grid, function (g) {
        g.style.opacity = 1;
    }, .6);
}

ready(function () {
    grid = document.querySelectorAll(".grid")[0];
    window.addEventListener("resize", debounce(resize, 100, false));
    resize();
    renderState(initial_state);
    document.getElementById("team-chooser").focus();

    window.addEventListener("keydown", function (e) {
        var ESC = 27
        var SPACE = 32
        var ENTER = 13;
        var LEFT = 37;
        var UP = 38;
        var RIGHT = 39;
        var DOWN = 40;
        var on_cell = false;
        if (document.activeElement) {
            on_cell = matches(document.activeElement, ".grid-row-questions .grid-cell");
        }
        var clickable = on_cell && !document.activeElement.classList.contains('empty');

        if (modal.is_open) {
            if (e.keyCode == ESC) {
                e.preventDefault();
                modal.hide();
            } else if (e.keyCode == SPACE) {
                e.preventDefault();
                modal.reveal();
            }
        } else if (on_cell) {
            if ((e.keyCode == ENTER || e.keyCode == SPACE) && clickable) {
                e.preventDefault();
                var event = document.createEvent('HTMLEvents');
                event.initEvent('click', true, false);
                document.activeElement.dispatchEvent(event);
            } else if (e.keyCode == LEFT) {
                e.preventDefault();
                // find the cell to the left and focus on it
                if (document.activeElement.previousElementSibling) {
                    document.activeElement.previousElementSibling.focus();
                }
            } else if (e.keyCode == RIGHT) {
                e.preventDefault();
                if (document.activeElement.nextElementSibling) {
                    document.activeElement.nextElementSibling.focus();
                }
            } else if (e.keyCode == UP) {
                e.preventDefault();
                var my_col = indexInParent(document.activeElement);
                var previous_row = document.activeElement.parentElement.previousElementSibling;
                if (previous_row && previous_row.children[my_col] && matches(previous_row.children[my_col], ".grid-row-questions .grid-cell")) {
                    previous_row.children[my_col].focus();
                }
            } else if (e.keyCode == DOWN) {
                e.preventDefault();
                var my_col = indexInParent(document.activeElement);
                var next_row = document.activeElement.parentElement.nextElementSibling;
                if (next_row && next_row.children[my_col] && matches(next_row.children[my_col], ".grid-row-questions .grid-cell")) {
                    next_row.children[my_col].focus();
                }
            }
        }
    }, false);

    var debouncedSaveState = debounce(function () {
        try {
            localStorage.setItem("game-4137080", JSON.stringify(getCurrentState()))
        } catch (e) {

        }
    }, 100, false)

    on("keyup change input blur focus", "#teams .name, #teams .points", debouncedSaveState);

    on("click", "#re-init", function (e) {
        e.preventDefault();
        if (confirm("Al reiniciar se van a eliminar los equipos, puntuaciones y se iniciará una nueva partida.")) {
            clearState();
            game.init(true);
        }
    })

    on("keyup", "#answer-button", function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            e.stopImmediatePropagation();
            modal.reveal();
        }
    });
    on("click", "#answer-button", function (e) {
        modal.reveal();
    })

    on("keyup", "#continue-button", function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            e.stopImmediatePropagation();
            modal.hide();
        }
    });
    on("click", "#continue-button", function (e) {
        modal.hide();
    })

    on("click", ".grid-row-questions .grid-cell", function (e) {
        current_cell = this;
        modal.show(this);
    });

    // prevent the buttons from being highlighted
    on("mousedown", ".minus, .plus", function (e) {
        e.preventDefault();
    });

    on("keydown", ".minus, .plus", function (e) {
        if (e.keyCode == 13) {
            handlePoints.call(this, e);
        }
    })

    function handlePoints(e) {
        var $team = closest(this, ".team");
        var $points = $team.querySelectorAll(".points")[0];
        var points = parseInt($points.innerText, 10);
        if (isNaN(points)) {
            alert("Error! The score for this team is not a number. You need to edit the score and change it to a number.");
            return
        }
        var active_question = document.querySelectorAll(".active-question .cell-inner")[0];
        var fallback = document.querySelectorAll(".grid-row-questions .cell-inner")[0];
        var val = parseInt(active_question ? active_question.innerText : fallback.innerText, 10);
        if (this.classList.contains("minus")) {
            val = -val;
        }
        $points.innerText = points + val;
        if (active_question) {
            document.querySelectorAll(".active-question")[0].classList.add("inert");
        }
        debouncedSaveState();

    }

    // handle points clicks
    on("click", ".minus, .plus", handlePoints);
});

function clearLocalStorage() {
    for (var i = localStorage.length - 1; i >= 0; i--) {
        var key = localStorage.key(i);
        //(key.indexOf("jeopardy-0-") == 0 && localStorage.getItem("jeopardy-0") == "4137080")){
        if (key.indexOf("jeopardy-4137080") == 0) {
            localStorage.removeItem(key);
        }
    }
}


initial_state = {
    "page": "menu"
}

try {
    history.replaceState(initial_state, "JeopardyLabs")
} catch (e) {}

game.first_render = true;

game.initTeam = function (number_of_teams) {
    document.getElementById("teams").style.display = "flex";
    var teams = document.querySelectorAll("#teams .team");
    for (var i = 0; i < number_of_teams; i++) {
        var t = teams[i];
    }
}

game.init = function (clear) {
    var val = document.querySelectorAll("#options select")[0].value;

    if (isNaN(val)) {
        val = 0
        do {
            var n = prompt("Enter the number of teams you have");
            val = parseInt(n, 10) || 0;
        } while (val <= 0);
    }

    renderState({
        "page": "game"
    })
    // add all the teams
    document.getElementById("teams").style.display = "flex";
    var teams = document.querySelectorAll("#teams .team");
    for (var i = 0; i < teams.length; i++) {
        teams[i].style.display = "none";
    }

    for (var i = 0; i < val; i++) {
        var t = teams[i];
        if (!t) {
            var t = teams[0].cloneNode(true)
            teams[0].parentElement.appendChild(t);
            t.querySelectorAll(".name")[0].textContent = "Team " + (i + 1)
            t.querySelectorAll(".points")[0].textContent = "0"
        } else {
            t = teams[i]
        }
        t.style.display = "block";
    }

    var teams = document.querySelectorAll("#teams .team");

    if (game.first_render) {
        var old_state = getOldState();
        if (old_state) {
            for (var i = 0; i < val; i++) {
                var t = teams[i];
                if (old_state.teams[i]) {
                    var name = old_state.teams[i].name;
                    var points = old_state.teams[i].points;
                    t.querySelectorAll(".name")[0].textContent = name
                    t.querySelectorAll(".points")[0].textContent = points
                }
            }

            // restore the inert questions
            var inerts = old_state.inerts;
            for (var id in inerts) {
                try {
                    document.getElementById(id).classList.add("inert");
                    document.getElementById(id).setAttribute("aria-label", "Answered");
                } catch (e) {
                    continue;
                }
            }
        }
    } else if (clear) {
        for (var i = 0; i < val; i++) {
            var t = teams[i];
            t.querySelectorAll(".name")[0].textContent = "Team " + (i + 1)
            t.querySelectorAll(".points")[0].textContent = "0"
        }
        removeClass(".inert", "inert");
    } else { // coming just restore

    }

    resize()

    try {
        history.pushState({
            "page": "game"
        }, "JeopardyLabs");
    } catch (e) {}

    game.first_render = false;
    try {
        document.querySelectorAll(".grid-first-row .grid-cell")[0].focus();
    } catch (e) {

    }
}

function hideModal() {
    modal.is_open = false;
    var div = document.getElementById("question-modal");
    div.style.display = "none";
    div.classList.remove("expanded");
    div.style.borderWidth = "3px";
    div.querySelectorAll(".modal-inner")[0].innerHTML = "";
}

function renderMenu() {
    var old_state = getOldState() || !game.first_render
    if (!game.first_render) {
        document.querySelectorAll("#submit")[0].value = "Continuar"
        document.querySelectorAll("#reset-all")[0].style.display = ""
    } else if (old_state) {
        document.querySelectorAll("#submit")[0].value = "Continuar"
        document.querySelectorAll("#reset-all")[0].style.display = ""
        var teams = old_state.teams.length;
        var chooser = document.getElementById("team-chooser")
        if (teams > 10) {
            var opt = document.createElement("option");
            opt.setAttribute("value", teams);
            opt.textContent = teams + " teams"
            chooser.insertBefore(opt, document.getElementById("last-option"));
            //chooser.appendChild(opt);
        }
        document.getElementById("team-chooser").value = teams;
    } else {
        document.querySelectorAll("#submit")[0].value = "Start"
        document.querySelectorAll("#reset-all")[0].style.display = "none"
    }
}


function renderState(state) {
    document.querySelectorAll("#options")[0].style.display = "none";
    document.querySelectorAll("#teams")[0].style.display = "none";
    document.querySelectorAll("#gameplay")[0].style.filter = "";
    hideModal();


    if (state.page == "menu") {
        document.querySelectorAll("#options")[0].style.display = "block";
        renderMenu();
    } else if (state.page == "game") {
        document.getElementById("teams").style.display = "";
        document.querySelectorAll("#gameplay")[0].style.filter = "blur(0px)";
    } else if (state.page == "slide") {
        document.getElementById("teams").style.display = "";
        document.querySelectorAll("#gameplay")[0].style.filter = "blur(0px)";
        modal.show(document.getElementById(state.cell), true);
    }
}

window.onpopstate = function (event) {
    renderState(window.history.state);
}

function trimHTML(el) {
    var treeWalker = document.createTreeWalker(el, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, null, false);
    while (treeWalker.nextNode()) {
        var node = treeWalker.currentNode;
    }
    var nodes_to_delete = [];
    do {
        var node = treeWalker.currentNode;
        if (node.nodeType == 3 && (node.data || "").trim() == "") {
            nodes_to_delete.push(node);
        } else if (node.tagName == "SCRIPT") {

        } else if (node.tagName == "BR") {
            nodes_to_delete.push(node);
        } else if (node.tagName == "P" && (node.innerText || "").trim() == "") {
            nodes_to_delete.push(node);
        } else {
            break;
        }
    } while (treeWalker.previousNode())
    for (var i = 0; i < nodes_to_delete.length; i++) {
        try {
            nodes_to_delete[i].parentElement.removeChild(nodes_to_delete[i]);
        } catch (e) {
            console.log("passing");
        }
    }
}

modal.reveal = function () {
    var q = document.querySelectorAll("#question-modal .question")[0];
    q.style.display = "block";

    function scrollTo(element, to, duration) {
        var start = element.scrollTop,
            change = to - start,
            currentTime = 0,
            increment = 20;

        var animateScroll = function () {
            currentTime += increment;
            var val = easeInOutQuad(currentTime, start, change, duration);
            element.scrollTop = val;
            if (currentTime < duration) {
                setTimeout(animateScroll, increment);
            } else {
                q.focus()
            }
        };
        animateScroll();
    }

    //t = current time
    //b = start value
    //c = change in value
    //d = duration
    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    };

    var modal_inner = document.querySelectorAll('#question-modal .modal-inner')[0]
    var original_val = modal_inner.scrollTop;
    var start_of_modal = getBoundingClientRect(modal_inner).top;
    var start_of_question = getBoundingClientRect(q).top;
    var val = start_of_question - start_of_modal;
    scrollTo(modal_inner, val, 250)

    setTimeout(function () {
        q.classList.add("reveal");
    }, 0)

    document.querySelectorAll(".active-question")[0].classList.add("inert");
    //document.querySelectorAll('#question-modal .question')[0].focus();

    if (current_cell) {
        current_cell.setAttribute("aria-label", "Answered");
    }
}

modal.show = function (cell, no_push_state) {
    removeClass(".active-question", "active-question");
    cell.classList.add("active-question");

    var row = cell.getAttribute("data-row");
    var col = cell.getAttribute("data-col");
    var category = document.querySelectorAll(".grid-row-cats .cat-cell")[col].innerText;
    var points = cell.querySelectorAll(".cell-inner")[0].innerText;
    document.querySelectorAll("#question-title")[0].innerText = category + " por " + points + " puntos";

    var bbox = cell.getBoundingClientRect();
    var div_modal = document.getElementById('question-modal')
    div_modal.style.display = "block";
    div_modal.style.opacity = 0;

    var inner = document.querySelectorAll("#question-modal .modal-inner")[0];
    inner.innerHTML = cell.querySelectorAll(".answer")[0].outerHTML + "\n" + cell.querySelectorAll(".question")[0].outerHTML;

    if (!no_push_state) {
        try {
            console.log("pre length", window.history.length);
            history.pushState({
                "page": "slide",
                "cell": cell.getAttribute("id")
            }, "JeopardyLabs");
            console.log("post length", window.history.length);
        } catch (e) {

        }
    }

    setTimeout(function () {

        var q = document.querySelectorAll('#question-modal .answer')[0];
        try {
            q.querySelectorAll("video, audio").get(0).play();
        } catch (e) {

        }

        try {
            var iframe = q.querySelectorAll("iframe")[0]
            var src = iframe.getAttribute("src") || "";
            var a = document.createElement("a");
            a.href = src
            if (a.hostname == "www.youtube.com") {
                a.search = (a.search || "?") + '&autoplay=1'
                iframe.contentWindow.location.replace(a.toString());
                //iframe.setAttribute('src', a.toString());
            }
        } catch (e) {
            // ?
        }
        document.querySelectorAll('#question-modal .answer')[0].focus();
    }, 500);

    document.querySelectorAll('#question-modal .modal-body .modal-inner')[0].scrollTop = 0;

    trimHTML(document.querySelectorAll('#question-modal .answer')[0]);
    trimHTML(document.querySelectorAll('#question-modal .question')[0]);

    // the height of the contents of the modal should be...
    /* [MODAL HEADER]
     *     ^
     *     |
     *     |    <--- this tall
     *     v
     * [TEAMS BAR]
     */
    var content_bbox = getBoundingClientRect(document.querySelectorAll('#question-modal .modal-body')[0])
    var position_of_top = content_bbox.top;
    var teams = document.querySelectorAll("#teams")[0]
    var position_of_bottom = getBoundingClientRect(teams).top || window.innerHeight;
    var h = position_of_bottom - position_of_top - 20 // 20 pixels for some extra room

    document.querySelectorAll('#question-modal .modal-inner')[0].style.maxHeight = h + "px";
    document.querySelectorAll('#question-modal .modal-body')[0].style.height = h + "px";


    var q = document.querySelectorAll("#question-modal .question")[0];
    q.style.display = "block";
    var content = document.querySelectorAll('#question-modal .modal-inner')[0];
    var result = shrink_in_place(content, 100, 24);
    q.style.display = "none";


    div_modal.style.transform = "translate(" + bbox.left + "px, " + bbox.top + "px) scale(" + (bbox.width / window.innerWidth) + ", " + (bbox.height / window.innerHeight) + ")"
    div_modal.style.opacity = 1;

    removeClass(".expanded", "expanded");

    setTimeout(function () {
        div_modal.classList.add("expanded");
        div_modal.style.top = 0;
        div_modal.style.left = 0;
        div_modal.style.bottom = 0;
        div_modal.style.right = 0;
        div_modal.style.width = "100%";
        div_modal.style.height = "100%";
        div_modal.style.borderWidth = 0;
        div_modal.style.transform = "translate(0px, 0px) scale(1)"
    }, 50);
    modal.is_open = true; // flag for the keyboard event
    document.querySelectorAll(".grid")[0].setAttribute("aria-hidden", "true");

}

modal.hide = function () {
    document.querySelectorAll(".grid")[0].setAttribute("aria-hidden", "false");
    backToGame()
    renderState({
        "page": "game"
    });
    if (current_cell) {
        current_cell.focus()
    }
}

function backToGame() {
    var state = window.history.state;
    if (state.page == "slide") {
        window.history.go(-1);
    }
}

function backToMenu() {
    renderState({
        "page": "menu"
    });
    var state = window.history.state;
    if (state.page == "slide") {
        window.history.go(-2);
    } else if (state.page == "game") {
        window.history.go(-1);
    }
    document.getElementById("team-chooser").focus();
}
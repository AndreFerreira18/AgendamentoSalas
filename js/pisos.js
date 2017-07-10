//Global vars
var andar_nVisiveis = 6;
var andar_visiveis = null;
var min = 0;
var max = 0;
var selected = 0;

document.getElementById("btn_up").addEventListener("click", updownMoveUp);
document.getElementById("btn_down").addEventListener("click", updownMoveDown);

/**
 * referece to mockdata
 */
var Andares = floors.Andares;


/**
 * Moves the building selector up
 */
function updownMoveUp() {
    if (max < Andares.length) {
        max++;
        min++;
        writeScreen();

    }
}


/**
 * Moves the building selector down
 */
function updownMoveDown() {
    if (min > 0) {
        min--;
        max--;
        writeScreen();
    }
}


/**
 * create initial building selector initializes the building
 */
function updownIniciar() {
    var e = document.getElementById("data_mod_piso_pref");
    selected = parseInt(e.options[e.selectedIndex].value);

    if (Andares.length < andar_nVisiveis)
        andar_nVisiveis = Andares.length;

    createBuilding();
    document.getElementById('piso-' + (selected)).classList.add("active");
    min = selected;

    while ((min + andar_nVisiveis) > Andares.length)
        min--;
    max = min + andar_nVisiveis;
    writeScreen();
}


/**
 * Fills the building with the data to show based on the configs
 * Min is the bottom shown position
 * max is the top shown position
 */
function writeScreen() {
    andares = document.getElementById("selecionaPisos").childNodes;

    for (i = 0; i < Andares.length; i++) {
        if (i >= min && i < max) document.getElementById('piso-' + (i)).style.display = ''
        else document.getElementById('piso-' + (i)).style.display = 'none';
    }
    if (min == 0) document.getElementById("btn_down").style.display = 'none';
    else document.getElementById("btn_down").style.display = '';
    if (max == Andares.length) document.getElementById("btn_up").style.display = 'none';
    else document.getElementById("btn_up").style.display = '';
}


/**
 * Creates the initial building selector to be populates after
 */
function createBuilding() {
    for (i = 0; i < Andares.length; i++) {
        var create = document.createElement("div");
        create.innerHTML = Andares[i];
        create.classList.add('list-group-item');
        create.id = 'piso-' + (i);
        create.style.display = "none";
        create.addEventListener("click", defineActiveEvent);
        var element = document.getElementById("selecionaPisos");
        element.insertBefore(create,  element.firstChild);
    }
}

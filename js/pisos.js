var andar_nVisiveis = 6;
var andar_visiveis = null;
var min = 0;
var max = 0;
var selected = 0;

document.getElementById("btn_up").addEventListener("click", updownMoveUp);
document.getElementById("btn_down").addEventListener("click", updownMoveDown);


/**
 * updownMoveUp - description
 *
 * @returns {type}  description
 */
function updownMoveUp() {
    if (max < floors.Andares.length) {
        max++;
        min++;
        writeScreen();

    }
}


/**
 * updownMoveDown - description
 *
 * @returns {type}  description
 */
function updownMoveDown() {
    if (min > 0) {
        min--;
        max--;
        writeScreen();
    }
}


/**
 * updownIniciar - description
 *
 * @returns {type}  description
 */
function updownIniciar() {
    var e = document.getElementById("data_mod_piso_pref");
    selected = parseInt(e.options[e.selectedIndex].value);

    if (floors.Andares.length < andar_nVisiveis)
        andar_nVisiveis = floors.Andares.length;

    createBuilding();
    document.getElementById('piso-' + (selected)).classList.add("active");
    min = selected;

    while ((min + andar_nVisiveis) > floors.Andares.length)
        min--;
    max = min + andar_nVisiveis;
    writeScreen();
}


/**
 * writeScreen - description
 *
 * @returns {type}  description
 */
function writeScreen() {
    andares = document.getElementById("selecionaPisos").childNodes;

    for (i = 0; i < floors.Andares.length; i++) {
        if (i >= min && i < max) document.getElementById('piso-' + (i)).style.display = ''
        else document.getElementById('piso-' + (i)).style.display = 'none';
    }
    if (min == 0) document.getElementById("btn_down").style.display = 'none';
    else document.getElementById("btn_down").style.display = '';
    if (max == floors.Andares.length) document.getElementById("btn_up").style.display = 'none';
    else document.getElementById("btn_up").style.display = '';
}


/**
 * createBuilding - description
 *
 * @returns {type}  description
 */
function createBuilding() {
    for (i = 0; i < floors.Andares.length; i++) {
        var create = document.createElement("div");
        create.innerHTML = floors.Andares[i];
        create.classList.add('list-group-item');
        create.id = 'piso-' + (i);
        create.style.display = "none";
        create.addEventListener("click", defineActiveEvent);
        var element = document.getElementById("selecionaPisos");
        element.insertBefore(create,  element.firstChild);
    }
}

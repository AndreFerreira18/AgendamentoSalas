var timer = null;
document.getElementById("btn_up").addEventListener("mouseover", function() {
    timer = setInterval(updownMoveUp, 250);
});
document.getElementById("btn_up").addEventListener("mouseout", function() {
    clearInterval(timer);
});
document.getElementById("btn_down").addEventListener("mouseover", function() {
    timer = setInterval(updownMoveDown, 250);
});
document.getElementById("btn_down").addEventListener("mouseout", function() {
    clearInterval(timer);
});


var andar_nVisiveis = 4;
var andar_visiveis = null;
var min = 0;
var max = 0;
var selected = 0;

function updownMoveUp() {
    if(max < floors.Andares.length) {
        max++;
        min++;
        escreverEcra();

    }
}

function updownMoveDown() {
    if(min > 0) {
        min--;
        max--;
        escreverEcra();
    }
}

function updownIniciar() {
    var e = document.getElementById("data_mod_piso_pref");
    selected = parseInt(e.options[e.selectedIndex].value);

    if(floors.Andares.length < andar_nVisiveis)
        andar_nVisiveis = floors.Andares.length;

    criaredificio();
    document.getElementById('piso-' + (selected)).classList.add("active");
    min = selected;

    while((min + andar_nVisiveis) > floors.Andares.length)
        min--;
    max = min + andar_nVisiveis;
    escreverEcra();
}

function escreverEcra() {
    andares = document.getElementById("selecionaPisos").childNodes;

    for(i = 0; i < floors.Andares.length; i++) {
        if(i >= min && i < max) document.getElementById('piso-' + (i)).style.display = ''
        else document.getElementById('piso-' + (i)).style.display = 'none';
    }
    if(min == 0) document.getElementById("btn_down").style.display = 'none';
    else document.getElementById("btn_down").style.display = '';
    if(max == floors.Andares.length) document.getElementById("btn_up").style.display = 'none';
    else document.getElementById("btn_up").style.display = '';
}

function criaredificio() {
    for(i = 0; i < floors.Andares.length; i++) {
        var create = document.createElement("p");
        create.innerHTML = floors.Andares[i];
        create.classList.add('list-group-item');
        create.id = 'piso-' + (i);
        create.style.display = "none";
        create.addEventListener("click", defineActiveEvent);
        var element = document.getElementById("selecionaPisos");
        element.insertBefore(create,  element.firstChild);
    }
}

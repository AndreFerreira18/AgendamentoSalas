// Show Modal
$(window).ready(
    function() {
        $('#modal').modal('show');
        tReuniao();
        pisoPref();
        criarrecursos();
    }
);

//Date picker
$('input[name="daterange"]').daterangepicker({
    "timePicker": true,
    "startDate": "06/09/2017",
    "endDate": "06/09/2017",
    "locale": {
        format: 'MM/DD/YYYY h:mm A'
    }

});

//Sidebar
$(window).resize(function() {
    var path = $(this);
    var contW = path.width();
    if(contW >= 751) {
        document.getElementsByClassName("sidebar-toggle")[0].style.left = "300px";
    } else {
        document.getElementsByClassName("sidebar-toggle")[0].style.left = "-300px";
    }
});
var isSideBarOpen = false;

$(document).ready(function() {
    $('.dropdown').on('show.bs.dropdown', function(e) {
        $(this).find('.dropdown-menu').first().stop(true, true).slideDown(300);
    });
    $('.dropdown').on('hide.bs.dropdown', function(e) {
        $(this).find('.dropdown-menu').first().stop(true, true).slideUp(300);
    });

    //toggle side bar (for desktop and mobile layouts)
    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        toggleSideBar();
    });

    $('.main').click(function(e) {
        if(isSideBarOpen) {
            e.preventDefault();
            toggleSideBar(e);
        }
    });

    $('.container').click(function(e) {
        if(isSideBarOpen && window.innerWidth >= 768) {
            e.preventDefault();
            toggleSideBar(e);
        }
    });
});

function atualizaMatriz() {

}


function toggleSideBar(event) {
    var elem = document.getElementById("sidebar-wrapper");
    left = window.getComputedStyle(elem, null).getPropertyValue("left");
    if(left == "300px") {
        isSideBarOpen = false;
        document.getElementsByClassName("sidebar-toggle")[0].style.left = "-300px";
    } else if(left == "-300px") {
        isSideBarOpen = true;
        document.getElementsByClassName("sidebar-toggle")[0].style.left = "300px";
    }
}

function defineActiveBtnSalas(e) {
    // remove the old active
    var elements = document.getElementsByClassName(e.target.classList[2]);
    for(var i = 0; i < elements.length; i++) {
        elements[i].classList.remove('active');
    }
    //add the active to the element
    var element = document.getElementById(e.target.id);
    element.classList.add('active');
}

function defineActiveEvent(e) {
    // remove the old active
    var element = e.target.id ? e.target : e.target.parentNode;
    var elements = document.getElementsByClassName(element.classList[0]);
    for(var i = 0; i < elements.length; i++) {
        if(elements[i].classList.contains('active'))
            elements[i].classList.remove('active');
    }
    //add the active to the element
    var changeElement = document.getElementById(element.id);
    changeElement.classList.add('active');
}

function defineMultiActiveEvent(e) {
    // remove the old active
    var element = e.target.id ? e.target : e.target.parentNode;
    var elements = document.getElementsByClassName(element.classList[0]);
    //add the active to the element
    var changeElement = document.getElementById(element.id);
    if(changeElement.classList.contains('active'))
        changeElement.classList.remove('active');
    else
        changeElement.classList.add('active');


}

function defineActiveById(activeId) {
    //add the active to the element
    var element = document.getElementById(activeId);
    element.classList.add('active');
}

function getActive(activeClass) {
    var id;
    var elements = document.getElementsByClassName(activeClass);
    for(var i = 0; i < elements.length; i++) {
        if(elements[i].classList.contains('active'))
            id = elements[i].id;
    }
    return id;
}

// Remove element by Id
function removeElement(elementId) {
    if(document.getElementById(elementId)) {
        var element = document.getElementById(elementId);
        element.parentNode.removeChild(element);
    }
}

//saves data to the Side Bar
function saveChanges() {
    var datahora = divideDateAndTime();
    var startDay = datahora[0];
    var endDay = datahora[1];
    var startHour = datahora[2];
    var endHour = datahora[3];

    updownIniciar();
    if(startDay === endDay) {
        addMatrix('day');
    } else {
        addBtnRooms();
        defineActiveById('btn_rooms-1');
        addMatrix('week');
    }
    refreshMatrix();
    clone();
}

// Criar Recursos
function criarrecursos() {

    var recursos = initialData.Recursos;
    var label_recursos = initialData.Recursos;
    var glyph_recursos = [
        "glyphicon glyphicon-facetime-video",
        "glyphicon glyphicon-pencil",
        "glyphicon glyphicon-blackboard",
        "glyphicon glyphicon-ice-lolly",
        "glyphicon glyphicon-screenshot",
        "glyphicon glyphicon-paperclip"
    ];
    document.getElementById("store_btn_recursos").innerHTML = " ";
    var i;
    for(i = 0; i < recursos.length; i++) {
        var button = document.createElement("button");
        var label = document.createElement("label");
        var iDiv = document.createElement('div');
        var element = document.getElementById("store_btn_recursos");
        var spn = document.createElement('span');

        button.type = 'button';
        button.className = "btn-recurso btn btn-default ";
        button.id = 'btn_rc-' + i;
        button.addEventListener("click", defineMultiActiveEvent);
        button.setAttribute("z-index", "1");
        label.type = 'label';
        label.className = "label-recurso";
        label.innerHTML = label_recursos[i];

        iDiv.id = 'recurso' + i;
        iDiv.className = 'divBotoes';
        spn.setAttribute("z-index", "-1");
        spn.className = 'glyph ';

        switch(i) {
            case 0:
                spn.className += glyph_recursos[0];
                break;

            case 1:
                spn.className += glyph_recursos[1];
                break;

            case 2:
                spn.className += glyph_recursos[2];
                break;

            case 3:
                spn.className += glyph_recursos[3];
                break;

            case 4:
                spn.className += glyph_recursos[4];
                break;

                others:
                    spn.className += glyph_recursos[5];
                break;
        }

        button.appendChild(spn);

        element.insertBefore(iDiv, element.firstChild);

        element = document.getElementById(iDiv.id);
        element.insertBefore(label, element.firstChild);
        element.insertBefore(button, element.firstChild);
    }
}

function tReuniao() {
    var x = initialData.Tipos_de_Reuniao;
    document.getElementById("data_mod_tipo_reuniao").innerHTML = " ";
    for(var i = 0; i < x.length; i++) {
        var opt = document.createElement("option");
        opt.innerHTML = x[i];
        opt.value = x[i];
        var tipo_reuniao = document.getElementById("data_mod_tipo_reuniao");
        tipo_reuniao.insertBefore(opt, tipo_reuniao.firstChild);
    }
}

function pisoPref() {
    var x = initialData.Andares;
    document.getElementById("data_mod_piso_pref").innerHTML = " ";
    for(var i = 0; i < x.length; i++) {
        var opt = document.createElement("option");
        opt.innerHTML = x[i];
        opt.value = i;
        var piso_pref = document.getElementById("data_mod_piso_pref");
        piso_pref.insertBefore(opt, piso_pref.firstChild);
    }
}

function clone() {
    var tmp_reuniao = document.getElementById("data_mod_tipo_reuniao").value;
    var elements = document.getElementById("form_modal").firstElementChild;
    var cln = elements.cloneNode(true);
    document.getElementById("form_sb").appendChild(cln);

    document.getElementsByClassName('piso_pref')[1].style.display = "none";

    document.querySelector(".modal-body").remove();
    $('input[name="daterange"]').daterangepicker({
        "timePicker": true,
        "locale": {
            format: 'MM/DD/YYYY h:mm A'
        }
    });
    document.getElementById("data_mod_tipo_reuniao").value = tmp_reuniao;


    for(var i = 0; i < initialData.Recursos.length; i++) {
        var id_button = document.getElementById("btn_rc-" + i);
        id_button.onclick = function() {
            this.classList.toggle("active");
        }
    }
}

function divideDateAndTime() {
    var acedeDataHora = document.getElementById("data_mod_calendar").value;
    var arrayDataHora = acedeDataHora.split(" ");
    var datahora = [];
    datahora[0] = arrayDataHora[0]; // Data de Inicio
    datahora[1] = arrayDataHora[4]; // Data de fim
    datahora[2] = arrayDataHora[1]; // Hora de inicio
    datahora[3] = arrayDataHora[5]; //Hora de fim
    return datahora;
}

// function preencheModalConfirm(){
//
//     var datestart_info = document.getElementById("x").value;
//     var timestart_info = document.getElementById("z").value;
//     var dateEnd_info = document.getElementById("a").value;
//     var timeEnd_info = document.getElementById("y").value;
//
//     document.getElementById("datetime_info").innerHTML= '"Das " +  timestart_info " até às " + timeEnd_info + " no dia " + datestart_info';
//
//     var room_info = document.getElementById("m").value;
//     var piso_info = document.getElementById("selected").value;
//
//     document.getElementById("room_info").innerHTML= '"Localizado na sala " + room_info + "situada no piso" + piso_info';
//
//     // var recurso_info =
// }

// Show Modal
$(window).ready(
  function() {
    $('#modal').modal('show');
    tReuniao();
    pisoPref();
    criarRecursos();
    divideDateAndTime();

  }
);

//Date picker
$('input[name="daterange"]').daterangepicker({
    "timePicker": true,
    "timePicker24Hour" :true,
    "startDate": "03/07/2017",
    "endDate": "04/07/2017",
    "locale": {
        format: 'DD/MM/YYYY h:mm'
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

/**
*This method reads the fields inserted on the sidebar and passed them to the matrix constructor.
*/
function applyFilters() {
    var dateArray = divideDateAndTime();
    var participants = document.getElementById('data_mod_nparticipantes').valueAsNumber;
    var resources = _getResources('store_btn_recursos');
    var floor = getActive('list-group-item');
    var availableRooms = [];
    var selectedFloor = this.resources[floor];
    var length = selectedFloor.length;
    //iterate to see what rooms are available for those filters
    for(var i = 0; i < length; i++){
      var currentRoom = selectedFloor[i].NomeSala;
      if(areResourcesAvailable(resources, selectedFloor[i].Recursos) && participants <= selectedFloor[i].Recursos.N_Pessoas)
          availableRooms.push(selectedFloor[i].NomeSala)
    }
}

/**
* Private method that gets all resources that were selected by the user and returns them in an array
*/
function _getResources(id) {
  var elements = document.getElementById(id);
  var length = elements.children.length;
  var elementsArray = [];
  for(var i =0; i < length ; i++){
    if(elements.children[i].children[0].classList.contains('active')) //if that resource was selected
      elementsArray.push(parseInt(elements.children[i].id.split("-")[1])); //add to selected resources array
  }
  return elementsArray;
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
    if(element.classList.contains('active'))
        element.classList.remove('active');
    else
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
    var datahora = divideDateAndTime("data_mod_calendar");
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
function criarRecursos() {

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

        iDiv.id = 'recurso-' + i;
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

            default:
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
  for (var i = 0; i < x.length; i++) {
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
      "timePicker24Hour": true,
      "timePickerIncrement": 30,
      "locale": {
        format: 'DD/MM/YYYY h:mm'
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

function divideDateAndTime(idData) {
    var acedeDataHora = document.getElementById("data_mod_calendar").value;
    var arrayDataHora = acedeDataHora.split(" ");
    var datahora = [];
    datahora[0] = arrayDataHora[0]; // Data de Inicio
    datahora[1] = arrayDataHora[4]; // Data de fim
    datahora[2] = arrayDataHora[1]; // Hora de inicio
    datahora[3] = arrayDataHora[5]; //Hora de fim
    return datahora;
}

function preencheModalConfirm(){


    //Devolve Tipo de Reuniao Selecionada
    var reuniao_info = document.getElementById("data_mod_tipo_reuniao").value;
    document.getElementById("reuniao").innerHTML = 'Reunião ' + reuniao_info;

    // var horaData_info = document.getElementById("data_mod_calendar").value;
    // var array_horaData = horaData_info.split(" ");
    // var dataInicio = array_horaData[0];
    // var horaInicio = array_horaData[1];
    // var dataFim = array_horaData[3];
    // var horafim = array_horaData[4];
    //
    // var str_horas= 'Das ' +  horaInicio + ' até às ' + horafim + ' no dia ' + dataInicio;
    // document.getElementById("datetime_info").insertAdjacentHTML( 'beforeend', str_horas);

    //Devolve Andar e Sala Escolhidos
    var piso_info = getActive('list-group-item');
    //Seleciona no mockdata2 qual o conjunto de salas consoante piso
    switch(piso_info) {
        case "piso-0":
            var rooms = rooms_0.salas;
            break;
        case "piso-1":
            var rooms = rooms_1.salas;
            break;
        case "piso-2":
            var rooms = rooms_2.salas;
            break;
        case "piso-3":
            var rooms = rooms_3.salas;
            break;
        case "piso-4":
            var rooms = rooms_4.salas;
            break;
        case "piso-5":
            var rooms = rooms_5.salas;
            break;
        case "piso-6":
            var rooms = rooms_6.salas;
            break;
        case "piso-7":
            var rooms = rooms_7.salas;
            break;
        default:
    }
    //ve sala selecionada
    for (var i = 0; i<selected_hours.length; i++){
    var array_room = selected_hours[i];
    var aux_room_info = array_room.split("-");
    var selected_room = aux_room_info[1];
    }
    //devolve nome da sala selecionada
        for (var j = 0; j<rooms.length; j++){
        if (j == selected_room){
        var room_info = rooms[j];
        }
    }

    var str_sala = 'Localizado na ' + room_info + ' situada no ' + piso_info;
    document.getElementById("sala_info").innerHTML = str_sala;
//     var piso_info = document.getElementById("selected").value;
//
//     document.getElementById("room_info").innerHTML= '"Localizado na sala " + room_info + "situada no piso" + piso_info';
    var participantes = document.getElementById("data_mod_nparticipantes").value;
    var str_participantes = 'Com ' + participantes + ' participantes previstos';
    document.getElementById("nparticipantes").innerHTML = str_participantes;
//     // var recurso_info =
 }

function snackBar(msg) {
    var snack = document.getElementById("snackBar")
    snack.innerHTML = '';

    var p = document.createElement("p");
    p.innerHTML = msg;
    snack.appendChild(p);

    snack.className = "show";
    setTimeout(function(){
            snack.className = snack.className.replace("show", "");
        },
    3000);
}

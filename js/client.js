// Show Modal
$(window).ready(
    function() {
        $('#modal').modal('show');
        createTypesOfMeetings();
        createPrefFloor();
        createResources();
    }
);

//Date picker
$('input[name="daterange"]').daterangepicker({
    "timePicker": true,
    "timePicker24Hour": true,
    "timePickerIncrement": 30,
    "startDate": "03/07/2017",
    "endDate": "04/07/2017",
    "locale": {
        format: 'DD/MM/YYYY h:mm '
    }

});

//Sidebar
$(window).resize(function() {
    var path = $(this);
    var contW = path.width();
    if (contW >= 751) {
        document.getElementsByClassName("sidebar-toggle")[0].style.left = "300px";
    } else {
        document.getElementsByClassName("sidebar-toggle")[0].style.left = "-300px";
    }
});
//variable to control side bar opening.
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
        if (isSideBarOpen) {
            e.preventDefault();
            toggleSideBar(e);
        }
    });

    $('.container').click(function(e) {
        if (isSideBarOpen && window.innerWidth >= 768) {
            e.preventDefault();
            toggleSideBar(e);
        }
    });
});

/**
 *  This method reads the fields inserted on the sidebar and passes them to the matrix constructor.
 *  @returns {Object} an Object containing the available rooms for the inputed filters and the information if a longer time period was selected.
 */
function applyFilters() {
    //gets dates
    var dateArray = divideDateAndTime('data_mod_calendar');
    //gets number of participants
    var participants = document.getElementById('data_mod_nparticipantes').valueAsNumber;
    if (participants <= 0 || participants > 999) {
        snackBar("Por favor insira um número de participantes entre 1 e 999");
        return;
    }
    //checks Radio Buttons for longer periods
    var preSelection = document.querySelector('input[name="period"]:checked') !== null ? document.querySelector('input[name="period"]:checked').id : "";
    //gets selected resources
    var myResources = _getResources('store_btn_recursos');
    //gets current floor selection
    var floor = getActive('list-group-item');
    //returning object structure
    var availables = {
        rooms: [],
        selection: preSelection
    };

    //iterate to see what rooms are available for those filters
    var selectedFloor = this.resources[floor];
    var length = selectedFloor.length;
    for (var i = 0; i < length; i++) {
        var currentRoom = selectedFloor[i].NomeSala;
        if (areResourcesAvailable(participants, myResources, selectedFloor[i].Recursos))
            availables.rooms.push(selectedFloor[i].NomeSala)
    }
    return availables;
}
/**
 *  This method receives an array with the selected resources and the availability of the room (in terms of resources) and
 *  confirms if the room has the given resources availables for the reservation
 *  @param {Number} participants - An Integer with the number of participants of the request
 *  @param {Array} selection - An Array of the selected resources
 *  @param {Array} availables - An Array with resources information for a given room
 *  @returns {Boolean} True if the room has available resources for the request | False if the room has not
 */
function areResourcesAvailable(participants, selection, availables) {
    var isAvailable = true;
    if (participants > parseInt(availables.N_Pessoas)) //if the number of participants is greater than the maximum capability of the room
        isAvailable = false;
    else {
        for (var i = 0; i < selection.length; i++) { //else chech if the selected resources are available
            if (selection[i] !== 'Material de Escritório') {
                if (availables[selection[i]] === false)
                    isAvailable = false;
            } else { //fix for 'Material_de_Escritorio' as it is the only string different in data side and in buttons side
                if (availables['Material_de_Escritorio'] === false)
                    isAvailable = false;
            }
        }
        return isAvailable;
    }
}

/**
 *  Private method that gets all resources that were selected by the user and returns them in an array
 *  @param {String} id - Receives the id of the buttons container
 *  @returns {Array} An array that contains the name of the resources selected by the user.
 */
function _getResources(id) {
    var elements = document.getElementById(id);
    var length = elements.children.length;
    var elementsArray = [];
    for (var i = 0; i < length; i++) {
        if (elements.children[i].children[0].classList.contains('active')) { //if that resource was selected
            var id = parseInt(elements.children[i].id.split("-")[1]); //add to selected resources array
            elementsArray.push(initialData.Recursos[id]);
        }
    }
    return elementsArray;
}


/**
 * toggleSideBar - This method handles side Bar opening and closing
 *
 * @param  {type} event The event that was triggered
 */
function toggleSideBar(event) {
    var elem = document.getElementById("sidebar-wrapper");
    left = window.getComputedStyle(elem, null).getPropertyValue("left");
    if (left == "300px") {
        isSideBarOpen = false;
        document.getElementsByClassName("sidebar-toggle")[0].style.left = "-300px";
    } else if (left == "-300px") {
        isSideBarOpen = true;
        document.getElementsByClassName("sidebar-toggle")[0].style.left = "300px";
    }
}

/**
 * defineActiveEvent - description
 *
 * @param  {type} e description
 * @returns {type}   description
 */
function defineActiveEvent(e) { // define single active
    // remove the old active
    var element = e.target.id ? e.target : e.target.parentNode;
    var elements = document.getElementsByClassName(element.classList[0]);
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].classList.contains('active'))
            elements[i].classList.remove('active');
    }
    //add the active to the element
    var changeElement = document.getElementById(element.id);
    changeElement.classList.add('active');
}

/**
 * defineMultiActiveEvent - description
 *
 * @param  {type} e description
 * @returns {type}   description
 */
function defineMultiActiveEvent(e) {
    var element = e.target.id ? e.target : e.target.parentNode;
    var changeElement = document.getElementById(element.id);
    if (changeElement.classList.contains('active'))
        changeElement.classList.remove('active');
    else
        changeElement.classList.add('active');
}

/**
 * defineActiveById - description
 *
 * @param  {type} activeId description
 * @returns {type}          description
 */
function defineActiveById(activeId) {
    //add the active to the element
    var element = document.getElementById(activeId);
    if (element.classList.contains('active'))
        element.classList.remove('active');
    else
        element.classList.add('active');
}

/**
 * getActive - description
 *
 * @param  {type} activeClass description
 * @returns {type}             description
 */
function getActive(activeClass) {
    var id;
    var elements = document.getElementsByClassName(activeClass);
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].classList.contains('active'))
            id = elements[i].id;
    }
    return id;
}

/**
 * getMultiActive - description
 *
 * @param  {type} activeClass description
 * @returns {type}             description
 */
function getMultiActive(activeClass) {
    var id = [];
    var elements = document.getElementsByClassName(activeClass);
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].classList.contains('active'))
            id.push(elements[i].id);
    }
    return id;
}

// Remove element by Id
//
/**
 * removeElement - description
 *
 * @param  {type} elementId description
 * @returns {type}           description
 */
function removeElement(elementId) {
    if (document.getElementById(elementId)) {
        var element = document.getElementById(elementId);
        element.parentNode.removeChild(element);
    }
}



//saves data to the Side Bar

/**
 * saveChanges - description
 *
 * @returns {type}  description
 */
function saveChanges() {
    var datahora = divideDateAndTime("data_mod_calendar");
    var startDay = datahora[0];
    var endDay = datahora[1];
    var startHour = datahora[2];
    var endHour = datahora[3];


    updownIniciar();
    if (startDay === endDay) {
        addMatrix('day');
    } else {
        addBtnRooms();
        defineActiveById('btn_rooms-1');
        addMatrix('week');
    }
    refreshMatrix();
    clone();
}



/**
 * createResources - description
 *
 * @returns {type}  description
 */
function createResources() {

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
    for (i = 0; i < recursos.length; i++) {
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

        switch (i) {
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


/**
 * createTypesOfMeetings - description
 *
 * @returns {type}  description
 */
function createTypesOfMeetings() {
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

/**
 * createPrefFloor - description
 *
 * @returns {type}  description
 */
function createPrefFloor() {
    var x = initialData.Andares;
    document.getElementById("data_mod_piso_pref").innerHTML = " ";
    for (var i = 0; i < x.length; i++) {
        var opt = document.createElement("option");
        opt.innerHTML = x[i];
        opt.value = i;
        var piso_pref = document.getElementById("data_mod_piso_pref");
        piso_pref.insertBefore(opt, piso_pref.firstChild);
    }
}

/**
 * clone - description
 *
 * @returns {type}  description
 */
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
            format: 'DD/MM/YYYY h:mm '
        }
    });
    document.getElementById("data_mod_tipo_reuniao").value = tmp_reuniao;


    for (var i = 0; i < initialData.Recursos.length; i++) {
        var id_button = document.getElementById("btn_rc-" + i);
        id_button.onclick = function() {
            this.classList.toggle("active");
        }
    }
}


/**
 * divideDateAndTime - description
 *
 * @param  {type} idData description
 * @returns {type}        description
 */
function divideDateAndTime(idData) {
    var acedeDataHora = document.getElementById(idData).value;
    var arrayDataHora = acedeDataHora.split(" ");
    var datahora = [];
    datahora[0] = arrayDataHora[0]; // Data de Inicio
    datahora[1] = arrayDataHora[4]; // Data de fim
    datahora[2] = arrayDataHora[1]; // Hora de inicio
    datahora[3] = arrayDataHora[5]; //Hora de fim
    return datahora;
}

/**
 * findHour - description
 *
 * @returns {type}  description
 */
function findHour() {
    for (var i = 0; i < selected_hours.length; i++) {
        var acede_dataHora_selecionada = selected_hours[i];
        var dataHora_selecionada = acede_dataHora_selecionada.split("-");
        console.log(dataHora_selecionada);
        return dataHora_selecionada;
    }
}

/**
 * preencheModalConfirm - description
 *
 * @returns {type}  description
 */
function preencheModalConfirm() {

    var reuniao_info = document.getElementById("data_mod_tipo_reuniao").value;
    document.getElementById("reuniao").innerHTML = 'Reuniao ' + reuniao_info;

    // var datestart_info = selected_hours[0];
    // console.log(datestart_info);
    // var timestart_info = document.getElementById("datahora[1]").value;
    // var dateEnd_info = document.getElementById("datahora[4]").value;
    // var timeEnd_info = document.getElementById("datahora[5]").value;
    // var str_horas= 'Das ' +  timestart_info + 'até às ' + timeEnd_info + ' no dia ' + datestart_info;
    // document.getElementById("datetime_info").insertAdjacentHTML( 'beforeend', str_horas );
    //
    //     var room_info = document.getElementById("m").value;
    //     var piso_info = document.getElementById("selected").value;
    //
    //     document.getElementById("room_info").innerHTML= '"Localizado na sala " + room_info + "situada no piso" + piso_info';
    var participantes = document.getElementById("data_mod_nparticipantes").value;
    var str_participantes = 'Com ' + participantes + ' participantes previstos';
    document.getElementById("nparticipantes").insertAdjacentHTML('beforeend', str_participantes);
    //     // var recurso_info =
}

/**
 * snackBar - description
 *
 * @param  {type} msg description
 * @returns {type}     description
 */
function snackBar(msg) {
    var snack = document.getElementById("snackBar")
    snack.innerHTML = '';
    var p = document.createElement("p");
    p.innerHTML = msg;
    snack.appendChild(p);
    snack.className = "show";
    setTimeout(function() {
            snack.className = snack.className.replace("show", "");
        },
        3000);
}

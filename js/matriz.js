//Global vars
var columnID = '';

/**
 * referece to mockdata
 */
var horarioDia = scheduleDay;

/**
 * Aux Function that returns the selected week
 *if there is the param returns the param
 * @param  {number} id_semana number of the week
 * @returns {number} id_semana if there is the id_semana |  week if there is no id_semana
 */
function getWeek(id_semana) {
    // alterar para pedido de dados a db
    var datahora = divideDateAndTime("data_mod_calendar");
    var startDay = datahora[0];
    var endDay = datahora[1];
    var startHour = datahora[2];
    var endHour = datahora[3];
    var week = 0;

    if (startDay >= "03/07/2017" && startDay < "10/07/2017") {
        week = 1;
    } else if (startDay >= "10/07/2017" && startDay < "17/07/2017") {
        week = 2;
    } else if (startDay >= "17/07/2017" && startDay < "24/07/2017") {
        week = 3;
    } else if (startDay >= "24/07/2017") {
        week = 4;
    }

    return id_semana ? id_semana : week;
}


/**
 * Switches active matrix
 */
function changeMatrix() {
    var btn = document.getElementById('btn_change_view');
    var matrizAtiva = document.getElementById("matrix");
    var matriz = document.getElementById("matrix");
    var idFilho = matriz.firstElementChild.id;
    var filho = idFilho.split("_");
    matrizAtiva.innerHTML = " ";
    var filters = applyFilters();
    if (filho[1] == "day") {
        addMatrix("week");
        addBtnRooms(filters);
        var idPrimeiroElemento = document.getElementById("btn_rooms").firstElementChild.id;
        defineActiveById(idPrimeiroElemento);
        createMatrixWeek(filters);
        btn.innerHTML = 'Vista de Dia';
    } else if (filho[1] == "week") {
        removeRoomBtn();
        addMatrix("day");
        createMatrixDay(filters);
        btn.innerHTML = 'Vista da Semana';
    } else
        snackBar("Escolha de matriz errada");
}


/**
 * adds a matrix to the body based on the input
 * @param  {string} matrixType part of the id type of matrix to be added
 */
function addMatrix(matrixType) {
    var matrix = document.getElementById("matrix");
    var mh = document.createElement('thead');
    mh.id = "matrix_" + matrixType + "_head";
    var mb = document.createElement('tbody');
    mb.id = "matrix_" + matrixType + "_body";
    matrix.appendChild(mh);
    matrix.appendChild(mb);
}


/**
 * Refresh matrix data
 * Cleans the previous matirx and creates a new one based on the active matrix
 * @param  {type} nextSemana to change te selected week based on the arrows
 */
function refreshMatrix(nextSemana) {
    var matrix = document.getElementById("matrix");
    var id_child = matrix.firstElementChild.id;
    var child = id_child.split("_");
    if (window.innerWidth <= 768 && isSideBarOpen) {
        toggleSideBar();
    }
    matrix.innerHTML = " ";
    addMatrix(child[1]);
    var filters = applyFilters();
    if (child[1] == "day")
        createMatrixDay(filters);
    else if (child[1] == "week") {
        var activeBtn = getActive("btn-rooms");
        refreshButtons(filters);
        defineActiveById(activeBtn);
        createMatrixWeek(filters, nextSemana);

    } else
        snackBar("Escolha de matriz errada");
}


/**
 * Adds data to the matrix week based on the filters
 * @param {array} filters filter to be aplied to the data on the table
 * @param  {type} nextSemana change of week from the arrows
 */
function createMatrixWeek(filters, nextSemana) {
    ////////////////////////////////////////////
    //Alterar quando recebermos JSON
    var id_andar = getActive('list-group-item');
    var temp_id_sala = getActive('btn-rooms').split("-");
    var id_sala = "1" + temp_id_sala[1];
    var id_semana = getWeek(nextSemana);


    var scheduleWeek;
    switch (id_sala) {
        case "11":
            if (id_semana == "1")
                scheduleWeek = scheduleWeek_1_sala_11;
            else if (id_semana == "2")
                scheduleWeek = scheduleWeek_2_sala_11;
            else if (id_semana == "3")
                scheduleWeek = scheduleWeek_3_sala_11;
            else if (id_semana == "4")
                scheduleWeek = scheduleWeek_4_sala_11;
            break;
        case "12":
            if (id_semana == "1")
                scheduleWeek = scheduleWeek_1_sala_12;
            else if (id_semana == "2")
                scheduleWeek = scheduleWeek_2_sala_12;
            else if (id_semana == "3")
                scheduleWeek = scheduleWeek_3_sala_12;
            else if (id_semana == "4")
                scheduleWeek = scheduleWeek_4_sala_12;
            break;
        case "13":
            if (id_semana == "1")
                scheduleWeek = scheduleWeek_1_sala_13;
            else if (id_semana == "2")
                scheduleWeek = scheduleWeek_2_sala_13;
            else if (id_semana == "3")
                scheduleWeek = scheduleWeek_3_sala_13;
            else if (id_semana == "4")
                scheduleWeek = scheduleWeek_4_sala_13;
            break;
        case "14":
            if (id_semana == "1")
                scheduleWeek = scheduleWeek_1_sala_14;
            else if (id_semana == "2")
                scheduleWeek = scheduleWeek_2_sala_14;
            else if (id_semana == "3")
                scheduleWeek = scheduleWeek_3_sala_14;
            else if (id_semana == "4")
                scheduleWeek = scheduleWeek_4_sala_14;
            break;
        default:
            snackBar("não tenho mockdata dessa sala para matriz semana");
    }
    //Alterar quando recebermos JSON
    ////////////////////////////////////////////

    //title
    var mh = document.getElementById("matrix_week_head");
    var trH = document.createElement('tr');
    var spanL = document.createElement('span');
    var thC = document.createElement('th');
    var spanR = document.createElement('span');
    var colspan = scheduleWeek.dates.length * 2 + 1;
    mh.appendChild(trH);
    thC.setAttribute("style", "text-align:center;");
    thC.setAttribute("colspan", colspan);
    thC.innerHTML = "Vista da Semana - " + document.getElementById(filters.floor).innerText + ' - ' + document.getElementById(getActive('btn-rooms')).innerText;

    // adds arrows
    if (id_semana != "1") {
        spanL.className = ("glyph glyphicon glyphicon-arrow-left pull-left");
        spanL.setAttribute("style", "cursor:pointer;");
        spanL.addEventListener("click", function() {
            refreshMatrix(id_semana - 1);
        });
        thC.appendChild(spanL);
    }
    if (id_semana != "4") {
        spanR.className = ("glyph glyphicon glyphicon-arrow-right pull-right");
        spanR.setAttribute("style", "cursor:pointer;");
        spanR.addEventListener("click", function() {
            refreshMatrix(id_semana + 1);
        });
        thC.appendChild(spanR);
    }
    trH.appendChild(thC);

    // time on the first collumn
    var tr = document.createElement('tr');
    mh.appendChild(tr);
    var th1 = document.createElement('th');
    tr.appendChild(th1);
    for (var i = 0; i < scheduleWeek.dates.length; i++) {
        var th2 = document.createElement('th');
        th2.innerHTML = scheduleWeek.dates[i];
        th2.setAttribute('colspan', '2');
        tr.appendChild(th2);
    }

    //data in the table
    var mb = document.getElementById("matrix_week_body");
    for (var i = 0; i < scheduleWeek.hour.length - 1; i++) {
        var tr = document.createElement('tr');
        if (isEven(i)) mb.appendChild(tr);
        var th = document.createElement('th');
        th.setAttribute("scope", "row");
        tr.appendChild(th);
        th.innerHTML = scheduleWeek.hour[i];
        for (var j = 0; j < scheduleWeek.dates.length; j++) {
            // first half hour
            var td = document.createElement('td');
            td.id = 'td-' + j + '-' + i;
            var disponibilidade = scheduleWeek[j][i];
            if (disponibilidade === 'Disponível') {
                td.classList.add("available");
            } else if (disponibilidade === 'Indisponível') {
                td.classList.add("notAvailable");
            } else {
                td.classList.add("undefined");
            }
            td.classList.add("mleft");
            tr.appendChild(td);
            // second half hour
            var td2 = document.createElement('td');
            td2.id = 'td-' + j + '-' + (i + 1);
            var disponibilidade = scheduleWeek[j][i + 1];
            if (disponibilidade === 'Disponível') {
                td2.classList.add("available");

            } else if (disponibilidade === 'Indisponível') {
                td2.classList.add("notAvailable");
            } else {
                td2.classList.add("undefined");
            }
            td2.classList.add("mright");
            tr.appendChild(td2);
        }
    }
    // adds draggable
    _setWeekendHighlight();
    _setLunchTime();
    _bindDraggableForWeek();
}


/**
 * Adds data to the matrix day based on the filters
 * @param {array} filters filter to be aplied to the data on the table
 */
function createMatrixDay(filters) {
    ////////////////////////////////////////////
    //Alterar quando recebermos JSON
    var idSelectedFloor = getActive('list-group-item');
    var tempSelectedFloor = idSelectedFloor.split("-");
    var selectedFloor = parseInt(tempSelectedFloor[1]);
    //Alterar quando recebermos JSON
    ////////////////////////////////////////////

    //title
    var mh = document.getElementById("matrix_day_head");
    var tr = document.createElement('tr');
    var trH = document.createElement('tr');
    var thC = document.createElement('th');
    var colspan = horarioDia[selectedFloor].length * 2 + 1;
    mh.appendChild(trH);
    trH.appendChild(thC);
    thC.setAttribute("style", "text-align:center;height: 43px;");
    thC.setAttribute("colspan", colspan);
    thC.innerHTML = "Vista por Dia - " + filters.date[0] + ' - ' + document.getElementById(filters.floor).innerText;
    mh.appendChild(tr);

    //rooms name
    var th1 = document.createElement('th');
    tr.appendChild(th1);
    for (var i = 0; i < horarioDia[selectedFloor].length; i++) {
        var th2 = document.createElement('th');
        th2.innerHTML = horarioDia[selectedFloor][i].NomeSala;
        th2.setAttribute('colspan', '2');
        tr.appendChild(th2);
    }

    //data in the table
    var mb = document.getElementById("matrix_day_body");
    for (var i = 0; i < horarioDia[selectedFloor][0].Horas.length - 1; i++) {
        var tr = document.createElement('tr');
        if (isEven(i)) mb.appendChild(tr);
        var th = document.createElement('th');
        th.setAttribute("scope", "row");
        tr.appendChild(th);
        th.innerHTML = horarioDia[selectedFloor][0].Horas[i];
        for (var j = 0; j < horarioDia[selectedFloor].length; j++) {
            // first half hour
            var td = document.createElement('td');
            var disponibilidade = horarioDia[selectedFloor][j].Disponibilidade[i];
            if (disponibilidade == 'Disponível') {
                td.classList.add("available");
            } else if (disponibilidade == 'Indisponível')
                td.classList.add("notAvailable");
            else
                td.classList.add("undefined");
            var isNearMiss = true;
            for (var k = 0; k < filters.rooms.length; k++)
                if (filters.rooms[k] === horarioDia[selectedFloor][j].NomeSala)
                    isNearMiss = false;
            if (isNearMiss)
                td.className = 'nearMiss';
            td.classList.add("mleft");
            td.id = 'td-' + j + '-' + i;

            // second half hour
            var td2 = document.createElement('td');
            var disponibilidade = horarioDia[selectedFloor][j].Disponibilidade[i + 1];
            if (disponibilidade == 'Disponível') {
                td2.classList.add("available");
            } else if (disponibilidade == 'Indisponível')
                td2.classList.add("notAvailable");
            else
                td2.classList.add("undefined");

            // apllies filters
            var isNearMiss = true;
            for (var k = 0; k < filters.rooms.length; k++)
                if (filters.rooms[k] === horarioDia[selectedFloor][j].NomeSala)
                    isNearMiss = false;
            if (isNearMiss)
                td2.className = 'nearMiss';
            td2.id = 'td-' + j + '-' + (i + 1);
            td2.classList.add("mright");
            tr.appendChild(td);
            tr.appendChild(td2);
        }
    }
    // adds draggable
    populateSelectionForDay();
    _bindDraggableForDay();
    _setLunchTime();
}


/**
 * Removes room Bottons
 */
function removeRoomBtn() {
    var divBotoes = document.getElementById("btn_rooms");
    if (divBotoes)
        divBotoes.innerHTML = "";
}


/**
 * Refresh active buttons
 */
function refreshButtons(filters) {
    var divButton = document.getElementById("btn_rooms");
    var id_child = divButton.firstElementChild.id;
    var child = id_child.split("_");
    divButton.innerHTML = " ";
    addBtnRooms(filters);
}


/**
 * Adds rooms buttons
 */
function addBtnRooms(filters) {
    ////////////////////////////////////////////
    //Alterar quando recebermos JSON
    var idAndar = getActive('list-group-item');
    var rooms;
    switch (idAndar) {
        case "piso-0":
            rooms = rooms_0;
            break;
        case "piso-1":
            var rooms = rooms_1;
            break;
        case "piso-2":
            var rooms = rooms_2;
            break;
        case "piso-3":
            var rooms = rooms_3;
            break;
        case "piso-4":
            var rooms = rooms_4;
            break;
        case "piso-5":
            var rooms = rooms_5;
            break;
        case "piso-6":
            var rooms = rooms_6;
            break;
        case "piso-7":
            var rooms = rooms_7;
            break;
        default:
    }
    //Alterar quando recebermos JSON
    ////////////////////////////////////////////

    var element = document.getElementById("btn_rooms");
    element.innerHTML = "";
    for (var i = 1; i <= rooms.salas.length; i++) {
        var btn = document.createElement('button');
        btn.innerHTML = rooms.salas[i - 1];
        btn.setAttribute("type", "button");
        btn.id = "btn_rooms-" + i;
        btn.classList.add('btn-rooms');
        btn.classList.add('btn');
        btn.classList.add('btn-lg');
        var btn_warning = true;
        for (var j = 0; j < filters.rooms.length; j++) {
            if (rooms.salas[i - 1] === filters.rooms[j]) btn_warning = false;
        }
        if (btn_warning)
            btn.classList.add('btn-warning');
        else
            btn.classList.add('btn-default');
        btn.addEventListener("click", defineActiveEvent);
        element.appendChild(btn);
    }
}


/**
 * defines active elements whe active matrix is day
 */
function populateSelectionForDay() {
    var datetime = divideDateAndTime();

    var startTime = datetime[2];
    var startTimeSplit = startTime.split(' ');
    var endTime = datetime[3];
    var endTimeSplit = endTime.split(' ');

    startTimeSplit = startTimeSplit[0].split(':');
    endTimeSplit = endTimeSplit[0].split(':');

    var startId = (parseInt(startTimeSplit[0]) - 8) * 2;
    if (parseInt(startTimeSplit[1]) > 0)
        startId++;
    var endId = (parseInt(endTimeSplit[0]) - 8) * 2;
    if (parseInt(endTimeSplit[1]) > 0)
        endId++;
    columnID = '0';
    for (var i = startId; i < endId; i++) {
        var elemnt = document.getElementById('td-0-' + i);
        if (elemnt.classList.contains('available'))
            defineActiveById('td-0-' + i);
    }
}


/**
 *  This method binds mouse events for draggable selection in Day Matrix
 */
function _bindDraggableForDay() {
    var isMouseDown = false,
        isActive;
    $("#matrix td")
        .mousedown(function(e) {
            //clear radio buttons
            var radios = document.querySelectorAll('.radioButton')
            for (var i = 0; i < radios.length; i++) {
                radios[i].children[0].checked = false;
            }
            //clear active elements from date range picker
            var all = document.querySelectorAll('td.active'),
                first = '',
                last = '',
                rowID;
            for (var i = 0; i < all.length; i++) {
                if (all[i].id === '')
                    all[i].parentNode.removeChild(all[i]);
            }
            var info = this.id.split('-');
            all = document.querySelectorAll('td.active');
            //if there are some elements already active
            if (all.length > 0) {
                first = parseInt(all[0].id.split('-')[2]);
                last = parseInt(all[all.length - 1].id.split('-')[2]);
                rowID = parseInt(this.id.split('-')[2]);
                if (this.id.split('-')[1] !== columnID) //safety checks
                    snackBar("Uma reserva deverá conter apenas uma Sala.");
                else { //more safety checks
                    if (rowID === (first - 1) || rowID === (last + 1) ||
                        // rowID === (first - 2) || rowID === (last + 2) ||
                        (rowID === first) || (rowID === last)) {
                        if (this.classList.contains('notAvailable'))
                            snackBar("Sala indisponível.");
                        else {
                            if (columnID === '' || this.id.split('-')[1] === columnID) { //if it can set that cell to active or desactive
                                isMouseDown = true;
                                columnID = this.id.split('-')[1];
                                $(this).toggleClass("active");
                                isActive = $(this).hasClass("active");
                                pushToSideBar("matrix_day_body");
                                return false; // prevent text selection
                            } else { //if other room was clicked
                                snackBar("Uma reserva deverá conter apenas uma Sala.");
                            }
                        }
                    } else { //if a wrong cell was clicked
                        snackBar("Uma reserva deverá conter um conjunto de horas consecutivas.");
                    }
                }
            } else { //first time writting
                if (this.classList.contains('notAvailable'))
                    snackBar("Sala indisponível.");
                else {
                    if (columnID === '' || this.id.split('-')[1] === columnID) {
                        isMouseDown = true;
                        columnID = this.id.split('-')[1];
                        $(this).toggleClass("active");
                        isActive = $(this).hasClass("active");
                        pushToSideBar("matrix_day_body");
                        return false; // prevent text selection
                    } else if (this.id.split('-')[1] !== columnID) {
                        snackBar("Uma reserva deverá conter apenas uma Sala.");
                    }
                }
            }
        })
        .mouseover(function() {
            if (isMouseDown && this.classList.contains('notAvailable'))
                snackBar("Sala indisponível.");
            else {
                if (isMouseDown && this.id.split('-')[1] === columnID) {
                    $(this).toggleClass("active", isActive);
                    var rowID = parseInt(this.id.split('-')[2]),
                        elementToCheck,
                        elementToSet;
                    if (isEven(rowID)) {
                        if (rowID >= 2) {
                            elementToCheck = document.getElementById('td-' + columnID + '-' + (rowID - 2));
                            elementToSet = document.getElementById('td-' + columnID + '-' + (rowID - 1));
                            if (elementToCheck && elementToCheck.classList.contains('active')) {
                                elementToSet.classList.add('active');
                            }
                        }
                        var id = 'td-' + columnID + '-' + (rowID + 1);
                    } else {
                        elementToCheck = document.getElementById('td-' + columnID + '-' + (rowID - 2));
                        elementToSet = document.getElementById('td-' + columnID + '-' + (rowID - 3));
                        if (elementToCheck && elementToCheck.classList.contains('active')) {
                            elementToSet.classList.add('active');
                        }
                        var id = 'td-' + columnID + '-' + (rowID - 1);
                    }
                    if (this.classList.contains('active')) {
                        if (!document.getElementById(id).classList.contains('active'))
                            document.getElementById(id).classList.add('active');
                    } else {
                        if (isEven(rowID)) {
                            document.getElementById('td-' + columnID + '-' + (rowID - 1)).classList.remove('active');
                        } else {
                            document.getElementById('td-' + columnID + '-' + (rowID + 1)).classList.remove('active');
                        }
                        if (document.getElementById(id).classList.contains('active'))
                            document.getElementById(id).classList.remove('active');
                    }
                    pushToSideBar("matrix_day_body");
                }
            }
        });
    $(document)
        .mouseup(function() {
            isMouseDown = false;
            var activeElements = document.querySelectorAll('td.active');
            if (activeElements.length === 0)
                columnID = '';
        });
}


/**
 * This method binds mouse events for draggable selection in week Matrix
 */
function _bindDraggableForWeek() {
    var isMouseDown = false,
        isActive;
    $("#matrix td")
        .mousedown(function(e) {
            if (this.classList.contains('notAvailable'))
                snackBar("Sala indisponível.");
            else {
                isMouseDown = true;
                columnID = this.id.split('-')[1];
                $(this).toggleClass("active");
                isActive = $(this).hasClass("active");
                // return false; // prevent text selection
            }
        })
        .mouseover(function() {
            if (isMouseDown && this.classList.contains('notAvailable'))
                snackBar("Sala indisponível.");
            else {
                if (isMouseDown)
                    $(this).toggleClass("active", isActive);
            }
        });
    $(document)
        .mouseup(function() {
            isMouseDown = false;
        });
}


/**
 *  This method sets the Matrix from 13:00h to 14:00h for Lunch Time.
 */
function _setLunchTime() {
    var fields = document.querySelectorAll('td');
    var length = fields.length;
    for (var i = 0; i < length; i++) {
        var info = fields[i].id.split("-");
        if (info[2] === '10' || info[2] === '11') {
            fields[i].classList.add('lunch');
        }
    }
}


/**
 *  This method sets the Matrix weeknd day.
 */
function _setWeekendHighlight() {

    var fields = document.querySelectorAll('td');
    var length = fields.length;
    for (var i = 0; i < length; i++) {
        var info = fields[i].id.split("-");
        if (info[1] === '5' || info[1] === '6') {
            if (isEven(parseInt(info[2])))
                fields[i].classList.add('leftWeekend');
            else
                fields[i].classList.add('rightWeekend');
        }
    }
    var head = document.getElementById('matrix_week_head');
    var tr = head.children[1];
    var length = tr.children.length;
    var saturday = tr.children[length - 2];
    saturday.classList.add('weekend');
    var sunday = tr.children[length - 1];
    sunday.classList.add('weekend');
}

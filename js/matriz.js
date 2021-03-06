//Global vars
var columnID = '';

/**
 * getWeek - description
 *
 * @param  {type} id_semana description
 * @returns {type}           description
 */
function getWeek(id_semana) {
    // alterar para pedido de dados a db
    var datahora = divideDateAndTime("data_mod_calendar");
    var startDay = datahora[0];
    var endDay = datahora[1];
    var startHour = datahora[2];
    var endHour = datahora[3];
    var week = 0

    if(startDay >= "03/07/2017" && startDay < "10/07/2017") {
        week = 1;
    } else if(startDay >= "10/07/2017" && startDay < "14/07/2017") {
        week = 2;
    } else if(startDay >= "17/07/2017" && startDay < "21/07/2017") {
        week = 3;
    } else if(startDay < "24/07/2017") {
        week = 4;
    }

    return id_semana ? id_semana : week;
}


/**
 * changeMatrix - description
 *
 * @returns {type}  description
 */
function changeMatrix() {
    var btn = document.getElementById('btn_change_view');
    var matrizAtiva = document.getElementById("matrix");
    var matriz = document.getElementById("matrix");
    var idFilho = matriz.firstElementChild.id;
    var filho = idFilho.split("_");
    matrizAtiva.innerHTML = " ";
    var filters = applyFilters();
    if(filho[1] == "day") {
        addMatrix("week");
        addBtnRooms(filters);
        var idPrimeiroElemento = document.getElementById("btn_rooms").firstElementChild.id;
        defineActiveById(idPrimeiroElemento);
        createMatrixWeek(filters);
        btn.innerHTML = 'Vista de Dia';
    } else if(filho[1] == "week") {
        removeRoomBtn();
        addMatrix("day");
        createMatrixDay(filters);
        btn.innerHTML = 'Vista da Semana';
    } else
        snackBar("Escolha de matriz errada");
}


/**
 * addMatrix - description
 *
 * @param  {type} matrixType description
 * @returns {type}            description
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
 * refreshMatrix - description
 *
 * @param  {type} nextSemana description
 * @returns {type}            description
 */
function refreshMatrix(nextSemana) {
    var matrix = document.getElementById("matrix");
    var id_child = matrix.firstElementChild.id;
    var child = id_child.split("_");
    if(window.innerWidth <= 768 && isSideBarOpen) {
        toggleSideBar();
    }
    matrix.innerHTML = " ";
    addMatrix(child[1]);
    var filters = applyFilters();
    if(child[1] == "day")
        createMatrixDay(filters);
    else if(child[1] == "week") {
        var activeBtn = getActive("btn-rooms");
        refreshButtons(filters);
        defineActiveById(activeBtn);
        createMatrixWeek(filters, nextSemana);

    } else
        snackBar("Escolha de matriz errada");
}


/**
 * createMatrixWeek - description
 *
 * @param  {type} nextSemana description
 * @returns {type}            description
 */
function createMatrixWeek(filters, nextSemana) {
    ////////////////////////////////////////////
    //Alterar quando recebermos JSON
    var id_andar = getActive('list-group-item');
    var temp_id_sala = getActive('btn-rooms').split("-");
    var id_sala = "1" + temp_id_sala[1];
    var id_semana = getWeek(nextSemana);


    var scheduleWeek;
    switch(id_sala) {
        case "11":
            if(id_semana == "1")
                scheduleWeek = scheduleWeek_1_sala_11;
            else if(id_semana == "2")
                scheduleWeek = scheduleWeek_2_sala_11;
            else if(id_semana == "3")
                scheduleWeek = scheduleWeek_3_sala_11;
            else if(id_semana == "4")
                scheduleWeek = scheduleWeek_4_sala_11;
            break;
        case "12":
            if(id_semana == "1")
                scheduleWeek = scheduleWeek_1_sala_12;
            else if(id_semana == "2")
                scheduleWeek = scheduleWeek_2_sala_12;
            else if(id_semana == "3")
                scheduleWeek = scheduleWeek_3_sala_12;
            else if(id_semana == "4")
                scheduleWeek = scheduleWeek_4_sala_12;
            break;
        case "13":
            if(id_semana == "1")
                scheduleWeek = scheduleWeek_1_sala_13;
            else if(id_semana == "2")
                scheduleWeek = scheduleWeek_2_sala_13;
            else if(id_semana == "3")
                scheduleWeek = scheduleWeek_3_sala_13;
            else if(id_semana == "4")
                scheduleWeek = scheduleWeek_4_sala_13;
            break;
        case "14":
            if(id_semana == "1")
                scheduleWeek = scheduleWeek_1_sala_14;
            else if(id_semana == "2")
                scheduleWeek = scheduleWeek_2_sala_14;
            else if(id_semana == "3")
                scheduleWeek = scheduleWeek_3_sala_14;
            else if(id_semana == "4")
                scheduleWeek = scheduleWeek_4_sala_14;
            break;
        default:
            snackBar("não tenho mockdata dessa sala para matriz semana");
    }
    //Alterar quando recebermos JSON
    ////////////////////////////////////////////

    //Matrix Head
    // titulo
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
    // Adiciona Setas
    spanL.className = ("glyph glyphicon glyphicon-arrow-left pull-left");
    spanL.setAttribute("style", "cursor:pointer;");
    spanL.addEventListener("click", function() {
        refreshMatrix(id_semana - 1);
    });
    thC.appendChild(spanL);
    spanR.className = ("glyph glyphicon glyphicon-arrow-right pull-right");
    spanR.setAttribute("style", "cursor:pointer;");
    spanR.addEventListener("click", function() {
        refreshMatrix(id_semana + 1);
    });
    thC.appendChild(spanR);
    trH.appendChild(thC);

    // Horas
    var tr = document.createElement('tr');
    mh.appendChild(tr);
    var th1 = document.createElement('th');
    tr.appendChild(th1);
    for(var i = 0; i < scheduleWeek.dates.length; i++) {
        var th2 = document.createElement('th');
        th2.innerHTML = scheduleWeek.dates[i];
        th2.setAttribute('colspan', '2');
        tr.appendChild(th2);
    }

    //Matrix Body
    var mb = document.getElementById("matrix_week_body");
    for(var i = 0; i < scheduleWeek.hour.length; i++) {
        var tr = document.createElement('tr');
        if(isEven(i)) mb.appendChild(tr);
        var th = document.createElement('th');
        th.setAttribute("scope", "row");
        tr.appendChild(th);
        th.innerHTML = scheduleWeek.hour[i];
        for(var j = 0; j < scheduleWeek.dates.length; j++) {
            var td = document.createElement('td');
            td.id = 'td-' + j + '-' + i;
            var disponibilidade = scheduleWeek[j][i];
            if(disponibilidade === 'Disponível') {
                td.classList.add("available");
                td.addEventListener("click", selecionarGrupoMatrizWeek);
                //td.innerHTML =   td.id;
            } else if(disponibilidade === 'Indisponível') {
                td.classList.add("notAvailable");
                //    td.innerHTML = scheduleWeek[j][i];
            } else {
                td.classList.add("undefined");
                //    td.innerHTML = scheduleWeek[j][i];
            }
            //td.innerHTML = scheduleWeek[j][i];

            td.classList.add("mleft");
            tr.appendChild(td);



            var td2 = document.createElement('td');
            td2.id = 'td-' + j + '-' + (i + 1);
            var disponibilidade = scheduleWeek[j][i + 1];
            if(disponibilidade === 'Disponível') {
                td2.classList.add("available");
                td2.addEventListener("click", selecionarGrupoMatrizWeek);
                //td2.innerHTML =   td2.id;
            } else if(disponibilidade === 'Indisponível') {
                td2.classList.add("notAvailable");
                //    td.innerHTML = scheduleWeek[j][i];
            } else {
                td2.classList.add("undefined");
                //    td.innerHTML = scheduleWeek[j][i];
            }
            //td.innerHTML = scheduleWeek[j][i];
            td2.classList.add("mright");
            tr.appendChild(td2);
        }
    }
    _setWeekendHighlight();
    _setLunchTime();
    _bindDraggableForWeek();
}


/**
 * removeRoomBtn - description
 *
 * @returns {type}  description
 */
function removeRoomBtn() {
    var divBotoes = document.getElementById("btn_rooms");
    divBotoes.innerHTML = "";
}

/**
 * refreshButtons - description
 *
 * @returns {type}  description
 */
function refreshButtons(filters) {
    var divButton = document.getElementById("btn_rooms");
    var id_child = divButton.firstElementChild.id;
    var child = id_child.split("_");
    divButton.innerHTML = " ";
    addBtnRooms(filters);
}

// Adiciona Botões Salas
/**
 * addBtnRooms - description
 *
 * @returns {type}  description
 */
function addBtnRooms(filters) {
    ////////////////////////////////////////////
    //Alterar quando recebermos JSON
    var idAndar = getActive('list-group-item');
    var rooms;
    switch(idAndar) {
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
    for(var i = 1; i <= rooms.salas.length; i++) {
        var btn = document.createElement('button');
        btn.innerHTML = rooms.salas[i - 1];
        btn.setAttribute("type", "button");
        btn.id = "btn_rooms-" + i;
        btn.classList.add('btn-rooms');
        btn.classList.add('btn');
        btn.classList.add('btn-lg');
        var btn_warning = true;
        for(var j = 0; j < filters.rooms.length; j++) {
            if(rooms.salas[i - 1] === filters.rooms[j]) btn_warning = false;
        }
        if(btn_warning)
            btn.classList.add('btn-warning');
        else
            btn.classList.add('btn-default');
        btn.addEventListener("click", defineActiveEvent);
        element.appendChild(btn);
    }
}

//matrix Day
//
/**
 * createMatrixDay - description
 *
 * @returns {type}  description
 */
function createMatrixDay(filters) {
    ////////////////////////////////////////////
    //Alterar quando recebermos JSON
    var idSelectedFloor = getActive('list-group-item');
    var tempSelectedFloor = idSelectedFloor.split("-");
    var selectedFloor = parseInt(tempSelectedFloor[1]);
    //Alterar quando recebermos JSON
    ////////////////////////////////////////////

    //Matrix Head
    var mh = document.getElementById("matrix_day_head");
    var tr = document.createElement('tr');
    var trH = document.createElement('tr');
    var thC = document.createElement('th');
    var colspan = scheduleDay[selectedFloor].length * 2 + 1;

    mh.appendChild(trH);
    trH.appendChild(thC);

    thC.setAttribute("style", "text-align:center;height: 43px;");
    thC.setAttribute("colspan", colspan);
    thC.innerHTML = "Vista por Dia - " + filters.date[0] + ' - ' + document.getElementById(filters.floor).innerText;

    mh.appendChild(tr);
    var th1 = document.createElement('th');
    // th1.innerHTML = '[' + floors.Andares[selectedFloor] + ']';
    tr.appendChild(th1);
    for(var i = 0; i < scheduleDay[selectedFloor].length; i++) {
        var th2 = document.createElement('th');
        th2.innerHTML = scheduleDay[selectedFloor][i].NomeSala;
        th2.setAttribute('colspan', '2');
        tr.appendChild(th2);
    }

    //Matrix Body
    var mb = document.getElementById("matrix_day_body");
    for(var i = 0; i < scheduleDay[selectedFloor][0].Horas.length; i++) {
        var tr = document.createElement('tr');
        if(isEven(i)) mb.appendChild(tr);
        var th = document.createElement('th');
        th.setAttribute("scope", "row");
        tr.appendChild(th);
        th.innerHTML = scheduleDay[selectedFloor][0].Horas[i];
        for(var j = 0; j < scheduleDay[selectedFloor].length; j++) {
            var td = document.createElement('td');
            var disponibilidade = scheduleDay[selectedFloor][j].Disponibilidade[i];
            if(disponibilidade == 'Disponível') {
                td.classList.add("available");
                td.addEventListener("click", selecionarGrupoMatrizDay);
            } else if(disponibilidade == 'Indisponível')
                td.classList.add("notAvailable");
            else
                td.classList.add("undefined");

            var isNearMiss = true;
            for(var k = 0; k < filters.rooms.length; k++)
                if(filters.rooms[k] === scheduleDay[selectedFloor][j].NomeSala)
                    isNearMiss = false;
            if(isNearMiss)
                td.className = 'nearMiss';
            td.classList.add("mleft");
            td.id = 'td-' + j + '-' + i;

            var td2 = document.createElement('td');
            var disponibilidade = scheduleDay[selectedFloor][j].Disponibilidade[i + 1];
            if(disponibilidade == 'Disponível') {
                td2.classList.add("available");
                td2.addEventListener("click", selecionarGrupoMatrizDay);
            } else if(disponibilidade == 'Indisponível')
                td2.classList.add("notAvailable");
            else
                td2.classList.add("undefined");

            var isNearMiss = true;
            for(var k = 0; k < filters.rooms.length; k++)
                if(filters.rooms[k] === scheduleDay[selectedFloor][j].NomeSala)
                    isNearMiss = false;
            if(isNearMiss)
                td2.className = 'nearMiss';
            td2.id = 'td-' + j + '-' + (i + 1);
            td2.classList.add("mright");



            tr.appendChild(td);
            tr.appendChild(td2);
        }
    }
    _populateSelectionForDay(filters.selection);
    _bindDraggableForDay();
    _setLunchTime();
}


/**
 * _populateSelection - description
 *
 * @param  {type} selection description
 * @returns {type}           description
 */
function _populateSelectionForDay() {
    var fields = document.querySelectorAll('td');

    var datetime = divideDateAndTime();

    var startTime = datetime[2];
    var startTimeSplit = datetime[2].split(':');
    var endTime = datetime[3];
    var startTimeSplit = datetime[2].split(':');

    var startId = (parseInt(startTimeSplit[0]) - 8) * 2;
    var endId = (parseInt(startTimeSplit[0]) - 8) * 2;

    for(var i = startId; i < endId; i++) {
        if(fields[i].classList.contains('available'))
            fields[i].classList.add('active');
    }
}




/**
 * _bindDraggableForDay - This method binds mouse events for draggable selection in Day Matrix
 *
 */
function _bindDraggableForDay() {
    var isMouseDown = false,
        isActive;
    $("#matrix td")
        .mousedown(function(e) {
            var all = document.querySelectorAll('td.active'),
                first = '',
                last = '',
                rowID;
            for(var i = 0; i < all.length; i++) {
                if(all[i].id === '')
                    all[i].parentNode.removeChild(all[i]);
            }
            var info = this.id.split('-');
            all = document.querySelectorAll('td.active');
            if(all.length > 0) {
                first = parseInt(all[0].id.split('-')[2]);
                last = parseInt(all[all.length - 1].id.split('-')[2]);
                rowID = parseInt(this.id.split('-')[2]);
                if((rowID !== (first - 1) && rowID !== (last + 1)) && (rowID !== first && rowID !== last)) {
                    snackBar("Uma reserva deverá conter um conjunto de horas consecutivas.");
                } else {
                    if(columnID === '' || this.id.split('-')[1] === columnID) {
                        isMouseDown = true;
                        columnID = this.id.split('-')[1];
                        $(this).toggleClass("active");
                        isActive = $(this).hasClass("active");
                        return false; // prevent text selection
                    } else if(this.id.split('-')[1] !== columnID) {
                        snackBar("Uma reserva deverá conter apenas uma Sala.");
                    }
                }
            } else {
                rowID = parseInt(this.id.split('-')[2]);
                if (columnID === '' || this.id.split('-')[1] === columnID) {
                    isMouseDown = true;
                    columnID = this.id.split('-')[1];
                    $(this).toggleClass("active");
                    isActive = $(this).hasClass("active");
                    return false; // prevent text selection
                } else if(this.id.split('-')[1] !== columnID) {
                    snackBar("Uma reserva deverá conter apenas uma Sala.");
                }
            }
        })
        .mouseover(function() {
            if (isMouseDown && this.id.split('-')[1] === columnID) {
                var rowID = parseInt(this.id.split('-')[2]);
                // if (isEven(rowID))
                //     var id = 'td-' + columnID + '-' + (rowID + 1);
                // else
                //     var id = 'td-' + columnID + '-' + (rowID - 1)
                // if (!document.getElementById(id).classList.contains('active'))
                //     document.getElementById(id).classList.add('active');
                $(this).toggleClass("active", isActive);
            }

        });
    $(document)
        .mouseup(function() {
            isMouseDown = false;
            var activeElements = document.querySelectorAll('td.active');
            if(activeElements.length === 0)
                columnID = '';
            pushToSideBar("matrix_day_body");
        });

}


/**
 * _bindDraggableForDay - This method binds mouse events for draggable selection in Day Matrix
 *
 */
function _bindDraggableForWeek() {
    var isMouseDown = false,
        isActive;
    $("#matrix td")
        .mousedown(function(e) {
            isMouseDown = true;
            columnID = this.id.split('-')[1];
            $(this).toggleClass("active");
            isActive = $(this).hasClass("active");
            // return false; // prevent text selection
        })
        .mouseover(function() {
            if(isMouseDown)
                $(this).toggleClass("active", isActive);
        });
    $(document)
        .mouseup(function() {
            isMouseDown = false;
        });
}

/**
 * _setLunchTime - This method sets the Matrix from 13:00h to 14:00h for Lunch Time.
 *
 */
function _setLunchTime() {
    var fields = document.querySelectorAll('td');
    var length = fields.length;
    for(var i = 0; i < length; i++) {
        var info = fields[i].id.split("-");
        if(info[2] === '10' || info[2] === '11') {
            fields[i].classList.add('lunch');
        }
    }
}

function _setWeekendHighlight() {
    var fields = document.querySelectorAll('td');
    var length = fields.length;
    for(var i = 0; i < length; i++) {
        var info = fields[i].id.split("-");
        if(info[1] === '5' || info[1] === '6') {
            if(isEven(parseInt(info[2])))
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

function selecionarGrupoMatrizDay(e) {
    try {
        // nearElement(e);
        // defineMultiActiveEvent(e);
    } catch(err) {
        switch(err) {
            case 1:
                snackBar("Uma reserva deverá conter apenas uma Sala.");
                break;
            case 2:
                snackBar("Uma reserva deverá conter um conjunto de horas continuas");
                break;
            case 4:
                snackBar("Uma reserva deverá conter um conjunto de horas continuas");
                break;
            default:
                snackBar("Ups escolha errada na vista de dia");
        }
    }
}

/**
 * selecionarGrupoMatrizWeek - description
 *
 * @param  {type} e description
 * @returns {type}   description
 */
function selecionarGrupoMatrizWeek(e) {
    var defineMulti = false;
    try {
        // nearElement(e);
        // defineMultiActiveEvent(e);
    } catch(err) {
        switch(err) {
            case 1:
                defineMulti = modalAcept(e, "Pretende reservar em outro dia?");
                break;
            case 2:
                defineMulti = modalAcept(e, "Pretende reservar em outra hora?");
                break;
            case 3:
                defineMulti = modalAcept(e, "Pretende reservar em varios dias e em varias horas?");
                break;
            case 4:
                defineMulti = true;
                break;
            default:
                snackBar("Ups escolha errada na vista de Semana");
        }
    } finally {
        if(defineMulti)
            defineMultiActiveEvent(e);
    }
}

var id_last_salected;

/**
 * saveModalConfirm - description
 *
 * @param  {type} callback description
 * @returns {type}          description
 */
function saveModalConfirm(callback) {
    callback(id_last_salected);
}


/**
 * modalAcept - description
 *
 * @param  {type} e   description
 * @param  {type} msg description
 * @returns {type}     description
 */
function modalAcept(e, msg) {
    var modal_body = document.getElementById("modal_confirm_body");
    if(modal_body.textContent.length <= 20) {
        modal_body.innerHTML = msg;
        modal_body.setAttribute('style', 'text-align: center;');
        id_last_salected = e.target.id;
        $('#modal_confirm').modal('show');
        return false;
    } else
        return true;
}

/**
 * nearElement - description
 *
 * @param  {type} e description
 * @returns {type}   description
 */
function nearElement(e) {
    try {
        var newElemet = e.target;
        var newElemetSplit = newElemet.id.split('-');
        var activeElements = getMultiActive('available');

        if(newElemet.classList.contains('available') && activeElements.length) {
            var neighborHour = false;
            var neighborDay = true;
            var activeFirstElement = activeElements[0].split('-');
            var activeLastElement = activeElements[activeElements.length - 1].split('-');
            if(parseInt(newElemetSplit[2]) > parseInt(activeFirstElement[2]) && parseInt(newElemetSplit[2]) < parseInt(activeLastElement[2]) && newElemet.classList.contains('active'))
                throw 4;
            for(var i = 0; i < activeElements.length; i++) {
                var activeElementsSplit = activeElements[i].split('-');
                if(parseInt(activeElementsSplit[1]) != parseInt(newElemetSplit[1]))
                    neighborDay = false;
                if(parseInt(activeElementsSplit[2]) === parseInt(newElemetSplit[2]) + 1 || parseInt(activeElementsSplit[2]) === parseInt(newElemetSplit[2]) - 1)
                    neighborHour = true;
            }
            if(!neighborHour && !neighborDay && !newElemet.classList.contains('active'))
                throw 3;
            if(!neighborHour && !newElemet.classList.contains('active'))
                throw 2;
            if(!neighborDay && !newElemet.classList.contains('active'))
                throw 1;
        }
    } catch(e) {
        throw e;
    }
}

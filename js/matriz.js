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

    if (startDay >= "03/07/2017" && startDay < "10/07/2017") {
        week = 1;
    } else if (startDay >= "10/07/2017" && startDay < "14/07/2017") {
        week = 2;
    } else if (startDay >= "17/07/2017" && startDay < "21/07/2017") {
        week = 3;
    } else if (startDay < "24/07/2017") {
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
        createMatrixWeek();
    } else if (filho[1] == "week") {
        removeRoomBtn();
        addMatrix("day");
        createMatrixDay();
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
    matrix.innerHTML = " ";
    addMatrix(child[1]);
    var filters = applyFilters();
    if (child[1] == "day")
        createMatrixDay(filters);
    else if (child[1] == "week") {
        var activeBtn = getActive("btn-rooms");
        refreshButtons(filters);
        defineActiveById(activeBtn);
        createMatrixWeek(nextSemana);

    } else
        snackBar("Escolha de matriz errada");
}


/**
 * createMatrixWeek - description
 *
 * @param  {type} nextSemana description
 * @returns {type}            description
 */
function createMatrixWeek(nextSemana) {
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

    //Matrix Head
    // titulo
    var mh = document.getElementById("matrix_week_head");
    var trH = document.createElement('tr');
    var spanL = document.createElement('span');
    var thC = document.createElement('th');
    var spanR = document.createElement('span');
    var colspan = scheduleWeek.dates.length + 1;

    mh.appendChild(trH);

    thC.setAttribute("style", "text-align:center;");
    thC.setAttribute("colspan", colspan);
    thC.innerHTML = "Vista da Semana";
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
    for (var i = 0; i < scheduleWeek.dates.length; i++) {
        var th2 = document.createElement('th');
        th2.innerHTML = scheduleWeek.dates[i];
        tr.appendChild(th2);
    }

    //Matrix Body
    var mb = document.getElementById("matrix_week_body");
    for (var i = 0; i < scheduleWeek[0].length; i++) {
        var tr = document.createElement('tr');
        mb.appendChild(tr);
        var th = document.createElement('th');
        th.setAttribute("scope", "row");
        tr.appendChild(th);
        th.innerHTML = i + 8 + " H";
        for (var j = 0; j < scheduleWeek.dates.length; j++) {
            var td = document.createElement('td');
            var disponibilidade = scheduleWeek[j][i];
            if (disponibilidade == 'Disponível')
                td.classList.add("disponivel");
            else if (disponibilidade == 'Indisponível')
                td.classList.add("indisponivel");
            else
                td.classList.add("indefinido");

            td.innerHTML = scheduleWeek[j][i];
            td.id = 'td-' + j + '-' + i;
            td.addEventListener("click", selecionarGrupoMatrizWeek);
            tr.appendChild(td);
        }
    }
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
    mh.appendChild(tr);
    var th1 = document.createElement('th');
    th1.innerHTML = '[' + floors.Andares[selectedFloor] + ']';
    tr.appendChild(th1);
    for (var i = 0; i < shedualDay[selectedFloor].length; i++) {
        var th2 = document.createElement('th');
        th2.innerHTML = shedualDay[selectedFloor][i].NomeSala;
        tr.appendChild(th2);
    }

    //Matrix Body
    var mb = document.getElementById("matrix_day_body");
    for (var i = 0; i < shedualDay[selectedFloor][0].Disponibilidade.length; i++) {
        var tr = document.createElement('tr');
        mb.appendChild(tr);
        var th = document.createElement('th');
        th.setAttribute("scope", "row");
        tr.appendChild(th);
        th.innerHTML = i + 8 + " H";
        for (var j = 0; j < shedualDay[selectedFloor].length; j++) {
            var td = document.createElement('td');


            var disponibilidade = shedualDay[selectedFloor][j].Disponibilidade[i];
            if (disponibilidade == 'Disponivel')
                td.classList.add("avaiable");
            else if (disponibilidade == 'Indisponivel')
                td.classList.add("notAvaiable");
            else
                td.classList.add("indefinido");

            var isNearMiss = true;
            for(var k=0; k< filters.rooms.length; k++)
                if(filters.rooms[k] === shedualDay[selectedFloor][j].NomeSala)
                    isNearMiss = false;

            if (isNearMiss)
                td.className = 'nearMiss';

            td.innerHTML = disponibilidade;
            td.id = 'td-' + j + '-' + i;
            td.addEventListener("click", selecionarGrupoMatrizDay);
            tr.appendChild(td);
        }
    }
}

function selecionarGrupoMatrizDay(e) {
    try {
        nearElement(e);
        defineMultiActiveEvent(e);
    } catch (err) {
        switch (err) {
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
    try {
        nearElement(e);
        defineMultiActiveEvent(e);
    } catch (err) {
        switch (err) {
            case 1:
                modalAcept(e, "Pretende reservar em outro dia?");
                break;
            case 2:
                modalAcept(e, "Pretende reservar em outra hora?");
                break;
            case 3:
                modalAcept(e, "Pretende reservar em varios dias e em varias horas?");
                break;
            case 4:
                defineMultiActiveEvent(e);
                break;
            default:
                snackBar("Ups escolha errada na vista de Semana");
        }
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
    modal_body.innerHTML = msg;
    modal_body.setAttribute('style', 'text-align: center;');
    id_last_salected = e.target.id;
    $('#modal_confirm').modal('show');
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
        var activeElements = getMultiActive('disponivel');

        if (newElemet.classList.contains('disponivel') && activeElements.length) {
            var neighborHour = false;
            var neighborDay = true;
            var activeFirstElement = activeElements[0].split('-');
            var activeLastElement = activeElements[activeElements.length - 1].split('-');
            if (parseInt(newElemetSplit[2]) > parseInt(activeFirstElement[2]) && parseInt(newElemetSplit[2]) < parseInt(activeLastElement[2]) && newElemet.classList.contains('active'))
                throw 4;
            for (var i = 0; i < activeElements.length; i++) {
                var activeElementsSplit = activeElements[i].split('-');
                if (parseInt(activeElementsSplit[1]) != parseInt(newElemetSplit[1]))
                    neighborDay = false;
                if (parseInt(activeElementsSplit[2]) === parseInt(newElemetSplit[2]) + 1 || parseInt(activeElementsSplit[2]) === parseInt(newElemetSplit[2]) - 1)
                    neighborHour = true;
            }
            if (!neighborHour && !neighborDay)
                throw 3;
            if (!neighborHour)
                throw 2;
            if (!neighborDay)
                throw 1;
        }
    } catch (e) {
        throw e;
    }
}

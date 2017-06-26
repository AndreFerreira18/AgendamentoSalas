function getSemana(id_semana) {
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

function alteraMatrix() {
  var matrizAtiva = document.getElementById("matrix");
  var matriz = document.getElementById("matrix");
  var idFilho = matriz.firstElementChild.id;
  var filho = idFilho.split("_");
  matrizAtiva.innerHTML = " ";
  if (filho[1] == "day") {
    addMatrix("week");
    addBtnRooms();
    var idPrimeiroElemento = document.getElementById("btn_rooms").firstElementChild.id;
    defineActiveById(idPrimeiroElemento);
    createMatrixWeek();
  } else if (filho[1] == "week") {
    removeBtnSalas();
    addMatrix("day");
    createMatrixDay();
  } else
    snackBar("Escolha de matriz errada");
}

//matrix
function addMatrix(matrixType) {
  var matrix = document.getElementById("matrix");
  var mh = document.createElement('thead');
  mh.id = "matrix_" + matrixType + "_head";
  var mb = document.createElement('tbody');
  mb.id = "matrix_" + matrixType + "_body";
  matrix.appendChild(mh);
  matrix.appendChild(mb);
}

function refreshMatrix(nextSemana) {
  var matrix = document.getElementById("matrix");
  var id_child = matrix.firstElementChild.id;
  var child = id_child.split("_");
  matrix.innerHTML = " ";
  addMatrix(child[1]);
  selected_hours = [];
  var rooms = applyFilters();
  if (child[1] == "day")
    createMatrixDay();
  else if (child[1] == "week") {
    var activeBtn = getActive("btn-rooms");
    refreshButtons();
    defineActiveById(activeBtn);
    createMatrixWeek(nextSemana);

  } else
    snackBar("Escolha de matriz errada");
}

function createMatrixWeek(nextSemana) {
  ////////////////////////////////////////////
  //Alterar quando recebermos JSON
  var id_andar = getActive('list-group-item');
  var temp_id_sala = getActive('btn-rooms').split("-");
  var id_sala = "1" + temp_id_sala[1];
  var id_semana = getSemana(nextSemana);


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
      td.addEventListener("click", selecionarGrupoMatrizSemana);
      tr.appendChild(td);
    }
  }
}



function removeBtnSalas() {
  var divBotoes = document.getElementById("btn_rooms");
  divBotoes.innerHTML = "";
}

function refreshButtons() {
  var divButton = document.getElementById("btn_rooms");
  var id_child = divButton.firstElementChild.id;
  var child = id_child.split("_");
  divButton.innerHTML = " ";
  addBtnRooms();
}

// Adiciona Botões Salas
function addBtnRooms() {
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
    btn.classList.add('btn-default');
    btn.addEventListener("click", defineActiveEvent);
    element.appendChild(btn);
  }
}

selected_hours = [];
//matrix Day
function createMatrixDay() {
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
        td.classList.add("disponivel");
      else if (disponibilidade == 'Indisponivel')
        td.classList.add("indisponivel");
      else
        td.classList.add("indefinido");

      td.innerHTML = disponibilidade;
      td.id = 'td-' + j + '-' + i;
      td.addEventListener("click", selecionarGrupoMatriz);
      tr.appendChild(td);
    }
  }
}


function selecionarGrupoMatrizSemana(e) {
  var newElemet = e.target;
  var newElemetSplit = newElemet.id.split('-');
  if (newElemet.classList.contains('disponivel')) {
    if (newElemet.classList.contains('active')) {
      // desatuva
      for (var i = 0; i < selected_hours.length; i++) {
        var otherElement = selected_hours[i];
        var otherElementSplit = otherElement.split('-');
        if (parseInt(otherElementSplit[2]) >= parseInt(newElemetSplit[2])) {
          selected_hours.splice(i, 1);
          defineMultiActiveEvent(e);
        }
      }
    } else {
      //ativa

      selected_hours.push(e.target.id);
      defineMultiActiveEvent(e);
    }
  }
}

function selecionarGrupoMatriz(e) {
  var newElemet = e.target;
  var newElemetSplit = newElemet.id.split('-');
  if (newElemet.classList.contains('disponivel')) {
    if (newElemet.classList.contains('active')) {
      for (var i = 0; i < selected_hours.length; i++) {
        var otherElement = selected_hours[i];
        var otherElementSplit = otherElement.split('-');

        if (parseInt(otherElementSplit[2]) === parseInt(newElemetSplit[2])) {
          selected_hours.splice(i, 1);
          defineActiveById(otherElement);
          i--;
        }
      }
    } else {
      if (selected_hours.length == 0) {
        defineMultiActiveEvent(e);
        selected_hours.push(e.target.id);
      } else {
        var otherElement = selected_hours[0];
        var otherElementSplit = otherElement.split('-');
        if (newElemetSplit[1] === otherElementSplit[1]) {
          for (var i = 0; i < selected_hours.length; i++) {
            otherElement = selected_hours[i];
            otherElementSplit = otherElement.split('-');
            var inferior = parseInt(otherElementSplit[2]) + 1;
            var superior = parseInt(otherElementSplit[2]) - 1;
            var atual = parseInt(newElemetSplit[2]);
            if (inferior === atual || superior === atual) {
              defineMultiActiveEvent(e);
              selected_hours.push(e.target.id);
              break;
            }
            if (i === selected_hours.length - 1) snackBar('Por favor seleciona horas consecutivas');
          }
        } else {
          snackBar('Por favor seleciona na mesma sala');
        }
      }

    }
  }
}

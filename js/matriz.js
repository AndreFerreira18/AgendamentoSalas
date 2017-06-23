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

function refreshMatrix() {
  var matrix = document.getElementById("matrix");
  var id_child = matrix.firstElementChild.id;
  var child = id_child.split("_");
  matrix.innerHTML = " ";
  addMatrix(child[1]);
  if (child[1] == "day")
    createMatrixDay();
  else if (child[1] == "week")
    createMatrixWeek();
  else
    console.log("Escolha de matriz errada");
}

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
      td.innerHTML = shedualDay[selectedFloor][j].Disponibilidade[i];
      tr.appendChild(td);
    }
  }
}

function createMatrixWeek() {
  ////////////////////////////////////////////
  //Alterar quando recebermos JSON
  var id_andar = getActive('list-group-item');
  var temp_id_sala = getActive('rooms').split("-");
  var id_sala = "1" + temp_id_sala[1];
  var id_week = "1";
  var scheduleWeek;
  switch (id_sala) {
    case "11":
      if (id_week == "1")
        scheduleWeek = scheduleWeek_1_sala_11;
      else if (id_week == "2")
        scheduleWeek = scheduleWeek_2_sala_11;
      else if (id_week == "3")
        scheduleWeek = scheduleWeek_3_sala_11;
      break;
    case "12":
      if (id_week == "1")
        scheduleWeek = scheduleWeek_1_sala_12;
      else if (id_week == "2")
        scheduleWeek = scheduleWeek_2_sala_12;
      else if (id_week == "3")
        scheduleWeek = scheduleWeek_3_sala_12;
      break;
    case "13":
      if (id_week == "1")
        scheduleWeek = scheduleWeek_1_sala_13;
      else if (id_week == "2")
        scheduleWeek = scheduleWeek_2_sala_13;
      else if (id_week == "3")
        scheduleWeek = scheduleWeek_3_sala_13;
      break;
    case "14":
      if (id_week == "1")
        scheduleWeek = scheduleWeek_1_sala_14;
      else if (id_week == "2")
        scheduleWeek = scheduleWeek_2_sala_14;
      else if (id_week == "3")
        scheduleWeek = scheduleWeek_3_sala_14;
      break;
    default:
      console.log("não tenho mockdata dessa sala para matriz semana");
  }
  //Alterar quando recebermos JSON
  ////////////////////////////////////////////

  //Matrix Head
  var mh = document.getElementById("matrix_week_head");
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
  var mb = document.getElementById("matrix_week_head");
  for (var i = 0; i < scheduleWeek[0].length; i++) {
    var tr = document.createElement('tr');
    mb.appendChild(tr);
    var th = document.createElement('th');
    th.setAttribute("scope", "row");
    tr.appendChild(th);
    th.innerHTML = i + 8 + " H";
    for (var j = 0; j < scheduleWeek.dates.length; j++) {
      var td = document.createElement('td');
      td.innerHTML = scheduleWeek[j][i];
      tr.appendChild(td);
    }
  }
}

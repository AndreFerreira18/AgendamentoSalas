// Show Modal
$(window).ready(
  function() {
    $('#modal').modal('show');
    criarrecursos();
  }
);

//Date picker
$('input[name="daterange"]').daterangepicker({
  "timePicker": true,
  "startDate": "06/09/2017",
  "endDate": "06/15/2017"
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

$(document).ready(function() {
  $('.dropdown').on('show.bs.dropdown', function(e) {
    $(this).find('.dropdown-menu').first().stop(true, true).slideDown(300);
  });
  $('.dropdown').on('hide.bs.dropdown', function(e) {
    $(this).find('.dropdown-menu').first().stop(true, true).slideUp(300);
  });
  $("#menu-toggle").click(function(e) {
    e.preventDefault();
    var elem = document.getElementById("sidebar-wrapper");
    left = window.getComputedStyle(elem, null).getPropertyValue("left");
    if (left == "300px") {
      document.getElementsByClassName("sidebar-toggle")[0].style.left = "-300px";
    } else if (left == "-300px") {
      document.getElementsByClassName("sidebar-toggle")[0].style.left = "300px";
    }
  });
});


function defineActiveBtnSalas(e) {
  // remove the old active
  var elements = document.getElementsByClassName(e.target.classList[2]);
  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.remove('active');
  }
  //add the active to the element
  var element = document.getElementById(e.target.id);
  element.classList.add('active');
}

function defineActiveEvent(e) {
  // remove the old active
  var elements = document.getElementsByClassName(e.target.classList[0]);
  for (var i = 0; i < elements.length; i++) {
    if (elements[i].classList.contains('active'))
      elements[i].classList.remove('active');
  }
  //add the active to the element
  var element = document.getElementById(e.target.id);
  element.classList.add('active');
}

function defineActiveById(activeId) {
  //add the active to the element
  var element = document.getElementById(activeId);
  element.classList.add('active');
}

function getActive(activeClass) {
  var id;
  var elements = document.getElementsByClassName(activeClass);
  for (var i = 0; i < elements.length; i++) {
    if (elements[i].classList.contains('active'))
      id = elements[i].id;
  }
  return id
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
  var id_sala = "1"+ temp_id_sala[1];
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
    tr.appendChild(th);
    th.innerHTML = i + 8 + " H";
    for (var j = 0; j < scheduleWeek.dates.length; j++) {
      var td = document.createElement('td');
      td.innerHTML = scheduleWeek[j][i];
      tr.appendChild(td);
    }
  }

}

// adds
function addBtnRooms() {

var element = document.getElementById("btn_rooms");
for (var i = 1; i <= rooms_1.salas.length; i++) {
  var btn = document.createElement('button');
  btn.innerHTML = rooms_1.salas[i-1];
  btn.setAttribute("type","button");
  btn.id = "btn_rooms-"+i;
  btn.classList.add('btn');
  btn.classList.add('btn-default');
  btn.classList.add('rooms');
  btn.addEventListener("click", defineActiveBtnSalas);
  element.appendChild(btn);
}
}

//saves data to the Side Bar
function saveChanges() {
  clone();
  defineActiveById("piso-" + document.getElementById("data_mod_piso_pref").value);
  addBtnRooms();
  defineActiveById('btn_rooms-1');
  addMatrix('week');
  refreshMatrix();
}

// Remove element by Id
function removeElement(elementId) {
  if (document.getElementById(elementId)) {
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
  }
}

// Criar Recursos
function criarrecursos() {
  var recursos = initialData.Recursos;
  var label_recursos = initialData.Recursos;
  document.getElementById("store_btn_recursos").innerHTML = " ";
  var i;
  for (i = 0; i < recursos.length; i++) {
    var button = document.createElement("button");
    var label = document.createElement("label");
    var iDiv = document.createElement('div');
    var element = document.getElementById("store_btn_recursos");

    button.type = 'button';
    button.className = "btn btn-default recurso";
    button.innerHTML = recursos[i];
    button.id = 'btn' + (i);
    button.onclick = function() {
      this.classList.toggle("active");
    }
    label.type = 'label';
    label.className = "label-recurso";
    label.innerHTML = label_recursos[i];

    iDiv.id = 'recurso' + i;
    iDiv.className = 'divBotoes';
    element.insertBefore(iDiv, element.firstChild);

    element = document.getElementById(iDiv.id);
    element.insertBefore(label, element.firstChild);
    element.insertBefore(button, element.firstChild);
  }
}


function criarLabel() {
  var label_recursos = ["Flipchart", "Projetor", "Microfone"];
  document.getElementById("adicionaLabel").innerHTML = " ";
  for (var j = 0; j < label_recursos.length; j++) {
    var label = document.createElement("label");
    label.type = 'label';
    label.className = "label-recurso";
    label.innerHTML = label_recursos[j];
    var elementLabel = document.getElementById("adicionaLabel");
    elementLabel.insertBefore(label, elementLabel.firstChild);
  }
}

function clone() {
  var elements = document.getElementById("form_modal").firstElementChild;
  var cln = elements.cloneNode(true);
  document.getElementById("form_sb").appendChild(cln);
}

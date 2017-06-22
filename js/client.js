// Show Modal
$(window).ready(
  function(){
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

function defineActive(e) {
  // remove the old active
  var elements = document.getElementsByClassName(e.target.classList[0]);
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
function refreshMatrix() {
  var matrix = document.getElementById("matrix");
  matrix.innerHTML = " ";
  addMatrix('day');
}

function addMatrix(matrixType) {
  var matrix = document.getElementById("matrix");
  var mh = document.createElement('thead');
  mh.id = "matrix_" + matrixType + "_head";
  var mb = document.createElement('tbody');
  mb.id = "matrix_" + matrixType + "_body";
  matrix.appendChild(mh);
  matrix.appendChild(mb);
  // add option day or week
  createMatrixDay();
}

//matrix Day
function createMatrixDay() {
  //future parse JSON
  var idSelectedFloor = document.getElementById(getActive('list-group-item')).id;
  var selectedFloor = idSelectedFloor.split("-");
  var nRooms = shedualDay.length;
  var roomsName = [];
  var roomDisponibility = [];

  for (var i = 0; i < nRooms; i++) {
    roomsName[i] = data.Piso[selectedFloor[1]].Salas[i].NomeSala;
    roomDisponibility[i] = data.Piso[selectedFloor[1]].Salas[i].Disponibilidade;;
  }

  //Matrix Head
  var mh = document.getElementById("matrix_day_head");
  var tr = document.createElement('tr');
  mh.appendChild(tr);
  var th1 = document.createElement('th');
  th1.innerHTML = "Horas";
  tr.appendChild(th1);
  for (var i = 0; i < nRooms; i++) {
    var th2 = document.createElement('th');
    th2.innerHTML = roomsName[i];
    tr.appendChild(th2);
  }

  //Matrix Body
  var mb = document.getElementById("matrix_day_body");
  for (var i = 0; i < 10; i++) {
    var tr = document.createElement('tr');
    mb.appendChild(tr);
    var th = document.createElement('th');
    tr.appendChild(th);
    th.innerHTML = i + 9 + " H";
    for (var j = 0; j < nRooms; j++) {
      var td = document.createElement('td');
      td.innerHTML = roomDisponibility[j][i];
      tr.appendChild(td);
    }
  }
}

//saves data to the Side Bar
function saveChanges() {

  document.getElementById("data_sb_tipo_reuniao").selectedIndex =
    document.getElementById("data_mod_tipo_reuniao").selectedIndex;
  document.getElementById("data_sb_nparticipantes").value =
    document.getElementById("data_mod_nparticipantes").value;
  document.getElementById("data_sb_calendar").value =
    document.getElementById("data_mod_calendar").value;

  defineActiveById("piso-" + document.getElementById("data_mod_piso_pref").value);
  addMatrix('day');

   clone();

}

// Remove element by Id
function removeElement(elementId) {
  if (document.getElementById(elementId)) {
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
  }
}


// Criar Recursos
function criarrecursos(){

var recursos = initialData.Recursos;
var label_recursos = initialData.Recursos;
    document.getElementById("store_btn_recursos").innerHTML=" ";
    var i;
    for (i = 0; i < recursos.length; i++){
        var button = document.createElement("button");
        var label = document.createElement("label");
        var iDiv = document.createElement('div');
        var element = document.getElementById("store_btn_recursos");

        button.type = 'button';
        button.className = "btn btn-default recurso";
        button.innerHTML = recursos[i];
        button.id = 'btn' + (i);
        button.onclick = function (){
            this.classList.toggle("active");
        }
        label.type = 'label';
        label.className = "label-recurso";
        label.innerHTML = label_recursos[i];

        iDiv.id = 'recurso' + i;
        element.insertBefore(iDiv, element.firstChild);

         element = document.getElementById(iDiv.id);
         element.insertBefore(label, element.firstChild);
         element.insertBefore(button, element.firstChild);
  }
}

// function criarIcon (){
//
// }

function criarLabel(){
    var label_recursos = ["Flipchart", "Projetor", "Microfone"];
    document.getElementById("adicionaLabel").innerHTML=" ";
    for (var j = 0; j < label_recursos.length; j++){
    var label = document.createElement("label");
    label.type = 'label';
    label.className = "label-recurso";
    label.innerHTML = label_recursos[j];
    var elementLabel = document.getElementById("adicionaLabel");
    elementLabel.insertBefore(label, elementLabel.firstChild);
        }
}

function clone(){
    for (var i=0; i<recursos.length; i++){
        var btn = document.getElementById("store_btn_recursos").children[i];
        var cln = btn.cloneNode(true);
        document.getElementById("store_btn_recursos_sb").appendChild(cln);
    }
}

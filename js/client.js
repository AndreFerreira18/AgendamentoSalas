// Show Modal
$(window).ready(
  function(){
      $('#modal').modal('show');
      tReuniao();
      criarrecursos();
  }
);

//Date picker
$('input[name="daterange"]').daterangepicker({
  "timePicker": true,
  "startDate": "06/09/2017",
  "endDate": "06/15/2017",
  "locale": {
      format: 'MM/DD/YYYY h:mm A'
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
  var idSelectedFloor = getActive('list-group-item');
  var tempSelectedFloor = idSelectedFloor.split("-");
  var selectedFloor = parseInt(tempSelectedFloor[1]);


  //Matrix Head
  var mh = document.getElementById("matrix_day_head");
  var tr = document.createElement('tr');
  mh.appendChild(tr);
  var th1 = document.createElement('th');
  th1.innerHTML = "Horas";
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

//saves data to the Side Bar
function saveChanges() {
  clone();
  defineActiveById("piso-" + document.getElementById("data_mod_piso_pref").value);
  addMatrix('day');
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
var glyph_recursos =  [
      "glyphicon glyphicon-facetime-video",
      "glyphicon glyphicon-pencil",
      "glyphicon glyphicon-blackboard",
      "glyphicon glyphicon-ice-lolly",
      "glyphicon glyphicon-screenshot",
      "glyphicon glyphicon-paperclip"
  ];
    document.getElementById("store_btn_recursos").innerHTML=" ";
    var i;
    for (i = 0; i < recursos.length; i++){
        var button = document.createElement("button");
        var label = document.createElement("label");
        var iDiv = document.createElement('div');
        var element = document.getElementById("store_btn_recursos");
        var spn = document.createElement('span');

        button.type = 'button';
        button.className = "btn btn-default recurso";
        button.id = 'btn_rc-'+i;
        button.onclick = function (){
            this.classList.toggle("active");
        }
        label.type = 'label';
        label.className = "label-recurso";
        label.innerHTML = label_recursos[i];

        iDiv.id = 'recurso' + i;
        iDiv.className = 'divBotoes';

        spn.className = 'glyph ';

        switch(i){
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

function clone(){

    var elements = document.getElementById("form_modal").firstElementChild;
var cln = elements.cloneNode(true);
    document.getElementById("form_sb").appendChild(cln);

    document.getElementsByClassName('piso_pref')[1].style.display ="none";

    document.querySelector(".modal-body").remove();
    $('input[name="daterange"]').daterangepicker({
      "timePicker": true,
      "locale": {
          format: 'MM/DD/YYYY h:mm A'
      }
    });
}

function criarGlyph(button){

}

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
  "endDate": "06/15/2017",
  "locale": {
      format: 'MM/DD/YYYY h:mm A'
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
  var idSelectedFloor = getActive('list-group-item');
  var tempSelectedFloor = idSelectedFloor.split("-");
  var selectedFloor = parseInt(tempSelectedFloor[1]);


  //Matrix Head
  var mh = document.getElementById("matrix_day_head");
  var tr = document.createElement('tr');
  mh.appendChild(tr);
  var th1 = document.createElement('th');
  th1.innerHTML = "Horas";
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

//saves data to the Side Bar
function saveChanges() {

clone();

  defineActiveById("piso-" + document.getElementById("data_mod_piso_pref").value);
  addMatrix('day');
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
var glyph_recursos =  [
      "glyphicon glyphicon-facetime-video",
      "glyphicon glyphicon-pencil",
      "glyphicon glyphicon-blackboard",
      "glyphicon glyphicon-ice-lolly",
      "glyphicon glyphicon-screenshot",
      "glyphicon glyphicon-paperclip"
  ];
    document.getElementById("store_btn_recursos").innerHTML=" ";
    var i;
    for (i = 0; i < recursos.length; i++){
        var button = document.createElement("button");
        var label = document.createElement("label");
        var iDiv = document.createElement('div');
        var element = document.getElementById("store_btn_recursos");
        var spn = document.createElement('span');

        button.type = 'button';
        button.className = "btn btn-default recurso";
        button.id = 'btn_rc-'+i;
        button.onclick = function (){
            this.classList.toggle("active");
        }
        label.type = 'label';
        label.className = "label-recurso";
        label.innerHTML = label_recursos[i];

        iDiv.id = 'recurso' + i;
        iDiv.className = 'divBotoes';

        spn.className = 'glyph ';

        switch(i){
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


function clone(){
    var tmp_reuniao = document.getElementById("data_mod_tipo_reuniao").value;
    var elements = document.getElementById("form_modal").firstElementChild;
    var cln = elements.cloneNode(true);
    document.getElementById("form_sb").appendChild(cln);

    document.getElementsByClassName('piso_pref')[1].style.display ="none";

    document.querySelector(".modal-body").remove();
    $('input[name="daterange"]').daterangepicker({
      "timePicker": true,
      "locale": {
          format: 'MM/DD/YYYY h:mm A'
      }
    });
    document.getElementById("data_mod_tipo_reuniao").value = tmp_reuniao;


    for(var i = 0; i<initialData.Recursos.length; i++){
        var id_button = document.getElementById("btn_rc-" + i);
        id_button.onclick = function(){
            this.classList.toggle("active");
        }
    }
}
function tReuniao(){
var x = initialData.Tipos_de_Reuniao;
document.getElementById("data_mod_tipo_reuniao").innerHTML=" ";
for (var i= 0; i <x.length; i++) {
var opt = document.createElement("option");
opt.innerHTML = x[i];
var tipo_reuniao = document.getElementById("data_mod_tipo_reuniao");
tipo_reuniao.insertBefore(opt, tipo_reuniao.firstChild);
    }
}

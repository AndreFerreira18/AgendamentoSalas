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
//Seletor de pisos
document.getElementById("up").addEventListener("mouseover", mouseOver);
document.getElementById("up").addEventListener("mouseout", mouseOut);
document.getElementById("down").addEventListener("mouseover", mouseOver);
document.getElementById("down").addEventListener("mouseout", mouseOut);


// alterar para argumentos
var pisos = [];
var i;
var nAndaresVisiveis = 4;
var min = 0;
var max = nAndaresVisiveis - 1;
for (var i = 0; i <= data.nPisos; i++) { //ver isto
  pisos[i] = i;
}

if (nAndaresVisiveis > pisos.length - 1)
  nAndaresVisiveis = pisos.length - 1;

if (max - min == pisos.length - 1) {
  document.getElementById("up").style.display = 'none';
  document.getElementById("down").style.display = 'none';
}
writeOnScreen(min, max + 1);
nAndaresVisiveis--;
document.getElementById("down").style.display = 'none';

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

function mouseOver(e) {
  if (e.target.id == "up")
    moveUp();
  else if (e.target.id == "down")
    moveDown();
}

function mouseOut(e) {
  if (e.target.id == "up")
    document.getElementById("up").style.color = "black";
  else if (e.target.id == "down")
    document.getElementById("down").style.color = "black";
}

function writeOnScreen(min, max) {
  document.getElementById("selecionaPisos").innerHTML = " ";
  for (i = min; i <= max; i++) {
    var create = document.createElement("p");
    create.innerHTML = pisos[i];
    create.classList.add('list-group-item');
    create.id = 'piso-' + (i);
    create.addEventListener("click", defineActiveEvent);
    var element = document.getElementById("selecionaPisos");
    element.insertBefore(create, element.firstChild);
  }
}

function moveUp() {
  document.getElementById("down").style.display = 'block';
  var min, max;
  document.getElementById("up").style.color = "blue";
  var aux_piso = document.getElementById("selecionaPisos").children[0];
  var index = parseInt(aux_piso.id.split("-")[1]);
  max = pisos.length - 1 > index ? index + 1 : index;
  min = max - nAndaresVisiveis < 0 ? 0 : max - nAndaresVisiveis;
  if (pisos.length - 1 == index + 1)
    hideTopElement(min, max);
  else
    moveActive(min, max);

  function moveActive(min, max) {
    var id = getActive('list-group-item');
    writeOnScreen(min, max);
    var element = document.getElementById(id);
    if (element != null)
      element.classList.add("active");
    else
      document.getElementById('piso-' + min).classList.add("active");
      refreshMatrix();
  }

  function hideTopElement(min, max) {
    document.getElementById("up").style.display = 'none';
    moveActive(min - 1, max);
  }

}

function moveDown() {
  document.getElementById("up").style.display = 'block';
  var min, max;
  document.getElementById("down").style.color = "blue";
  var aux_piso = document.getElementById("selecionaPisos").lastElementChild;
  var index = parseInt(aux_piso.id.split("-")[1]);
  min = index - 1 >= 0 ? index - 1 : 0;
  max = min + nAndaresVisiveis < pisos.length - 1 ? min + nAndaresVisiveis : pisos.length - 1;
  if (index - 1 == 0)
    hideDownElement(min, max);
  else
    moveActive(min, max);


  function moveActive(min, max) {
    var id = getActive('list-group-item');
    writeOnScreen(min, max);
    var element = document.getElementById(id);
    if (element != null)
      element.classList.add("active");
    else
      document.getElementById('piso-' + max).classList.add("active");
      refreshMatrix();
  }

  function hideDownElement(min, max) {
    document.getElementById("down").style.display = 'none';
    moveActive(min, max + 1);
  }
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

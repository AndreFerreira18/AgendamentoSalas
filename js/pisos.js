<<<<<<< HEAD
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
for (var i = 0; i <= floors.Andares.length; i++) { //ver isto
  pisos[i] = i;
}
=======
var timer = null;
document.getElementById("btn_up").addEventListener("mouseover", function(){
    timer = setInterval(updownMoveUp, 250);
});
document.getElementById("btn_up").addEventListener("mouseout", function(){
    clearInterval(timer);
});
document.getElementById("btn_down").addEventListener("mouseover", function(){
    timer = setInterval(updownMoveDown, 250);
});
document.getElementById("btn_down").addEventListener("mouseout", function(){
    clearInterval(timer);
});
>>>>>>> HTML_DEV_PISOS

if (nAndaresVisiveis > pisos.length - 1)
  nAndaresVisiveis = pisos.length - 1;

<<<<<<< HEAD
if (max - min == pisos.length - 1) {
  document.getElementById("up").style.display = 'none';
  document.getElementById("down").style.display = 'none';
}
writeOnScreen(min, max + 1);
nAndaresVisiveis--;
document.getElementById("down").style.display = 'none';
=======
var andar_nVisiveis = 4;
var andar_visiveis = null;
var min = 0;
var maxa = 0;
>>>>>>> HTML_DEV_PISOS

function mouseOver(e) {
  if (e.target.id == "up")
    moveUp();
  else if (e.target.id == "down")
    moveDown();
}

<<<<<<< HEAD
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
=======
function updownMoveUp() {
    if(max < floors.Andares.length) {
        max++;
        min++;
        escreverEcra();

    }
}

function updownMoveDown() {
    if(min > 0) {
        min--;
        max--;
        escreverEcra();
    }
}

function updownIniciar() {
    var e = document.getElementById("data_mod_piso_pref");
    var selected = parseInt(e.options[e.selectedIndex].value);

    if(floors.Andares.length < andar_nVisiveis)
        andar_nVisiveis = floors.Andares.length;

    criaredificio();
    document.getElementById('piso-' + (selected)).classList.add("Active");
    min=selected;

    while((min + andar_nVisiveis) > floors.Andares.length)
        min--;
    max = min + andar_nVisiveis;
    escreverEcra();
}

function escreverEcra() {
    andares = document.getElementById("selecionaPisos").childNodes;

    for(i = 0; i < floors.Andares.length; i++) {
        if(i>= min && i<max) document.getElementById('piso-' + (i)).style.display=''
        else document.getElementById('piso-' + (i)).style.display='none';
    }
    if(min==0) document.getElementById("btn_down").style.display='none';
    else document.getElementById("btn_down").style.display='';
    if(max==floors.Andares.length) document.getElementById("btn_up").style.display='none';
    else document.getElementById("btn_up").style.display='';
}

function criaredificio() {
    for(i = 0; i < floors.Andares.length; i++) {
        var create = document.createElement("p");
        create.innerHTML = floors.Andares[i];
        create.classList.add('list-group-item');
        create.id = 'piso-' + (i);
        create.style.display = "none";
        //create.addEventListener("click", defineActiveEvent);
        var element = document.getElementById("selecionaPisos");
        element.insertBefore(create,  element.firstChild);
    }
>>>>>>> HTML_DEV_PISOS
}






// NEW ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


// document.getElementById("btn_up").addEventListener("mouseover", moveup);
// document.getElementById("btn_down").addEventListener("mouseover", mouseOver);
//
// function moveup(){
//     alert('up');
// }
//
// function mouseOver(e) {
//     if(e.target.id == "btn_up")
//         alert('up');
//         //moveUp();
//     else if(e.target.id == "btn_down")
//         //moveDown();
//         alert('down');
// }

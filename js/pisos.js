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

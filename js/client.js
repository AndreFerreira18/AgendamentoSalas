//Date picker
$('input[name="daterange"]').daterangepicker({
    "timePicker": true,
    "startDate": "06/09/2017",
    "endDate": "06/15/2017"
});
//Sidebar
$(window).resize(function(){
    var path = $(this);
    var contW = path.width();
    if(contW >= 751){
        document.getElementsByClassName("sidebar-toggle")[0].style.left="300px";
    }else{
        document.getElementsByClassName("sidebar-toggle")[0].style.left="-300px";
    }
});
$(document).ready(function(){
    $('.dropdown').on('show.bs.dropdown', function(e){
        $(this).find('.dropdown-menu').first().stop(true, true).slideDown(300);
    });
    $('.dropdown').on('hide.bs.dropdown', function(e){
        $(this).find('.dropdown-menu').first().stop(true, true).slideUp(300);
    });
    $("#menu-toggle").click(function(e){
        e.preventDefault();
        var elem = document.getElementById("sidebar-wrapper");
            left = window.getComputedStyle(elem,null).getPropertyValue("left");
        if(left == "300px"){
            document.getElementsByClassName("sidebar-toggle")[0].style.left="-300px";
        }else if(left == "-300px"){
            document.getElementsByClassName("sidebar-toggle")[0].style.left="300px";
        }
    });
});
//Seletor de pisos
document.getElementById("up").addEventListener("mouseover", mouseOver);
document.getElementById("up").addEventListener("mouseout", mouseOut);
document.getElementById("down").addEventListener("mouseover", mouseOver);
document.getElementById("down").addEventListener("mouseout", mouseOut);
var pisos = ["Rés-do-chão","Piso 1", "Piso 2", "Piso 3", "Piso 4", "Piso 5", "Piso 6", "Piso 7", "Piso 8"];
var i;
var nAndaresVisiveis = 4;

function mouseOver(e) {
    if (e.target.id == "up")
        moveUp();
    else if(e.target.id == "down")
        moveDown();
}
function mouseOut(e){
    if (e.target.id == "up")
        document.getElementById("up").style.color = "black";
    else if(e.target.id == "down")
        document.getElementById("down").style.color = "black";
}
function writeOnScreen(min,max){
    document.getElementById("selecionaPisos").innerHTML = " ";
    for (i = min; i <= max; i++){
        var create = document.createElement("p");
        create.innerHTML = pisos[i];
        create.classList.add('list-group-item');
        create.id = 'piso-'+(i);
        var element = document.getElementById("selecionaPisos");
        element.prepend(create);
    }
}
function moveUp(){
    document.getElementById("down").style.display = 'block';
    var min, max;
    document.getElementById("up").style.color = "blue";
    var aux_piso = document.getElementById("selecionaPisos").children[0];
    var index = parseInt(aux_piso.id.split("-")[1]);
    max = pisos.length-1 > index ? index+1 : index;
    min = max-nAndaresVisiveis < 0 ? 0 : max-nAndaresVisiveis;
    if (pisos.length-1 == index+1)
        hideTopElement(min,max);
    else
        writeOnScreen(min,max);
    function hideTopElement (min,max){
        document.getElementById("up").style.display = 'none';
        writeOnScreen (min-1,max);
    }

}
function moveDown(){
    document.getElementById("up").style.display = 'block';
    var min, max;
    document.getElementById("down").style.color = "blue";
    var aux_piso = document.getElementById("selecionaPisos").lastElementChild;
    var index = parseInt(aux_piso.id.split("-")[1]);
    min = index-1 >= 0 ? index-1 : 0;
    max= min+nAndaresVisiveis < pisos.length-1 ? min+nAndaresVisiveis : pisos.length-1;
    if (index-1 == 0)
        hideDownElement(min,max);
    else
        writeOnScreen(min,max);
    function hideDownElement (min,max){
        document.getElementById("down").style.display = 'none';
        writeOnScreen (min,max+1);
    }
}


if (nAndaresVisiveis > pisos.length-1)
    nAndaresVisiveis = pisos.length-1;

var min = 0;
var max = nAndaresVisiveis-1;
if (max-min == pisos.length-1){
    document.getElementById("up").style.display ='none';
    document.getElementById("down").style.display ='none';
}
writeOnScreen(min,max+1);
nAndaresVisiveis--;
document.getElementById("down").style.display = 'none';

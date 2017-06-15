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

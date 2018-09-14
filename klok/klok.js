var pagina_klok = document.getElementById("klok");

function Updatetime(){
    pagina_klok.innerHTML = "<span>KLOK</span>";
    var clock = "";
    var date = new Date();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var hourtxt = hour + "";
    var minutestxt = minutes + "";
    var secondstxt = seconds + "";
    //vanaf hier datum
    var day = "";
    var year = date.getFullYear();
    var month = date.getMonth();
    var date = date.getDate();
    var yeartxt = year + "";
    var monthtxt = (month + 1) + "";
    var datetxt = date + "";
    //vanaf hier verder
    if (hourtxt.length == 1){
      hourtxt = "0" + hourtxt;
    }
    if (minutestxt.length == 1){
      minutestxt = "0" + minutestxt;
    }
    if (secondstxt.length == 1){
      secondstxt = "0" + secondstxt;
    }
    day = datetxt + "-" + monthtxt + "-" + yeartxt;
    clock = hourtxt + ":" + minutestxt + ":" + secondstxt;
   pagina_klok.innerHTML = "<div class=\"kloktext\">"+clock+"</div>" +
   "<div class=\"datumtxt\">"+day+"<div>";
   setTimeout(Updatetime, 1000);
}
Updatetime ();

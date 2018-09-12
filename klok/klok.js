var pagina = document.getElementById("klok");

function Updatetime(){
    pagina.innerHTML = "<span>KLOK</span>";
    var clock = "";
    var date = new Date();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var hourtxt = hour + "";
    var minutestxt = minutes + "";
    var secondstxt = seconds + "";
    if (hourtxt.length == 1){
      hourtxt = "0" + hourtxt;
    }
    if (minutestxt.length == 1){
      minutestxt = "0" + minutestxt;
    }
    if (secondstxt.length ==1){
      secondstxt = "0" + secondstxt;
    }
    clock = hourtxt + ":" + minutestxt + ":" + secondstxt;
   pagina.innerHTML = "<div>"+clock+"</div>"
}

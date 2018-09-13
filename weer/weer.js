var pagina = document.getElementById("weer");
//Custom code
function fetchweer(){
  fetch('https://weerlive.nl/api/json-data-10min.php?key=902c9408a9&locatie=Zwolle').then(function(response) {
    if(response.ok) {
      return response.json();
    }
    throw new Error('Network response was not ok.');
  }).then(function(myJson) {
    updateweer(myJson);
    setTimeout(fetchweer, 900000);
  }).catch(function(error) {
    console.log('There has been a problem with your fetch operation: ', error.message);
  }
);
}

function updateweer(myJson) {

var weergegevens = myJson['liveweer'][0];
document.getElementById("weer_icon").src="weer/afbeeldingen/" + weergegevens['image'] + ".png";
document.getElementById('weer_plaats').innerHTML="Weersverwachting voor: " + weergegevens['plaats'];
document.getElementById('weer_temperatuur').innerHTML="Huidige temperatuur: " + weergegevens['temp'] + " C" + "&#730";;
document.getElementById('weer_samenvatting').innerHTML="Huidige weeromstandigheden: " + weergegevens['samenv'];
document.getElementById('weer_windrichting').innerHTML="Windrichting: " + weergegevens['windr'];
document.getElementById('weer_windsnelheid').innerHTML="Windkracht: " + weergegevens['winds'] + " Bft";
document.getElementById('weer_neerslagvandaag').innerHTML="Neerslagkans vandaag: " + weergegevens['d0neerslag'] + "%";

document.getElementById('weer_plaats2').innerHTML="Weersverwachting voor morgen in: " + weergegevens['plaats'];
document.getElementById("weer_icon_morgen").src="weer/afbeeldingen/" + weergegevens['d0weer'] + ".png";
document.getElementById('weer_verwachting').innerHTML="Verwachting: " + weergegevens['verw'];
document.getElementById('weer_neerslagmorgen').innerHTML="Neerslagkans morgen: " + weergegevens['d1neerslag'] + "%";
document.getElementById('weer_maxtempmorgen').innerHTML="Max. Temperatuur morgen: " + weergegevens['d1tmax'] + " C" + "&#730";
document.getElementById('weer_mintempmorgen').innerHTML="Min. Temperatuur morgen: " + weergegevens['d1tmin'] + " C" + "&#730";

document.getElementById('weer_plaats3').innerHTML="Weersverwachting voor overmorgen in: " + weergegevens['plaats'];
document.getElementById("weer_icon_overmorgen").src="weer/afbeeldingen/" + weergegevens['d1weer'] + ".png";
document.getElementById('weer_neerslagovermorgen').innerHTML="Neerslagkans morgen: " + weergegevens['d2neerslag'] + "%";
document.getElementById('weer_maxtempovermorgen').innerHTML="Max. Temperatuur morgen: " + weergegevens['d2tmax'] + " C" + "&#730";
document.getElementById('weer_mintempovermorgen').innerHTML="Min. Temperatuur morgen: " + weergegevens['d2tmin'] + " C" + "&#730";

document.getElementById('weer_zonsopgang').innerHTML="Zonsopgang: " + weergegevens['sup'];
document.getElementById('weer_zonsondergang').innerHTML="Zonsondergang: " + weergegevens['sunder'];
}
//Einde custom code


pagina.innerHTML = `<span></span>
<!-- Weerlive vandaag-->
<div id="grid-container" class="grid-container">

<div id="weer_icon_groot" class="weer_icon">
<img id="weer_icon" src="" class="weer_img"></img>
</div>
<div id="plaats_locatie" class="weerinfo_plaats">
<div id="weer_plaats"> </div>  <!-- Weerlive waarde: plaats-->
</div>
<div id="weerinfo_v" class="weerinfo_vandaag">
<div id="weer_temperatuur"> </div> <!-- Weerlive waarde: temp-->
<div id="weer_samenvatting"> </div> <!-- Weerlive waarde: samenv-->
<div id="weer_windrichting"> </div> <!-- Weerlive waarde: windr-->
<div id="weer_windsnelheid"> </div> <!-- Weerlive waarde: winds-->
<div id="weer_neerslagvandaag"> </div> <!-- Weerlive waarde: d0neerslag-->
</div>
 <!-- Weerlive waarde: Verwachting voor morgen-->
 <div id="weericon_morgen" class="weericon_morgen">
<img id="weer_icon_morgen" src="" class="weer_img"></img>
</div>
<div id="weerinformatie_morgen" class="weerinfo_morgen">
<div id="weer_plaats2"> </div> <!-- Weerlive waarde: plaats-->
<div id="weer_verwachting"> </div>  <!-- Weerlive waarde: verw-->
<div id="weer_neerslagmorgen"> </div> <!-- Weerlive waarde: d1neerslag-->
<div id="weer_maxtempmorgen"> </div> <!-- Weerlive waarde: d1tmax-->
<div id="weer_mintempmorgen"> </div> <!-- Weerlive waarde: d1tmin-->
</div>

<!-- Weerlive waarde: Verwachting voor overmorgen-->
 <div id="weericon_overmorgen" class="weericon_overmorgen">
<img id="weer_icon_overmorgen" src="" class="weer_img"></img>
</div>
 <div id="weerinformatie_overmorgen" class="weerinfo_overmorgen">
<div id="weer_plaats3"> </div> <!-- Weerlive waarde: plaats-->
<div id="weer_neerslagovermorgen"> </div> <!-- Weerlive waarde: d1neerslag-->
<div id="weer_maxtempovermorgen"> </div> <!-- Weerlive waarde: d1tmax-->
<div id="weer_mintempovermorgen"> </div> <!-- Weerlive waarde: d1tmin-->
</div>
<!-- Weerlive waarde: Overige waardes-->
<div id="zonsinformatie" class="overig">
<div id="weer_zonsopgang"> </div> <!-- Weerlive waarde: sup-->
<div id="weer_zonsondergang"> </div> <!-- Weerlive waarde: sunder-->
</div>
</div>
`;


fetchweer();

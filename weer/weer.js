var pagina = document.getElementById("weer");
//Custom code
function fetchweer(){
  fetch('https://weerlive.nl/api/json-data-10min.php?key=902c9408a9&locatie=Hardenberg').then(function(response) {
    if(response.ok) {
      return response.json();
    }
    throw new Error('Network response was not ok.');
  }).then(function(myJson) {
    updateweer(myJson);
  }).catch(function(error) {
    console.log('There has been a problem with your fetch operation: ', error.message);
  }
);
}

function updateweer(myJson) {

var weergegevens = myJson['liveweer'][0];

document.getElementById('weer_plaats').innerHTML="Weersverwachting voor: " + weergegevens['plaats'];
document.getElementById('weer_afbeelding').innerHTML=weergegevens['image'];
document.getElementById('weer_temperatuur').innerHTML="Huidige temperatuur: " + weergegevens['temp'] + " C" + "&#730";;
document.getElementById('weer_samenvatting').innerHTML="Huidige weeromstandigheden: " + weergegevens['samenv'];
document.getElementById('weer_windrichting').innerHTML="Windrichting: " + weergegevens['windr'];
document.getElementById('weer_windsnelheid').innerHTML="Windkracht: " + weergegevens['winds'] + " Bft";
document.getElementById('weer_neerslagvandaag').innerHTML="Neerslagkans vandaag: " + weergegevens['d0neerslag'] + "%";

document.getElementById('weer_neerslagmorgen').innerHTML="Neerslagkans morgen: " + weergegevens['d1neerslag'] + "%";
document.getElementById('weer_maxtempmorgen').innerHTML="Max. Temperatuur morgen: " + weergegevens['d1tmax'] + " C" + "&#730";
document.getElementById('weer_mintempmorgen').innerHTML="Min. Temperatuur morgen: " + weergegevens['d1tmin'] + " C" + "&#730";

document.getElementById('weer_zonsopgang').innerHTML="Zonsopgang: " + weergegevens['sup'];
document.getElementById('weer_zonsondergang').innerHTML="Zonsondergang: " + weergegevens['sunder'];
}
//Einde custom code


pagina.innerHTML = `<span></span>

<div id="weer_plaats"> </div> <!-- Weerlive waarde: plaats-->
<div id="weer_afbeelding"> </div> <!-- Weerlive waarde: image-->
<div id="weer_temperatuur"> </div> <!-- Weerlive waarde: temp-->
<div id="weer_samenvatting"> </div> <!-- Weerlive waarde: samenv-->
<div id="weer_windrichting"> </div> <!-- Weerlive waarde: windr-->
<div id="weer_windsnelheid"> </div> <!-- Weerlive waarde: winds-->
<div id="weer_neerslagvandaag"> </div> <!-- Weerlive waarde: d0neerslag-->
 <!-- Weerlive waarde: Verwachting voor morgen-->
<div id="weer_neerslagmorgen"> </div> <!-- Weerlive waarde: d1neerslag-->
<div id="weer_maxtempmorgen"> </div> <!-- Weerlive waarde: d1tmax-->
<div id="weer_mintempmorgen"> </div> <!-- Weerlive waarde: d1tmin-->
<!-- Weerlive waarde: Overige waardes-->
<div id="weer_zonsopgang"> </div> <!-- Weerlive waarde: sup-->
<div id="weer_zonsondergang"> </div> <!-- Weerlive waarde: sunder-->
`;

fetchweer();

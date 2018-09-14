var pagina = document.getElementById("rooster");

pagina.innerHTML = "<span>ROOSTER</span>";

var classId = "ICTM1p";
var limit = 4;
var eindtijd = new Date() / 1000 + 18 * 60 * 60;

fetch("https://windesheimapi.azurewebsites.net/api/v1/Klas/" + classId + "/Les?$orderby=starttijd&$top=" + limit + "&$filter=eindtijd gt " + eindtijd + "L")
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(JSON.stringify(myJson));
}).catch(function(error){
    console.error(error);
});

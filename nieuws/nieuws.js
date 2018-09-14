var pagina = document.getElementById("nieuws");

pagina.innerHTML = `<span>NIEUWS</span>

<head>
<div id="divRss"> </div>
</head>

`;
$(document).ready(function(){
$('#divRss').FeedEk({
FeedUrl : 'http://www.nu.nl/rss/Algemeen',
MaxCount : 5,
ShowDesc : false,
ShowPubDate : true
}); });

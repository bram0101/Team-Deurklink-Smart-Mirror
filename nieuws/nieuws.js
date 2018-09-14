var pagina_nieuws = document.getElementById("nieuws");

pagina_nieuws.innerHTML = `
<div class="nieuws_page">
<head>
<div id="divRss"> </div>
</head>
</div>
`;
$(document).ready(function(){
$('#divRss').FeedEk({
FeedUrl : 'http://www.nu.nl/rss/Algemeen',
MaxCount : 5,
ShowDesc : false,
ShowPubDate : true
}); });

function nieuws_loop(){
    $('#divRss').FeedEk({
    FeedUrl : 'http://www.nu.nl/rss/Algemeen',
    MaxCount : 5,
    ShowDesc : false,
    ShowPubDate : true
    });
    setTimeout(nieuws_loop, 900000);
}

setTimeout(nieuws_loop, 900000);

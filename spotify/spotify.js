var pagina_spotify = document.getElementById("spotify");

pagina_spotify.innerHTML = `
<div class="spotifywrapper">
<iframe src="https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DWSBi5svWQ9Nk"
width="375"
height="750"
frameborder="0"
allowtransparency="true"
allow="encrypted-media"
id="spotifyFrame">
</iframe>
</div>`;


function spotify_loop(){
    document.getElementById("spotifyFrame").contentWindow.location.reload();
    setTimeout(spotify_loop, 900000);
}

setTimeout(spotify_loop, 900000);

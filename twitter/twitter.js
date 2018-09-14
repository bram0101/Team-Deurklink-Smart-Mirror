var pagina_twitter = document.getElementById("twitter");

pagina_twitter.innerHTML = `
<div class="twitterwrapper">
<a class="twitter-timeline" href="https://twitter.com/Windesheiminfo?ref_src=twsrc%5Etfw">
Tweets by Windesheiminfo</a>
</div>
`;
//<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

function twitter_loop(){
    pagina_twitter.innerHTML = `
    <div class="twitterwrapper">
    <a class="twitter-timeline" href="https://twitter.com/Windesheiminfo?ref_src=twsrc%5Etfw">
    Tweets by Windesheiminfo</a>
    </div>
    `;
    setTimeout(twitter_loop, 900000);
}

setTimeout(twitter_loop, 900000);

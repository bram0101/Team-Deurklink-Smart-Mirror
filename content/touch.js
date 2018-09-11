var pages = [document.getElementById("klok"),
            document.getElementById("weer"),
            document.getElementById("nieuws"),
            document.getElementById("rooster"),
            document.getElementById("twitter"),
            document.getElementById("spotify"),
            document.getElementById("pubg")];

var currentIndex = 0;
var targetIndex = 0;
var scrollSpeed = 0;
var maxScrollSpeed = 0.05;
var accelerationConstant = 0.0001;
var slowDownDistance = 0.5;
var snapDistance = 0.01;
var delta = 1/60;
var topSpeed = 0;

//document.documentElement.clientHeight

function loop(){
    if(currentIndex != targetIndex){
        if(scrollSpeed == 0){
            scrollSpeed += currentIndex < targetIndex ? accelerationConstant : -accelerationConstant;
        }
        if(Math.abs(targetIndex - currentIndex) < slowDownDistance){
            if(topSpeed == 0)
                topSpeed = scrollSpeed;
            //scrollSpeed = scrollSpeed - delta * topSpeed / slowDownDistance;
            scrollSpeed = topSpeed * Math.pow(Math.abs(targetIndex - currentIndex) / slowDownDistance, 0.5);
        }else if(Math.abs(scrollSpeed) < maxScrollSpeed){
            scrollSpeed = Math.max(-maxScrollSpeed, Math.min(maxScrollSpeed, scrollSpeed + (scrollSpeed < 0 ? -accelerationConstant : accelerationConstant)));
        }
        if(Math.abs(targetIndex - currentIndex) < snapDistance || (scrollSpeed < 0 && targetIndex > currentIndex) || (scrollSpeed > 0 && targetIndex < currentIndex)){
            currentIndex = targetIndex;
            scrollSpeed = 0;
            topSpeed = 0;
        }
        currentIndex += scrollSpeed;

        for(var i = 0; i < pages.length; i++){
            pages[i].style = "display: none; transform: translateY(0px);";
        }
        var lowerI = Math.floor(currentIndex);
        var upperI = Math.ceil(currentIndex);
        var fract = currentIndex - lowerI;
        var li = lowerI % pages.length;
        if(li < 0)
            li = pages.length + li;
        var ui = upperI % pages.length;
        if(ui < 0)
            ui = pages.length + ui;
        if(li == -0)
            li = 0;
        if(ui == -0)
            ui = 0;
        pages[ui].style = "display: block; transform: translateY(" + ((1.0 - fract) * document.documentElement.clientHeight) + "px);";
        pages[li].style = "display: block; transform: translateY(" + (-fract * document.documentElement.clientHeight) + "px);";
    }

    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);

var pages = [document.getElementById("klok"),
            document.getElementById("weer"),
            document.getElementById("nieuws"),
            document.getElementById("twitter"),
            document.getElementById("spotify")];

var scrollFade = document.getElementById("scrollFade");

var currentIndex = 0;
var targetIndex = 0;
var scrollSpeed = 0;
var maxScrollSpeed = 0.05;
var accelerationConstant = 0.0001;
var slowDownDistance = 0.5;
var snapDistance = 0.001;
var delta = 1/60;
var topSpeed = 0;
var oldTargetIndex = 0;

var scrollTimeout = 10000;
//document.documentElement.clientHeight
var timerTimeout = null;

function timer(){
    if(targetIndex == currentIndex){
        if(currentIndex >= pages.lenght){
            currentIndex = currentIndex % pages.lenght;
        }
        if(currentIndex < 0){
            currentIndex = currentIndex % pages.lenght;
            currentIndex = pages.length - currentIndex - 1;
        }
        targetIndex = currentIndex + 1;
    }
    timerTimeout = setTimeout(timer, scrollTimeout);
}

timer();

function loop(){
    if(scrollFade.style != "")
        scrollFade.style = "";
    if(currentIndex != targetIndex){
        scrollFade.style = "opacity: 1.0";
        if(targetIndex != oldTargetIndex){
            if((targetIndex < currentIndex && oldTargetIndex > currentIndex) || (targetIndex > currentIndex && oldTargetIndex < currentIndex)){
                scrollSpeed *= -1; // Als de targetIndex tijdens de animatie verandert, en hij moet de andere kant op, dan moet de snelheid omgekeerd worden.
            }
        }
        if(scrollSpeed == 0){
            scrollSpeed += currentIndex < targetIndex ? accelerationConstant : -accelerationConstant;
        }
        if(Math.abs(targetIndex - currentIndex) < slowDownDistance){
            if(topSpeed == 0)
                topSpeed = scrollSpeed;
            //scrollSpeed = scrollSpeed - delta * topSpeed / slowDownDistance;
            var mult = Math.pow(Math.abs(targetIndex - currentIndex) / slowDownDistance, 0.5);
            scrollSpeed = topSpeed * mult;
            scrollFade.style = "opacity: " + mult;
        }else if(Math.abs(scrollSpeed) < maxScrollSpeed){
            scrollSpeed = Math.max(-maxScrollSpeed, Math.min(maxScrollSpeed, scrollSpeed + (scrollSpeed < 0 ? -accelerationConstant : accelerationConstant)));
            scrollFade.style = "opacity: " + Math.min((Math.abs(scrollSpeed) / maxScrollSpeed) * 8.0, 1.0);
        }
        if(Math.abs(targetIndex - currentIndex) < snapDistance || (scrollSpeed < 0 && targetIndex > currentIndex) || (scrollSpeed > 0 && targetIndex < currentIndex)){
            currentIndex = targetIndex;
            scrollSpeed = 0;
            topSpeed = 0;
        }
        currentIndex += scrollSpeed;
        oldTargetIndex = targetIndex;

        for(var i = 0; i < pages.length; i++){
            pages[i].style = "display: none; transform: translateY(0px);";
        }
        var lowerI = Math.floor(currentIndex);
        var upperI = Math.ceil(currentIndex);
        var fract = currentIndex - lowerI;
        var li = lowerI % pages.length;
        if(li < 0)
            li = pages.length + li - 1;
        var ui = upperI % pages.length;
        if(ui < 0)
            ui = pages.length + ui - 1;
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

var prevState = {"down": false,  "up": true};
var powerDownTime = 0;

function pollData(){
    fetch('http://localhost:4032')
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        var changed = false;
        //console.log(JSON.stringify(json));
        if(json["down"] == true && json["up"] == true){
            if(powerDownTime == 0){
                powerDownTime = new Date().getTime();
            }
            if(new Date().getTime() - powerDownTime > 2000){
                document.getElementById("pageWrapper").style = "dispay: none;";
            }
            // Niets down nu.
        }else if(json["down"] == true && prevState["down"] == false){
            targetIndex = targetIndex - 1;
            changed = true;
        }else if(json["up"] == true && prevState["up"] == false){
            targetIndex = targetIndex + 1;
            changed = true;
        }else{
            powerDownTime = 0;
        }
        prevState = json;
        if(changed){
            document.getElementById("pageWrapper").style = "";
            powerDownTime = 0;
            console.log(targetIndex);
            clearTimeout(timerTimeout);
            setTimeout(timerTimeout, 30000);
        }
    }).catch(function (error){
        //console.error(error);
    });

    setTimeout(pollData, 250);
}

setTimeout(pollData, 1000);

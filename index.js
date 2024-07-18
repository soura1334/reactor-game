var level = 1;
var gamePattern = [];
var started = false;
var i=0;
var gameOver = false;

//press any key to start
$(document).keypress(function(){
    if(!started){
        $("h2").addClass("invisible");
        started = true;
        gameOver = false;
        nextSequence();
    }
});

// clicking a button
$(".key").click(function(){
    if(!gameOver){
        btnPress(Number(this.id));
        checkAns(Number(this.id));
    }
});

//calling the next sequence
function nextSequence(){
    var rand = Math.floor(Math.random()*9+1);
    gamePattern.push(rand);
    show(rand);
    circLight("l",level);
}


//checking the ans
function checkAns(val){
    if(val === gamePattern[i]){
        i++;
        if(i === gamePattern.length){
            circLight("r",level);
            level++;
            i=0;
            if(level > 5){
                level = 1;
                gamePattern = [];
                $("h2").removeClass("invisible");
                $("h2").text("Congrats! You WIN!!! Press any key to restart!");
                setTimeout(function(){
                    $(".btn").removeClass("show");
                },500);
                started = false;
            }
            else{
                setTimeout(function() {
                    showOld();
                }, 1000);
                setTimeout(function(){
                    nextSequence();
                },(500*(gamePattern.length+2)));
            }
        }
    }
    // Game over
    else{
        $(".btn").removeClass("show");
        gameOver = true;
        gamePattern = [];
        over();
        $("h2").removeClass("invisible");
        $("h2").text("Game Over! Press any key to restart");
        level = 1;
        started = false;
        i=0;
    }
}


//show old pattern again
function showOld(){
    for (var j = 0; j < gamePattern.length; j++) {
        (function(j) {
            setTimeout(function() {
                show(gamePattern[j]);
            }, j * 500); 
        })(j);
    }
}

//showing the tile
function show(num){
    $("#d"+num).addClass("show");
    setTimeout(function(){
        $("#d"+num).removeClass("show");
    },300)
}
// if wrong show red
function over(){
    $(".dis").addClass("game-over");
    setTimeout(function(){
        $(".dis").removeClass("game-over");
    },300)
}

function circLight(dir,n){
    $("#c"+dir+n).addClass("show");
}

function btnPress(num){
    $("#"+num).addClass("pressed");
    setTimeout(function(){
        $("#"+num).removeClass("pressed");
    },300)
}
$(document).ready(function () {
    IdleAnimationStart();
    PopupUserNameStart();
    CreateBarriers();
});
// $(window).on('load',function (){
//
// })

var charNumber = 0;
var charRunNumber = 0;
var charJumpNumber = 0;
var charSlideNumber = 0;

var IdleAnimationNumber = 0;
var RunAnimationNumber = 0;
var JumpAnimationNumber = 0;
var SlideAnimationNumber = 0;

var UserName = "";
var moveBackgroundId = 0;
var scoreCountId = 0;

// -----------Sound Effects------------

// background--
var backgroundSound = new Audio("assets/sounds/backgroundSound.mp3");
backgroundSound.loop = true;
backgroundSound.volume = 0.2;
backgroundSound.autoplay = true;

//jump
var jumpSound = new Audio("assets/sounds/jump.mp3");
jumpSound.volume = 0.8;

//levelUp
var levelUpSound = new Audio("assets/sounds/levelUp.mp3");
levelUpSound.volume = 0.8;


// -----------Sound Effects end------------

function PopUpUserName() {
    $("#popup").css("display", "block");
}

function PopupUserNameStart() {
    setTimeout(PopUpUserName, 1000);
}

$("#playBtn").click(function () {
    backgroundSound.play();
    UserName = $("#txtInput").val();

    if (UserName == "" || UserName == null) {
        alert("Please Enter Your Name");
    } else {
        $("#txtlbl").text(UserName);
        PopupNameClose();
    }

});

function PopupNameClose() {
    $("#popup").css("display", "none");
    Keychek();
}

// --------------------popUp window End--------------------------------

function Keychek() {
    addEventListener("keypress", function (event) {
        var a = event.which;

        if (a == 13) {
            clearInterval(RunAnimationNumber);
            clearInterval(barrierAnimationId);
            RunAnimationStart();
            barrierAnimationId = setInterval(barrierAnimation, 100);
        } else if (a == 32) {
            clearInterval(RunAnimationNumber);
            clearInterval(moveBackgroundId);
            jumpSound.play();
            JumpAnimationStart();
            moveBackgroundId = setInterval(moveBackground, 100);
            clearInterval(barrierAnimationId);
            barrierAnimationId = setInterval(barrierAnimation, 100);
        } else if (a == 122) {
            clearInterval(RunAnimationNumber);
            clearInterval(JumpAnimationNumber);
            SlideAnimationStart();
        }
    });
}

// --------------------Key check Listener End--------------------------------
function IdleAnimate() {

    if (charNumber == 10) {
        charNumber = 0;
    }
    $("#character").attr("src", "assets/img/Idle_" + charNumber + ".png");
    charNumber++;
}

function IdleAnimationStart() {
    IdleAnimationNumber = setInterval(IdleAnimate, 100);
}

// --------------------Idle function End--------------------------------

function RunAnimate() {

    if (charRunNumber == 10) {
        charRunNumber = 0;
    }
    $("#character").attr("src", "assets/img/Run_" + charRunNumber + ".png");
    charRunNumber++;
}

function RunAnimationStart() {
    clearInterval(IdleAnimationNumber);
    clearInterval(moveBackgroundId);
    clearInterval(scoreCountId);
    RunAnimationNumber = setInterval(RunAnimate, 100);
    moveBackgroundId = setInterval(moveBackground, 100);
    scoreCountId = setInterval(CountScore, 300);
}

// --------------------Run function End--------------------------------
var x = 0;

function moveBackground() {
    x = x - 20;
    $("#display").css("background-position-x", x + "px");
}

// --------------------Background move function End--------------------------------
var s = 0;

function CountScore() {
    $("#scoreCount").text(s);
    s++;
}

// --------------------Score function End--------------------------------

var marginTop = 490;

function JumpAnimate() {

    if (charJumpNumber == 3) {
        marginTop = marginTop - 100;
        $("#character").css("margin-top", marginTop + "px");
    }

    if (charJumpNumber == 8) {
        marginTop = marginTop + 100;
        $("#character").css("margin-top", marginTop + "px");
    }

    charJumpNumber++;

    if (charJumpNumber == 10) {
        charJumpNumber = 0;
        clearInterval(JumpAnimationNumber);
        clearInterval(moveBackgroundId);
        moveBackgroundId = setInterval(moveBackground, 100);
        RunAnimationStart();
    }

    $("#character").attr("src", "assets/img/Jump_" + charJumpNumber + ".png");

}

function JumpAnimationStart() {
    clearInterval(IdleAnimationNumber);
    clearInterval(RunAnimationNumber);
    clearInterval(JumpAnimationNumber);
    JumpAnimationNumber = setInterval(JumpAnimate, 100);
}

// --------------------Jump function End--------------------------------

function SlideAnimate() {

    if (charSlideNumber == 10) {
        charSlideNumber = 0;
        clearInterval(SlideAnimationNumber);
        RunAnimationStart();
    }

    if (charSlideNumber == 4) {
        $("#character").css("height", "125px");
    }

    if (charSlideNumber == 9) {
        $("#character").css("height", "190px");
    }

    $("#character").attr("src", "assets/img/Slide_" + charSlideNumber + ".png");
    charSlideNumber++;
}

function SlideAnimationStart() {
    clearInterval(IdleAnimationNumber);
    clearInterval(RunAnimationNumber);
    clearInterval(JumpAnimationNumber);
    clearInterval(SlideAnimationNumber);
    SlideAnimationNumber = setInterval(SlideAnimate, 100);
}

// --------------------Slide function End--------------------------------

var marginLeft = 1600;

function CreateBarriers() {
    for (let i = 0; i < 10; i++) {
        var box = $(`<div> </div>`);
        $(box).toggleClass("box")
        $(box).attr("id", "box" + i);

        $("#display").append(box);
        $(box).css("margin-left", marginLeft + "px");
        $(box).css("left", 0);
        marginLeft = marginLeft + 1200;
    }
}

var barrierAnimationId = 0;

function barrierAnimation() {
    for (let i = 0; i < 10; i++) {
        var box = document.getElementById("box" + i);
        var currentMargin = getComputedStyle(box).marginLeft;
        var newMarginLeft = parseInt(currentMargin) - 30;
        $(box).css("margin-left", newMarginLeft + "px");

        if (newMarginLeft >= -110 & newMarginLeft <= 100) {
            console.log(marginTop);
            if (marginTop ==490) {
                clearInterval(IdleAnimationNumber);
                clearInterval(RunAnimationNumber);
                clearInterval(JumpAnimationNumber);
                clearInterval(moveBackgroundId);
                clearInterval(barrierAnimationId);
                clearInterval(scoreCountId);
            }else {
                JumpAnimationStart();
            }

        }
    }
}

// --------------------CreateBarrier function End--------------------------------

















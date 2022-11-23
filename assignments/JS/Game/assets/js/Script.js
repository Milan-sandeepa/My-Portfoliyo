$(document).ready(function (){
    IdleAnimationStart();
    PopupUserNameStart();
});
// $(window).on('load',function (){
//
// })

var charNumber = 0;
var charRunNumber = 0;
var IdleAnimationNumber=0;
var RunAnimationNumber=0;
var UserName="";
var moveBackgroundId=0;

function PopUpUserName(){
    $("#popup").css("display","block");
}

function PopupUserNameStart(){
    setTimeout(PopUpUserName,1000);
}

$("#playBtn").click(function (){

    UserName=$("#txtInput").val();

    if (UserName=="" || UserName==null){
        alert("Please Enter Your Name");
    }else {
        $("#txtlbl").text(UserName);
        PopupNameClose();
    }

});

function PopupNameClose(){
    $("#popup").css("display","none");

    addEventListener("keypress",function (event) {
        var a=event.code;
        if (a == "Space" || a == "Enter"){
            clearInterval(RunAnimationNumber);
            RunAnimationStart();
        }
    })
}
// --------------------popUp window End--------------------------------
function IdleAnimate() {

    if (charNumber == 10) {
        charNumber = 0;
    }
    $("#character").attr("src","assets/img/Idle_"+charNumber+".png");
    charNumber++;
}

function IdleAnimationStart(){
    IdleAnimationNumber=setInterval(IdleAnimate,100);
}
// --------------------Idle function End--------------------------------

function RunAnimate() {

    if (charRunNumber == 10) {
        charRunNumber = 0;
    }
    $("#character").attr("src","assets/img/Run_"+charRunNumber+".png");
    charRunNumber++;
    CountScore();
}

function RunAnimationStart(){
    clearInterval(IdleAnimationNumber);
    clearInterval(moveBackgroundId);
    RunAnimationNumber=setInterval(RunAnimate,100);
    moveBackgroundId=setInterval(moveBackground,100)
}
// --------------------Run function End--------------------------------
var x=0;
function moveBackground(){
    x=x-20;
    $("#display").css("background-position-x",x+"px");
}

// --------------------Background move function End--------------------------------
var s=0;
function CountScore(){
    $("#scoreCount").text(s);
    s++;
}

// --------------------Score function End--------------------------------
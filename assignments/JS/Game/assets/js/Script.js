// $(document).ready(function (){
//     IdleAnimationStart();
// });
$(window).on('load',function (){
    IdleAnimationStart();
    PopupUserNameStart();
})

var charNumber = 0;
var IdleAnimationNumber=0;
var UserName="";


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
}
// $(document).ready(function (){
//     IdleAnimationStart();
// });
$(window).on('load',function (){
    IdleAnimationStart();
})

charNumber = 0;
IdleAnimationNumber=0;


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


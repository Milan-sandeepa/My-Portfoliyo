$("#item").css("display", "none");
$("#customer").css("display", "none");
$("#placeOrder").css("display", "none");


$("#homebtn").click(function () {
    $("#dashboard").css("display", "block");
    $("#item").css("display", "none");
    $("#customer").css("display", "none");
    $("#placeOrder").css("display", "none");
});

$("#itembtn").click(function () {
    $("#dashboard").css("display", "none");
    $("#item").css("display", "block");
    $("#customer").css("display", "none");
    $("#placeOrder").css("display", "none");
});

$("#customerbtn").click(function () {
    $("#dashboard").css("display", "none");
    $("#item").css("display", "none");
    $("#customer").css("display", "block");
    $("#placeOrder").css("display", "none");
});

$("#placeOrderbtn").click(function () {
    $("#dashboard").css("display", "none");
    $("#item").css("display", "none");
    $("#customer").css("display", "none");
    $("#placeOrder").css("display", "block");
});
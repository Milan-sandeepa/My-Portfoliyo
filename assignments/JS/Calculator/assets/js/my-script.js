// -------Clear functions Start---------
$("#clearAll").click(function () {
    $('#calinput').val("");
});

$("#clear-back").click(function () {
    $("#calinput").val(function (index, value) {
        return value.substr(0, value.length - 1);
    });
});
// -------Clear functions End---------

// -------Numbers functions Start---------

$("#btn-0").click(function () {
    $("#calinput").val($('#calinput').val() + $('#btn-0').val());
});
$("#btn-1").click(function () {
    $("#calinput").val($('#calinput').val() + $('#btn-1').val());
});
$("#btn-2").click(function () {
    $("#calinput").val($('#calinput').val() + $('#btn-2').val());
});
$("#btn-3").click(function () {
    $("#calinput").val($('#calinput').val() + $('#btn-3').val());
});
$("#btn-4").click(function () {
    $("#calinput").val($('#calinput').val() + $('#btn-4').val());
});
$("#btn-5").click(function () {
    $("#calinput").val($('#calinput').val() + $('#btn-5').val());
});
$("#btn-6").click(function () {
    $("#calinput").val($('#calinput').val() + $('#btn-6').val());
});
$("#btn-7").click(function () {
    $("#calinput").val($('#calinput').val() + $('#btn-7').val());
});
$("#btn-8").click(function () {
    $("#calinput").val($('#calinput').val() + $('#btn-8').val());
});
$("#btn-9").click(function () {
    $("#calinput").val($('#calinput').val() + $('#btn-9').val());
});

// -------Numbers functions end---------

// -------Calculate functions Start---------
var symbol = "";
var str = null;

$("#sum").click(function () {
    str = $('#calinput').val();
    var lastString = str.slice(-1);
    symbol = $('#sum').val();

    set(lastString, symbol);
});

$("#minus").click(function () {
    str = $('#calinput').val();
    var lastString = str.slice(-1);
    symbol = $('#minus').val();

    set(lastString, symbol);

});

$("#mul").click(function () {
    str = $('#calinput').val();
    var lastString = str.slice(-1);
    symbol = $('#mul').val();

    set(lastString, symbol);

});

$("#devide").click(function () {
    str = $('#calinput').val();
    var lastString = str.slice(-1);
    symbol = $('#devide').val();

    set(lastString, symbol);

});

$("#dot").click(function () {
    $("#calinput").val($('#calinput').val() + $('#dot').val());
});

function set(lastString, symbol) {
    if (lastString == "-" || lastString == "+" || lastString == "*" || lastString == "/" || lastString == ".") {

    } else {
        $("#calinput").val($('#calinput').val() + symbol);
    }
}

$("#calculate").click(function () {

    if (symbol == "+") {
        var num=str;
        var last=$('#calinput').val();
        var com=last.replace(num+"+","")

        var cal = parseFloat(num) + parseFloat(com);
        $('#calinput').val(cal);
        symbol="";
        str=null;
    }
    if (symbol == "-"){
        var num=str;
        var last=$('#calinput').val();
        var com=last.replace(num+"-","")

        var cal = parseFloat(num) - parseFloat(com);

        $('#calinput').val(cal);
        symbol="";
        str=null;
    }
    if (symbol == "*"){
        var num=str;
        var last=$('#calinput').val();
        var com=last.replace(num+"*","")

        var cal = parseFloat(num) * parseFloat(com);

        $('#calinput').val(cal);
        symbol="";
        str=null;
    }
    if (symbol == "/"){
        var num=str;
        var last=$('#calinput').val();
        var com=last.replace(num+"/","")

        var cal = parseFloat(num) / parseFloat(com);

        $('#calinput').val(cal);
        symbol="";
        str=null;
    }
});

// -------Calculate functions end---------
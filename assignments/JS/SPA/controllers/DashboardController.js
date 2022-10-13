$("#item").css("display", "none");
$("#customer").css("display", "none");
$("#placeOrder").css("display", "none");
$("#orders").css("display", "none");


$("#homeBtn").click(function () {
    $("#dashboard").css("display", "block");
    $("#item").css("display", "none");
    $("#customer").css("display", "none");
    $("#placeOrder").css("display", "none");
    $("#orders").css("display", "none");
});

$("#itemBtn").click(function () {
    $("#dashboard").css("display", "none");
    $("#item").css("display", "block");
    $("#customer").css("display", "none");
    $("#placeOrder").css("display", "none");
    $("#orders").css("display", "none");
});

$("#customerBtn").click(function () {
    $("#dashboard").css("display", "none");
    $("#item").css("display", "none");
    $("#customer").css("display", "block");
    $("#placeOrder").css("display", "none");
    $("#orders").css("display", "none");
});

$("#placeOrderBtn").click(function () {
    $("#dashboard").css("display", "none");
    $("#item").css("display", "none");
    $("#customer").css("display", "none");
    $("#placeOrder").css("display", "block");
    $("#orders").css("display", "none");
});

$("#ordersBtn").click(function () {
    $("#dashboard").css("display", "none");
    $("#item").css("display", "none");
    $("#customer").css("display", "none");
    $("#placeOrder").css("display", "none");
    $("#orders").css("display", "block");
});

function TotalItemsLoad() {
    let tot = items.length;
    $("#itemsTotal").text(tot);
}

function TotalCustomersLoad() {
    let tot = customers.length;
    $("#customersTotal").text(tot);
}

function loadAllDashboardItems() {
    //remove all the table body content before adding data
    $("#tblDashboardProducts").empty();


    // get all item records from the array
    for (var item of items) {
        // add those data to the table row
        var row = `<tr>

        <td class="">${item.id}</td>
        <td>${item.name}</td>
        <td>${item.qty}</td>
        <td>${item.price}</td>>
        
        </tr>`;

        //then add it to the table body of customer table
        $("#tblDashboardProducts").append(row);
    }

}

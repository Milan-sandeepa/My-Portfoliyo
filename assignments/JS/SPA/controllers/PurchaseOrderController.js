// Invoice Details section----------------------------------------------
function loadCustomersForOrder() {
    $("#selectCusID").empty();
    for (let cus of customers) {
        $("#selectCusID").append(`<option>${cus.id}</option>`);
    }
}

$('#selectCusID').click(function () {

    let cID = $("#selectCusID").val();

    for (let cus of customers) {
        if (cus.id == cID) {
            $("#orderCustomerName").val(cus.name);
            $("#orderCustomerTel").val(cus.contact);
            $("#orderCustomerAddress").val(cus.address);
        }
    }
});

// Invoice Details section End----------------------------------------------

// Select Item section------------------------------------------------------






















































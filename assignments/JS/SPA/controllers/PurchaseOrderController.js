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
function loadItemsForOrder() {
    $("#selectOrderItemCode").empty();
    for (let item of items) {
        $("#selectOrderItemCode").append(`<option>${item.id}</option>`);
    }
}

$('#selectOrderItemCode').click(function () {

    let itemID = $("#selectOrderItemCode").val();

    for (let item of items) {
        if (item.id == itemID) {
            $("#txtOrderItemName").val(item.name);
            $("#txtItemPriceOrder").val(item.price);
            $("#txtOrderQTYOnHand").val(item.qty);
        }
    }
});



















































$(document).ready(function () {
    generateOrderID();
});

function generateOrderID() {
    if (orders.length === 0){
        $('#txtOrderID').val("INV-001");
    }else {
        let ordersCount = orders.length + 1;
        if (ordersCount < 10){
            $('#txtOrderID').val("INV-00"+ ordersCount);
        }else if (ordersCount < 100){
            $('#txtOrderID').val("INV-0"+ ordersCount);
        }else if (ordersCount < 100000){
            $('#txtOrderID').val("INV-"+ ordersCount);
        }
    }
}

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
$('#btnAddToTable').attr('disabled', true);

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

$("#txtOrderQty").on('keyup', function (event) {
    if ($("#txtOrderQty").val() == null | $("#txtOrderQty").val() == 0 | $('#selectCusID').val() == null) {
        $('#btnAddToTable').attr('disabled', true);
    } else {
        $('#btnAddToTable').attr('disabled', false);
    }
});

$('#btnAddToTable').click(function () {
    let itemID = $("#selectOrderItemCode").val();
    let itemName = $("#txtOrderItemName").val();
    let itemPrice = $("#txtItemPriceOrder").val();
    let qtyOnHand = $("#txtOrderQTYOnHand").val();
    let itemsQty = $("#txtOrderQty").val();
    let itemsTotal = $("#txtOrderQty").val() * $("#txtItemPriceOrder").val();

    if (parseInt(qtyOnHand) < itemsQty) {
        alert("No Stock please Update Stocks");
        return false;
    } else if (orders.length == 0) {
        var orderObject = order(itemID, itemName, itemPrice, itemsQty, itemsTotal);

        orders.push(orderObject);

        let qtyVal = $("#txtOrderQty").val();
        let itemCode = $("#selectOrderItemCode").val();

        for (let item of items) {
            if (item.id == itemCode) {
                item.qty = item.qty - qtyVal;
                $("#txtOrderQTYOnHand").val(item.qty);
            }
        }
        loadAllItems();
        loadCartTM();
        totalCal();
        $("#selectOrderItemCode,#txtOrderItemName,#txtItemPriceOrder,#txtOrderQTYOnHand,#txtOrderQty").val("", "", "", "", "");
        $('#btnAddToTable').attr('disabled', true);
    } else {
        let searchItem;
        for (var o of orders) {
            if (o.code == itemID) {
                searchItem = o.code;
                break;
            }
        }
        if (searchItem != null) {
            let qtyNewVal = $("#txtOrderQty").val();
            o.qty = Number(o.qty) + Number(qtyNewVal);
            o.tot = o.qty * o.price;
        } else {
            var orderObject = order(itemID, itemName, itemPrice, itemsQty, itemsTotal);
            orders.push(orderObject);
        }

        let qtyVal = $("#txtOrderQty").val();
        let itemCode = $("#selectOrderItemCode").val();

        for (let item of items) {
            if (item.id == itemCode) {
                item.qty = item.qty - qtyVal;
                $("#txtOrderQTYOnHand").val(item.qty);
            }
        }

        loadAllItems();
        loadCartTM();
        totalCal();
        $("#selectOrderItemCode,#txtOrderItemName,#txtItemPriceOrder,#txtOrderQTYOnHand,#txtOrderQty").val("", "", "", "", "");
        $('#btnAddToTable').attr('disabled', true);
    }

});

function loadCartTM() {
    $("#tblCart").empty();

    for (var c of orders) {

        // add those data to the table row
        var row = `<tr>
            <td class="itemsID">${c.code}</td>
            <td>${c.itemName}</td>
            <td>${c.price}</td>
            <td>${c.qty}</td>
            <td>${c.tot}</td>
            <td><i class="cartRemoveIconItem fa-solid fa-trash-can" style="padding-left: 10px;cursor: pointer" type="button"></i></td></tr>`;

        //then add it to the table body of customer table
        $("#tblCart").append(row);

    }
    bindRowCartClickEvents();
}

function totalCal() {
    let sumTotal = 0;
    for (let o of orders) {
        sumTotal = sumTotal + Number(o.tot);
    }
    $("#lbltotal").text(sumTotal);
}

function bindRowCartClickEvents() {
    $(".cartRemoveIconItem").click(function () {

        // Find the row
        var row = $(this).closest("tr");

        // Find the text
        var deleteID = row.find(".itemsID").text();

        let option = confirm("Do you really want to Remove Item :" + deleteID);

        if (option){
            if (deleteItemTm(deleteID)) {
                alert("Successfully Removed..");
            } else {
                alert("please check the id");
            }
        }
    });
}

function deleteItemTm(itemID) {
    let order = searchOrdersTm(itemID);
    updateItems(itemID);
    if (order != null) {
        let indexNumber = orders.indexOf(order);
        orders.splice(indexNumber, 1);
        loadCustomersForOrder();
        loadItemsForOrder();
        loadCartTM();
        return true;
    } else {
        return false;
    }
}

function searchOrdersTm(cusID) {
    for (let o of orders) {
        if (o.code == cusID) {
            return o;
        }
    }
    return null;
}

function updateItems(itemID){
    let order = searchOrdersTm(itemID);
    let item = searchItem(itemID);
    if (item != null) {
        item.qty=parseInt(item.qty)+parseInt(order.qty);
        loadAllItems();
        return true;
    }
}









































generateOrderID();
$('#txtDate').val(getCurrentDate());

function generateOrderID() {
    if (orders.length == 0) {
        $('#txtOrderID').val("INV-001");
    } else {
        let ordersCount = orders.length + 1;
        if (ordersCount < 10) {
            $('#txtOrderID').val("INV-00" + ordersCount);
        } else if (ordersCount < 100) {
            $('#txtOrderID').val("INV-0" + ordersCount);
        } else if (ordersCount < 100000) {
            $('#txtOrderID').val("INV-" + ordersCount);
        }
    }
}

//get Date
function getCurrentDate() {

    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }

    function formatDate(date = new Date()) {
        return [
            date.getFullYear(),
            padTo2Digits(date.getMonth() + 1),
            padTo2Digits(date.getDate()),
        ].join('-');
    }

    return formatDate();
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
$('#btnSubmitOrder').attr('disabled', true);

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
    let cusName = $("#orderCustomerName").val();
    let itemID = $("#selectOrderItemCode").val();
    let itemName = $("#txtOrderItemName").val();
    let itemPrice = $("#txtItemPriceOrder").val();
    let qtyOnHand = $("#txtOrderQTYOnHand").val();
    let itemsQty = $("#txtOrderQty").val();
    let itemsTotal = $("#txtOrderQty").val() * $("#txtItemPriceOrder").val();

    if (parseInt(qtyOnHand) < itemsQty) {
        alert("No Stock please Update Stocks");
        return false;
    } else if (carts.length == 0) {

        var cartTM = cart(cusName,itemID, itemName, itemPrice, itemsQty, itemsTotal);

        carts.push(cartTM);


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
        for (var o of carts) {
            if (o.cartICode == itemID) {
                searchItem = o.cartICode;
                break;
            }
        }
        if (searchItem != null) {
            let qtyNewVal = $("#txtOrderQty").val();
            o.cartOrderQty = Number(o.cartOrderQty) + Number(qtyNewVal);
            o.cartTotal = o.cartOrderQty * o.cartIPrice;
        } else {
            var cartTM = cart(cusName,itemID, itemName, itemPrice, itemsQty, itemsTotal);

            carts.push(cartTM);
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

    for (var cart of carts) {

        // add those data to the table row
        var row = `<tr>
            <td class="itemsID">${cart.cartICode}</td>
            <td>${cart.cartIName}</td>
            <td>${cart.cartIPrice}</td>
            <td>${cart.cartOrderQty}</td>
            <td>${cart.cartTotal}</td>
            <td><i class="cartRemoveIconItem fa-solid fa-trash-can" style="padding-left: 10px;cursor: pointer" type="button"></i></td></tr>`;

        //then add it to the table body of customer table
        $("#tblCart").append(row);

    }
    bindRowCartClickEvents();
    totalCal();
}

function totalCal() {
    let sumTotal = 0;
    for (let cart of carts) {
        sumTotal = sumTotal + Number(cart.cartTotal);
    }
    if ($("#Discount").val() == "") {

        $('#subtotal').text(sumTotal);
    }
    $("#lbltotal").text(sumTotal);
    $("#Discount,#txtCash,#Balance").val("", "", "");
}

function bindRowCartClickEvents() {
    $(".cartRemoveIconItem").click(function () {

        // Find the row
        var row = $(this).closest("tr");

        // Find the text
        var deleteID = row.find(".itemsID").text();

        let option = confirm("Do you really want to Remove Item :" + deleteID);

        if (option) {
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
        let indexNumber = carts.indexOf(order);
        carts.splice(indexNumber, 1);
        loadCustomersForOrder();
        loadItemsForOrder();
        loadCartTM();
        totalCal();
        return true;
    } else {
        return false;
    }
}

function searchOrdersTm(cusID) {
    for (let cart of carts) {
        if (cart.cartICode == cusID) {
            return cart;
        }
    }
    return null;
}

function updateItems(itemID) {
    let order = searchOrdersTm(itemID);
    let item = searchItem(itemID);
    if (item != null) {
        item.qty = parseInt(item.qty) + parseInt(order.cartOrderQty);
        loadAllItems();
        return true;
    }
}

//discount function
$("#Discount").on('keyup', function (event) {
    let finalTotal = 0;
    let dis = $("#Discount").val();
    let Total = $("#lbltotal").text();
    finalTotal = Total - (Number(Total) * Number(dis) / 100);
    $("#subtotal").text(finalTotal);

});

// balance calculate
$("#txtCash").on('keyup', function (event) {
    let cash = $("#txtCash").val();
    let balance = parseFloat(cash) - parseFloat($("#subtotal").text());
    $("#Balance").val(balance);
    if (balance > -1) {
        $('#btnSubmitOrder').attr('disabled', false);
    } else {
        $('#btnSubmitOrder').attr('disabled', true);
    }
});

$('#btnSubmitOrder').click(function () {
    placeOrder();
    generateOrderID();
    clearOrderTexts();
    carts.splice(0, cart.length);
    $('#tblCart').empty();
});

function placeOrder() {
    if (saveOrder()) {
        let orderId=$('#txtOrderID').val();
        let date=$("#txtDate").val();

        for (let c of carts) {
            let orderDetailsObject = orderDetail(orderId,date,c.cusName,c.cartICode,c.cartIPrice,c.cartOrderQty,c.cartTotal);
            orderDetails.push(orderDetailsObject);
        }
        alert("Successfully place order..");
        loadAllOrderDetail();
        $('#btnSubmitOrder').attr('disabled', true);
    } else {
        alert("UnSuccessfully..Something went Wrong !!!");
        $('#btnSubmitOrder').attr('disabled', false);
    }
}

function saveOrder() {
    let oid = $('#txtOrderID').val();
    let cName= $('#orderCustomerName').val();
    let date =$("#txtDate").val();
     let dis =$('#Discount').val();
    let total = parseInt($('#subtotal').text());

    let orderObject = order(oid, cName, date,dis,total);
    let isSaved = orders.push(orderObject);

    loadAllDashboardSales();
    loadAllDashboardItems();
    TotalOrdersLoad();
    TotalSalesLoad();
    if (isSaved) {

        return true;
    }
    return false;
}

function clearOrderTexts(){
    $('#selectCusID,#orderCustomerTel,#orderCustomerName,#orderCustomerAddress,#Discount,#txtCash,#Balance').val("","","","","","","");
    $('#lbltotal,#subtotal').text("00.00","00.00");
}

























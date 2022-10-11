
$("#itemAddModal").click(function (){
    $("#txtItemID").focus();
});

$("#txtItemID").on('keydown', function (event) {
    if (event.key == "Enter") {
        $("#txtItemName").focus();
    }
});

$("#txtItemName").on('keydown', function (event) {
    if (event.key == "Enter") {
        $("#txtItemQty").focus();
    }
});

$("#txtItemQty").on('keydown', function (event) {
    if (event.key == "Enter") {
        $("#txtItemPrice").focus();
    }
});

$("#txtItemPrice").on('keydown', function (event) {
    if (event.key == "Enter") {
        let itemID = $("#txtItemID").val();
        let itemName = $("#txtItemName").val();
        let itemQty = $("#txtItemQty").val();
        let itemPrice = $("#txtItemPrice").val();

        // item
        var itemObject = item(itemID,itemName,itemQty,itemPrice);
        //add the items object to the array
        items.push(itemObject);

        loadAllItems();

        // text Fields clear
        $("#txtItemID").val("");
        $("#txtItemName").val("");
        $("#txtItemQty").val("");
        $("#txtItemPrice").val("");
    }
});

$("#txtItemPrice").on('keydown', function (event) {
    if (event.key == "Enter") {
        $("#txtItemID").focus();
    }
});

$("#itemAddBtn").click(function () {
    let itemID = $("#txtItemID").val();
    let itemName = $("#txtItemName").val();
    let itemQty = $("#txtItemQty").val();
    let itemPrice = $("#txtItemPrice").val();

    // item
    var itemObject = item(itemID,itemName,itemQty,itemPrice);
    //add the items object to the array
    items.push(itemObject);

    loadAllItems();

    // text Fields clear
    $("#txtItemID").val("");
    $("#txtItemName").val("");
    $("#txtItemQty").val("");
    $("#txtItemPrice").val("");

});

//load all Items
function loadAllItems() {
    //remove all the table body content before adding data
    $("#tblItem").empty();


    // get all item records from the array
    for (var item of items) {
        // add those data to the table row
        var row = `<tr><td class="itemsID">${item.id}</td><td>${item.name}</td><td>${item.qty}</td><td>${item.price}</td><td><i class="editIconItem fa-solid fa-pen-to-square " data-bs-toggle="modal"
                    data-bs-target="#itemEditModal" style="cursor: pointer"></i> <i class="deleteIconItem fa-solid fa-trash-can" style="padding-left: 10px;cursor: pointer" type="button"></i></td></tr>`;

        //then add it to the table body of customer table
        $("#tblItem").append(row);
    }

    bindRowItemClickEvents();
}

// Delete Item and edit icon Set

function bindRowItemClickEvents() {
    $(".editIconItem").click(function () {

        // Find the row
        var row = $(this).closest("tr");

        // Find the text
        var searchID = row.find(".itemsID").text();

        if (searchID!=null){

            let item =searchItem(searchID)

            $('#txtItemUpdateID').val(item.id);
            $('#txtItemUpdateName').val(item.name);
            $('#txtItemUpdateQty').val(item.qty);
            $('#txtItemUpdatePrice').val(item.price);

            console.log(item);

        }else {
            alert("No such customer to edit. please try Again");
        }
    });

    $(".deleteIconItem").click(function () {

        // Find the row
        var row = $(this).closest("tr");

        // Find the text
        var deleteID = row.find(".itemsID").text();

        let option = confirm("Do you really want to delete Item id :" + deleteID);

        if (option){
            if (deleteItem(deleteID)) {
                alert("Item Successfully Deleted..");

            } else {
                alert("No such Item to delete. please check the id");
            }
        }
    });
}

function searchItem(itemsID) {
    for (let item of items) {
        if (item.id == itemsID) {
            return item;
        }
    }
    return null;
}

function deleteItem(itemID) {
    let item = searchItem(itemID);
    if (item != null) {
        let indexNumber = items.indexOf(item);
        items.splice(indexNumber, 1);
        loadAllItems();
        return true;
    } else {
        return false;
    }
}

// update item

$("#txtItemUpdatePrice").on('keydown', function (event) {
    if (event.key == "Enter") {
        let itemID = $("#txtItemUpdateID").val();
        let response = updateItem(itemID);
        if (response) {
            alert("Item Updated Successfully");
            $("#txtItemUpdateName").val("");
            $("#txtItemUpdateQty").val("");
            $("#txtItemUpdatePrice").val("");
        } else {
            alert("Update Failed..!");
        }
    }
});

$("#itemUpdateBtn").click(function () {
    let itemID = $("#txtItemUpdateID").val();
    let response = updateItem(itemID);
    if (response) {
        alert("Item Updated Successfully");
        $("#txtItemUpdateName").val("");
        $("#txtItemUpdateQty").val("");
        $("#txtItemUpdatePrice").val("");
    } else {
        alert("Update Failed..!");
    }
});

function updateItem(itemID) {
    let item = searchItem(itemID);
    if (item != null) {
        item.id = $("#txtItemUpdateID").val();
        item.name = $("#txtItemUpdateName").val();
        item.qty = $("#txtItemUpdateQty").val();
        item.price = $("#txtItemUpdatePrice").val();
        loadAllItems();
        return true;
    } else {
        return false;
    }
}

// item seach bar
$(document).ready(function (){
    $("#searchItemInput").on('keyup',function (){
        var value = $(this).val().toLowerCase();

        $("#tblItem>tr").filter(function (){
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });
});
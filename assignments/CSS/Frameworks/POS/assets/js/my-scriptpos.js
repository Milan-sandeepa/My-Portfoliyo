var customers = [];

$("#customerAddBtn").click(function () {
    let customerID = $("#txtCustomerID").val();
    let customerName = $("#txtCustomerName").val();
    let customerAddress = $("#txtCustomerAddress").val();
    let customerContact = $("#txtCustomerContact").val();

    // customer
    var customerObject = {
        id: customerID,
        name: customerName,
        address: customerAddress,
        contact: customerContact
    }

    //add the customer object to the array
    customers.push(customerObject);
    loadAllCustomers();

    // text Fields clear
    $("#txtCustomerID").val("");
    $("#txtCustomerName").val("");
    $("#txtCustomerAddress").val("");
    $("#txtCustomerContact").val("");

});

//load all customers
function loadAllCustomers() {
    //remove all the table body content before adding data
    $("#tblCustomer").empty();


    // get all customer records from the array
    for (var customer of customers) {
        // add those data to the table row
        var row = `<tr><td class="cusID">${customer.id}</td><td>${customer.name}</td><td>${customer.address}</td><td>${customer.contact}</td><td><i class="editIcon fa-solid fa-pen-to-square " data-bs-toggle="modal"
                    data-bs-target="#customerEditModal" style="cursor: pointer"></i> <i class="deleteIcon fa-solid fa-trash-can" style="padding-left: 10px;cursor: pointer" type="button"></i></td></tr>`;

        //then add it to the table body of customer table
        $("#tblCustomer").append(row);
    }

    bindRowClickEvents();
}

// Delete Customer and edit icon Set

function bindRowClickEvents() {
    $(".editIcon").click(function () {

        // Find the row
        var row = $(this).closest("tr");

        // Find the text
        var searchID = row.find(".cusID").text();

        if (searchID!=null){

            let customer =searchCustomer(searchID)

            $('#txtCustomerUpdateID').val(customer.id);
            $('#txtCustomerUpdateName').val(customer.name);
            $('#txtCustomerUpdateAddress').val(customer.address);
            $('#txtCustomerUpdateContact').val(customer.contact);

            console.log(customer);

        }else {
            alert("No such customer to edit. please try Again");
        }
    });

    $(".deleteIcon").click(function () {

        // Find the row
        var row = $(this).closest("tr");

        // Find the text
        var deleteID = row.find(".cusID").text();

        let option = confirm("Do you really want to delete customer id :" + deleteID);

        if (option){
            if (deleteCustomer(deleteID)) {
                alert("Customer Successfully Deleted..");

            } else {
                alert("No such customer to delete. please check the id");
            }
        }
    });
}

// update customer
$("#customerUpdateBtn").click(function () {
    let customerID = $("#txtCustomerUpdateID").val();
    let response = updateCustomer(customerID);
    if (response) {
        alert("Customer Updated Successfully");
        $("#txtCustomerUpdateName").val("");
        $("#txtCustomerUpdateAddress").val("");
        $("#txtCustomerUpdateContact").val("");
    } else {
        alert("Update Failed..!");

    }
});

$(document).ready(function (){
    $("#searchInput").on('keyup',function (){
        var value = $(this).val().toLowerCase();

        $("#tblCustomer>tr").filter(function (){
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });
});

function searchCustomer(cusID) {
    for (let customer of customers) {
        if (customer.id == cusID) {
            return customer;
        }
    }
    return null;
}

function deleteCustomer(customerID) {
    let customer = searchCustomer(customerID);
    if (customer != null) {
        let indexNumber = customers.indexOf(customer);
        customers.splice(indexNumber, 1);
        loadAllCustomers();
        return true;
    } else {
        return false;
    }
}

function updateCustomer(customerID) {
    let customer = searchCustomer(customerID);
    if (customer != null) {
        customer.id = $("#txtCustomerUpdateID").val();
        customer.name = $("#txtCustomerUpdateName").val();
        customer.address = $("#txtCustomerUpdateAddress").val();
        customer.contact = $("#txtCustomerUpdateContact").val();
        loadAllCustomers();
        return true;
    } else {
        return false;
    }
}


//disable tab key of all four text fields using grouping selector in CSS
$("#txtCustomerID,#txtCustomerName,#txtCustomerAddress,#txtCustomerContact,#txtCustomerUpdateName,#txtCustomerUpdateAddress,#txtCustomerUpdateContact").on('keydown', function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});

$("#txtCustomerID,#txtCustomerName,#txtCustomerAddress,#txtCustomerContact").on('keyup', function (event) {
    checkCusValidity();
});

$("#txtCustomerID,#txtCustomerName,#txtCustomerAddress,#txtCustomerContact").on('blur', function (event) {
    checkCusValidity();
});

$("#txtCustomerID").on('keydown', function (event) {
    if (event.key == "Enter" && checkCustomer(cusIDRegEx, $("#txtCustomerID"))) {
        $("#txtCustomerName").focus();
    } else {
        focusText($("#txtCustomerID"));
    }
});

$("#txtCustomerName").on('keydown', function (event) {
    if (event.key == "Enter" && checkCustomer(cusNameRegEx, $("#txtCustomerName"))) {
        focusText($("#txtCustomerAddress"));
    }
});

$("#txtCustomerAddress").on('keydown', function (event) {
    if (event.key == "Enter" && checkCustomer(cusAddressRegEx, $("#txtCustomerAddress"))) {
        focusText($("#txtCustomerContact"));
    }
});

$("#txtCustomerContact").on('keydown', function (event) {
    if (event.key == "Enter" && checkCustomer(cusContactRegEx, $("#txtCustomerContact"))) {

        let id=$("#txtCustomerID").val();
        if (searchCustomer(id)){
            alert("Customer Id "+id+" already exist.please Try another Customer number");
        }else {
            let res = confirm("Do you want to add this Customer.?");
            if (res) {
                let customerID = $("#txtCustomerID").val();
                let customerName = $("#txtCustomerName").val();
                let customerAddress = $("#txtCustomerAddress").val();
                let customerContact = $("#txtCustomerContact").val();

                // Customer
                var customerObject = customer(customerID,customerName,customerAddress,customerContact);

                //add the customers object to the array
                customers.push(customerObject);

                loadAllCustomers();
                TotalCustomersLoad();
                loadCustomersForOrder();
                clearCusAllTexts();
            }
        }
    }
});

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

    bindRowCustomerClickEvents();
}

$("#customerAddBtn").click(function () {
    let id=$("#txtCustomerID").val();
    if (searchCustomer(id)){
        alert("Customer Id "+id+" already exist.please Try another Customer number");
    }else {
        let res = confirm("Do you want to add this Customer.?");
        if (res) {
            let customerID = $("#txtCustomerID").val();
            let customerName = $("#txtCustomerName").val();
            let customerAddress = $("#txtCustomerAddress").val();
            let customerContact = $("#txtCustomerContact").val();

            // Customer
            var customerObject = customer(customerID,customerName,customerAddress,customerContact);

            //add the customers object to the array
            customers.push(customerObject);

            loadAllCustomers();
            TotalCustomersLoad();
            clearCusAllTexts();
        }
    }
});

// Delete Customer and edit icon Set

function bindRowCustomerClickEvents() {
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
        TotalCustomersLoad();
        return true;
    } else {
        return false;
    }
}

// update Customer-------------------------------------------------------------------------

$("#txtCustomerUpdateName,#txtCustomerUpdateAddress,#txtCustomerUpdateContact").on('keyup', function (event) {
    checkCusUpValidity();
});

$("#txtCustomerUpdateName,#txtCustomerUpdateAddress,#txtCustomerUpdateContact").on('blur', function (event) {
    checkCusUpValidity();
});

$("#txtCustomerUpdateName").on('keydown', function (event) {
    if (event.key == "Enter" && checkCustomerUp(cusNameUpRegEx, $("#txtCustomerUpdateName"))) {
        $("#txtCustomerUpdateAddress").focus();
    } else {
        focusText($("#txtCustomerUpdateName"));
    }
});

$("#txtCustomerUpdateAddress").on('keydown', function (event) {
    if (event.key == "Enter" && checkCustomerUp(cusAddressUpRegEx, $("#txtCustomerUpdateAddress"))) {
        focusText($("#txtCustomerUpdateContact"));
    }
});

$("#txtCustomerUpdateContact").on('keydown', function (event) {
    if (event.key == "Enter" && checkCustomerUp(cusContactUpRegEx, $("#txtCustomerUpdateContact"))) {
        let res = confirm("Do you want to add this Update Customer.?");
        if (res) {
            alert("Customer Updated Successfully");
            let customerID = $("#txtCustomerUpdateID").val();
            updateCustomer(customerID);

        }else {
            alert("Update Failed..!");
        }
    }

});

$("#customerUpdateBtn").click(function () {
    let res = confirm("Do you want to add this Update Customer.?");
    if (res) {
        alert("Customer Updated Successfully");
        let customerID = $("#txtCustomerUpdateID").val();
        updateCustomer(customerID);

    }else {
        alert("Update Failed..!");
    }
});

function updateCustomer(customerID) {
    let customer = searchCustomer(customerID);
    if (customer != null) {
        customer.id = $("#txtCustomerUpdateID").val();
        customer.name = $("#txtCustomerUpdateName").val();
        customer.address = $("#txtCustomerUpdateAddress").val();
        customer.contact = $("#txtCustomerUpdateContact").val();

        loadAllCustomers();
        clearCusUpAllTexts();
        return true;
    } else {
        return false;
    }
}

// Customer seach bar
$(document).ready(function (){
    $("#searchCustomerInput").on('keyup',function (){
        var value = $(this).val().toLowerCase();

        $("#tblCustomer>tr").filter(function (){
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });
});



















































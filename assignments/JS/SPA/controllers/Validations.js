// Item Validation

$("#txtItemID").focus();
$("#itemAddBtn").attr('disabled',true);
$("#itemUpdateBtn").attr('disabled',true);

// Item reguler expressions
const itemIDRegEx = /^(I-)[0-9]{3}$/;
const itemNameRegEx = /^[A-z ]{2,20}$/;
const itemQtyRegEx = /^[0-9]{1,}$/;
const itemPriceRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;

const itemNameUpRegEx = /^[A-z ]{2,20}$/;
const itemQtyUpRegEx = /^[0-9]{1,}$/;
const itemPriceUpRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;

let itemValidations = [];
let itemUpValidations = [];

itemValidations.push({reg: itemIDRegEx, field: $('#txtItemID'),error:'Item ID Pattern is Wrong : I-001'});
itemValidations.push({reg: itemNameRegEx, field: $('#txtItemName'),error:'Item Name Pattern is Wrong : A-z 5-20'});
itemValidations.push({reg: itemQtyRegEx, field: $('#txtItemQty'),error:'Item Quantity Pattern is Wrong : 0-9'});
itemValidations.push({reg: itemPriceRegEx, field: $('#txtItemPrice'),error:'Item Price Pattern is Wrong : 100 or 100.00'});

itemUpValidations.push({reg: itemNameUpRegEx, field: $('#txtItemUpdateName'),error:'Item Name Pattern is Wrong : A-z 5-20'});
itemUpValidations.push({reg: itemQtyUpRegEx, field: $('#txtItemUpdateQty'),error:'Item Quantity Pattern is Wrong : 0-9'});
itemUpValidations.push({reg: itemPriceUpRegEx, field: $('#txtItemUpdatePrice'),error:'Item Price Pattern is Wrong : 100 or 100.00'});


function checkValidity() {
    let errorCount=0;
    for (let validation of itemValidations) {
        if (check(validation.reg,validation.field)) {
            textSuccess(validation.field,"");
        } else {
            errorCount=errorCount+1;
            setTextError(validation.field,validation.error);
        }
    }
    setButtonState(errorCount);
}

function checkUpValidity() {
    let errorCount=0;
    for (let validation of itemUpValidations) {
        if (check(validation.reg,validation.field)) {
            textSuccess(validation.field,"");
        } else {
            errorCount=errorCount+1;
            setTextError(validation.field,validation.error);
        }
    }
    setUpdateButtonState(errorCount);
}

function textSuccess(txtField,error) {
    if (txtField.val().length <= 0) {
        defaultText(txtField,"");
    } else {
        txtField.css('border', '2px solid green');
        txtField.parent().children('span').text(error);
    }
}

function defaultText(txtField,error) {
    txtField.css("border", "1px solid #ced4da");
    txtField.parent().children('span').text(error);
}

function check(regex, txtField) {
    let inputValue = txtField.val();
    return regex.test(inputValue) ? true : false;
}

function setTextError(txtField,error) {
    if (txtField.val().length <= 0) {
        defaultText(txtField,"");
    } else {
        txtField.css('border', '2px solid red');
        txtField.parent().children('span').text(error);
    }
}

function focusText(txtField) {
    txtField.focus();
}

function setButtonState(value){
    if (value>0){
        $("#itemAddBtn").attr('disabled',true);
    }else{
        $("#itemAddBtn").attr('disabled',false);
    }
}

function setUpdateButtonState(value){
    if (value>0){
        $("#itemUpdateBtn").attr('disabled',true);
    }else{
        $("#itemUpdateBtn").attr('disabled',false);
    }
}

function clearAllTexts() {
    $("#txtItemID").focus();
    $("#txtItemID,#txtItemName,#txtItemQty,#txtItemPrice").val("");
    checkValidity();
}

function clearUpAllTexts() {
    $("#txtItemUpdateName").focus();
    $("#txtItemUpdateName,#txtItemUpdateQty,#txtItemUpdatePrice").val("");
    checkUpValidity();
}

// customer validation--------------------------------------------------------------------------------------------

$("#txtCustomerID").focus();
$("#customerAddBtn").attr('disabled',true);
$("#customerUpdateBtn").attr('disabled',true);

// Customer regular expressions
const cusIDRegEx = /^(C-)[0-9]{3}$/;
const cusNameRegEx = /^[A-z ]{4,20}$/;
const cusAddressRegEx = /^[0-9/A-z. ,]{4,}$/;
const cusContactRegEx = /^[0-9]{10}$/;

const cusNameUpRegEx = /^[A-z ]{4,20}$/;
const cusAddressUpRegEx = /^[0-9/A-z. ,]{4,}$/;
const cusContactUpRegEx = /^[0-9]{10}$/;

let customerValidations = [];
let customerUpdateValidations = [];

customerValidations.push({reg: cusIDRegEx, field: $('#txtCustomerID'),error:'Customer ID Pattern is Wrong : C-001'});
customerValidations.push({reg: cusNameRegEx, field: $('#txtCustomerName'),error:'Customer Name Pattern is Wrong : A-z 4-20'});
customerValidations.push({reg: cusAddressRegEx, field: $('#txtCustomerAddress'),error:'Customer Address Pattern is Wrong : A-z 4-20'});
customerValidations.push({reg: cusContactRegEx, field: $('#txtCustomerContact'),error:'Customer Contact Pattern is Wrong : 0-9'});

customerUpdateValidations.push({reg: cusNameUpRegEx, field: $('#txtCustomerUpdateName'),error:'Customer Name Pattern is Wrong : A-z 4-20'});
customerUpdateValidations.push({reg: cusAddressUpRegEx, field: $('#txtCustomerUpdateAddress'),error:'Customer Address Pattern is Wrong : A-z 4-20'});
customerUpdateValidations.push({reg: cusContactUpRegEx, field: $('#txtCustomerUpdateContact'),error:'Customer Contact Pattern is Wrong : 0-9'});

// Customer Add Validation---------------------------------------------------------------

function checkCusValidity() {
    let errorCount=0;
    for (let validation of customerValidations) {
        if (checkCustomer(validation.reg,validation.field)) {
            textCusSuccess(validation.field,"");
        } else {
            errorCount=errorCount+1;
            setTextCusError(validation.field,validation.error);
        }
    }
    setCusButtonState(errorCount);
}

function checkCustomer(regex, txtField) {
    let inputValue = txtField.val();
    return regex.test(inputValue) ? true : false;
}

function textCusSuccess(txtField,error) {
    if (txtField.val().length <= 0) {
        defaultText(txtField,"");
    } else {
        txtField.css('border', '2px solid green');
        txtField.parent().children('span').text(error);
    }
}

function setTextCusError(txtField,error) {
    if (txtField.val().length <= 0) {
        defaultText(txtField,"");
    } else {
        txtField.css('border', '2px solid red');
        txtField.parent().children('span').text(error);
    }
}

function setCusButtonState(value){
    if (value>0){
        $("#customerAddBtn").attr('disabled',true);
    }else{
        $("#customerAddBtn").attr('disabled',false);
    }
}

// Customer Update Validation---------------------------------------------------------------

function checkCusUpValidity() {
    let errorCount=0;
    for (let validation of customerUpdateValidations) {
        if (checkCustomerUp(validation.reg,validation.field)) {
            textCusUpSuccess(validation.field,"");
        } else {
            errorCount=errorCount+1;
            setTextCusUpError(validation.field,validation.error);
        }
    }
    setCusUpdateButtonState(errorCount);
}

function checkCustomerUp(regex, txtField) {
    let inputValue = txtField.val();
    return regex.test(inputValue) ? true : false;
}

function textCusUpSuccess(txtField,error) {
    if (txtField.val().length <= 0) {
        defaultText(txtField,"");
    } else {
        txtField.css('border', '2px solid green');
        txtField.parent().children('span').text(error);
    }
}

function setTextCusUpError(txtField,error) {
    if (txtField.val().length <= 0) {
        defaultText(txtField,"");
    } else {
        txtField.css('border', '2px solid red');
        txtField.parent().children('span').text(error);
    }
}

function setCusUpdateButtonState(value){
    if (value>0){
        $("#customerUpdateBtn").attr('disabled',true);
    }else{
        $("#customerUpdateBtn").attr('disabled',false);
    }
}

function clearCusAllTexts() {
    $("#txtCustomerID").focus();
    $("#txtCustomerID,#txtCustomerName,#txtCustomerAddress,#txtCustomerContact").val("");
    checkCusValidity();
}

function clearCusUpAllTexts() {
    $("#txtCustomerUpdateName").focus();
    $("#txtCustomerUpdateName,#txtCustomerUpdateAddress,#txtCustomerUpdateContact").val("");
    checkCusUpValidity();
}
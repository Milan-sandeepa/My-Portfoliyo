// Item Validation

$("#txtItemID").focus();

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
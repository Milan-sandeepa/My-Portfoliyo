function loadAllOrderDetail() {
    //remove all the table body content before adding data
    $("#tblOrdersDetails").empty();


    // get all item records from the array
    for (var orderDetail of orderDetails) {
        // add those data to the table row

        var row = `<tr>
        <td class="invoiceID">${orderDetail.orderId}</td>
        <td>${orderDetail.date}</td>
        <td>${orderDetail.cname}</td>
        <td>${orderDetail.code}</td>
        <td>${orderDetail.unitPrice}</td>
        <td>${orderDetail.qty}</td>
        <td><i class="fa-solid fa-trash-can" style="padding-left: 10px;cursor: pointer" type="button"></i></td>
        </tr>`;

        //then add it to the table body of customer table
        $("#tblOrdersDetails").append(row);
    }

}

// Order seach bar
$(document).ready(function (){
    $("#searchOrderInput").on('keyup',function (){
        var value = $(this).val().toLowerCase();

        $("#tblOrdersDetails>tr").filter(function (){
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });
});
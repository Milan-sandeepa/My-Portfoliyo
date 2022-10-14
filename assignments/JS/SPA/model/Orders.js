function order(orderId,customerName,date,discount,itemsTotal){
    return{
        id: orderId,
        cusName:customerName,
        date:date,
        discount:discount,
        total:itemsTotal
    };
}
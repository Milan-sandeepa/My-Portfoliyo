function order(orderId,customerId,date,discount,itemsTotal){
    return{
        id: orderId,
        cusId: customerId,
        date:date,
        discount:discount,
        total:itemsTotal
    };
}
function orderDetail(orderId,date,cname,itemCode,unitPrice,qty,total){
    return{
        orderId:orderId,
        date:date,
        cname:cname,
        code: itemCode,
        unitPrice: unitPrice,
        qty:qty,
        total:total
    };
}
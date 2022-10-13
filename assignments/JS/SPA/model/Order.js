function order(orderID,orderDate,cusName,itemQty,totPrice){
    return {
        id: orderID,
        orderDate: orderDate,
        cusName: cusName,
        qty: itemQty,
        totPrice: totPrice
    }
}
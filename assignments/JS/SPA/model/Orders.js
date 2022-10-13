function order(itemCode,itemName,unitPrice,qty,itemsTotal){
    return{
        code: itemCode,
        itemName: itemName,
        price:unitPrice,
        qty:qty,
        tot:itemsTotal
    };
}
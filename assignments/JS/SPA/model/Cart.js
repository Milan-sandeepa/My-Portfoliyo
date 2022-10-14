function cart(cusName,cartItemCode, cartItemName, cartItemPrice, orderQty, cartTotal) {
    return {
        cusName: cusName,
        cartICode: cartItemCode,
        cartIName: cartItemName,
        cartIPrice: cartItemPrice,
        cartOrderQty: orderQty,
        cartTotal: cartTotal
    };
}
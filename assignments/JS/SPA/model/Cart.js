function cart(cartItemCode, cartItemName, cartItemPrice, orderQty, cartTotal) {
    return {
        cartICode: cartItemCode,
        cartIName: cartItemName,
        cartIPrice: cartItemPrice,
        cartOrderQty: orderQty,
        cartTotal: cartTotal
    };
}